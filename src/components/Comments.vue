<template>
  <div class="comments-container">
    <div class="comments__num">
      <span>{{ comments.length }} 条评论</span>
    </div>
    <div class="comments__sort">
      <div class="button-group">
        <button class="btn" :class="{'is-active': sortBy === 'normal'}" @click="sort('normal', $event)">默认</button>
        <button class="btn" :class="{'is-active': sortBy === 'latest'}" @click="sort('latest', $event)">最新</button>
        <button class="btn" :class="{'is-active': sortBy === 'ups'}" @click="sort('ups', $event)">赞数</button>
      </div>
    </div>
    <div v-if="comments.length > 0">
      <transition-group name='cell' tag="div" class='comments__list'>
        <div class="comments__item clearfix" v-for="(c, key) in comments" :key='c.id'>
            <div class="comments__left">
          <router-link :to="{ path: '/user/' + c.author.loginname }">
            <img :src="c.author.avatar_url" class="avatar avatar--s">
          </router-link>
        </div>
        <div class="comments__right">
          <router-link :to="{ path: '/user/' + c.author.loginname }" class="comments__author">
            {{ c.author.loginname }}
          </router-link>
          <div class="comments__cont" v-html='c.content'></div>

          <div class="comments__meta">
            <span class="t-pull-right" v-show="c.ups && c.ups.length > 0">{{ c.ups.length }} 赞</span>

          </div>
        </div>
         </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import Tool from '../conf/tools'

  export default {
    data() {
      return {

      }
    },
    props: {
      comments: {
        type: Array,
        default: []
      }
    },

    methods: {
        formatCreateTime(time){
            return Tool.timeFormatCN(time)
        },

        handleUp(reply) {
            reply.ups = reple.ups || [];

            this.$emit('ups', reply.id, (data)=>{
                if(data.action ==='up'){
                    reply.ups.push(null);
                }else if(data.action === 'down'){
                    reply.ups.shift();
                }
            })
        },

        handleReply(authorName){
            this.$emit('reply', `@${authorName}`);
        },

        sort(type, $evt){
            if(this.comments && this.comments.length>0){
                const $target = $evt.target;

                if($target.classList.contains('is-active')) return;

                this.comments.sort((a,b)=>{
                    this.sortBy = type;
                    if(type==='normal' || type==='latest'){
                        return type ==='normal'?
                        new Date(a.create_at) - new Date(b.create_at):
                        new Date(b.create_at) - new Date(a.create_at);
                    }else if(type === 'ups'){
                        return b.ups.length - a.ups.length;
                    }

                    return new Date(a.create_at) - new Date(b.create_at);
                })
            }
        }
    }
  }
</script>
<style lang="scss">
</style>
