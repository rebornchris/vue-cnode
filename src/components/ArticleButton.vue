<template>
<div>
    <div class="action-btn" 
         @mouseenter="mouseenter"
         @mouseleave="mouseleave">
     <a @click='backToTop' class="action-btn__link action-btn__plus">
        <img src="../assets/img/cross.png" alt="">
      </a>
       <ul>
        <li v-if="this.$route.name ==='topic'">
          <a href="#" class="tooltips tooltips--left action-btn__link action-btn__reply" aria-label="回复"
             @click.prevent="toggleModal('reply')">
            <i class="fa fa-reply fa-lg" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="#" class="tooltips tooltips--left action-btn__link action-btn__post" aria-label="发布文章"
             @click.prevent="toggleModal('post')">
            <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="modal-container">
    <reply v-if="showReplyModal" @close='closeModal()' ></reply>
    </div>
    </div>
</template>

<script>
import reply from '../components/replymodel'
    export default{
        data(){
            return{
                test:false,
                showReplyModal:false,
                showPostModal:false
            }
        },

        components:{
          reply
        }
,
        methods:{
            mouseenter() {
        this.$el.firstChild.classList.add('is-active');
      },

      backToTop(){
      let speed = 0;
      let interval = setInterval(()=>{
      let ran = Math.random();
      speed +=ran;
      document.body.scrollTop-=speed*10
      if(document.body.scrollTop<1)
      clearInterval(interval);
     },10)
      },
        
      mouseleave() {
        this.$el.firstChild.classList.remove('is-active');
      },

      toggleModal(type){
        if(type==='reply'){
          this.showReplyModal = true;

        }

      },

      closeModal(type,cb){
        if(type==='reply'){
          this.showReplyModal = false;
        }
        if(typeof cb === 'function' && cb()){

        }
      }
    }
    }
</script>