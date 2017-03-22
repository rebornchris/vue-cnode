<template>
  <div class="page">
      <GlobalNav @ready = 'ready'></GlobalNav>
      <div class="page-main">
        <div class="container">
        <div v-if='article'>
          <VC-Article :article='article'>
          </VC-Article>
        </div>
        </div>
      </div>
  </div>
</template>
<script>
import { API } from '../conf/config';
import Tools from '../conf/tools';
import Article from '../components/Article';
import GlobalNav from '../components/NavBar';
// import Comments from '../components/Comments';
// import PageLoading from '../components/PageLoading';
// import ActionBtn from '../components/ActionButton';

export default {
  data(){
    return{
      host: null,
      topicId: 0,
      article: null,
      collectState:0, //0(hidden)||1(收藏)||2(未收藏)
      editState:false,
      time:3
    };
  },

  mounted(){
    this.init();
  },

  watch: {
    $route() {
      this.init();
    },

    // host(newVal){
    //   if(newVal){

    //   }
    // }
  },
  components:{
    GlobalNav,
    'VC-Article':Article,
    // Comments:Comments
  },

  methods: {
    ready(data) {
      this.host = data;
    },

    init() {
      // this.isLoading = true;
      const path = this.$route.path;
      this.topicId = path.substring(path.lastIndexOf('/') + 1);
      this.fetchData(this.topicId,this.host && this.host.accesstoken).then((data) => {
        this.article = data;
        if(this.host){
          this.collectState = data.is_collect ? 1: 2;
          this.editState = this.host.loginname === this.article.author.loginname;
        } else{
          this.collectState = 0;
          this.editState = false;
        }

        this.isLoading = false;
      }),()=>{
        this.isLoading = false;
      }
    },

    fetchData(topicId,accesstoken){
      return new Promise((resolve,reject) => {
        this.$http
            .get(API.topic + topicId + (accesstoken ? `?accesstoken=${accesstoken}` : ''))
            .then((response) =>{
              const data = response.data;

              if(data.success){
                resolve(data.data)
              }else{
                reject(data.error_msg);
              }
            }, ()=>{
              reject();
            });
      });
    },

    // handleCollect(cb) {
    //   if(!this.collectState || !this.host) return;

    //   const url = this.collectState === 1? API.collect : API.decollect;

    //   const params = {
    //     accesstoken: this.host.accesstoken,
    //     topic_id: this.topicId
    //   };

    //   this.$http
    //           .post(url,params)
    //           .then((response) =>{
    //             const data = response.data;

    //             if(data.success){
    //              this.collectState = this.collectState === 1 ? 2 : 1;
    //             }else{
    //              this.$message.error(data.error_msg);
    //             }

    //             typeof cb === 'function' && cb(this.collectState);
    //           },(reject) => {
    //             Tools.handleAjaxError(reject, this);
    //           });
    // },

    // handleUps(id, callback){
    //   if(!this.host) return;

    //   this.$http
    //           .post(`${API.replyUps}${id}/ups`, { accesstoken: this.host.accesstoken })
    //           .then((response)=>{
    //             const data = response.data;

    //             if(data.success){
    //               typeof callback === 'function' && callback(data)
    //             }
    //           },(reject) => {
    //             Tools.handleAjaxError(reject,this)
    //           });
    // },

  }
}
</script>

<style lang="css">
</style>
