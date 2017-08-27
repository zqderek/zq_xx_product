# zq_xx_product
## 如何使用
- 安装依赖：`npm install`
- 修改zq_nginx.conf 第7行 为你本地项目绝对路径（我的为 /Users/zhangqing/Documents/github/zq_xx_product/www）
- 将zq_nginx.conf 导入到nginx servers 下 （cp zq_nginx.conf /usr/local/etc/nginx/servers）启动nginx（sudo nginx）
- 编译项目并启动服务：`npm run watch`
- 在地址栏输入 `http://localhost:8881` 即可访问；如果想更换端口可直接修改zq_nginx.conf 文件 然后重启（sudo nginx -s reload）
- 开发阶段运行 `npm run watch` ，可以监控文件变动，自动重新webpack编译。

## 代码结构
