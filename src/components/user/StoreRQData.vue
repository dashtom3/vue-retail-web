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
            <el-radio-button label="10">10秒</el-radio-button>
            <el-radio-button label="30">30秒</el-radio-button>
            <el-radio-button label="60">60秒</el-radio-button>
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
          <el-date-picker v-if="rqForm.dimension == '0'" v-model="rqForm.dateHour" type="date" placeholder="选择日期"></el-date-picker>
          <el-date-picker v-if="rqForm.dimension == '1'" v-model="rqForm.dateDay" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
         <el-date-picker v-if="rqForm.dimension == '2'" v-model="rqForm.dateDay" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
         <el-date-picker v-if="rqForm.dimension == '3'" v-model="rqForm.dateDay" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
          <el-button type="primary" @click="searchInfo(rqForm.dimension)" class="searchButton">查询</el-button>
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
          <el-table :data="tableRQData" border stripe style="width: 100%">
            <el-table-column v-for="(value,key) in tableRQData[0]" :prop="key" :label="key" align="center">
        </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import analyseTable from "../../analyse/tableAnalyse"
export default {
  name: "",

  data() {
    return {
      rqOptions: [{ label: "上海辰尚信息科技有限公司", value: "1" }],
      rqForm: {
        name: "1",
        quota:'10',
        dimension:'0',
        dateHour:"",
        dateDay: "",
        startTime:'10:00',
        endTime:'20:00'
      },
      activeName: "first",
      tableRQData:[]
    };
  },
  mounted() {
    this.intEcharts()
     this.rqForm.dateHour = this.$dtime(this.$dtime(new Date()).format('x') - 24*3600*1000).format('YYYY-MM-DD')
     this.searchInfo('0')
  },
  methods: {
    getRQDataByHour(data){
        this.$global.httpGetWithToken(this, "show/hkrq/byHour", data).then(res => {
              this.analyseHourEacharts(res.data)
        });
    },
    getRQDataByDay(data){
      this.$global.httpGetWithToken(this, "show/hkrq/byDay", data).then(res => {
              this.analyseDayEcharts(res.data)
        });
    },
    getRQWeekDayByeachrts(data){
        this.$global.httpGetWithToken(this, "show/hkrq/byecharts", data).then(res => {
            var  seriesData = []
           for(var m of res.data.weekday){
             for(var key in m){
               seriesData.push({name:key,data:m[key],type:'bar',label: {
              normal: {
                show: true,
                position: "top"
              }
            }})
             }
           }
           this.$global.httpGetWithToken(this, "show/hkrq/byHour", data).then(item => {
              var tabledata = analyseTable.analyseQUYUDaypart(item.data,this.rqForm.startTime,this.rqForm.endTime)
              this.tableRQData = tabledata[0] 
              var xAxisData = []
              var legendData = []
              for(var m of tabledata[0]){
                  xAxisData.push(m['时间'])
              }
              for(var d in tabledata[0][0]){
                  legendData.push(d)
              }
              legendData.shift()
              this.setOptions(legendData,xAxisData,seriesData)
        });
              
        });
    },
    getRQUnweekDayByeachrts(data){
        this.$global.httpGetWithToken(this, "show/hkrq/byecharts", data).then(res => {
            var  seriesData = []
           for(var m of res.data.unweekday){
             for(var key in m){
               seriesData.push({name:key,data:m[key],type:'bar',label: {
              normal: {
                show: true,
                position: "top"
              }
            }})
             }
           }
           this.$global.httpGetWithToken(this, "show/hkrq/byHour", data).then(item => {
              var tabledata = analyseTable.analyseQUYUDaypart(item.data,this.rqForm.startTime,this.rqForm.endTime)
               this.tableRQData = tabledata[1] 
              var xAxisData = []
              var legendData = []
              for(var m of tabledata[1]){
                  xAxisData.push(m['时间'])
              }
              for(var d in tabledata[1][0]){
                  legendData.push(d)
              }
              legendData.shift()
              this.setOptions(legendData,xAxisData,seriesData)
        });
              
        });
    },
    searchInfo(val){
      if(val == '0'){
      var data = {
        deviceIds:null,
        from_time:this.$dtime(this.rqForm.dateHour).format('YYYY-MM-DD')+' '+this.rqForm.startTime,
        to_time:this.$dtime(this.rqForm.dateHour).format('YYYY-MM-DD')+' '+this.rqForm.endTime,
        staySecond:this.rqForm.quota
      }
      this.getRQDataByHour(data)
      }else if(val == '1'){
        var data = {
        deviceIds:null,
        from_time:this.$dtime(this.rqForm.dateDay[0]).format('YYYY-MM-DD')+' '+this.rqForm.startTime,
        to_time:this.$dtime(this.rqForm.dateDay[1]).format('YYYY-MM-DD')+' '+this.rqForm.endTime,
        staySecond:this.rqForm.quota
      }
      if(this.rqForm.dateDay == ''){
        this.$message({
          message: '请填入完整信息',
          type: 'warning'
          });
      }else{
        this.getRQDataByDay(data)
      }
      }else if(val == '2'){
        var data = {
        deviceIds:null,
        from_time:this.$dtime(this.rqForm.dateDay[0]).format('YYYY-MM-DD')+' '+this.rqForm.startTime,
        to_time:this.$dtime(this.rqForm.dateDay[1]).format('YYYY-MM-DD')+' '+this.rqForm.endTime,
        staySecond:this.rqForm.quota
      }
      if(this.rqForm.dateDay == ''){
        this.$message({
          message: '请填入完整信息',
          type: 'warning'
          });
      }else{
        this.getRQWeekDayByeachrts(data)
      }
      }else{
        var data = {
        deviceIds:null,
        from_time:this.$dtime(this.rqForm.dateDay[0]).format('YYYY-MM-DD')+' '+this.rqForm.startTime,
        to_time:this.$dtime(this.rqForm.dateDay[1]).format('YYYY-MM-DD')+' '+this.rqForm.endTime,
        staySecond:this.rqForm.quota
      }
      if(this.rqForm.dateDay == ''){
        this.$message({
          message: '请填入完整信息',
          type: 'warning'
          });
      }else{
        this.getRQUnweekDayByeachrts(data)
      }
      }
    },
    analyseHourEacharts(resData){
        var dayData = []
        resData.forEach(res =>{
          var time = this.$dtime(res.start_time).format('HH:mm')
          if(time >= this.rqForm.startTime && time <= this.rqForm.endTime){
            dayData.push(res)
          }
        })
        
         var data = {};
        for (var i = 0; i < dayData.length; i++) {
            var stay = dayData[i].areaName
            if (!data[stay]) {
                var arr = [];
                arr.push(dayData[i]);
                data[stay] = arr;
            } else {
                data[stay].push(dayData[i])
            }
        }
        var seriesData = []
        var legendData = []
        for(var key in data){
          var tempObjet = []
          var xAxisData = []
          for(var m of data[key]){
              tempObjet.push(m.stayPeopleCount)
              xAxisData.push(this.$dtime(m.start_time).format('HH:mm'))
          }
          legendData.push(key)
          seriesData.push({name:key,type:'bar',data:tempObjet,label: {
              normal: {
                show: true,
                position: "top"
              }
            }})
        }
        this.setOptions(legendData,xAxisData,seriesData)
        this.analyseHourData(dayData)
    },
    analyseDayEcharts(resData){
      var data = {};
        for (var i = 0; i < resData.length; i++) {
            var stay = resData[i].areaName
            if (!data[stay]) {
                var arr = [];
                arr.push(resData[i]);
                data[stay] = arr;
            } else {
                data[stay].push(resData[i])
            }
        }
          var seriesData = []
        var legendData = []
        
        for(var key in data){
          var tempObjet = []
          var xAxisData = []
          for(var m of data[key]){
              tempObjet.push(m.stayPeopleCount)
             xAxisData.push(m.time)
          }
          legendData.push(key)
          seriesData.push({name:key,type:'bar',data:tempObjet,label: {
              normal: {
                show: true,
                position: "top"
              }
            }})
        }
        this.setOptions(legendData,xAxisData,seriesData)
      this.analyseDayDate(resData)
    },
    analyseDayDate(resData){
         var data = {};
        for (var i = 0; i < resData.length; i++) {
            var stay = resData[i].time
            if (!data[stay]) {
                var arr = [];
                arr.push(resData[i]);
                data[stay] = arr;
            } else {
                data[stay].push(resData[i])
            }
        }
        for (var m in data) {
            var data1 = {}
            for (var k of data[m]) {
                if (!data1[k.areaName]) {
                    var arr1 = [];
                    arr1.push(k);
                    data1[k.areaName] = arr1;
                    data[m] = data1
                } else {
                    data1[k.areaName].push(k)
                    data[m] = data1
                }
            }
        }
        var tableDataArr = []
        for(var key in data){
          var temp = {}
          for(var m in data[key]){
            var stayPeopleCount = 0
            for(var n of data[key][m]){
                stayPeopleCount = n.stayPeopleCount
            }
            temp['时间'] = key;
            temp[m] = stayPeopleCount
          }
          tableDataArr.push(temp)
        }
        this.tableRQData = tableDataArr
    },
    analyseHourData(dayData){
          var data = {};
        for (var i = 0; i < dayData.length; i++) {
            var stay =this.$dtime(dayData[i].start_time).format('HH:mm') 
            if (!data[stay]) {
                var arr = [];
                arr.push(dayData[i]);
                data[stay] = arr;
            } else {
                data[stay].push(dayData[i])
            }
        }
        for (var m in data) {
            var data1 = {}
            for (var k of data[m]) {
                if (!data1[k.areaName]) {
                    var arr1 = [];
                    arr1.push(k);
                    data1[k.areaName] = arr1;
                    data[m] = data1
                } else {
                    data1[k.areaName].push(k)
                    data[m] = data1
                }
            }
        }
        var tableDataArr = []
        for(var key in data){
          var temp = {}
          for(var m in data[key]){
            var stayPeopleCount = 0
            for(var n of data[key][m]){
                stayPeopleCount = n.stayPeopleCount
            }
            temp['时间'] = key;
            temp[m] = stayPeopleCount
          }
          tableDataArr.push(temp)
        }
        this.tableRQData = tableDataArr
    },
    exportToExcel() {
      //excel数据导出
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../assets/js/Export2Excel");
        const list = this.tableRQData;
        var data = []
        for(var m of list){
          var temp = []
           var tHeader = []
          for(var key in m){
              tHeader.push(key)
             temp.push(m[key])
          }
          // data.push(tHeader)
          data.push(temp)
        }
        // const data = this.formatJson(filterVal, list);
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
        tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:[]
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : []
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : []
      });
    },
    setOptions(legendData,xAxisData,seriesData) {
        var myChart = echarts.init(document.getElementById("main"));
        myChart.setOption({
          legend: {
              data:legendData
           },
           xAxis : [
          {
            type : 'category',
            data : xAxisData
         }
        ],
         series:seriesData
        })
    }
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
.exportButton {
  text-align: right;
}
</style>
