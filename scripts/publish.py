#!/usr/bin/env python3
"""用法: python3 scripts/publish.py path/to/day.json
将当日 JSON 写入 data/<date>.json，复制为 data/latest.json，并更新 data/index.json（日期倒序）。"""
import json, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent / "data"
root.mkdir(exist_ok=True)
d = json.load(open(sys.argv[1], encoding="utf-8"))
date = d["date"]
out = json.dumps(d, ensure_ascii=False, indent=2)
(root / f"{date}.json").write_text(out, encoding="utf-8")
(root / "latest.json").write_text(out, encoding="utf-8")
idx_p = root / "index.json"
idx = json.loads(idx_p.read_text(encoding="utf-8")) if idx_p.exists() else []
idx = sorted(set(idx) | {date}, reverse=True)
idx_p.write_text(json.dumps(idx, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"published {date}; archive has {len(idx)} days")
