<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <div class="grid-content">
          <el-image
            style="width: 150px; height: 75px"
            :src="url">
          </el-image>
        </div>
      </el-col>
      <el-col class="logIn" :span="4">
        <div class="grid-content">
          <el-button type="success center" @click="logIn"> Log In </el-button>
        </div>
      </el-col>
    </el-row>
      <div class="grid-content text">
        <h2>Kitchen 2 Kitchen The Number One In Food Waste Prevention</h2>
      </div>
    <el-row>
      <el-row >
        <el-col :push=7 :span="5">
          <div class="grid-content intro-text">
            <div> Food Safety </div>
            <div> Its to be understood when using our platform we are focusing on the benefits of community,
            and thus asking for you to do your best to support it.
            You can do this by only adding products that you know are safe,
            and being prepared to inspect products your receive.</div>
          </div>
        </el-col>
        <el-col :push=7 :span="5">
          <div class="grid-content intro-text">
            <div> Community Benefits </div>
            <div> We are aiming to reduce food waste in your community,
            this has great benefits to the community as it allows further interaction within
            the community and allows for a quantifible difference to be made.
             In addition you can see how your community ranks against others! </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :push=7 :span="10">
          <div class="grid-content intro-text">
            <div> Start Contributing </div>
            <div> Join the movement now, sign up to get started. Once signed up its as simple as adding the food items around the house you no longer need and wait to be contacted by a potential suiter. </div>
            <div class="home-button">
              <el-button type="success" class="home-button" @click="signUp"> Sign Up </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <div class="bg-modal">
      <div class="modal-content">
        <i class="el-icon-close closeSubmit" @click="closeSignUp"></i>
        <h2 class="heading"> Sign Up </h2>
        <el-input class="input-field" placeholder="Username" v-model="User.name"></el-input>
        <el-input class="input-field" placeholder="First name" v-model="User.firstName"></el-input>
        <el-input class="input-field" placeholder="Last name" v-model="User.lastName"></el-input>
        <el-input class="input-field" placeholder="Email Address" v-model="User.email"></el-input>
        <el-input class="input-field" placeholder="Street Address" v-model="User.streetAddress"></el-input>
        <el-input class="input-field" placeholder="Phone Number" v-model="User.phoneNumber">
          <template slot="prepend">+61</template>
        </el-input>
        <el-input class="input-field" placeholder="Password" v-model="User.password" show-password></el-input>
        <el-input class="input-field" placeholder="Confirm password" v-model="User.passwordConfirm" show-password></el-input>
        <el-button @click="submit"> Submit </el-button>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
import router from '../router'

export default {
  name: 'Home',
  data () {
    return {
      url: 'https://i.ibb.co/9hBzZQj/k2kSmall.png',
      errors: [],
      User: {
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        streetAddress: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },
  methods: {
    signUp () {
      document.querySelector('.bg-modal').style.display = 'flex'
    },
    closeSignUp () {
      document.querySelector('.bg-modal').style.display = 'none'
    },
    validate (name) {
      var url = process.env.ROOT_API + 'users/name/' + name
      axios.get(url, { User: this.User }).then(response => {
        if (response.data !== '') {
          alert('Please enter another name')
          return
        }
        var tempURL = process.env.ROOT_API + 'users'
        axios.post(tempURL, { User: this.User }).then(response => {
          router.push({ name: 'login' })
        }).catch(error => {
          alert('Please enter the right information')
          console.log('Add new user failed: ' + error)
        })
      }).catch(error => {
        alert('Please enter another name')
        console.log(error)
      })
    },
    submit () {
      this.validate(this.User.name)
    },
    logIn () {
      router.push({ name: 'login' })
    }
  }
}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 46px;
  }
  .text {
    padding: 80px;
  }
  .intro-text {
    padding: 10px 10px 10px 10px;
    margin-right: 10px;
    min-height: 200px;
    background-color: #d3dce6;
  }
  .home-button {
    float: bottom;
  }
  .bg-modal {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
  }
  .modal-content {
    padding: 40px 40px 120px 40px;
    width: 800px;
    height: 500px;
    background-color: white;
    border-radius: 18px;
  }
  .closeSubmit {
    float: right;
  }
  .input-field {
    padding: 10px 10px 10px 10px;
  }
  .logIn {
    padding-top: 20px;
    float: right;
  }
  .heading {
    color: green;
  }
</style>
