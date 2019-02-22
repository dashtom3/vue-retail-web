<template>
  <div>
    <div class="title">
      <el-form ref="form" :model="rlForm" label-width="50px" size="mini">
        <el-form-item label="对象">
          <el-select class="rlselect" v-model="rlForm.name" placeholder="请选择">
            <el-option v-for="item in rlOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标">
          <el-radio-group v-model="rlForm.quota" size="small">
            <el-radio-button label="enter">进人数</el-radio-button>
            <el-radio-button label="exit">出人数</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="维度">
          <el-radio-group v-model="rlForm.dimension" size="small">
            <el-radio-button label="0">小时</el-radio-button>
            <el-radio-button label="1">天</el-radio-button>
            <el-radio-button label="2">周</el-radio-button>
            <el-radio-button label="3">月</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-if="rlForm.dimension == '0'" v-model="rlForm.dateHour" type="date" placeholder="选择日期"></el-date-picker>
          <el-date-picker v-if="rlForm.dimension == '1'" v-model="rlForm.dateDay" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          <el-date-picker v-if="rlForm.dimension == '2'" v-model="rlForm.dateWeekStart" class="timeSelect" type="week" format="yyyy 第 WW 周" placeholder="起始周"></el-date-picker>
          <el-date-picker v-if="rlForm.dimension == '2'" v-model="rlForm.dateWeekEnd" class="timeSelect" type="week" format="yyyy 第 WW 周" placeholder="结束周"></el-date-picker>
          <el-date-picker v-if="rlForm.dimension == '3'" v-model="rlForm.dateMonthStart" class="timeSelect" type="month" placeholder="起始月"></el-date-picker>
          <el-date-picker v-if="rlForm.dimension == '3'" v-model="rlForm.dateMonthEnd" class="timeSelect" type="month" placeholder="结束月"></el-date-picker>
          <el-button v-if="rlForm.dimension == '3' || rlForm.dimension == '2'" type="primary" @click="searchInfo(rlForm.dimension)" class="searchButton">查询</el-button>
        </el-form-item>
        <el-form-item label="时间" v-if="rlForm.dimension=='0' || rlForm.dimension=='1'">
          <el-time-select class="timeSelect" placeholder="起始时间" v-model="rlForm.startTime" :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00'
          }">
          </el-time-select>
          <el-time-select class="timeSelect" placeholder="结束时间" v-model="rlForm.endTime" :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: rlForm.startTime
          }">
          </el-time-select>
          <el-button type="primary" @click="searchInfo(rlForm.dimension)" class="searchButton">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="显示图表" name="first">
          <!-- <P class="showTitle">{{rlForm.name}}</P> -->
          <div id="main" style="width:100%;height:500px"></div>
        </el-tab-pane>
        <el-tab-pane label="显示数据" name="second">
          <p class="exportButton">
            <el-button type="primary" size="small" icon="el-icon-download" @click="exportToExcel">导出数据</el-button>
          </p>
          <el-table :data="tableRLData" border stripe style="width: 100%">
            <el-table-column prop="date" align="center" label="时间">
            </el-table-column>
            <el-table-column prop="enter" align="center" label="进店人数">
            </el-table-column>
            <el-table-column prop="exit" align="center" label="离店人数">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",

  data() {
    return {
      rlOptions: [{ label: "上海辰尚信息科技有限公司", value: "1" }],
      rlForm: {
        name: "1",
        quota: "enter",
        dimension: "0",
        dateHour: "",
        dateDay: "",
        dateWeekStart: "",
        dateWeekEnd: "",
        dateMonthStart: "",
        dateMonthEnd: "",
        startTime: "10:00",
        endTime: "20:00"
      },
      activeName: "first",
      tableRLData: []
    };
  },
  mounted() {
    this.intEcharts();
    this.rlForm.dateHour = this.$dtime(this.$dtime(new Date()).format('x') - 24*3600*1000).format('YYYY-MM-DD')
    this.searchInfo('0')
  },
  methods: {
    searchInfo(val) {
      var deviceIds = 1 //通过调用接口获取
      if (val == "0") {
        var data = {//天
          deviceIds: deviceIds,
          from_time:(this.$dtime(this.rlForm.dateHour).format("YYYY-MM-DD") +" " +this.rlForm.startTime),
           to_time:(this.$dtime(this.rlForm.dateHour).format("YYYY-MM-DD") +   " " +this.rlForm.endTime),
          dimension: 0
        };
        this.getHourData(data);
      } else if (val == "1") {//日
        var data = {
          deviceIds: deviceIds,
          from_time:this.$dtime(this.rlForm.dateDay[0]).format("YYYY-MM-DD") + " " + this.rlForm.startTime,
          to_time: this.$dtime(this.rlForm.dateDay[1]).format("YYYY-MM-DD") + " " + this.rlForm.endTime,
          dimension: 1
        };
        this.getDayData(data);
      }else if(val == '2'){//周
          var data = {
          deviceIds: deviceIds,
          from_time:this.$dtime(this.rlForm.dateWeekStart).format("YYYY-MM-DD"),
          to_time: this.$dtime(new Date(this.rlForm.dateWeekEnd).getTime()+6*24*3600*1000).format("YYYY-MM-DD"),
          dimension: 2
        };
        this.getWeekData(data)
      }else{
          var data = {//月
          deviceIds: deviceIds,
          from_time:this.$dtime(this.rlForm.dateMonthStart).format("YYYY-MM-DD"),
          to_time: this.getCountDays(this.$dtime(this.rlForm.dateMonthEnd).format("YYYY-MM")),
          dimension: 3
        };
        this.getMonthData(data)
      }
    },
    getHourData(data) {
      this.$global.httpGetWithToken(this, "system/getrldata/bydimension", data).then(res => {
          this.tableRLData = res.data;
         this.analyseEachrts(this.tableRLData)
        });
    },
    getDayData(data) {
      this.$global.httpGetWithToken(this, "system/getrldata/bydimension", data).then(res => {
          this.tableRLData = res.data;
          this.analyseEachrts(this.tableRLData)
        });
    },
    getWeekData(data){
       this.$global.httpGetWithToken(this, "system/getrldata/bydimension", data).then(res => {
          this.tableRLData = res.data;
          this.analyseEachrts(this.tableRLData)
        });
    },
    getMonthData(data){
       this.$global.httpGetWithToken(this, "system/getrldata/bydimension", data).then(res => {
           this.tableRLData = res.data;
           this.analyseEachrts(this.tableRLData)
        });
    },
    analyseEachrts(tableRLData){
         var xAxisdata = [];
          var seriesdata = [];
          var legendata = [];
          var name = ''
          tableRLData.forEach(item => {
            xAxisdata.push(item.date);
            if (this.rlForm.quota == "enter") {
              seriesdata.push(item.enter);
              legendata = ["进店人数"];
              name = "进店人数"
            } else {
              seriesdata.push(item.exit);
              legendata = ["离店人数"];
              name = '离店人数'
            }
          });
          this.setOptions(legendata, xAxisdata, seriesdata,name);
    },
    exportToExcel() {
      //excel数据导出
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../assets/js/Export2Excel");
        const tHeader = ["日期", "进店人数", "出店人数"];
        const filterVal = ["date", "enter", "exit"];
        const list = this.tableRLData;
        const data = this.formatJson(filterVal, list);
        var DATE = this.$dtime(new Date()).format("YYYY-MM-DD");
        export_json_to_excel(tHeader, data, DATE + "客流数据");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    intEcharts() {
      var myChart = echarts.init(document.getElementById("main"));
      // 显示标题，图例和空的坐标轴
      myChart.setOption({
        legend: {
          data: []
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "",
            data: [],
            type: "line",
            smooth: true,
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          }
        ]
      });
    },
    setOptions(legendata, xAxisdata, seriesdata,name) {
      var myChart = echarts.init(document.getElementById("main"));
      // 显示标题，图例和空的坐标轴
      myChart.setOption({
        legend: {
          data: legendata
        },
        xAxis: {
          data: xAxisdata
        },
        series: [
          { name:name,
            data: seriesdata
          }
        ]
      });
    },
    getCountDays(ym) {
      var curDate = new Date(ym);
      /* 获取当前月份 */
      var curMonth = curDate.getMonth();
      /* 生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(curMonth + 1);
      /* 将日期设置为0 */
      curDate.setDate(0);
      /* 返回当月的天数 */
      return ym+'-'+curDate.getDate();
  }
  }
};
</script>

<style  scoped>
.title {
  padding-top: 10px;
}
.line {
  width: 20px;
  text-align: center;
}
.rlselect {
  width: 250px;
}
.timeSelect {
  width: 170px;
}
.showTitle {
  text-align: center;
}
.searchButton {
  margin-left: 30px;
}
.exportButton {
  text-align: right;
}
</style>
