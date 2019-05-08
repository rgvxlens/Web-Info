<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getUsers } from './repository'

export default {
  name: 'App',
  data () {
    return {
      users: []
    }
  },
  methods: {
  },
  mounted () {
    getUsers().then(data => { this.users = data.users }).catch(err => alert(err))
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
}
</style>
