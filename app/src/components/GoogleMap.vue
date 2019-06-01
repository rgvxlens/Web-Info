<!--https://alligator.io/vuejs/vue-google-maps/-->
<template>
  <div>
    <gmap-map
      ref="gmap"
      :center="center"
      :zoom="12"
      style="width:100%;  height: 75vh; max-height: 75%;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="toggleInfoWindow(m, index)">
      </gmap-marker>
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GoogleMap',
  data () {
    return {
      selectedMarker: null,
      center: { lat: -37.8136, lng: 144.9631 },
      map: null,
      markers: [],
      places: [],
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      // optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },

  mounted () {
    this.geolocate()
    this.showProducts()
  },

  methods: {
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
    /* Create & Return a new marker stored the information from the given product */
    copyProductToMarkerList (product) {
      if (product.delivered === true) {
        return
      }
      const marker = {
        id: product._id,
        lat: product.marker.lat,
        lng: product.marker.lng,
        userId: product.userId,
        description: product.description,
        expirationDate: product.expirationDate,
        category: product.category,
        condition: product.condition,
        address: product.address,
        name: product.name,
        phoneNumber: product.phoneNumber
      }
      this.markers.push({ position: marker })
    },
    /* When user adds a new product, call this function and pass the product in the parameter */
    addThisMarker (product) {
      this.copyProductToMarkerList(product)
    },
    // Show all the products on the map by default
    showProducts () {
      this.clearMarkers()
      var url = process.env.ROOT_API + 'products/'
      function getProductFromName () {
        return axios.get(url).then(response => {
          return response.data
        })
      }
      getProductFromName().then(data => {
        for (let i = 0; i < data.length; i++) {
          this.copyProductToMarkerList(data[i])
        }
      })
    },
    /* General Search algorithms, call this from the main with 3 parameters: name(query), category, condition */
    searchProduct (search) {
      this.clearMarkers()
      this.searchProductFromName(search.query, search.category, search.condition)
    },
    /* Return a list of products with the same name, call this function and pass the queryName in the parameter */
    searchProductFromName: function (queryName, category, condition) {
      var url = process.env.ROOT_API + 'products/'
      if (queryName !== '') {
        url += 'name/' + queryName
      } else if (category !== '' && category !== 'All') {
        url += 'category/' + category
      }
      function getProductFromName () {
        return axios.get(url).then(response => {
          return response.data
        })
      }
      getProductFromName().then(data => {
        for (let i = 0; i < data.length; i++) {
          if ((data[i].category === category || category === '' || category === 'All') && data[i].condition >= condition) {
            this.copyProductToMarkerList(data[i])
          }
        }
      })
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.showProducts()
      })
    },
    /* For clear up all the markers on the map */
    clearMarkers () {
      while (this.markers.length) { this.markers.pop() }
    },
    toggleInfoWindow: function (marker, idx) {
      console.log(marker)
      this.selectedMarker = marker
      this.infoWindowPos = marker.position
      this.infoContent = this.getInfoWindowContent(marker)
      if (this.currentMidx === idx) {
        this.infoWindowOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    reserve () {
      console.log('here')
    },
    /* Set up the marker information here. As we pass the product info in the marker.position, we have to reference it by marker.position.$item */
    getInfoWindowContent: function (marker) {
      // Check the marker.position.userId with the cookies userId here
      return ('<div>' + 'Product Description' + '<br>' + marker.position.name + '<br>' + marker.position.category + '<br>' +
        'description: ' + marker.position.description + '<br>' + 'condition: ' + marker.position.condition + '<br>' +
        marker.position.expirationDate + '<br>' + marker.position.address + '<br>' + marker.position.phoneNumber + '<div @click="reserve" class="no" id="contact">' + '<h2>' + 'Reserve Product' + '</h2>' + '</div>')
    }
  }
}
</script>
<style>
  .no {
    color: green;
    cursor: pointer;
  }

</style>
