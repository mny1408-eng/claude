import json,os
DIR=os.environ.get('DIR','.')
HT="#wedotransformations #kurusfitonlinecoaching #misifightobesiti"
out=["# Caption harian (copy paste)\n"]
for d in json.load(open(DIR+'/days.json')):
    src = d.get("by") or ("James Clear, Atomic Habits" if DIR=="." and d['day']==1 else "James Clear")
    qline='' if src=='Coach Nas' else f'\n\n"{d["quote"]}" ({src})'
    out.append(f"## {os.environ.get('LABEL','Hari')} {d['day']} ({d['date']}) · {d['tema']}\n\nDaily reminder 😃\n{d['intro']}\n\n{d['body']}\n\n👉 Tindakan hari ini: {d['action']}\n\nReply 💪 kalau awak dah buat ea.\n- Coach Nas{qline}\n\n{HT}\n")
open(DIR+'/caption-harian.md','w').write("\n".join(out))
