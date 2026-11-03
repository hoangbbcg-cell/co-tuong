const aliases:Record<string,string>={
  'bat-bai-2':'cct_1','thong-tri-1':'cct_2','lien-thang-1':'cct_3','da-thang-1':'cct_4','khoi-thang-1':'cct_5',
  'lao-lang-ky-dan-1':'tvc_1','ky-thu-lau-nam-2':'tvc_2','lao-luyen-2':'tvc_3','day-dan-2':'tvc_4','khoi-dau-2':'tvc_5',
  'thuong-truc-1':'occ_1_thuong-truc','ben-bi-2':'occ_2_ben-bi','chuyen-can-2':'occ_2_chuyen-can','sieng-nang-2':'occ_2_sieng-nang','tich-cuc-2':'occ_2_tich-cuc',
}
export const honorCode=(id:string)=>id.startsWith('arena_')?id.replace('arena_','vqkd_'):aliases[id]??id
export const honorUiId=(code:string)=>code.startsWith('vqkd_')?code.replace('vqkd_','arena_'):Object.entries(aliases).find(([,value])=>value===code)?.[0]??code
