import json
HT="#wedotransformations #kurusfitonlinecoaching #misifightobesiti"
out=["# Caption harian (copy paste)\n"]
for d in json.load(open('days.json')):
    src="James Clear, Atomic Habits" if d['day']==1 else "James Clear"
    out.append(f"## Hari {d['day']} ({d['date']}) · {d['tema']}\n\nDaily reminder 😃\n{d['intro']}\n\n{d['body']}\n\n👉 Tindakan hari ini: {d['action']}\n\nReply 💪 kalau awak dah buat ea.\n- Coach Nas\n\n\"{d['quote']}\" ({src})\n\n{HT}\n")
open('caption-harian.md','w').write("\n".join(out))
