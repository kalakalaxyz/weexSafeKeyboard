主题：手机端安全键盘
===

[segmentfault详解](https://segmentfault.com/a/1190000013109794)  

技术依赖：
---
	框架：weex+vue  
	弹出层：weex-ui  
	图标：iconfont  
说明：
---
	1、如果不想用到weex-ui，可以把inputkey.vue文件里的wxc-popup组件去掉，按自己的弹窗实现即可；  
	2、删除、大小写、空格图标用的是iconfont;如不想用请自行替换;  
		本项目是放在本地，以安卓为例：android\app\src\main\assets\iconfont  
	3、密码可见、不可见图标按钮用的是commonUtil.js里的getImageUrl方法获取的路径，请自行替换  

声明：
---
	如有需要，请参考实现的思路，消化成自己的东西，勿直接复制，会消化不良。 </br>
	[![weexSafeKeyboard](https://raw.githubusercontent.com/kalakalaxyz/weexSafeKeyboard/master/images/weexSafeKeyboard.png)]
