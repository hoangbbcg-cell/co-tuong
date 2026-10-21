"""Reuse approved honors artwork for responsive mobile chrome and image tabs."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops, ImageOps

root = Path(__file__).resolve().parents[1]
folder = root / 'src/assets/profile/honors'
source = Image.open(folder / 'honors-frame-tight.png').convert('RGBA')

def save(image, name):
    box = image.getchannel('A').getbbox()
    image = image.crop(box)
    image.save(folder / name)
    assert image.getchannel('A').getbbox() == (0, 0, image.width, image.height)
    print(name, image.size)

# Keep the original outside frame/corners; remove the old sidebar and detach title.
body = source.crop((0, 36, 1366, 999))
panel = source.crop((292, 108, 1330, 977))
panel.paste(ImageOps.mirror(panel.crop((0, 0, 128, 112))), (panel.width-128, 0))
panel = panel.resize((1306, 867), Image.Resampling.LANCZOS)
body.paste(panel, (30, 70))
strip = source.crop((110, 36, 150, 106))
for x in range(90, 1276, 40):
    body.paste(strip.crop((0, 0, min(40, 1276-x), 70)), (x, 0))
body.paste(source.crop((1336, 220, 1366, 350)), (1336, 70))
body.paste(ImageOps.mirror(source.crop((0, 36, 110, 106))), (1256, 0))
save(body, 'mobile-frame.png')
title = source.crop((380, 0, 986, 109))
mask = Image.new('L', title.size)
draw = ImageDraw.Draw(mask)
draw.polygon([(80,0),(527,0),(546,20),(558,40),(547,68),(527,81),(80,81),(63,65),(54,40),(66,18)], fill=255)
draw.rectangle((0,35,78,65), fill=255)
draw.rectangle((528,35,605,65), fill=255)
draw.polygon([(32,55),(57,55),(68,108),(18,108)], fill=255)
draw.polygon([(549,55),(573,55),(588,108),(535,108)], fill=255)
title.putalpha(ImageChops.multiply(title.getchannel('A'), mask))
save(title, 'mobile-title.png')

tabs = {
    'all': (20, 107, 288, 205),
    'arena': (28, 210, 278, 312),
    'awarded': (28, 321, 278, 431),
    'streak': (28, 440, 278, 546),
    'games': (28, 555, 278, 664),
    'attendance': (28, 674, 278, 787),
}
for name, box in tabs.items():
    tab = source.crop(box)
    w, h = tab.size
    mask = Image.new('L', (w, h))
    ImageDraw.Draw(mask).polygon([(8,0),(w-9,0),(w-1,8),(w-1,h-9),(w-9,h-1),(8,h-1),(0,h-9),(0,8)], fill=255)
    tab.putalpha(ImageChops.multiply(tab.getchannel('A'), mask))
    save(tab, f'mobile-tab-{name}.png')

close = source.crop((1280, 20, 1366, 157))
mask = Image.new('L', close.size)
draw = ImageDraw.Draw(mask)
draw.ellipse((7, 0, 85, 82), fill=255)
draw.polygon([(40,64),(73,64),(85,136),(29,136)], fill=255)
close.putalpha(ImageChops.multiply(close.getchannel('A'), mask))
save(close, 'mobile-close.png')
