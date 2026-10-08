import json,base64,io
from PIL import Image
S='/tmp/claude-0/-home-user-claude/ef4d05e6-9bc0-537c-9bb9-b3f2e36eb7c0/scratchpad/'
days=json.load(open('days.json'))
HT="#wedotransformations #kurusfitonlinecoaching #misifightobesiti"
for d in days:
    buf=io.BytesIO(); Image.open(f"posters/hari-{d['day']}.png").convert('RGB').save(buf,'JPEG',quality=92)
    d['img']='data:image/jpeg;base64,'+base64.b64encode(buf.getvalue()).decode()
    src = "James Clear, Atomic Habits" if d['day']==1 else "James Clear"
    d['caption']=f"Daily reminder 😃\n{d['intro']}\n\n{d['body']}\n\n👉 Tindakan hari ini: {d['action']}\n\nReply 💪 kalau awak dah buat ea.\n- Coach Nas\n\n\"{d['quote']}\" ({src})\n\n{HT}"
html=open('page_template.html').read().replace('/*DATA*/[]',json.dumps(days,ensure_ascii=False))
open('index.html','w').write(html)
print(len(html))
