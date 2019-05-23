<template>
  <div class="pg">
    <el-row class="top">
      <el-row class="logo">
        <el-image
            style="width: 150px; height: 75px;"
            :src="'https://i.ibb.co/9hBzZQj/k2kSmall.png'">
        </el-image>
      </el-row >
      <el-col :span="8">
        <i class="el-icon-s-unfold hamburg" @click="openMenu"></i>
      </el-col>
      <el-col :span="8">
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
    <div class="dashboard">
        <el-row class="statrow">
          <h1> Suburb Rank: </h1>
          <h2 class="stat"> #1 </h2>
        </el-row>
        <el-row class="statrow">
          <h1> User Rank: </h1>
          <h2 class="stat"> #3 </h2>
        </el-row>
        <el-row class="statrow">
          <h1> Number of Orders: </h1>
          <h2 class="stat"> #12 </h2>
        </el-row>
        <el-row class="statrow">
          <h1> Top User: </h1>
          <h2 class="stat"> John Appleseed </h2>
        </el-row>
    </div>
    <div class="menu-modal">
      <div class="addProduct-content">
        <i class="el-icon-close closeSubmit" @click="closeMenu"></i>
        <div class="menuItems">
          <el-row>
            <i @click="main" class="el-icon-map-location"></i>
            <div> Main </div>
          </el-row>
          <el-row>
            <i @click="dashboard" class="el-icon-odometer"></i>
            <div> Dashboard </div>
          </el-row>
          <el-button class="input-field" @click="logOut"> Log out </el-button>
        </div>
      </div>
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
      imageUrl: '',
      errors: [],
      value5: '',
      tableData: [],
      // Store order data in this
      orderData: [],
      options: [{
        value: 'Fruit',
        label: 'Fruit'
      }, {
        value: 'Vegtable',
        label: 'Vegtable'
      }, {
        value: 'Baking',
        label: 'Baking'
      }, {
        value: 'Meat',
        label: 'Meat'
      }, {
        value: 'Dairy',
        label: 'Dairy'
      }],
      Search: {
        category: '',
        condition: 0,
        query: ''
      },
      Product: {
        _id: '',
        userId: '',
        receiverName: '',
        phoneNumber: '',
        description: '',
        name: '',
        expirationDate: '',
        address: '',
        marker: '',
        category: '',
        condition: 0
      }
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    addProduct () {
      document.querySelector('.addProduct-modal').style.display = 'flex'
      document.querySelector('.searchBar').style.display = 'none'
    },
    openMenu () {
      document.querySelector('.menu-modal').style.display = 'flex'
    },
    searchBar () {
      document.querySelector('.searchBar').style.display = 'flex'
    },
    closeAddProduct () {
      document.querySelector('.addProduct-modal').style.display = 'none'
    },
    closeMenu () {
      document.querySelector('.menu-modal').style.display = 'none'
    },
    submit () {
      var url = process.env.ROOT_API + 'products/'
      axios.post(url, { Product: this.Product })
      document.querySelector('.addProduct-modal').style.display = 'none'
    },
    logOut () {
      this.$store.state.name = ''
      this.$store.state.id = ''
      this.$store.state.phoneNumber = ''
      router.push({ name: 'home' })
    },
    main () {
      router.push({ name: 'main' })
    },
    dashboard () {
      router.push({ name: 'dashboard' })
    },
    setPlace (place) {
      const marker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.Product.address = place.formatted_address
      this.Product.marker = marker
    },
    search () {
      // Search Query code in here, leave the line below at the bottom :)
      document.querySelector('.searchBar').style.display = 'none'
    },
    // Get this user's product list, in other words, this user owns these products
    // The user should be able to change the deliver status of the product and add the receiver name to the product
    getProducts () {
      // var url = process.env.ROOT_API + 'products/'
      // axios.get(url).then(response => (this.tableData = response.data))
      var url = process.env.ROOT_API + 'products/userId/' + this.$store.state.id
      axios.get(url).then(response => (this.tableData = response.data))
      console.log(this.tableData)
    },
    // MAKE THIS GET ORDERS OR SOMETHING
    // The user ordered these products from other owners.
    // The user should be able to provide the rating (1 to 5) back to the owner.
    getOrders () {
      // var url = process.env.ROOT_API + 'products/'
      // axios.get(url).then(response => (this.tableData = response.data))
      var url = process.env.ROOT_API + 'products/receiver/' + this.$store.state.name
      axios.get(url).then(response => (this.tableData = response.data))
    },
    // Update the deliver status of this product
    deliver (index, rows) {
      rows[index].delivered = !rows[index].delivered
      // Now just set the receiverName is masonTest123
      rows[index].receiverName = 'masonTest123'
      var url = process.env.ROOT_API + 'products/id/'
      axios.put(url + rows[index]._id, rows[index])
    },
    // The 'customer' could rate(feedback) the owner's product
    // Noted: customer can only rate it once
    // The PUT method doesn't read any input ======< haven't test this functionality yet.
    rate (index, rows) {
      var ownerId = rows[index].useId
      // should read the rating somewhere, in this case, user rate it as 4
      var rating = 4
      var url = process.env.ROOT_API + '/users/id/' + ownerId + '/userRating/' + rating
      axios.put(url)
    },
    tableRowClassName ({row, rowIndex}) {
      if (row.delivered) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    delivered (index, rows) {
      if (rows[index].delivered) {
        return 'danger'
      } else {
        return 'success'
      }
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
  .addProduct-modal {
    width: 20%;
    height: 80%;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
  }
  .menu-modal {
    width: 20%;
    height: 80%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
  }
  .addProduct-content {
    padding: 40px 40px 40px 40px;
    width: 800px;
    height: 100%;
    background-color: white;
    border-radius: 18px;
    background-color: rgba(255,255,255,0.8);
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
    height: 75px;
  }
  .headerRow {
    margin: -20px -10px -10px -10px;
  }
  .searchInput {
    width: 320px;
  }
  .pg {
    height: 100%;
    max-width: 100%;
  }
  .top {
    height: 12%;
    margin-bottom: 16px;
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
  .addressInput {
    border-radius: 4px;
    margin: 0px 8px;
    width: 100%;
    height: 5%;
  }
  .searchBar {
    height: 12%;
    display: none;
  }
  .searchRow {
    min-height: 30px;
    width: 100%;
  }
  .searchButton {
    padding-top: 0.7%;
  }
  .menuItems {
    padding-top: 30%;
  }
  .please {
    width: 100%;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: #DCDFE6;
  }
  .category {
    float: left;
    padding-left: 10px
  }
  .conditionLabel {
    float: left;
    padding-left: 10px;
  }
  .submit {
    padding-top: 30px;
  }
  .tableContent {
    padding-left: 10%;
    padding-right: 10%;
    width: 80%;
    height: 40%;
  }
  .el-table .warning-row {
    background: white;
  }

  .el-table .success-row {
    background: #67C23A;
  }
  .table {
    height: 100%;
  }
  .dashboard {
    padding-top: 20px;
  }
  .statrow {
    padding-top: 0px;
    margin-bottom: 0px;
  }
  .stat {
    color: green;
  }
</style>
