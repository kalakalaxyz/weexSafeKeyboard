<template>
	<div>
		<div>
			<div style="flex-direction:row;position:relative;" :style="inputstyle" @click="onfocus">
				<text class="placeholder" v-if="blank">{{placeholder}}</text>
				<text v-if="type"  :style="textstyle">{{passwordInput}}</text>
				<text v-if="!type"  :style="textstyle">{{input}}</text>
				<text v-if="cursor=='true'" :style="mrTextstyle" style="color:blue;">|</text>
				<div class="imagearea" @click="lookPwd">
					<image :src="imageUrl" class="image"></image>
				</div>
			</div>
		</div>
		<wxc-popup popup-color="#fff"
               :show="isBottomShow"
               @wxcPopupOverlayClicked="popupMenu"
               pos="bottom"
               :height="popupHeight">
            <div class="title">
            	<div class="btn" @click="changeState('abc')">
            		<text>Abc</text>
            	</div>
            	<div class="btn" @click="changeState('symbol')">
            		<text>符</text>
            	</div>
            	<div class="btn" @click="changeState('num')">
            		<text>123</text>
            	</div>
            	<div class="btn2" @click="randomAbc">
            		<text>安全键盘</text>
            	</div>
            	<div class="btn" @click="popupMenu">
            		<text>完成</text>
            	</div>
            </div>
            <div class="content">
				<div class="row" v-for="item in charList" v-if="state == 'abc'">
					<div class="button" v-for="ite in item" @click="ite=='top'?lowerToUpper(): btnClick(ite)">
						<text v-if="ite === 'top'" style="fontFamily:iconfont;color:red;" v-bind:style="{backgroundColor:charState=='lower'?'':'#999999'}">&#xe685;</text>
						<text v-else-if="ite === 'blank'" style="fontFamily:iconfont;color:red;">&#xe66e;</text>
						<text v-else-if="ite === 'del'" style="fontFamily:iconfont;color:red;">&#xe629;</text>
						<text v-else>{{ite}}</text>
					</div>
				</div>
				<div class="row" v-for="item in symbolList" v-if="state == 'symbol'">
					<div class="button" v-for="ite in item" v-bind:style="{flex:ite==='blank'?6:1}" @click="btnClick(ite)">
						<text v-if="ite === 'blank'" style="fontFamily:iconfont;color:red;">&#xe66e;</text>
						<text v-else-if="ite === 'del'" style="fontFamily:iconfont;color:red;">&#xe629;</text>
						<text v-else>{{ite}}</text>
					</div>
				</div>
				<div class="row" v-for="item in numList" v-if="state == 'num'">
					<div class="button" v-for="ite in item" v-bind:style="{flex:ite==='blank'?6:1}" @click="btnClick(ite)">
						<text v-if="ite === 'blank'" style="fontFamily:iconfont;color:red;">&#xe66e;</text>
						<text v-else-if="ite === 'del'" style="fontFamily:iconfont;color:red;">&#xe629;</text>
						<text v-else>{{ite}}</text>
					</div>
				</div>
			</div>
		</wxc-popup>
		
	</div>
