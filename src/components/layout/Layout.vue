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
          <el-submenu :index="index+''" v-for="item,index in data">
            <template slot="title">
              <i v-bind:class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="index+'-'+index1" v-for="item1,index1 in item.data">
              <span slot="title">{{item1[0]}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
    </div>
    <div class="main-container">
      <div class="navbar">
        {{selectData[0]}}
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
      data:[{name:'配置管理',icon:'el-icon-edit',data:[['门店配置','ConfigSubshop',''],['设备管理','ConfigDevice','']]},
      {name:'客流数据',icon:'el-icon-view',data:[['数据总览','DataScreen',''],['客流数据','StoreRLData',''],['进店逗留时间','StoreDLData',''],['区域关注度','StoreRQData','']]},],
      selectData:0,
    }
  },
  created(){
    // console.log(this.$router)
  },
  methods: {
    goPage(key){
      // console.log(key)
      const temp = key.split('-')
      this.selectData = this.data[temp[0]].data[temp[1]]
      this.$router.push({name:this.selectData[1]})
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
/* .app-main {
  min-height:calc(100vh - 84px);
} */
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
