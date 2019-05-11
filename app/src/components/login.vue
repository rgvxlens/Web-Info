<template>
  <div style="margin-top:130px;">
    <h2><el-image
            style="width: 150px; height: 75px;"
            :src="'https://i.ibb.co/9hBzZQj/k2kSmall.png'">
          </el-image></h2>
          <p> Login </p>
    <form @submit.prevent="login" style="width: 600px; height: 75px; margin-left:450px">
       <el-input class="input-field" placeholder="Username" v-model="User.name"></el-input>
       <el-input class="input-field" placeholder="password" v-model="User.password" show-password></el-input>
      <el-button @click="submit" style="background-color:#5daf34; color:#FFF"> Submit </el-button>
    </form>
  </div>
</template>
<script>
import router from '../router'
import axios from 'axios'
export default {
  data () {
    return {
      User: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      var userPasswd
      var url = process.env.ROOT_API + 'users/name/' + this.User.name
      var p = this.User.password
      console.log(url)
      function getNameList () {
        return axios.get(url).then(response => {
          userPasswd = response.data.password
        })
      }
      getNameList().then(data => {
        console.log(userPasswd)
        if (userPasswd === p) {
          console.log(data)
          router.push({ name: 'main' })
        }
      })
    }
  }
}
</script>
<style>
.error {
  color: red;
}
.login {
    float: right;
  }
p {
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.1em;
  font-family: Heiti SC;
  }
  .login1{
    margin-top:500px;
  }
</style>
