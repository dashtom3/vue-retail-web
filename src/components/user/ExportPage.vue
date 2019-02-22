<template>
  <div>
    <el-form :model="downloadForm" size="mini">
      <el-form-item label="实体">
        <el-select class="rlselect" v-model="downloadForm.name" placeholder="请选择">
          <el-option v-for="item in downOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="downloadForm.dateDay" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>

      </el-form-item>
      <el-form-item label="时间">
        <el-time-select class="timeSelect" placeholder="起始时间" v-model="downloadForm.startTime" :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00'
          }">
        </el-time-select>
        <el-time-select class="timeSelect" placeholder="结束时间" v-model="downloadForm.endTime" :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: downloadForm.startTime
          }">
        </el-time-select>
        <!-- <el-button type="primary" @click="searchInfo(downloadForm)" class="searchButton">查询</el-button> -->
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="openDialog(downloadForm)" size="mini">生成pdf数据报告</el-button>
    <!-- <a href="http://127.0.0.1:8002/export/download" download>导出数据报告</a> -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%"  :close-on-click-modal="false"  center>
      <div v-loading="loading2" element-loading-text="正在生成报告,请耐心等待" style="height:100px">
      <div class="dialogTxt">{{showMessage}}</div>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <a v-if="isDisabled==true" class="downloadButton"  @click="exportSure()" href="http://127.0.0.1:8002/export/download" download>确 定</a>
        <el-button type="primary" v-if="isDisabled==false"  @click="exportSure()" size="mini" >确 定</el-button>
      </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "",

  data() {
    return {
      downOptions: [{ label: "上海辰尚信息科技有限公司", value: "1" }],
      downloadForm: {
        name: "1",
        dateDay: "",
        startTime: "10:00",
        endTime: "20:00"
      },
      dialogVisible: false,
      closeClick:false,
      loading2:true,
      showMessage:'',
      isDisabled:true,
    };
  },
  mounted() {},
  methods: {
    openDialog(val) {
      if (val.dateDay == "") {
        this.$message({
          message: "输入框信息不完整!",
          type: "warning"
        });
      }else{
        this.dialogVisible = true
        this.loading2 = true
        this.getData()
      }
      
    },
    getData(){
      var data = {
        id:1,
        from_time:this.$dtime(this.downloadForm.dateDay[0]).format('YYYY-MM-DD')+' '+this.downloadForm.startTime,
        to_time:this.$dtime(this.downloadForm.dateDay[1]).format('YYYY-MM-DD')+' '+this.downloadForm.endTime
      }
      this.$global.httpGetWithToken(this, "export/pdf", data).then(res => {
                    console.log(res)
                    if(res.status == 1){
                      this.loading2 = false
                      this.showMessage = '数据报告已生成,请选择是否下载?'
                      this.isDisabled = true
                    }else{
                      this.loading2 = false
                      this.showMessage = "数据报告生成失败,请确认后重新生成!"
                      this.isDisabled = false
                    }
        });
    },
    exportSure(){
      this.dialogVisible = false
    }
  }
};
</script>

<style  scoped>
.downloadButton{
  margin-left: 25px;
  width: 20px;
  height: 14px;
  background: #409EFF;
  padding: 6px 13px;
  border-radius: 3px;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
}
.dialogTxt{
  /* text-align: center */
}
.dialog-footer{
 text-align: center;
 margin-top: 30px;
}
</style>
