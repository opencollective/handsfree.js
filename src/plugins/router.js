import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeDocumentation from '../components/HomeDocumentation.vue'
import HomeBrowseHandsfree from '../components/HomeBrowseHandsfree.vue'
import YouTube from '../components/YouTube.vue'
import YouTubeSingle from '../components/YouTubeSingle.vue'
import Settings from '../components/Settings.vue'

Vue.use(VueRouter)
export default new VueRouter({
  scrollBehavior () {return {x: 0, y: 0}},
  routes: [
    {name: 'homeDocumentation', path: '/', component: HomeDocumentation},
    {name: 'homeBrowseHandsfree', path: '/browse', component: HomeBrowseHandsfree},
    {name: 'settings', path: '/settings', component: Settings},
    {name: 'youtubeLanding', path: '/youtube', component: YouTube},
    {name: 'youtubeSingle', path: '/youtube/:id', component: YouTubeSingle}
]
})