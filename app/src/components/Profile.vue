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
        <i class="el-icon-s-unfold hamburg bigger" @click="openMenu"></i>
      </el-col>
    </el-row>
    <div class="menu-modal">
      <div class="addProduct-content">
        <i class="el-icon-close closeSubmit bigger" @click="closeMenu"></i>
        <div class="menuItems">
          <el-row>
            <i @click="main" class="el-icon-map-location bigger"></i>
            <div> Main </div>
          </el-row>
          <el-row>
            <i i @click="dashboard" class="el-icon-odometer bigger"></i>
            <div> Dashboard </div>
          </el-row>
          <el-button class="input-field" @click="logOut"> Log out </el-button>
        </div>
      </div>
    </div>
    <div class="tableContent">
      <h3> Products </h3>
      <el-table
        class="productTable"
        :data="tableData"
        height="300">
        <el-table-column
          fixed
          prop="name"
          label="Name"
          width="150">
        </el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          width="300">
        </el-table-column>
        <el-table-column
          prop="expirationDate"
          label="Expiry Date"
          width="120">
        </el-table-column>
        <el-table-column
          prop="category"
          label="Category"
          width="120">
        </el-table-column>
        <el-table-column
          prop="condition"
          label="Condition"
          width="100">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Delivered"
          width="120">
          <template slot-scope="scope">
            <el-button @click="deliver(scope.$index, tableData)" :type="delivered(scope.$index, tableData)" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3> Orders </h3>
      <el-table
        class="table"
        :data="orderData"
        height="300">
        <el-table-column
          fixed
          prop="name"
          label="Name"
          width="150">
        </el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          width="300">
        </el-table-column>
        <el-table-column
          prop="expirationDate"
          label="Expiry Date"
          width="120">
        </el-table-column>
        <el-table-column
          prop="category"
          label="Category"
          width="120">
        </el-table-column>
        <el-table-column
          prop="condition"
          label="Condition"
          width="120">
        </el-table-column>
        <el-table-column
          prop="rating"
          label="Rating"
          width="180">
          <template slot-scope="scope">
            <el-rate class="conditionLabel" v-model="orderData[scope.$index].rating">
          </el-rate>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Delivered"
          width="120">
          <template slot-scope="scope">
            <el-button @click="deliver(scope.$index, orderData)" :type="delivered(scope.$index, orderData)" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
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
      orderRating: 0,
      imageUrl: '',
      errors: [],
      value5: '',
      tableData: [],
      // Store order data in this
      orderData: [],
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
        condition: 0,
        rating: null,
        delivered: false
      }
    }
  },
  created () {
    this.getProducts()
    this.getOrders()
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
      this.$session.destroy()
      router.push({ name: 'home' })
    },
    main () {
      router.push({ name: 'main' })
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
      var url = process.env.ROOT_API + 'products/userId/' + this.$session.get('user')._id
      axios.get(url).then(response => (this.tableData = response.data))
    },
    // The user ordered these products from other owners.
    // The user should be able to provide the rating (1 to 5) back to the owner.
    getOrders () {
      var url = process.env.ROOT_API + 'products/receiver/' + this.$session.get('user')._id
      axios.get(url).then(response => (this.orderData = response.data))
      console.log('Order Data', this.orderData)
    },
    // Update the deliver status of this product
    deliver (index, rows) {
      console.log('rating:', rows[index].rating)
      if (!rows[index].rating) {
        this.$notify({
          title: 'Warning',
          message: 'Please rate the order',
          type: 'warning'
        })
        return
      }
      let deliveryStat = ''
      rows[index].delivered = !rows[index].delivered
      var url = process.env.ROOT_API + 'products/deliver/id/' + rows[index]._id
      axios.put(url, rows[index])

      if (rows[index].delivered) {
        deliveryStat = 'delivered'
      } else {
        deliveryStat = 'not delivered'
      }
      this.$notify({
        title: 'Success',
        message: 'Youve marked this order as ' + deliveryStat,
        type: 'success'
      })
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
        return 'success'
      } else {
        return 'danger'
      }
    },
    dashboard () {
      router.push({ name: 'dashboard' })
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
    padding-left: 10px;
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
    padding-left: 20%;
    padding-right: 10%;
    width: 65%;
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
  .productTable {
    height: 100%;
    width: 80%;
  }
  .bigger {
    transform: scale(2, 2);
    cursor: pointer;
  }
</style>
