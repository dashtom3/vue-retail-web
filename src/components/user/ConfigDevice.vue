<template>
  <div class="park">
    <div class="park-btn">
      <el-button type="primary" size="medium" @click="updateDeviceDialog()">添加设备</el-button>
    </div>
    <div class="park-table">
      <el-table
        :data="deviceData"
        border
        style="width: 100%">
        <el-table-column prop="id" label="设备序列号"></el-table-column>
        <el-table-column prop="type" label="设备类型"></el-table-column>
        <el-table-column prop="brand" label="设备品牌"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateDeviceDialog(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="deleteDeviceDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="修改设备信息"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="deviceEntity" label-width="90px">
        <el-form-item label="设备序列号">
          <el-input v-model="deviceEntity.id"></el-input>
        </el-form-item>
        <!-- <el-form-item label="设备类型">
          <el-input v-model="deviceEntity.type"></el-input>
        </el-form-item> -->
        <el-form-item label="设备类型">
          <el-select v-model="deviceEntity.type" placeholder="">
            <el-option v-for="item in typeList" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备品牌">
          <el-input v-model="deviceEntity.brand"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateDevice">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除设备"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要删除设备吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteDevice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Park',
  data () {
    return {
      typeList:[{type:0,name:'客流机'},{type:1,name:'人脸识别'},{type:2,name:'热区'}],
      deviceData:[],
      deviceEntity:{
        name:null,
        number:null,
        address:null
      },
      isUpdateShow:false,
      isDeleteShow:false,
    }
  },
  created(){
    this.getDeviceList()
  },

  methods:{
    //获取数据
    getDeviceList(){
      this.$global.httpGetWithToken(this,'system/device/all').then(res=>{
        this.deviceData = res.data
      })
    },
    //修改
    updateDeviceDialog(item){
      if(item){
        this.deviceEntity = item
      }else {
        this.deviceEntity._id = null
      }
      this.isUpdateShow = !this.isUpdateShow
    },
    //添加或更新确认
    updateDevice(){
      var data = {action:this.deviceEntity._id?1:0,data:this.deviceEntity}
      this.$global.httpPostWithToken(this,'system/device/operate',data).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getDeviceList()
      })
    },
    //删除
    deleteDeviceDialog(item){
      this.isDeleteShow = !this.isDeleteShow
      this.deviceEntity = item
    },
    //确认删除
    deleteDevice(){
      this.$global.httpPostWithToken(this,'system/device/operate',{action:2,data:this.deviceEntity}).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
        this.getDeviceList()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.park{
  height: 100%;
}
.park-btn {
  margin: 10px;
}
.park-red {
  background-color: red;
  color:white;
  padding:5px;
}
.park-green{
  background-color: green;
  color: white;
  padding:5px;
}
</style>
