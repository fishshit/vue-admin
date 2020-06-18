<template>
    <div id="login">
        <div class="login-warp">
            <ul class="menu-tab">
                <li v-for="item in menutab"  :class="{'current':item.current}" :key="item.id" @click="toggleMneu(item)">{{item.txt}}</li>
            </ul>
            <!--表单start-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
            <el-form-item prop="userName" class="item-form">
                <label for="userName">邮箱</label> 
                <el-input id="userName" type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="passWord" class="item-form">
                <label>密码</label>
                <el-input type="password" v-model="ruleForm.passWord" autocomplete="off" minlength="6" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="passWords" class="item-form" v-if="model === 'register'">
                <label>重复密码</label>
                <el-input type="password" v-model="ruleForm.passWords" autocomplete="off" minlength="6" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item prop="vCode" class="item-form">
                <label>验证码</label>
                <el-row :gutter="10">
                    <el-col :span="16">
                        <el-input v-model.number="ruleForm.vCode" maxlength="6"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="success" @click="getSms()" class="block">获取验证码</el-button>
                    </el-col>
                </el-row>
                
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submitForm('ruleForm')" class="login-bth block" :disabled="loginButtonStatus">{{model === 'login' ? "登陆" : "注册"}}</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { GetSms } from "@/api/login";
import { reactive,ref,onMounted } from '@vue/composition-api';
import {validatepassWord,validateEmail,validatevCode} from '@/utils/validate';
    export default{
        name:'login',
        setup(props,{refs,root}){
            //用户名
            let validateuserName = (rule, value, callback) => {
                
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else if(!validateEmail(value)){
                    callback(new Error("邮箱格式有误"));//true;
                }else{
                    callback();
                }
            };
            //密码
            let validatePass = (rule, value, callback) => {
                if (value === '') { 
                    callback(new Error('密码不能为空'));
                }else if(!validatepassWord(value)) {
                    callback(new Error('密码为6~20位字母+数字组合'));
                }else{
                    callback();
                }
            };
            let validatePasss = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                }else if(value!=ruleForm.passWord) {
                    callback(new Error('重复密码不正确'));
                }else{
                    callback();
                }
            };
            //验证码
            let validdatevCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                }else if(!validatevCode(value)) {
                    callback(new Error('请输入正确的验证码'));
                }else{
                    callback();
                }
            };


            //对象类型的数据用reactive声明
            const menutab = reactive([
                {txt:'登陆',current:true,type:'login'},
                {txt:'注册',current:false,type:'register'}
            ])
            //模块值
            const ruleForm=reactive({
                userName: '',
                passWord: '',
                passWords:'',
                vCode: ''
            })
            //表单验证
            const rules=reactive({
                userName: [
                    { validator: validateuserName, trigger: 'blur' }
                ],
                passWord: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passWords: [
                    { validator: validatePasss, trigger: 'blur' }
                ],
                vCode: [
                    { validator: validdatevCode, trigger: 'blur' }
                ]
            })
            //基础类型的数据用ref声明
            const model = ref('login');
            //登陆按钮禁用状态
            const loginButtonStatus = ref(true);

            //声明函数采用es6箭头函数的方式
            const toggleMneu=(data=>{
                menutab.forEach(elem => {
                    elem.current = false;
                })
                data.current = true;
                model.value=data.type;//绑定属性到重复校验处进行是否显示判断。
            })
            /**
             * 获取验证码
             */
            const getSms=(()=>{
                /*if(ruleForm.userName === ''){
                    root.$message.error("邮箱不能为空");
                    return false;
                }*/

                let data={
                    username:ruleForm.userName,
                }
                GetSms(data).then(response=>{

                }).catch(error=>{
                    console.log(error);
                })
            })
            /**
             * 提交表单 
             */
            const submitForm=(formName=>{

                refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }) 
            //生命周期
            onMounted(()=>{
                
            })
            //需要用的模块、方法要用return丢出去
            return{
                menutab,
                model,
                toggleMneu,
                submitForm,
                ruleForm,
                rules,
                getSms,
                loginButtonStatus
            }
        },
    }
</script>
<style lang="scss" scope>
    #login{
        height:100vh;
        background-color:#344a5f;
        
    }
    .login-warp{
        width:330px;
        margin:auto;
        position:relative;
        top:20vh;
    }
    .menu-tab{text-align:center;
        li{
            display:inline-block;
            width:88px;
            line-height:36px;
            font-size:14px;
            color:#fff;
            border-radius:2px;
            cursor:pointer;
        }
        .current{
            background-color:rgba(0,0,0,.1)
        }
    }
    .login-form{
        margin-top:28px;
        label{
            font-size:14px;
            display:block;
            color:#fff;
        }
        .item-from{
            margin-bottom:14px;
        }
        .block{
            display:block;width:100%;
        }
        .login-bth{

        }
    }
</style>