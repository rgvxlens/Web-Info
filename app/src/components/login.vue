<template>
  <div class="loginPage">
    <el-image
      class = "logoLogin"
      :src="'https://i.ibb.co/9hBzZQj/k2kSmall.png'">
    </el-image>
    <form class="loginForm" @submit.prevent="login">
       <el-input class="input-field" placeholder="Username" v-model="User.name"></el-input>
       <el-input class="input-field" placeholder="Password" v-model="User.password" show-password></el-input>
      <el-button @click="submit"  type="success"> Submit </el-button>
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
      var userPasswd, userName, userID, userPhoneNumber
      var temp
      var url = process.env.ROOT_API + 'users/name/' + this.User.name
      var p = this.User.password
      function getNameList () {
        return axios.get(url).then(response => {
          temp = response.data
          userPasswd = response.data.password
          userName = response.data.name
          userID = response.data._id
          userPhoneNumber = response.data.phoneNumber
        })
      }
      getNameList().then(data => {
        if (userPasswd === p) {
          this.$store.state.name = userName
          this.$store.state.id = userID
          this.$store.state.phoneNumber = userPhoneNumber
          // Store cookie
          this.$session.start()
          this.$session.set('user', temp)
          console.log(this.$session.get('user'))
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
  .loginPage {
    position: relative;
    padding-top: 30vh;
  }
  .error {
    color: red;
  }
  .loginForm {
    width: 30%;
    margin: 0 auto;
    height: 75px;
  }
  .logoLogin{
    width: 150px;
    height: 75px;
  }
  .input-field {
    padding: 5px;
  }
</style>
