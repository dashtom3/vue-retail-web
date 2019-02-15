<template>
  <div>
    <div class="title">
      <el-form :model="zlForm" size="mini">
      <el-form-item label="实体">
          <el-select class="rlselect" v-model="zlForm.name" placeholder="请选择">
            <el-option v-for="item in zlOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker  v-model="zlForm.dateDay" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
         
        </el-form-item>
        <el-form-item label="时间">
          <el-time-select class="timeSelect" placeholder="起始时间" v-model="zlForm.startTime" :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00'
          }">
          </el-time-select>
          <el-time-select class="timeSelect" placeholder="结束时间" v-model="zlForm.endTime" :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: zlForm.startTime
          }">
          </el-time-select>
          <el-button type="primary" @click="searchInfo(zlForm)" class="searchButton">查询</el-button>
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
      zlOptions: [{ label: "上海辰尚信息科技有限公司", value: "1" }],
      zlForm: {
        name: "1",
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
    searchInfo(val) {
      console.log(val);
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
