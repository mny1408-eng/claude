import json,os,base64,io
DIR=os.environ.get('DIR','.')
from PIL import Image
S='/tmp/claude-0/-home-user-claude/ef4d05e6-9bc0-537c-9bb9-b3f2e36eb7c0/scratchpad/'
import datetime
cut=(datetime.datetime.now(datetime.timezone.utc)+datetime.timedelta(hours=8)-datetime.timedelta(days=7)).strftime('%Y-%m-%d')
days=[d for d in json.load(open(DIR+'/days.json')) if d['date']>=cut]  # keep page light: last 7 days + upcoming
HT="#wedotransformations #kurusfitonlinecoaching #misifightobesiti"
for d in days:
    buf=io.BytesIO(); Image.open(f"{DIR}/posters/hari-{d['day']}.png").convert('RGB').save(buf,'JPEG',quality=92)
    d['img']='data:image/jpeg;base64,'+base64.b64encode(buf.getvalue()).decode()
    src = d.get("by") or ("James Clear, Atomic Habits" if DIR=="." and d['day']==1 else "James Clear")
    qline='' if src=='Coach Nas' else f'\n\n"{d["quote"]}" ({src})'
    d['caption']=f"Daily reminder 😃\n{d['intro']}\n\n{d['body']}\n\n👉 Tindakan hari ini: {d['action']}\n\nReply 💪 kalau awak dah buat ea.\n- Coach Nas{qline}\n\n{HT}"
html=open('page_template.html').read().replace('/*DATA*/[]',json.dumps(days,ensure_ascii=False))
open('index.html','w').write(html)
print(len(html))
