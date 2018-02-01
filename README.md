主题：手机端安全键盘
===
技术依赖：
---
	框架：weex+vue <br>
	弹出层：weex-ui <br>
	图标：iconfont <br>
说明：
---
	1、如果不想用到weex-ui，可以把inputkey.vue文件里的wxc-popup组件去掉，按自己的弹窗实现即可； <br>
	2、删除、大小写、空格图标用的是iconfont;如不想用请自行替换; <br>
		本项目是放在本地，以安卓为例：android\app\src\main\assets\iconfont <br>
	3、密码可见、不可见图标按钮用的是commonUtil.js里的getImageUrl方法获取的路径，请自行替换 <br>

声明：
---
	如有需要，请参考实现的思路，消化成自己的东西，勿直接复制，会消化不良。 <br>
	![weexSafeKeyboard](https://github.com/kalakalaxyz/weexSafeKeyboard/images/weexSafeKeyboard.png)