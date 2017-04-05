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

export default routes;
