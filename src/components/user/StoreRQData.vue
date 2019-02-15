<template>
  <div>
    <div class="title">
      <el-form :model="rqForm" size="mini">
      <el-form-item label="实体">
          <el-select class="rlselect" v-model="rqForm.name" placeholder="请选择">
            <el-option v-for="item in rqOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标">
          <el-radio-group v-model="rqForm.quota" size="small">
            <el-radio-button label="0">10秒</el-radio-button>
            <el-radio-button label="1">30秒</el-radio-button>
            <el-radio-button label="2">60秒</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="维度">
          <el-radio-group v-model="rqForm.dimension" size="small">
            <el-radio-button label="0">小时</el-radio-button>
            <el-radio-button label="1">天</el-radio-button>
            <el-radio-button label="2">工作日</el-radio-button>
            <el-radio-button label="3">节假日</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker  v-model="rqForm.dateDay" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
         
        </el-form-item>
        <el-form-item label="时间">
          <el-time-select class="timeSelect" placeholder="起始时间" v-model="rqForm.startTime" :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00'
          }">
          </el-time-select>
          <el-time-select class="timeSelect" placeholder="结束时间" v-model="rqForm.endTime" :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: rqForm.startTime
          }">
          </el-time-select>
          <el-button type="primary" @click="searchInfo(rqForm)" class="searchButton">查询</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div>
       <div id="main" style="width:100%;height:400px"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",

  data() {
    return {
      rqOptions: [{ label: "上海辰尚信息科技有限公司", value: "1" }],
      rqForm: {
        name: "1",
        quota:'0',
        dimension:'0',
        dateDay: "",
        startTime:'',
        endTime:''
      },
    };
  },
  mounted() {
    this.intEcharts()
  },
  methods: {
    searchInfo(val){

    },
    intEcharts() {
      var myChart = echarts.init(document.getElementById("main"));
      // 显示标题，图例和空的坐标轴
      myChart.setOption({
        grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
       },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
          }
        ]
      });
    },
    setOptions() {}
  }
};
</script>

<style  scoped>
.title {
  padding: 10px;
}
.titleinput {
  width: 250px;
  padding-left: 15px;
}
</style>
