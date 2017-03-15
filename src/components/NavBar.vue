<template>
  <header class="globalnav globalnav--fixed">
    <div class="container">
      <router-link to="/" class="globalnav__brand t-pull-left">CNode</router-link>
      <div class="globalnav__spinner">
        <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
          <path fill="#00a9e8" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" transform="rotate(222 50 50)">
           <animateTransform attributeName="transform"
                             attributeType="XML" type="rotate" dur="0.5s"
                             from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
          </path>
        </svg>
      </div>
      <ul class="globalnav__nav t-pull-right">
        <li class="globalnav__link">
          <a href="#" >Login</a>
          <div class="globalnav__menu globalnav__loginFormMenu">
            <!-- <loginForm ></loginForm> -->
          </div>
        </li>

 	<li class="globalnav__link globalnav__link--withicon">
          <a href="#" >
            <i class="fa fa-caret-down fa-lg" aria-hidden="true"></i>
          </a>
          <div class="globalnav__menu">
            <transition name="menu-fade-slide">
              <div class="menu menu--arrowed moremenu" >
    <!--             <ul>
                  <li>
                    <a href="https://cnodejs.org/" target="_blank">真·官网</a>
                  </li>
                  <li>
                    <a href="https://github.com/jiananle/vue-cnode" target="_blank">项目地址</a>
                  </li>
                  <li>
                    <a href="https://jiananle.github.io/vue-cnode" target="_blank">预览</a>
                  </li>
                </ul> -->
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
export default {
}
</script>

<style rel="stylesheet/scss" lang="scss" scopeds >
</style>
