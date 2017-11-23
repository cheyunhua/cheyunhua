/**
author:何国康
**/
前言
此文档是一般环境搭建和发布的简述
可参考http://www.cnblogs.com/wuac/p/6406843.html
1、前端框架一般都依赖nodejs,我们首先要安装node.js。请参考http://www.cnblogs.com/wuac/p/6381819.html。

2、由于许多npm的源都是在国外的地址，安装起来特别慢，所以我们这里利用淘宝的镜像服务器。

安装命令为：npm install -g cnpm --registry=https://registry.npm.taobao.org  之后回车等待命令

3、接着安装全局的vue-cli脚手架,用于帮助搭建所需的Vue的开发模板框架

命令为：cnpm install -g vue-cli，回车，等待安装

安装完后，可以输入vue -V，然后回车，如果出现vue的客户端版本信息，则说明安装成功了。

4、用 npm 安装 Webpack：cnpm install webpack -g

此时 Webpack 已经安装到了全局环境下，可以通过命令行 webpack -h 试试。

到这一步一般就搭建成功了
PS:如果是用webstorm开发的同学 有几个注意事项  （只针对idea和webstorem开发用户，eclipse没试过）
1) 在执行 cnpm install （简历node环境库） 之前 请找到 项目根目录里面的 .idea文件夹 里面的 wechat_wq_front.iml (wechat_wq_front是具体的文件控件名 不同项目不同，不过看名字就知道大概是哪个iml了)文件
   把
   <?xml version="1.0" encoding="UTF-8"?>
   <module type="WEB_MODULE" version="4">
     <component name="NewModuleRootManager">
       <content url="file://$MODULE_DIR$">
         <excludeFolder url="file://$MODULE_DIR$/node_modules" />
       </content>
       <orderEntry type="inheritedJdk" />
       <orderEntry type="sourceFolder" forTests="false" />
     </component>
   </module>
   覆盖进去文件，这句话的意思是 忽略 node_modules的索引建立和扫描。 因为这个库 里面的目录有好多级别，在windows里面追踪 高级数文件夹 为导致idea卡死
2) 如果是用git做版本控制软件开发  请在 根目录添加 一个 .gitignore的文件   里面添加一句 node_modules
   如果是svn做版本控制软件开发  请找到 Configure ignore Files 这个选项 把  node_modules文件夹标记为忽略 svn检索 找不到的同学 请百度
   这些操作的理由也是因为 node_modules 文件目录超级超级深 用版本控制软件 检索 容易会卡死 所以忽略掉

一、   一般操作步骤
1 cnpm install   (上面步骤已经操作过了 可忽略 )
建立node.js依赖环境
2 npm run dev
本地运行环境 这里默认会使用8011端口，如要修改端口 要修改
 1) src/api/config.js 里面的http://localhost:8011 为自己要的端口
 2) config/index.js   里面的 port: 8011
3 npm run build
打包生产环境 这里要注意的是  build这个是自定义的 这里设置为build是打  “生产包” 千万要注意
可以在 src/api/config.js  里面查看 baseURL  对应 process.env.NODE_ENV ==="production"
3 npm run buildtest
顾名思义  这就是打测试包  对应 process.env.NODE_ENV ==="test"
4 npm run buildpre
顾名思义  这就是打预生产包  对应 process.env.NODE_ENV ==="preproduction"

二、  文档结构

build :放置 webpack 需要的目录
package.json 用到的倚赖包  跟maven一样 填写对应的版本id 版本号 就会依赖到 node_module里面 或者用命令 npm install --save xxxx 也可以
config: 环境变量 配置对应的开发模式 和 打包时候的环境变量
node_modules: 具体依赖用到的包，也包括一大堆node原生的包
src:
 |api config.js  访问路径 发布时候 要确认清楚路径
 |api index.js   所有访问后台时的请求路径
 |api track.js   封装好的埋点（行为日志）工具类
assets:          放置 图片 css  字体 等静态文件
components:      基础组件
pages:           具体业务vue模版
router:          配置路由跳转地址
template:        单页模式的入口页面  http://xwfx.jchl.com/maidian.js  发布前也要确认 埋点地址是否有变化

三、 额外的插件和辅助
1 可以使用ESLint 进行语法检验
2 http://blog.csdn.net/Dcatfly/article/details/53123318 进行ES6语法的配置和高亮
3 System Settings  File saves auto 不要勾选（勾选了就会自动保存，这个跟node的机制有冲突）
  还是建议ctrl +s 进行确认保存 ，保存的时候没有任何的loading界面 但其实已经生效了。
