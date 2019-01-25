<template>
  <div class="park">
    <div class="park-btn">
      <el-button type="primary" size="medium" @click="updateShopDialog()">添加门店</el-button>
    </div>
    <div class="park-table">
      <el-table
        :data="shopData"
        border
        style="width: 100%">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="number" label="编号"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="updateShopDialog(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="deleteShopDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="修改门店信息"
      :visible.sync="isUpdateShow"
      width="70%">
      <el-form ref="form" :model="shopEntity" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="shopEntity.name"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="shopEntity.number"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="shopEntity.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateShop">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除门店"
      :visible.sync="isDeleteShow"
      width="50%">
      <span>确定要删除门店吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteShop">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Park',
  data () {
    return {
      shopData:[],
      shopEntity:{
        name:null,
        number:null,
        address:null
      },
      isUpdateShow:false,
      isDeleteShow:false,
    }
  },
  created(){
    this.getShopList()
  },

  methods:{
    //获取数据
    getShopList(){
      this.$global.httpGetWithToken(this,'system/subshop/all').then(res=>{
        this.shopData = res.data
      })
    },
    //修改
    updateShopDialog(item){
      if(item){
        this.shopEntity = item
      }else {
        this.shopEntity._id = null
      }
      this.isUpdateShow = !this.isUpdateShow
    },
    //添加或更新确认
    updateShop(){
      var data = {action:this.shopEntity._id?1:0,data:this.shopEntity}
      this.$global.httpPostWithToken(this,'system/subshop/operate',data).then(res=>{
        this.isUpdateShow = !this.isUpdateShow
        this.getShopList()
      })
    },
    //删除
    deleteShopDialog(item){
      this.isDeleteShow = !this.isDeleteShow
      this.shopEntity = item
    },
    //确认删除
    deleteShop(){
      this.$global.httpPostWithToken(this,'system/device/operate',{action:2,data:this.shopEntity}).then(res=>{
        this.isDeleteShow = !this.isDeleteShow
        this.getShopList()
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
