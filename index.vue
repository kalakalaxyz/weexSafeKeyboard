<template>
	<div>
        <div class="cell">
            <div class="cell_label">
                <text class="label">密码</text>
            </div>
            <div class="cell_input">
            	<inputkey @inputVal="inputVal" :inputstyle="inputstyle" :textstyle="textstyle" type=true placeholder="请输入登录密码"></inputkey>
            </div>
        </div>
	</div>
</template>
<style>
.cell {width: 750px;height: 120px;border-bottom-width: 2px;border-bottom-color: #C9C5C4;flex-direction: row;align-items: center;justify-content: center;}
.cell_label {justify-content: center;align-items: center;}
.label{font-size: 34px;font-weight: 600px;color:#000;}
.cell_input {justify-content: center;align-items: center;margin-left: 30px;}
</style>
<script>
import inputkey from './components/inputkey.vue';
export default {
	data: {
		inputstyle:{width:'550px',height:'50px',margin:'5px',fontSize:'36px'},
		textstyle:{fontSize:'34px',fontWeight:'600',color:'#999'},
		password:'',
	},
	components: {
		inputkey
	},
	created: function () {
	},
	methods:{
		inputVal(e){
			this.password = e.inputVal;
		}
	}
}
</script>