<template>
<div>
  <div class="action-btn" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <a @click='backToTop' class="action-btn__link action-btn__plus">
        <img src="../assets/img/cross.png" alt="">
      </a>
    <ul>
      <li v-if="this.$route.name ==='topic'">
        <a href="#" class="tooltips tooltips--left action-btn__link action-btn__reply" aria-label="回复" @click.prevent="toggleModal('reply')">
            <i class="fa fa-reply fa-lg" aria-hidden="true"></i>
          </a>
      </li>
      <li>
        <a href="#" class="tooltips tooltips--left action-btn__link action-btn__post" aria-label="发布文章" @click.prevent="toggleModal('post')">
            <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>
          </a>
      </li>
    </ul>
  </div>
  <div class="modal-container">
    <post :show='showPostModal' ref='postModal' @close='closeModal' @post='post'></post>
    <reply :show="showReplyModal" ref='replyModal' @close="closeModal" @reply='reply'></reply>
  </div>
</div>
</template>

<script>
import reply from '../components/replymodel';
import post from '../components/postmodel';
import Tools from '../conf/tools';
import {
  API
} from '../conf/config'
export default {
  data() {
    return {
      showReplyModal: false,
      showPostModal: false,
      state: 'normal',
      editArticle: null
    }
  },

  props: {
    topicId: null,

    host: {
      type: Object,
      default: null
    }
  },

  components: {
    reply,
    post
  },
  methods: {
    mouseenter() {
      this.$el.firstChild.classList.add('is-active');
    },

    backToTop() {
      let speed = 0;
      let interval = setInterval(() => {
        let ran = Math.random();
        speed += ran;
        document.body.scrollTop -= speed * 10
        if (document.body.scrollTop < 1)
          clearInterval(interval);
      }, 10)
    },

    mouseleave() {
      this.$el.firstChild.classList.remove('is-active');
    },

    toggleModal(type) {
      const isValid = this.checkHost();

      if (type === 'post') {
        if (!this.showPostModal) {
          isValid && (this.showPostModal = true);
        } else {
          this.$refs.postModal.close();
        }
      } else if (type === 'reply') {
        if (!this.showReplyModal) {
          isValid && (this.showReplyModal = true);
        } else {
          this.$refs.replyModal.close();
        }
      }
    },

    checkHost() {

      if (!this.host) {
        this.$message.info('请先登录！')
        return false;
      }

      return true;
    },

    closeModal(type, cb) {
      if (type === 'reply') {
        this.showReplyModal = false;
      }

      if (type === 'post') {
        this.showPostModal = false;
      }
      if (typeof cb === 'function' && cb()) {}
    },

    editArticle(article) {
      console.log(12312)
      this.state = 'edit';
      this.$refs.postModal.setArticle(article);
      this.showPostModal = true;
    },
    // 设置@的人
    setReply(content) {
      this.$refs.replyModal.setReply(content);
      this.showReplyModal = true;
    },

    post(params) {
      const url = this.state === 'edit' ? API.topicUpdate : API.topics;
      if (this.state === 'edit') {
        params.topic_id = this.article.topic_id;
      }

      params.accesstoken = this.host.accesstoken;

      this.$http.post(url, params)
        .then((response) => {
          const data = response.data;

          // 跳转到发布的文章页
          if (data.success) {
            this.$message.success('发布成功, 正在跳转到文章页');

            this.$refs.postModal.close();

            setTimeout(() => {
              this.$router.push({
                path: `/topic/${data.topic_id}`
              });
            }, 2000);
          } else {
            this.$message.error(data.error_msg);
          }
        }, (reject) => {
          console.log(234432)
          this.$refs.postModal.close();
          Tools.handleAjaxError(reject, this);
        });
    },

    editArticle(article) {
      this.state = 'edit';
      this.$refs.postModal.setArticle(article);
      this.showPostModal = true;
    },
    // 设置@的人
    setReply(content) {
      this.$refs.replyModal.setReply(content);
      this.showReplyModal = true;
    },

    reply(content, cb) {
      const params = {
        accesstoken: this.host.accesstoken,
        content
      };

      console.log(this.topicId)

      this.$http
        .post(`${API.topic}${this.topicId}/replies`, params)
        .then((response) => {
          const data = response.data;

          typeof cb === 'function' && cb(data.success);

          if (data.success) {
            this.$message.info('回复成功');
            this.$emit('afterReply', () => {
              this.toggleModal('reply')
            })
          } else {
            this.$message.error(data.error_msg)
          }
        }, (reject) => {
          const data = response.data;

          Tools.handleAjaxError(reject, this, () => {
            typeof cb === 'function' && cb(data.success)
          })
        })

    }
  }
}
</script>

<style media="screen">
.modal-container {
  position: fixed;
  bottom: 0.25rem;
  right: 7rem;
  display: flex;
  align-items: flex-end;
  flex-direction: row-reverse;
  z-index: 1000;
  >div {
    float: right;
    margin-right: 0.75rem;
  }
}
</style>
