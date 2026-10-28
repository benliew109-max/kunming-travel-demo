# 行有序 · 昆明 AI 旅行 Demo

昆明三日慢游的可交互产品原型，支持桌面与手机。

## 功能

- 三日行程、地点编辑、锁定预约、局部调整与撤销。
- AI 智能体 Tab、快捷提问、旅行偏好、行程总结。
- 文字攻略识别、图片本地预览和行程 JSON 导出。

这是纯静态演示，不需要服务器、数据库或 API 密钥。智能体回复采用本地规则，地图、费用、时间、步数和天气均非实时服务，不能替代真实导航、预约或预订。浏览器中的行程与对话仅本地保存；不同设备和域名之间不自动同步。

## 本地预览

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

访问 `http://127.0.0.1:8765/`。

## 自动部署

仓库默认分支使用 `main`。在 Settings → Pages → Build and deployment 中选择 GitHub Actions。提交后，`.github/workflows/pages.yml` 会校验交互并部署；网站地址由成功的部署任务输出。仓库名称与所有者确定后，可在 GitHub 的 Pages 设置查看固定体验地址。

工作流按 [GitHub Pages 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 配置。发布产物仅包含网页及必要素材，不包含研究文档、截图、测试脚本或仓库配置。

## 验证

安装 Node.js 后运行：

```sh
node scripts/check-demo.cjs
```

界面素材按本项目提供的组件规范引用；此仓库不额外授予第三方素材的再分发许可。
