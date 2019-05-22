<template>
  <div style="margin-top:130px;">
    <h2><el-image
            style="width: 150px; height: 75px;"
            :src="'https://i.ibb.co/9hBzZQj/k2kSmall.png'">
          </el-image></h2>
          <p> Login </p>
    <form @submit.prevent="login" style="width: 40%; margin: 0 auto; height: 75px;">
       <el-input class="input-field" placeholder="Username" v-model="User.name" style="display: block; height: 75px;"></el-input>
       <el-input class="input-field" placeholder="password" v-model="User.password" show-password style="display: block; height: 75px; "></el-input>
      <el-button @click="submit" style="background-color:#5daf34; color:#FFF"> Submit </el-button>
    </form>
  </div>
</template>
<script>
import router from '../router'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      User: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    submit: function () {
      var userPasswd, userName, userID
      var url = process.env.ROOT_API + 'users/name/' + this.User.name
      var p = this.User.password
      function getNameList () {
        return axios.get(url).then(response => {
          userPasswd = response.data.password
          userName = response.data.name
          userID = response.data._id
        })
      }
      getNameList().then(data => {
        if (userPasswd === p) {
          this.$store.state.name = userName
          this.$store.state.id = userID
          router.push({ name: 'main' })
        } else {
          alert('Wrong username or password!')
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