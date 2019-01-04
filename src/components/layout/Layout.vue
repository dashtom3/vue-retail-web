<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
        <el-menu
          :show-timeout="200"
          :collapse=false
          mode="vertical"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          class="menu-container"
          @select="goPage"
        >
          <el-menu-item :index="index+''" v-for="item,index in data">
            <i v-bind:class="item[2]"></i>
            <span slot="title">{{item[0]}}</span>
          </el-menu-item>
        </el-menu>
    </div>
    <div class="main-container">
      <div class="navbar">
        <!-- navbar -->
      </div>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      // data:[['实时客流统计','Detail','el-icon-time'],['区域驻留统计','HotData','el-icon-edit'],["客群分析",'peopleAnalyse','el-icon-time']]
      data:[]
    }
  },
  created(){
    console.log(this.$route.path)
    if(this.$route.path == '/peopleanalyse'){
      this.data.push(["客群分析",'peopleAnalyse','el-icon-time'])
    }
    if(this.$route.path == '/hotData'){
       this.data.push(['区域驻留统计','HotData','el-icon-edit'])
    }
    if(this.$route.path == '/detail'){
       this.data.push(['实时客流统计','Detail','el-icon-time'])
    }
  },
  destroyed(){

  },
  methods: {
    goPage(key){
      this.$router.push({name:this.data[key][1]})
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  border-bottom: 1px solid #e6e6e6;
}
.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: 180px;
  position: relative;
}
.menu-container {
  background-color: rgb(48, 65, 86);
  height: 100%;
}
.sidebar-container {
  transition: width 0.28s;
  width: 180px !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  background-color:;
  z-index: 1001;
  overflow: hidden;

  /* border-right: solid 1px #e6e6e6; */
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden!important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  .el-scrollbar__bar.is-vertical{
    right: 0px;
  }
  .is-horizontal {
    display: none;
  }
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
  .svg-icon {
    margin-right: 16px;
  }
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
  .is-active > .el-submenu__title{
      color: #f4f4f5!important;
  }
}

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
