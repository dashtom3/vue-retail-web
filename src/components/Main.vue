<template>
  <div class="main">

    <div class="amap-wrapper">
      <el-amap vid="amapDemo" :zoom="map.zoom" :center="map.position">
        <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events" :visible="marker.visible"
               :content="marker.content"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap';


export default {
  name: 'Main',
  data () {
    return {
      parkData:[],
      map:{
        zoom:18,
        position:[121.5273285, 31.21715058]
      },
      markers:[]
    }
  },
  created(){
    console.log(111)
    this.getParkList()
  },
  mounted(){

  },
  methods:{
    getParkList(){
      this.parkData = [{a:1,b:5,lat:121.5270,lng:31.2170},{a:2,b:3,lat:121.5273285,lng:31.21715058},{a:3,b:4,lat:121.5275,lng:31.2174}]
      this.addMarker()
    },
    addMarker(){
      this.parkData.forEach((item)=>{
        var tempImg
        switch (item.a) {
          case 1:
            tempImg = require('../assets/main/a1.png')
            break;
          case 2:
            tempImg = require('../assets/main/a2.png')
            break;
          case 3:
            tempImg = require('../assets/main/a3.png')
            break;
          default:
        }
        var marker = {
            content: '<div style="width:44px;text-align:center;"><img src="'+tempImg+'" style="width:100%"><span style="color:white;position:absolute;top:1px;right:7px">'+item.b+'</span></div>',
            position:[item.lat,item.lng],
            events: {
              click: () => {
                // this.$router.push({name:"user_data",params:""})
                console.log(item)
              }
            },
            visible:true
        }
        this.markers.push(marker)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  height: 100%;
}
.amap-wrapper {
  width: 100%;
  height:100%;
}
</style>
