<template>
  <header class="globalnav globalnav--fixed" :class="{'is-loading':isLoading}">
    <div class="container">
      <router-link to="/index" class="globalnav__brand t-pull-left">知乎日报</router-link>
      <div class="globalnav__spinner">
       <img src="../assets/default.svg">
      </div>
      <ul class="globalnav__nav t-pull-right">
        <li class="globalnav__link" v-if="!host">
          <a href="#" @click.stop.prevent="toggleMenu(1)">登录</a>
          <div class="globalnav__menu globalnav__loginFormMenu">
            <loginForm @signIn="getHost"  :show="showLoginForm"></loginForm>
          </div>
        </li>

        <li class="globalnav__link" v-if="host">
          <router-link :to="{ path: '/user/' + host.loginname }" class="globalnav__avatar">
            <img :src="host.avatar_url">
          </router-link>
        </li>

        <li class="globalnav__link globalnav__link--withicon globalnav__notifies" v-if="host">
          <a href="#" :class="{ 'is-active': host.notifiesCount }"
             @click.stop.prevent="toggleMenu(2)">
            <i class="fa fa-envelope fa-lg" aria-hidden="true"></i>
          </a>
           <div class="globalnav__menu globalnav__notificationMenu">
             <Notification :show="showNotification"></Notification>
          </div>
        </li>

 	<li class="globalnav__link globalnav__link--withicon">
            <a href="#" @click.stop.prevent="toggleMenu(3)">
            <i class="fa fa-ellipsis-h fa-lg" aria-hidden="true"></i>
          </a>
          <div class="globalnav__menu">
            <transition name="menu-fade-slide">
               <div class="menu menu--arrowed moremenu" v-show="showMoreMenu">
                <ul>
                  <li>
                    <a href="https://cnodejs.org/" target="_blank">官网</a>
                  </li>
                  <li>
                    <a href="https://github.com/rebornchris/vue-cnode" target="_blank">项目地址</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click.stop.prevent="loginout">退出</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </li>

      </ul>
      <ul class="globalnav__nav">
        <slot></slot>
      </ul>
    </div>
  </header>
</template>

<script>
  import Tools from '../conf/tools';
  import loginForm from './LoginForm';
  import Notification from './Notification'
  import {user_pass,login_token} from '../conf/config'
export default {
data(){
  return{
    host:null,
    flag1:false,
    showLoginForm:false,
    showMoreMenu:false,
    showNotification:false
  };
},

props:{
  isLoading:{
    type:Boolean,
    default:false
  }
},

components:{
  loginForm,
  Notification
},

mounted(){

  this.getHost();


   document.documentElement.addEventListener('click', (event) => {
        let parent = event.target;
        let isInside = false;

        if (this.showNotification || this.showLoginForm || this.showMoreMenu) {
          let checkedClassName;

          if (this.showNotification) {
            checkedClassName = 'globalnav__notificationMenu';
          } else if (this.showLoginForm) {
            checkedClassName = 'globalnav__loginFormMenu';
          } else {
            checkedClassName = 'globalnav__moreMenu';
          }

          while (parent) {
            if (parent.classList && parent.classList.contains(checkedClassName)) {
              isInside = true;
              break;
            }
            parent = parent.parentNode;
          }

          if (!isInside) {
            if (this.showNotification) {
              this.showNotification = false;
            } else if (this.showLoginForm) {
              this.showLoginForm = false;
            } else {
              this.showMoreMenu = false;
            }
          }
        }
      }, false);
    },
    methods:{
      getHost(token,flag){
        this.flag1 = flag;
        if (token==='') {
          this.$message.error('不能为空');
          return;
        }
        const auth = Tools.getHost(token);
        auth.then((data)=>{
          this.host = data;
          if (typeof flag !== 'undefined') {
            this.$message.success('成功登录')
          }
          this.showLoginForm = false;
          setTimeout(()=>{
            this.$emit('ready',data);
          },1000);
        },(errorMsg)=>{
          this.host = null;
          this.$message.error("服务器错误");
          console.log(errorMsg)
        });
      },
      toggleMenu(type){
        switch(type){
          case 1: // loginForm
            this.showNotification = false;
            this.showMoreMenu = false;
            this.showLoginForm = !this.showLoginForm;
            break;
          case 2: // notification
            this.showLoginForm = false;
            this.showMoreMenu = false;
            this.showNotification = !this.showNotification;
            break;
          case 3: // moreMenu
            this.showNotification = false;
            this.showLoginForm = false;
            this.showMoreMenu = !this.showMoreMenu;
            break;
          default:
            return;
        }
      },
      loginout(){
        if(this.host!==null){
        this.host = null;
        this.$message.success("成功退出");
      //  window.location.reload();
        Tools.CookieUtil.set('token', '','');
        }else{
          this.$message.error('尚未登录')
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scopeds >
</style>
