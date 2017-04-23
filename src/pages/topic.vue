<template>
  <div class="page">
    <GlobalNav @ready="ready"></GlobalNav>
    <ActionBtn :host="host"></ActionBtn>
    <div class="page__main">
      <div class="container">
        <div v-if="article">
          <VC-Article :article="article">
          
          </VC-Article>
          <Comments :comments="article.replies">
          
          </Comments>
        </div>
        <div class="page__feedback" v-else-if="article===undefined">
          文章不存在, {{ time }} 秒后跳转至首页
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { API } from '../conf/config';
  import Tools from '../conf/tools';  
  import GlobalNav from '../components/NavBar';
  import Article from '../components/Article';
  import Comments from '../components/Comments';
  import ActionBtn from '../components/ArticleButton';
  export default {
    data() {
      return {
        isLoading: false,
        time: 3, // 没有数据时跳转至首页的时间
        host: null,
        topicId: 0,
        article: null,
        collectState: 0, // 0(隐藏该功能) | 1(已收藏) | 2(没有收藏)
        editState: false // 是否可对文章编辑
      };
    },

    mounted() {
      this.init();
    },

    watch: {
      // 如果路由有变化，会再次执行该方法
      $route() {
        this.init();
      },

    
    },

    components: {
      GlobalNav,
      'VC-Article': Article,
      Comments:Comments,
      ActionBtn
      // PageLoading
      
    },

    methods: {
      ready(data) {
        this.host = data;
      },

      init() {
        this.isLoading = true;
        console.log("is loading")
        const path = this.$route.path;
        this.topicId = path.substring(path.lastIndexOf('/') + 1);

        this.fetchData(this.topicId, this.host && this.host.accesstoken).then((data) => {
          this.article = data;

          if (this.host) {
            this.collectState = data.is_collect ? 1 : 2;
            // 是否可以编辑
            // todo 判定条件是否可以更严格
            this.editState = this.host.loginname === this.article.author.loginname;
          } else {
            this.collectState = 0;
            this.editState = false;
          }

          this.isLoading = false;
                  console.log("loaded")

        }, () => {
          this.isLoading = false;
                  console.log("loaded")

          const timer = setInterval(() => {
            if (this.time === 0) {
              clearInterval(timer);
              this.$router.push({ path: '/' });
              return;
            }

            this.time -= 1;
          }, 1000);
        });
      },

      fetchData(topicId, accesstoken) {
        return new Promise((resolve, reject) => {
          this.$http
              .get(API.topic + topicId + (accesstoken ? `?accesstoken=${accesstoken}` : ''))
              .then((response) => {
                const data = response.data;

                if (data.success) {
                  resolve(data.data);
                } else {
                  reject(data.error_msg);
                }
              }, () => {
                reject();
              });
        });
      },

    }
  }
</script>

<style lang="">
  .dddd{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    width:200px;
    height:200px;
    background-color:black;
  }
</style>