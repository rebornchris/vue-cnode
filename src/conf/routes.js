import Index from '../pages/index.vue'
import User from '../pages/user.vue'
import Topic from '../pages/topic.vue'

const routes = [{
    path: '/',
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
