import Index from '../pages/index.vue'
import User from '../pages/user.vue'
import Topic from '../pages/topic.vue'

const routes = [{
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/topic',
    name: 'topic',
    component: Topic
  }
]

export default routes;
