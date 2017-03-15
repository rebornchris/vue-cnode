<template lang="html">
  <div class="page">
  <Door :state='doorState' @ready = 'doorIsReady'></Door>
   <NavBar @ready = 'ready' :isLoading = 'isLoading'>
   	<li class="globalnav__link" :class = "{'is-active': currenTpye === n.tag}" v-for= 'n in navs'>
   		<a href="#" @click.prevent = 'selectNav(n.tag)'>{{ n.name }}</a>
   	</li>
   </NavBar>
    <div class="page_main">
    	<div class="container">
    		 <div class="home-content" v-if="articles && articles.length > 0">
          <ArticleList  :articles="articles"></ArticleList>
					<div class="loadmore-wrap" v-show='showLoadMoreModal'>
						<LoadMore :state = 'loadMoreType' @loadMore = 'loadMore'></LoadMore>
					</div>
          </div>
					<p class='page_feedback' v-else>
						暂无任何文章
					</p>
    	</div>
    </div>
  </div>
</template>


<script>
import { API } from '../conf/config';
import Tools from '../conf/tools';
import NavBar from '../components/NavBar.vue';
import ArticleList from '../components/ArticleBrief';
import Door from '../components/FrontDoor';
import LoadMore from '../components/LoadingMore';
export default {
  data() {
  	const navs = [
  	{name: '全部' , tag: 'all'},
  	{name: '精华' , tag: 'good'},
  	{name: '分享' , tag: 'share'},
  	{name: '问答' , tag: 'ask'},
  	{name: '招聘' , tag: 'job'},
    {name: '测试' , tag: 'test'}
  	];

  	return {
  		navs,
  		doorState: 'init',
  		isLoading: false,
  		showLoadMoreModal:false,
  		loadMoreType: 0,
  		isLoadingMore:false,
  		page:1,
  		currenTpye:'',
  		articles: null,
  		host:null
  	}
  },

  components: {
    NavBar,
    ArticleList,
    Door,
		LoadMore
  },

  mounted(){},
  methods:{
  	doorIsReady(){
  		this.doorState = 'start';
  		this.getArticleType(this.navs[0].tag,()=>{
  			this.doorState = 'end';
  			this.addScrollEvt();
  		})
  	},

  	ready(data){
  		this.host = data;
  	},

  	getArticleType(type,callback){
  		this.fetchData(type).then((cb) => {
                 // console.log(cb.data)
  			this.articles = cb.data.data;
  			this.currenTpye = cb.type;
  			this.page = cb.page;
  			typeof callback === 'function' && (callback());
  		},(reject) =>{
  			Tools.handleError(reject,this);
  		});
  	},

  	fetchData(type, page = 1 ,limit = 20){
  		const params  = `?tab=${(type === 'all' ? '' : type)}&page=${page}&limit=${limit}`;
  		const self = this;
  		return new Promise((resolve,reject) =>{
  			self.$http
  				.get(API.topics + params)
  				.then((response) =>{
  					resolve({data: response.data,type,page})
  				},(error)=>{
  					reject(error)
  				})
  		})
  	},

  	selectNav(tag){
  		this.isLoading = true ; this.getArticleType(tag,() =>{
  			this.isLoading = false;
  		})
  	},

        addScrollEvt() {
        const winH = window.innerHeight;
        const doc = document.documentElement;
        const body = document.body;

        this.scrollEv = () => {
          if (this.isLoadingMore) return;

          const docH = Math.max(doc.clientHeight, doc.scrollHeight);
          // fix firefox body.scrollTop always return 0
          // see http://stackoverflow.com/questions/28633221/document-body-scrolltop-firefox-returns-0-only-js
          const bodyScrollTop = window.pageYOffset || body.scrollTop || doc.scrollTop || 0;

          if ((bodyScrollTop + winH - docH) >= 0) {
            if (this.loadMoreType === 2) {
              window.removeEventListener('scroll', this.scrollEv);
              return;
            }

            this.showLoadMoreModal = true;

            if (this.page % 3 === 0) { // load more
              this.loadMoreType = 1;
            } else {
              this.loadMore();
            }
          }
        };

        window.addEventListener('scroll', this.scrollEv, false);
      },

			loadMore(){
				this.isLoadingMore = true;
				this.loadMoreType = 0;

				setTimeOut(()=>{
					let currenPage = this.page;

					this.fetchData(this.currenType,(currenPage += 1))
						.then((cb)=>{
							const data = cb.data;
							if(data.success){
								const arr = data.data;
								if((arr instanceof Array) && arr.length >0){
									!this.articles && (this.articles = []);

									this.articles  = this.articles.concat(arr);
									this.showLoadMoreModal = false;
								}else{
									this.loadMoreType = 2;
									window.removeEventListener('scroll', this.scrollEV);
								}
								this.page =  currenPage;
							}else{
								this.loadMoreType = 1 ;
								Tools.handleAjaxError(data,this);
							}
							this.isLoadingMore = false;
						},(reject)=>{
							Tools.handleAjaxError(reject,this);
							this.loadMoreType = 1;
							this.isLoadingMore = false;
						});
				},1000)
			}
  }
}
</script>


</style>
