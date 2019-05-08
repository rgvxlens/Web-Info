<!--https://alligator.io/vuejs/vue-google-maps/-->
<template>
  <div>
    <div>
      <!-- Redesign this shit
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>
    -->
    <el-input class="input-field" placeholder="Search Name" v-model="SearchProduct.name"></el-input>
    <el-button @click="findProductFromName"> Search Name</el-button>
    <el-input class="input-field" placeholder="Search Category" v-model="SearchProduct.category"></el-input>
    <el-button @click="findProductFromCategory"> Search Category</el-button>

    <button type="button" @click="addMarkerNew">Click Me!</button>
    </div>
    <br>

    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 75vh; max-height: 75%;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GoogleMap',
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: -37.8136, lng: 144.9631 },
      markers: [],
      places: [],
      currentPlace: null,
      SearchProduct: {
        name: '',
        catagory: '',
        rating: '',
        expirationDate: ''
      }
    }
  },

  mounted () {
    this.geolocate()
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    addMarkerNew () {
      while (this.markers.length) { this.markers.pop() }
      function getProductList () {
        return axios.get('http://localhost:3000/products').then(response => {
          return response.data
        })
      }
      getProductList().then(data => {
        console.log('data length is : ' + data.length)
        for (let i = 0; i < data.length; i++) {
          const marker = {
            lat: data[i].location.coordinates[0],
            lng: data[i].location.coordinates[1]
          }
          this.markers.push({ position: marker })
        }
      })
    },
    findProductFromName () {
      while (this.markers.length) { this.markers.pop() }
      var url = 'http://localhost:3000/products/name/' + this.SearchProduct.name
      console.log(url)
      function getProductList () {
        return axios.get(url).then(response => {
          return response.data
        })
      }
      getProductList().then(data => {
        for (let i = 0; i < data.length; i++) {
          const marker = {
            lat: data[i].location.coordinates[0],
            lng: data[i].location.coordinates[1]
          }
          this.markers.push({ position: marker })
        }
      })
    },
    findProductFromCategory () {
      while (this.markers.length) { this.markers.pop() }
      var url = 'http://localhost:3000/products/category/' + this.SearchProduct.category
      console.log(url)
      function getProductList () {
        return axios.get(url).then(response => {
          return response.data
        })
      }
      getProductList().then(data => {
        for (let i = 0; i < data.length; i++) {
          const marker = {
            lat: data[i].location.coordinates[0],
            lng: data[i].location.coordinates[1]
          }
          this.markers.push({ position: marker })
        }
      })
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
