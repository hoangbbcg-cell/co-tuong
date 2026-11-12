const fs = require('fs');
const path = require('path');
const http = require('http');
const { createRequire } = require('module');

const root = path.resolve(process.argv[2]);
const trial = path.resolve(process.argv[3]);
const resultPath = path.resolve(process.argv[4]);
const mode = process.argv[5] || 'optimize';

const requireProject = createRequire(
  path.join(root, 'package.json')
);

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => {
    const p = path.join(dir,e.name);
    return e.isDirectory()
      ? walk(p)
      : (e.isFile() ? [p] : []);
  });
}

function bytes(dir) {
  return walk(dir).reduce(
    (n,p)=>n+fs.statSync(p).size,0
  );
}

function alphaBuffer(raw) {
  const count = raw.length / 4;
  const alpha = Buffer.allocUnsafe(count);
  for(let i=0;i<count;i++) {
    alpha[i]=raw[i*4+3];
  }
  return alpha;
}

async function optimize() {
  const sharp = requireProject('sharp');
  const before = bytes(trial);
  const all = walk(trial);

  const textFiles = all.filter(p =>
    /\.(js|css|html|json)$/i.test(p)
  );

  const contents = new Map(
    textFiles.map(p=>[p,fs.readFileSync(p,'utf8')])
  );

  const images = all.filter(p =>
    /\.png$/i.test(p) &&
    fs.statSync(p).size >= 100*1024
  );

  const converted = [];
  const skipped = [];

  for(const file of images) {
    const name = path.basename(file);
    const original = fs.readFileSync(file);

    const referenced = [...contents.values()]
      .some(s=>s.includes(name));

    if(!referenced) {
      skipped.push({file:name,reason:'No static reference'});
      continue;
    }

    const newName = name.replace(/\.png$/i,'.webp');
    const target = path.join(path.dirname(file),newName);

    if(fs.existsSync(target)) {
      skipped.push({file:name,reason:'WebP exists'});
      continue;
    }

    try {
      const meta = await sharp(original).metadata();

      const webp = await sharp(original)
        .webp({
          quality:88,
          alphaQuality:100,
          effort:5
        })
        .toBuffer();

      if(webp.length >= original.length*0.95) {
        skipped.push({file:name,reason:'Insufficient saving'});
        continue;
      }

      const wm = await sharp(webp).metadata();

      if(
        wm.format!=='webp' ||
        meta.width!==wm.width ||
        meta.height!==wm.height
      ) {
        skipped.push({file:name,reason:'Dimension mismatch'});
        continue;
      }

      const a = await sharp(original)
        .ensureAlpha().raw().toBuffer();

      const b = await sharp(webp)
        .ensureAlpha().raw().toBuffer();

      if(!alphaBuffer(a).equals(alphaBuffer(b))) {
        skipped.push({file:name,reason:'Alpha pixel mismatch'});
        continue;
      }

      // Write WebP only in the isolated preview copy.
      fs.writeFileSync(target,webp);

      for(const [textFile,text] of contents) {
        if(text.includes(name)) {
          contents.set(
            textFile,
            text.split(name).join(newName)
          );
        }
      }

      fs.unlinkSync(file);

      converted.push({
        from:name,
        to:newName,
        before:original.length,
        after:webp.length
      });

    } catch(e) {
      skipped.push({
        file:name,
        reason:'Conversion failed: '+e.message
      });
    }
  }

  for(const [file,content] of contents) {
    const current = fs.readFileSync(file,'utf8');
    if(content!==current) {
      fs.writeFileSync(file,content,'utf8');
    }
  }

  const currentFiles = walk(trial);
  const combinedText = currentFiles
    .filter(p=>/\.(js|css|html|json)$/i.test(p))
    .map(p=>fs.readFileSync(p,'utf8')).join('\n');

  for(const item of converted) {
    if(!currentFiles.some(p=>path.basename(p)===item.to)) {
      throw new Error('Missing converted asset: '+item.to);
    }
    if(combinedText.includes(item.from)) {
      throw new Error('Old static reference: '+item.from);
    }
  }

  const after = bytes(trial);

  const result = {
    status:'PASS',
    beforeBytes:before,
    afterBytes:after,
    savedBytes:before-after,
    candidates:images.length,
    convertedCount:converted.length,
    skippedCount:skipped.length,
    quality:88,
    converted,
    skipped,
    browserQA:'PENDING',
    networkMB:'NOT MEASURED'
  };

  if(after > before) {
    throw new Error('Trial increased build size');
  }

  fs.writeFileSync(
    resultPath,
    JSON.stringify(result,null,2)
  );

  console.log(JSON.stringify({
    beforeMB:before/1048576,
    afterMB:after/1048576,
    savedMB:(before-after)/1048576,
    converted:converted.length,
    skipped:skipped.length
  },null,2));
}

function serve() {
  const port = Number(process.argv[6] || 4181);
  const types = {
    '.html':'text/html',
    '.js':'text/javascript',
    '.css':'text/css',
    '.json':'application/json',
    '.webp':'image/webp',
    '.png':'image/png',
    '.jpg':'image/jpeg',
    '.jpeg':'image/jpeg',
    '.svg':'image/svg+xml',
    '.woff2':'font/woff2',
    '.woff':'font/woff',
    '.ttf':'font/ttf',
    '.mp3':'audio/mpeg',
    '.mp4':'video/mp4',
    '.wav':'audio/wav',
    '.xml':'application/xml',
    '.txt':'text/plain'
  };

  http.createServer((req,res)=>{
    try {
      const url = new URL(req.url,'http://localhost');
      const pathname = decodeURIComponent(url.pathname);
      const relative = pathname.replace(/^\/+/, '');
      const requested = path.resolve(trial,relative);
      const base = path.resolve(trial);

      if(requested!==base &&
         !requested.startsWith(base+path.sep)) {
        res.writeHead(403);res.end();return;
      }

      let file=requested;
      let stat;

      try { stat=fs.statSync(file); }
      catch { stat=null; }

      if(stat && stat.isDirectory()) {
        file=path.join(file,'index.html');
        stat=fs.existsSync(file)?fs.statSync(file):null;
      }

      if(!stat || !stat.isFile()) {
        const ext=path.extname(requested);
        if(ext) {
          res.writeHead(404);res.end('Not found');return;
        }
        file=path.join(trial,'index.html');
      }

      const ext=path.extname(file).toLowerCase();
      res.writeHead(200,{
        'Content-Type':(types[ext]||'application/octet-stream')+
          (['.html','.js','.css','.json','.txt','.xml']
            .includes(ext)?'; charset=utf-8':''),
        'Cache-Control':'no-store',
        'X-Content-Type-Options':'nosniff'
      });

      fs.createReadStream(file).pipe(res);
    } catch(e) {
      res.writeHead(500);res.end('Preview error');
    }
  }).listen(port,'127.0.0.1',()=>{
    console.log('HOVANG PREVIEW http://127.0.0.1:'+port);
  });
}

if(mode==='serve') serve();
else optimize().catch(e=>{
  console.error(e);
  process.exit(1);
});