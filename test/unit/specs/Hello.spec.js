import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/index.vue'
import User from '../pages/user.vue'
import Topic from '../pages/topic.vue'
import Welcome from '../pages/welcome.vue'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component:Welcome
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User
  },
  {
    path: '/topic/:id',
    name: 'topic',
    component: Topic
  }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

Vue.use(VueRouter)

describe('App.vue', () => {
  it('should have component About', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Welcome)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component AllArticle', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(AllArticle)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component FullArticle', () => {
    const vm = new Vue({
      router,
      el: document.createElement('div'),
      render: (h) => h(FullArticle)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component Home', () => {
    const vm = new Vue({
      router,
      el: document.createElement('div'),
      render: (h) => h(Home)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component TagView', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(TagView)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component ChangeArticle', () => {
    const vm = new Vue({
      router,
      el: document.createElement('div'),
      render: (h) => h(ChangeArticle)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component CreateArticle', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(CreateArticle)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component Login', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Login)
    })

    expect(vm).to.not.be.null;
  })

  it('should have component ViewArticles', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(ViewArticles)
    })

    expect(vm).to.not.be.null;
  })
})
