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
          <el-date-picker v-model="zlForm.dateDay" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>

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
      <p class="stateSpicy_title">日客流和日均逗留时长</p>
      <div class="alltitle">
        <div class="alltitle_left">
          <div class="left_title">
            <div class="title_all">
              <span>最小日客流量</span>
              <span>{{showTitle.minDayData}}</span>
            </div>
            <div class="title_all">
              <span>最大日客流量</span>
              <span>{{showTitle.maxDayData}}</span>
            </div>
          </div>
          <div id="flowTotal" style="width:80%;height:280px;display:inline-block"></div>
        </div>
        <div class="alltitle_left">
          <div class="left_title">
            <div class="title_all">
              <span>最小日均</br>逗留时长</span>
              <span>{{showTitle.minAvgData}}分</span>
            </div>
            <div class="title_all">
              <span>最大日均</br>逗留时长</span>
              <span>{{showTitle.maxAvgData}}分</span>
            </div>
          </div>
          <div id="TotalStateArg" style="width:80%;height:280px;display:inline-block"></div>
        </div>
      </div>
    </div>
     <div>
    <p class="stateSpicy_title">商品关注</p>
    <div id="hotPicture" style="width: 80%;height:300px;"></div>
  </div>
  <div>
    <p class="titleBig_distance"></p>
    <p class="stateSpicy_title">消费者画像</p>
    <div id="sexAnalyse" style="width: 40%;height:400px;display:inline-block"></div>
    <div id="ageAnalyse" style="width: 40%;height:400px;display:inline-block"></div>
  </div>
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
        startTime: "10:00",
        endTime: "20:00"
      },
      showTitle:{
        minDayData:'',
        maxDayData:'',
        minAvgData:'',
        maxAvgData:''
      },
       /*******店小喵人脸识别字段解释**********/ 
      sexField: {
        femaleNum: "女性",
        maleNum: "男性"
      },
      ageField: {
        zeroEighteen: "0-18",
        eighteenTwentyEight: "19-29",
        twentyEightForty: "30-39",
        fortySixtyFive: "40-64",
        sixtyFiveMore: "65+"
      }
    };
  },
  mounted() {
    this.intFlowTotal();
    this.intTotalStateArg();
    this.intHotEchart()
    this.intAgeEcharts()
    this.intSexEcharts()
    
  },
  methods: {
    searchInfo(val) {
      if(this.zlForm.dateDay ==""){
        this.$message({
          message: '请填入完整信息',
          type: 'warning'
        });
      }else{
         console.log(val);
         this.getRLdayData()
         this.getDLDayData()
         this.getRQdata()
         this.getPeopleAnalyseData()
      }
     
    },
    getRLdayData(){
      var data = {
        id: 1, //通过接口获取
        from_time: this.$dtime(this.zlForm.dateDay[0]).format('YYYY-MM-DD')+' '+this.zlForm.startTime,
        to_time: this.$dtime(this.zlForm.dateDay[1]).format('YYYY-MM-DD')+' '+this.zlForm.endTime
      }
      var resData = []
      this.$global.httpGet("", "show/hkrl/byday", data).then(res => {
          res.data.forEach(res =>{
            resData.push(res.enter)
          })
          this.showTitle.minDayData = Math.min.apply(null,resData)
          this.showTitle.maxDayData = Math.max.apply(null,resData)
          var avgData = this.avg(resData).toFixed(0)
          //更新日客流量echarts
          var myChart = echarts.init(document.getElementById("flowTotal"));
          myChart.setOption({
          series: [
          {
            name: "客流量",
            type: "gauge",
            min: this.showTitle.minDayData,
            max: this.showTitle.maxDayData,
            detail: { formatter: "{value}" },
            data: [{ value: avgData }]
          }
        ]
      });
        });
    },
    getDLDayData(){
       var data = {
        from_time: this.$dtime(this.zlForm.dateDay[0]).format("YYYY-MM-DD"),
        to_time: this.$dtime(this.zlForm.dateDay[1]).format("YYYY-MM-DD"),
        from_hour: 5,
        hours: 24
      };
      var resData = []
      this.$global.httpGet("", "show/hkdl/byDay", data).then(res => {
          res.data.forEach(res =>{
            resData.push(res.time)
          })
           this.showTitle.minAvgData = Math.min.apply(null,resData).toFixed(0)
          this.showTitle.maxAvgData = Math.max.apply(null,resData).toFixed(0)
          var avgData = this.avg(resData).toFixed(0)
          var myChart = echarts.init(document.getElementById("TotalStateArg"));
          myChart.setOption({
              series: [
                {
                  name: "客均逗留时长",
                  type: "gauge",
                  min: this.showTitle.minAvgData,
                  max: this.showTitle.maxAvgData,
                  detail: { formatter: "{value}" },
                  data: [{ value: avgData }]
                }
              ]
          })
      })
    },
    getRQdata(){
      var data = {
        from_time: this.$dtime(this.zlForm.dateDay[0]).format("YYYY-MM-DD")+' '+this.zlForm.startTime,
        to_time: this.$dtime(this.zlForm.dateDay[1]).format("YYYY-MM-DD")+' '+this.zlForm.endTime,
      };
      this.$global.httpGet("", "show/hkrq/byall", data).then(res => {
          var staydata = {};
        for (var i = 0; i < res.data.length; i++) {
          if (!staydata[res.data[i].name]) {
            var arr = [];
            arr.push(res.data[i]);
            staydata[res.data[i].name] = arr;
          } else {
            staydata[res.data[i].name].push(res.data[i]);
          }
        }
        var seriesData = []
        var yAxisData = [];
        for(var key in staydata){
           var temp = []
           var yAxisTemp = []
          for(var m of staydata[key]){
            temp.push(m.stayPeopleCount)
            yAxisTemp.push(m.areaName)
          } 
          yAxisData = yAxisTemp
          seriesData.push({name:key,type:'bar',data:temp,label: { normal: { show: true, position: "insideRight" } },})
        }
        var myChart = echarts.init(document.getElementById("hotPicture"));
        myChart.setOption({
           yAxis: {
            type: "category",
            data: yAxisData
          },
          series: seriesData
        })
      })
    },
    getPeopleAnalyseData(){
        var data = {
        from_time: this.$dtime(this.zlForm.dateDay[0]).format("YYYY-MM-DD"),
        to_time: this.$dtime(this.zlForm.dateDay[1]).format("YYYY-MM-DD"),
        type: 0
      };
      this.$global.httpGet("", "show/dxmrl/bypeople", data).then(res => {
        var AllNum = Number(res.data.maleNum) + Number(res.data.femaleNum);
        var sexData = {};
        for (var m in res.data) {
          if (this.sexField[m]) {
            sexData[this.sexField[m]] = res.data[m];
          }
        }
        var seriesSex = [];
        for (var k in sexData) {
          seriesSex.push({ name: k, value: sexData[k] });
        }
        //更新性别分析echarts
        var myChartSex = echarts.init(document.getElementById("sexAnalyse"));
        myChartSex.setOption({
          series: [
            {
              data: seriesSex
            }
          ]
        });
        var ageData = {};
        for (var n in res.data) {
          if (this.ageField[n]) {
            ageData[this.ageField[n]] = res.data[n];
          }
        }
        var seriesAge = [];
        for (var l in ageData) {
          seriesAge.push({ name: l, value: ageData[l] });
        }
        //更新年龄分析echarts
        var myChartAge = echarts.init(document.getElementById("ageAnalyse"));
        myChartAge.setOption({
          series: [
            {
              data: seriesAge
            }
          ]
        });
      });
    },
    //客流总量仪表盘初始化
    intFlowTotal() {
      var myChart = echarts.init(document.getElementById("flowTotal"));
      myChart.setOption({
        title: {
          text: "日均客流量",
          subtext: "(人次)",
          top: "200",
          left: "center",
          subtextStyle: {
            fontSize: 16,
            fontWeight: "normal",
            color: "#000"
          }
        },
        axisLabel: {
          distance: 5,
          fontSize: 10,
          formatter: function(v) {
            return v.toFixed(0);
          }
        },
        series: [
          {
            name: "客流量",
            type: "gauge",
            min: 0,
            max: 0,
            detail: { formatter: "{value}" },
            data: [{ value: 0 }]
          }
        ]
      });
    },
    //客流平均逗留时长仪表盘初始化
    intTotalStateArg() {
      var myChart = echarts.init(document.getElementById("TotalStateArg"));
      myChart.setOption({
        title: {
          text: "客均逗留时长",
          subtext: "(分钟)",
          top: "200",
          left: "center",
          subtextStyle: {
            fontSize: 16,
            fontWeight: "normal",
            color: "#000"
          }
        },
        axisLabel: {
          distance: 5,
          fontSize: 10,
          formatter: function(v) {
            return v.toFixed(0);
          }
        },
        series: [
          {
            name: "客均逗留时长",
            type: "gauge",
            min: 0,
            max: 0,
            detail: { formatter: "{value}" },
            data: [{ value: 0 }]
          }
        ]
      });
    },
    //商品关注echarts初始化
    intHotEchart() {
        var myChart = echarts.init(document.getElementById("hotPicture"));
        myChart.setOption({
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: ["10秒以上", "30秒以上", "60秒以上"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: "category",
            data: []
          },
          series: []
        });
      },
      //消费者画像 年龄比例
      intAgeEcharts() {
        var myChart = echarts.init(document.getElementById("ageAnalyse"));
        myChart.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "right",
            data: ["0-18", "18-28", "19-29", "30-39", "40-64", "65+"]
          },
          graphic: {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text: "年龄比例",
              textAlign: "center",
              width: 50,
              height: 50,
              fontSize: 25
            }
          },
          series: [
            {
              name: "年龄比例",
              type: "pie",
              radius: ["30%", "50%"],
              avoidLabelOverlap: false,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: "{d}%"
                  },
                  labelLine: { show: true }
                }
              },
  
              data: []
            }
          ]
        });
      },
      //消费者画像 男女比例
      intSexEcharts() {
        var myChart = echarts.init(document.getElementById("sexAnalyse"));
        myChart.setOption({
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "right",
            data: ["男性", "女性"]
          },
          graphic: {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text: "男女比例",
              textAlign: "center",
              width: 50,
              height: 50,
              fontSize: 25
            }
          },
          series: [
            {
              name: "男女比例",
              type: "pie",
              radius: ["30%", "50%"],
              avoidLabelOverlap: false,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: "{d}%"
                  },
                  labelLine: { show: true }
                }
              },
              data: []
            }
          ]
        });
      },
      avg(array) {
      //封装求平均值函数
      var len = array.length;
      var sum = 0;
      for (var i = 0; i < len; i++) {
        sum += Number(array[i]);
      }
      return sum / len;
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
.alltitle {
  padding-top: 15px;
  display: flex;
  justify-content: flex-start;
}
.alltitle_left {
  width: 40%;
  display: inline-block;
}
.left_title {
  display: flex;
  justify-content: space-around;
}
.title_all {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #409eff;
  width: 100px;
  height: 80px;
  justify-content: center;
  color: #ffffff;
}
.title_all span {
  padding-bottom: 5px;
}
.stateSpicy_title {
  font-size: 20px;
  padding: 8px;
}
.titleBig_distance {
  height: 35px;
}
.daytotal_title {
  font-size: 25px;
  padding: 15px;
}
</style>
