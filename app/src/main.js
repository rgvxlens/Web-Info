// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuex from 'vuex'
import VueSession from 'vue-session'

var VueCookie = require('vue-cookie')
Vue.use(VueCookie)
// set default config
VueCookie.set('theme', 'default')
VueCookie.set('hover-time', '1s')

Vue.use(VueSession)

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDpxEK9Ohp8v_JOH6ZGCrewi0M_T9ubVY8',
    libraries: 'places' // necessary for places input
  }
})

const store = new Vuex.Store({
  state: {
    name: '',
    id: '',
    phoneNumber: ''
  },
  mutations: {
    UpdateUser (name, id, phoneNumber) {
      this.state.name = name
      this.state.id = id
      this.phoneNumber = phoneNumber
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  showCurrentSession: function () {
    console.log(this.$session.get('user'))
  },
  methods: {
    logOut: function () {
      this.$store.state.name = ''
      this.$store.state.id = ''
      this.$store.state.phoneNumber = ''
      this.$session.destroy()
      this.$router.push('/')
    }
  },
  template: '<App/>'
})
