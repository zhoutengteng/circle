# circle
1.	bower_components/
nodejs安装bower后，用bower安装bootstrap和less（后面未使用）和jquery
2.	config/
config.js 配置端口，和可能的全局配置
dbconfig.js 连接mysql数据库的必要设置文件，方便使用数据库操作的时候，更方便
3.	db/
complex.js为从客户端post到来的”top10“和“最新动态”拉取数据，里面数据库中的多个表的操作
file.js 文件目录表操作，待做
issue.js 评论表操作，存放对应每个用户对条目的评论信息
item.js 条目表操作，用户发起的条目，都保存在这个表中
mysql.db 这是mysql的数据库原型语句，可以直接生成mysql数据库表
pic.js 图片表操作，存放图片的目录，存的是base64
user.js 用户表操作，记录用户的信息，用户的新建，登录验证等等
readme.txt
4.	lib/
这是jquery插件库，只用到了上传图片的界面UI文件，上传功能为自己手写
5.	node_modules/
nodejs下载的本地模块，可在package.json找到
6.	public/
λ	css/
基本没用到自己的css，留下这个可以扩展自己喜欢的样式
λ	js/
	circle_edit.js
	对应用户发起的条目的js文件，负责提交
	detail.js
	用户浏览其他的问的条目对应的前端文件的js文件，负责拉取题目信息和提
   交评论
	edit.js
   多余文件
	header.js
	处理网页最顶层对应的用户退出和触发那些用户发起条目的链接
	index.js
	项目主页的展示信息
	modify.js
	用户浏览自己发起的条目的时候，会渲染的modify.jade,包括的modify.js文件负责提交更新条目。
	profile.js
	负责拉取最新动态，个人动态和top10等
	signin.js
	负责登录验证
	signup.js
负责注册验证
	readme.txt
λ	public/
	views/ 视图
		includes/ 一些公用的模板
				footer.jade 网页脚部，未加，可能以后加
				head.jade 网页头部引用的样式和js
				header.jade 网页头部视图
				header_only.jade 网页头部的缩减视图
				readme.txt
		circle_edit.jade 编辑用户发起条目的视图
		detail.jade 用户浏览其他人条目的视图
		edit.jade 未使用
		index.jade 项目主页的视图
		layout_header_only.jade 引用模板的模板文件
		layoutBasic.jade 引用模板的模板文件
		modify.jade 用户修改自己发起的条目的视图文件
		profile.jade 用户主页浏览条目的信息界面
		signin.jade 登录界面
		signnp.jade 注册界面
		welcome.jade未使用，忽略
		readme.txt
λ	router/
		circle_edit.js 对用户提交条目的路由处理
		detail.js 对用户查看条目和用户评论的处理
		edit.js 未使用
		index.js 对主页的路由处理
		logout.js 对用户退出的路由处理
		profile.js 对用户主浏览页的路由处理
		signin.js 对用户登录的路由处理
		signup.js 对用户注册的路由处理
		validate.js 对路由进行中间操作的路由处理，可拦截，（用与安全信息）
		welcome.js 未使用
		filter.js 未使用	
λ	app.js
对项目的启动文件
λ	package.json
nodejs包文件
	README.md
