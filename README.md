<div align="center">
  <h1 align="center">
    Lunova Studio 文档库
    <br/>
    <br/>
    <a href="https://docs.lunova.studio/">
      <img src="https://s21.ax1x.com/2025/02/08/pEmlhi6.png" alt="Wikiblo.png" border="0"/>
    </a>
  </h1>
</div>

本网站使用 Docusaurus 构建，这是一款现代化的静态网站生成器

### 安装

```sh
yarn
```

### 本地开发

```sh
yarn start
```

此命令会启动一个本地开发服务器，并打开一个浏览器窗口。大多数更改会实时反映出来，无需重启服务器

### 构建

```sh
yarn build
```

此命令会将静态内容生成到 build 目录中，并且可以使用任何静态内容托管服务进行部署

### 部署

使用 ssh

```sh
USE_SSH=true yarn deploy
```

不使用 ssh

```sh
GIT_USER=<你的 GitHub 用户名> yarn deploy
```
