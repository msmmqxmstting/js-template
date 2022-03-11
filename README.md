# 公司 React 项目初始脚手架模板

用于初始化 React 项目

# 框架技术

- `React17 `

- `Webpack5`

- `Babel7`

# 基本功能

- 多环境 `webpack` 打包配置， `webpack` 配置文件模块化
- `terser-webpack-plugin` 代码压缩
- 'dll' 打包,提升打包速度
- 'node_modules' 缓存检查及复用，bash 脚本

- 文件下载
- `eslint`代码规范
- `stylelint`、`prettier` 代码格式化
- `antd` 按需加载
- `git hooks`
- `less`样式，支持自定义主题
- `mobx` 状态管理
- 组件动态加载
- 热替换，提升开发体验
- 错误边界捕捉页面 
- 登录验证路由
- 单元测试
- `pdfjs`预览

# 使用或开发坏境配置

### 1、首先要设置registry

#### 方法1

`` npm config set registry http://verdaccio.office.gz`` 或者 ``npm run cfg``


#### 方法2

 在项目根目录新建 ``.npmrc 文件``， 写入内容``registry=http://verdaccio.office.gz``

> 推荐方法2， 无需在每个服务器设置 registry 

### 2、安装依赖(开发)

1） yarn

2） yarn dev

3） 浏览器打开http://localhost:port

# 生产坏境部署

### 本地电脑打包项目
 
 - `yarn build` //本地打包，会自动检查缓存的 node_modules 和 dll 包
 - `yarn build:test` //测试环境打包，设置环境变量，其他build:env类似
 

### Jenkins 或服务器打包项目

> 全局安装 hexin-tools `yarn global add hexin-tools`

> 若使用了 `yarn build`命令，则无需额外执行 命令:`hexin-tools`

> 关键：根据 `package.json`的 MD5值判断是否依赖发生改变，减少`build`的耗时。缓存所有依赖包和已打包的第三方库。

> 必须在项目根目录,新建文件`hexin-tools.config.js`,配置app的名称，用于区分缓存目录。

>运行 `hexin-tools` 则会检查依赖包、dll 包的缓存情况。


```

### 拷贝dist文件夹至服务器即可


# 分支管理规则

### 1、 dev 用于最新开发合并, master 用于最新生产部署, dev-uat 用于用户测试发布。

### 2、版本号命名的分支，如： v0.3 用于0.3版本的维护, 本地   v0.3分支 手动 build后生产环境部署。


# Q&A

 1、若提示找不到 Eslint 相关 module， 请根据实际情况全局安装；

 2、api 声明规则：微服务前缀 + 路径， 如：``/abs/url``。已知的微服务: ``abs、zdw、document``等。

 3、代理转发规则，`axios` 自动增加：``hxAuth ``前缀， 转发时去除该字符串即可。
 
 4、无法预览 PDF？
 
 	若使用了 PDFView  必须做 copy 操作
 	```js

 		new CopyWebpackPlugin([
 			{
 				from: 'node_modules/hx-pdfjs-dist/',
 				to: 'hx-pdfjs-dist/'
 			}
 		])*
```
5、(已失效)`Babel 6`下，若 `jest/jest-cli > 23.6.0`会报错，请保持 `jest-cli jest`版本;否则出错：


```php

   Plugin/Preset files are not allowed to export objects, only functions. In /Volumes/3tpar/develop-code/common-utils/hx-react-boilerplate/node_modules/babel-preset-react/lib/ImageViewer.js
      at createDescriptor (node_modules/@babel/core/lib/config/config-descriptors.js:178:11)
      at items.map (
```

6 `Babel7` 下，需要 `@babel/plugin-transform-modules-commonjs`解决生产模式下，`import 'style.less''`不生效的情况


# 脚本说明


		"cfg": "npm config set registry http://verdaccio.office.gz",
		"test": "echo \"Error: no test specified\" && exit 1",
		"dev": "cross-env NODE_ENV=development webpack-dev-server  --config webpack/dev.setup.js --hot",
		"clean": "rimraf dist/*",
		"analyz": "cross-env NODE_ENV=production:analyze npm_config_report=true npm run build",
		"build:check": "sh shell/check-node-modules.sh && sh shell/check-dlls.sh",
		"build": "npm run clean  && npm run build:check && webpack --config webpack/build.setup.js ",
		"dll": "npm run clean  && webpack --config webpack/dll.setup.js --mode production",
		"build:dll": "npm run dll && npm run build",
		"build:test": "cross-env NODE_ENV=production:test npm run build",
		"build:uat": "cross-env NODE_ENV=production:uat  npm run build",
		"build:prod": "cross-env NODE_ENV=production:prod npm run build",





# git 代码量化
```bash
git log --since="2020-01-01" --before="2020-12-31" --author="moxx" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "新增行数: %s, 移除行数: %s, 总行数: %s\n", add, subs, loc }'
```