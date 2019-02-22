<template>
  <div>
    <div class="title">
      <el-form ref="form" :model="dlForm" label-width="50px" size="mini">
        <el-form-item label="对象">
          <el-select class="rlselect" v-model="dlForm.name" placeholder="请选择">
            <el-option v-for="item in dlOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标">
          <el-radio-group v-model="dlForm.quota" size="small">
            <el-radio-button label="enter">滞留人数</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="维度">
          <el-radio-group v-model="dlForm.dimension" size="small">
            <el-radio-button label="0">时段</el-radio-button>
            <el-radio-button label="1">天</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-if="dlForm.dimension == '0'" v-model="dlForm.dateHour" type="date" placeholder="选择日期"></el-date-picker>
          <el-date-picker v-if="dlForm.dimension == '1'" v-model="dlForm.dateDay" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
         <el-button type="primary" @click="searchInfo(dlForm.dimension)" class="searchButton">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="显示图表" name="first">
          <!-- <P class="showTitle">{{dlForm.name}}</P> -->
          <div id="main" style="width:100%;height:500px"></div>
        </el-tab-pane>
        <el-tab-pane label="显示数据" name="second">
          <p class="exportButton">
            <el-button type="primary" size="small" icon="el-icon-download" @click="exportToExcel">导出数据</el-button>
          </p>
          <el-table :data="tableRLData" border stripe style="width: 100%">
            <el-table-column prop="date" align="center" label="时间">
            </el-table-column>
            <el-table-column prop="time" align="center" label="滞留人数">
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
      dlOptions: [{ label: "上海辰尚信息科技有限公司", value: "1" }],
      dlForm: {
        name: "1",
        quota: "enter",
        dimension: "0",
        dateHour: "",
        dateDay: ""
      },
      activeName: "first",
      tableRLData: []
    };
  },
  mounted() {
    this.intEcharts();
    this.dlForm.dateHour = this.$dtime(this.$dtime(new Date()).format('x') - 24*3600*1000).format('YYYY-MM-DD')
    this.searchInfo('0')
  },
  methods: {
    searchInfo(val) {
      var deviceIds = 1 //通过调用接口获取
      if(val == '0'){
          var data = {
              from_time:this.$dtime(this.dlForm.dateHour).format('YYYY-MM-DD'),
              to_time:this.$dtime(this.dlForm.dateHour).format('YYYY-MM-DD'),
              from_hour:9,
              hours:18
          }
          this.getHourData(data)
      }else{
        var data = {
          from_time:this.$dtime(this.dlForm.dateDay[0]).format('YYYY-MM-DD'),
          to_time:this.$dtime(this.dlForm.dateDay[1]).format('YYYY-MM-DD'),
          from_hour:5,
          hours:24
        }
        this.getDayData(data)
      }
    },
    getDayData(data) {
      this.$global.httpGetWithToken(this, "show/hkdl/byDay", data).then(res => {
              var tableData = []
              res.data.forEach(item =>{
                tableData.push({
                    date:item.date,
                    time:Number(item.time).toFixed(0)
                })
              })
              this.tableRLData = tableData
              this.analyseEachrts(this.tableRLData)
        });
    },
    getHourData(data) {
      this.$global.httpGetWithToken(this, "show/hkdl/byHour", data).then(res => {
              console.log(res.data[0].data)
              var tableData = []
              res.data[0].data.forEach(item =>{
                var timeRange = this.$dtime(item.from).format('HH:mm')+'~'+this.$dtime(item.to).format('HH:mm')
                  tableData.push({
                    date:item.name+'('+ timeRange +')',
                    time:Number(item.time).toFixed(0)
                  })
              })
              this.tableRLData = tableData
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
              seriesdata.push(item.time);
              legendata = ["滞留人数"];
              name = '滞留人数'
          });
          this.setOptions(legendata, xAxisdata, seriesdata,name);
    },
    exportToExcel() {
      //excel数据导出
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../assets/js/Export2Excel");
        const tHeader = ["日期", "滞留人数"];
        const filterVal = ["date", "time"];
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
