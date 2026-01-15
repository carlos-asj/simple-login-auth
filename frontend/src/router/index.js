import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../components/ResgiterView.vue'

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
