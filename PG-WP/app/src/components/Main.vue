<template>
  <div class="pg">
    <el-row class="top">
      <el-row class="logo">
        LOGO
      </el-row >
        <el-col :span="8">
          <i class="el-icon-s-unfold hamburg" @click="closeSignUp"></i>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="Search Query"  size="small" class="searchInput" v-model="SearchProduct.name"></el-input>
        </el-col>
        <el-col :span="8">
          <i class="el-icon-plus addProduct" @click="closeSignUp"></i>
        </el-col>
    </el-row>
    <!-- PUT THE MAP IN THIS DIV -->
    <div class="map">
      <google-map />
    </div>
  </div>
</template>
<script>

import axios from 'axios'
import router from '../router'
import GoogleMap from '../components/GoogleMap'

export default {
  name: 'Home',
  components: {
    GoogleMap
  },
  data () {
    return {
      url: 'https://i.ibb.co/9hBzZQj/k2kSmall.png',
      errors: [],
      User: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        streetAddress: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: ''
      },
      Product: {
        userID: '',
        createdAt: '',
        name: '',
        description: '',
        expirationDate: '',
        category: '',
        condition: '',
        rating: '',
        location: ''
      },
      SearchProduct: {
        name: '',
        location: ''
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
    submit () {
      axios
        .post('http://localhost:3000/users', { User: this.User })
    },
    logIn () {
      router.push({ name: 'main' })
    },
    getProduct () {
      axios
        .get('http://localhost:3000/products', { Product: this.Product })
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
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 46px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .text {
    padding: 80px;
  }
  .intro-text {
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
    padding: 40px 40px 40px 40px;
    width: 800px;
    height: 500px;
    background-color: white;
    border-radius: 18px;
  }
  .close {
    postition: absolute;
    top: 0;
    right: 14px;
    font-size: 42px;
    transform: rotate(45deg);
  }
  .closeSubmit {
    float: right;
  }
  .input-field {
    padding: 10px 10px 10px 10px;
  }
  .header {
    position: absolute;
    background-color: #F2F2F2;
    top: 0;
    left: 0;
    height: 75px;
    width: 100%;
  }
  .logo {
    top: 0;
    height: 20px;
  }
  .headerRow {
    margin: -20px -10px -10px -10px;
  }
  .map {
  }
  .searchInput {
    width: 320px;
  }
  .pg {
    height: 100%;
    max-width: 100%;
  }
  .top {
    height: 15%;
    margin-bottom: 0px;
  }
  .middle {
    height: 80%;
  }
  .hamburg {
    float: left;
  }
  .addProduct {
    float: right;
  }
</style>
