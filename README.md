# x-hot-posts

## X 热帖日报

站点：https://mcwt.github.io/x-hot-posts/ （纯静态，无构建步骤：`index.html` + `style.css` + `app.js`，读取 `data/`）

### 数据格式
`{"date":"YYYY-MM-DD","generated_at":"... 北京时间","window":"过去48小时","categories":[{"name":"政治","items":[{"rank":1,"title":"...","url":"...","author":"@...","likes":123,"summary":"..."}]}]}`

### 发布新一天
```bash
python3 scripts/publish.py /path/to/YYYY-MM-DD.json   # 写入 data/<date>.json、latest.json，更新 index.json
git add data && git commit -m "data: YYYY-MM-DD" && git push
```