</template>
<style>
.placeholder{color:#999999;font-size:36px;}
.title{flex-direction:row;justify-content:space-between;align-items:center;padding:10px;border-bottom-width:1px;}
.btn{height:70px;flex:1;align-items:center;justify-content:center;}
.btn2{height:70px;flex:4;align-items:center;justify-content:center;}
.content{padding-top:10px;padding-left:10px;}
.row{flex-direction:row;}
.button{height:65px;border-width:1px;flex:1;justify-content:center;align-items:center;margin-right:10px;margin-bottom:10px;padding-top:10px;padding-bottom:10px;}
.button:active{background-color: #999999;}
.image{width:48px;height:32px;}
.imagearea{width:48px;height:32px;position:absolute;top:9px;right:0;}
</style>
  
<script>
import commonUtil from '../common/commonUtil';
import { WxcPopup } from 'weex-ui';
var domModule = weex.requireModule('dom');
export default {
	props: {
		inputstyle:Object,
		textstyle:Object,
		type:{
	        type: Boolean,
	        default: true
      	},
      	placeholder:{
      		type: String,
	        default: '请输入密码'
      	}
	},
	components: {WxcPopup},
	data: function(){
		return {
			input:'',
			passwordInput:'',
			char: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
			charInit: [],
			symbolList: [
				['&','"',';','^',',','|','$','*',':','\''],
				['?','{','[','~','#','}','.',']','\\','!'],
				['(','%','-','_','+','/',')','=','<','`'],
				['>','@','blank','del']
			],
			num:['1','2','3','4','5','6','7','8','9','0'],
			numInit:[],
			charRandom:'0',
			numRandom:'0',
			state:'abc',
			charState:'lower',
			isBottomShow:false,
            popupHeight:'400',
            cursor:'',
            interval:'',
            blank:true,
            imageUrl:''
		}
	},
	created: function () {
		var self = this;
		self.charInit = commonUtil.copy(self.char,'deep');
		self.numInit = commonUtil.copy(self.num,'deep');
		domModule.addRule('fontFace',{
            'fontFamily':'iconfont',
            //调用本地ttf
            'src':"url('local:///iconfont/iconfont.ttf')" 
        });
        self.imageUrl=commonUtil.getImageUrl(self)+'login/bukejian.png';
	},
	methods:{
		onfocus(){
			var self = this;
			self.blank = false;
			this.interval = setInterval(function() {
				if(self.cursor == 'true'){
					self.cursor = ''
				}else{
					self.cursor = 'true'
				}
			},500);
			this.isBottomShow = true;
		},
		popupMenu(){
			clearInterval(this.interval);
			this.cursor = '';
            this.isBottomShow = false;
            this.$emit('inputVal', { inputVal: this.input });
            if(!this.input){
            	this.blank = true;
            }
        },
		randomArr(arr, name, init){
			var self = this;
			if(Array.isArray(arr)){
				if(self[name] == '0'){
					self[name] = '1';
					return arr.sort(function() {
					    return (0.5-Math.random());
					});
				}else{
					self[name] = '0';
					self.charState = 'lower';
						return commonUtil.copy(self[init],'deep');
				}
			}else{
				return arr;
			}
		},
		randomAbc(){
			var self = this;
			if(this.state == 'abc'){
				this.char = this.randomArr(this.char, 'charRandom', 'charInit');
			}else if(this.state == 'num'){
				this.num = this.randomArr(this.num, 'numRandom', 'numInit');
			}	
		},
		lowerToUpper(){
			var self = this;
			var arr = [];
			for(var i=0;i<self.char.length;i++){
				if(self.char[i] >= 'a' && self.char[i] <= 'z'){
					arr[i] = self.char[i].toUpperCase();
					self.charState = 'upper';
				}else{
					arr[i] = self.char[i].toLowerCase();
					self.charState = 'lower';
				}
			}
			self.char = arr;
		},
		btnClick(ite){
			if(ite == 'blank'){
				this.input += ' '
				this.passwordInput += '*'
			}else if(ite == 'del'){
				this.input = this.input.slice(0,this.input.length -1);
				this.passwordInput = this.passwordInput.slice(0,this.passwordInput.length -1)
			}else{
				this.input += ite;
				this.passwordInput += '*'
			}
		},
		changeState(state){
			this.state = state;
		},
		lookPwd(){
			var self = this;
			this.isBottomShow=false;
			this.type=!(this.type);
			self.imageUrl=commonUtil.getImageUrl(self)+(self.type?'login/bukejian.png':'login/kejian.png');

		}
	},
	computed: {
        charList () {
            var self = this;
            var arr = [];
            arr[0] = ['1','2','3','4','5','6','7','8','9','0',];
        	arr[1] = self.char.slice(0,10);
        	arr[2] = ['top'].concat(self.char.slice(10,19));
        	arr[3] = ['blank'].concat(self.char.slice(19,26)).concat(['del']);
        	return arr;
        },
        numList(){
        	var self = this;
        	var arr = [];
        	arr[0] = self.num.slice(0,3);
        	arr[1] = self.num.slice(3,6);
        	arr[2] = self.num.slice(6,9);
        	arr[3] = ['.'].concat(self.num.slice(9,10)).concat(['del']);
        	return arr;
        },
        mrTextstyle(){
        	const {textstyle} =this;
        	const mrBtnStyle = {
	          	...textstyle, color: "blue"
	        };
	        return mrBtnStyle;
        }
    }
}
</script>