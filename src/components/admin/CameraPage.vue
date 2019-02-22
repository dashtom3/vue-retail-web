<template>
<div class="allcameraPage">
  <div class="cameraPage">
    <div>
      <p class="title">顾客综合数据智能图谱</p>
      <!-- <p class="titleBig_distance"></p> -->
      <p class="big_title">数据总览</p>
      <p class="titleHead_distance">{{searchTime.from_date}}-{{searchTime.to_date}} &nbsp ({{searchTime.from_time}}~{{searchTime.to_time}}) </p>
      <p class="titleHead_distance">客流总量:
        <span>{{analyse_titleDate.allPeople}}</span>
      </p>
      <div class="alltitle">
        <div class="alltitle_left">
          <div class="left_title">
            <div class="title_all">
              <span>最小日客流量</span>
              <span>{{analyse_titleDate.minAvg}}</span>
            </div>
            <div class="title_all">
              <span>最大日客流量</span>
              <span>{{analyse_titleDate.maxAvg}}</span>
            </div>
          </div>
          <div id="flowTotal" style="width:100%;height:400px;display:inline-block"></div>
        </div>
        <div class="alltitle_left">
          <div class="left_title">
            <div class="title_all">
              <span>最小日均</br>逗留时长</span>
              <span>{{analyse_titleDate.minStateAvg}}分</span>
            </div>
            <div class="title_all">
              <span>最大日均</br>逗留时长</span>
              <span>{{analyse_titleDate.maxStateAvg}}分</span>
            </div>
          </div>
          <div id="TotalStateArg" style="width:100%;height:400px;display:inline-block"></div>
        </div>
      </div>
    </div>
    <div>
      <p class="stateSpicy_title">商品关注</p>
      <div id="hotPicture" style="width: 100%;height:500px;"></div>
    </div>
    <div>
      <p class="titleBig_distance"></p>
      <p class="daytotal_title">消费者画像</p>
      <div id="sexAnalyse" style="width: 48%;height:400px;display:inline-block"></div>
      <div id="ageAnalyse" style="width: 50%;height:400px;display:inline-block"></div>
    </div>
    <p class="titleBig_distance"></p>
    <p class="big_title">监测分析</p>
    <div>
      <p class="titleBig_distance"></p>
      <p class="daytotal_title">客流情况</p>
      <p class="small_title">日客流量变化</p>
      <div id="day_camera" style="width: 100%;height:600px;"></div>
      <p class="small_title">日客流量变化详情</p>
      <el-table :data="dayTotalData" border style="min-width:1080px">
        <el-table-column v-for="(value,key,index) in dayTotalData[0]" :prop="key" :label="key" align="center">
        </el-table-column>
      </el-table>
    </div>

    <div>
      <p class="titleBig_distance"></p>
      <p class="small_title">日逗留时长变化</p>
      <div id="stateArg" style="width: 100%;height:600px;"></div>
      <p class="small_title">日逗留时长变化详情</p>
      <el-table :data="averageStateTime" border style="min-width:1080px">
        <el-table-column v-for="(value,key,index) in averageStateTime[0]" :prop="key" :label="key" align="center">
        </el-table-column>
      </el-table>
    </div>

    <div class="pro_part" v-for="n in timePart.length">
      <div class="part_echarts">
        <p class="small_title">分时段客流量变化</p>
        <div :id="'main_camera'+ n" style="width: 100%;height:700px;"></div>
      </div>
      <div class="part_table">
        <p class="small_title">分时段客流量变化详情</p>
        <el-table :data="totalPTableData[n-1]" border style="min-width:850px">
          <el-table-column v-for="(value,key,index) in totalPTableData[n-1][0]" :prop="key" :label="key" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="pro_part" v-for="n in timeSpicyTemp.length">
      <!-- <p class="titleBig_distance"></p> -->
      <div class="part_echarts">
        <p class="small_title">分时段客人逗留时长变化</p>
        <div :id="'timeSpicy'+n" style="width: 100%;height:600px;"></div>
      </div>
      <div class="part_table">
        <p class="small_title">分时段客人逗留时长变化详情</p>
        <el-table :data="timeTotalDate[n-1]" border style="min-width:850px">
          <el-table-column v-for="(value,key,index) in timeTotalDate[n-1][0]" :prop="key" :label="key" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <p class="daytotal_title">关注情况</p>
    <p class="stateSpicy_title">日关注度分布</p>
    <div class="pro_part" v-for="n in stayTenTemp.length">
      <div class="part_echarts">
      <p class="third_title">停留10秒以上客流分布对比</p>
      <div :id="'hotStateFifteen'+n" style="width: 100%;height:400px;"></div>
      </div>
      <div class="part_table">
      <p class="third_title">停留10秒以上客流分布对比详情</p>
      <el-table :data="hotDataStayten[n-1]" border style="min-width:850px">
        <el-table-column v-for="(value,key,index) in hotDataStayten[n-1][0]" :prop="key" :label="key" align="center">
        </el-table-column>
      </el-table>
      </div>
    </div>

    <div class="pro_part" v-for="n in stayThirtyTemp.length">
      <!-- <p class="titleBig_distance"></p> -->
      <div class="part_echarts">
      <p class="third_title">停留30秒以上客流分布对比</p>
      <div :id="'hotStateThirty'+n" style="width: 100%;height:400px;"></div>
      </div>
      <div class="part_table">
      <p class="third_title">停留30秒以上客流分布对比详情</p>
      <el-table :data="hotDataStayThirty[n-1]" border style="min-width:850px">
        <el-table-column v-for="(value,key,index) in hotDataStayThirty[n-1][0]" :prop="key" :label="key" align="center">
        </el-table-column>
      </el-table>
      </div>
    </div>

    <div class="pro_part" v-for="n in staySixtyTemp.length">
      <div class="part_echarts">
      <!-- <p class="titleBig_distance"></p> -->
      <p class="third_title">停留60秒以上客流分布对比</p>
      <div :id="'hotStateSixty'+n" style="width: 100%;height:400px;"></div>
      </div>
      <div class="part_table">
      <p class="third_title">停留60秒以上客流分布对比详情</p>
      <el-table :data="hotDataStaySixty[n-1]" border style="min-width:850px">
        <el-table-column v-for="(value,key,index) in hotDataStaySixty[n-1][0]" :prop="key" :label="key" align="center">
        </el-table-column>
      </el-table>
      </div>
    </div>

    <p class="titleBig_distance"></p>
    <p class="stateSpicy_title">工作日节假日关注度对比</p>
    <div class="pro_part" v-for=" n in hotDataAvgStayFifteentemp.length">
      <div class="part_echarts">
        <p class="third_title" v-if="n==1">工作日各时段关注度对比（10秒以上）</p>
        <p class="third_title" v-if="n==2">节假日各时段关注度对比（10秒以上）</p>
      <div :id="'hotAvgStateFifteen'+n"  style="width: 100%;height:600px;"></div>
      </div>
      <div class="part_table">
      <p class="third_title" v-if="n==1">工作日各时段关注度对比详情（10秒以上）</p>
      <p class="third_title" v-if="n==2">节假日各时段关注度对比详情（10秒以上）</p>
      <el-table :data="hotDataAvgStayFifteen[n-1]" border style="min-width:850px">
        <el-table-column v-for="(value,key,index) in hotDataAvgStayFifteen[n-1][0]" :prop="key" :label="key" align="center">
        </el-table-column>
      </el-table>
      </div>
    </div>

    <p class="titleBig_distance"></p>
    <div class="pro_part" v-for=" n in hotDataAvgStayThirtytemp.length">
      <div class="part_echarts">
      <p class="third_title" v-if="n==1">工作日各时段关注度对比（30秒以上）</p>
      <p class="third_title" v-if="n==2">节假日各时段关注度对比（30秒以上）</p>
      <div :id="'hotAvgStateThirty'+n"  style="width: 100%;height:600px;"></div>
      </div>
      <div class="part_table">
        <p class="third_title" v-if="n==1">工作日各时段关注度对比详情（30秒以上）</p>
        <p class="third_title" v-if="n==2">节假日各时段关注度对比详情（30秒以上）</p>
        <el-table :data="hotDataAvgStayThirty[n-1]" border style="min-width:850px">
          <el-table-column v-for="(value,key,index) in hotDataAvgStayThirty[n-1][0]" :prop="key" :label="key" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <p class="titleBig_distance"></p>
    <div class="pro_part" v-for=" n in hotDataAvgStaySixtytemp.length">
      <div class="part_echarts">
      <p class="third_title" v-if="n==1">工作日各时段关注度对比（60秒以上）</p>
      <p class="third_title" v-if="n==2">节假日各时段关注度对比（60秒以上）</p>
      <div :id="'hotAvgStateSixty'+n"  style="width: 100%;height:600px;"></div>
      </div>
      <div class="part_table"> 
      <p class="third_title" v-if="n==1">工作日各时段关注度对比详情（60秒以上）</p>
      <p class="third_title" v-if="n==2">节假日各时段关注度对比详情（60秒以上）</p>
      <el-table :data="hotDataAvgStaySixty[n-1]" border style="min-width:850px">
        <el-table-column v-for="(value,key,index) in hotDataAvgStaySixty[n-1][0]" :prop="key" :label="key" align="center">
        </el-table-column>
      </el-table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import echarts from "echarts";
import analyseTable from "../../analyse/tableAnalyse";
import intAllEcharts from "../../analyse/echartsAnalyse";
export default {
  name: "",
  data() {
    return {
      searchTime: {
        from_date: null,
        to_date: null,
        from_time: null,
        to_time: null
      },
      startHour: "", //从url中获取的开始时间
      endHour: "", //从url中获取的结束时间
      /*******数据总览显示数据******/
      analyse_titleDate: {
        allPeople: null,
        minAvg: null,
        maxAvg: null,
        minStateAvg: null,
        maxStateAvg: null
      },
     /*************海康客流**************/
      totalPData: [], //按小时接口原始数据(海康客流)
      dayTotalPData: [], //按天接口原数据(海康客流)
      dayTotalData: [], //按日表格显示数据(海康客流)
      averageStateTime: [], //客均逗留时长表格数据(海康客流)
      totalPTableData: [], //分时段表格显示数据(海康客流)
      timeTotalResData:[],
      timeTotalDate: [], //分时段逗留时长表格显示数据(海康客流)
      daytotalEnter: {}, //当天总人数(海康客流)
      daytotalEnterTable:{},//当天总人数(表格用)

      /**************海康热区*************/ 
      hotDataStayten: [], //驻足时间日统计10秒表格显示数据
      hotDataStayThirty: [], //驻足时间日统计30秒表格显示数据
      hotDataStaySixty: [], //驻足时间日统计60秒表格显示数据
      allHotData:[],
      hotDataAvgStayFifteen: [],//平均分时段逗留人数10秒表格显示数据
      hotDataAvgStayThirty: [],//平均分时段逗留人数30秒表格显示数据
      hotDataAvgStaySixty: [], //平均分时段逗留人数60秒表格显示数据

      hotDataAvgStayFifteentemp: [], //10秒echarts工作日和节假日分组
      hotDataAvgStayThirtytemp: [], //30秒echarts工作日和节假日分组
      hotDataAvgStaySixtytemp: [], //60秒echats工作日和节假日分组
      
      /************/ 
      timePart: [],//分时段客流量分组数据
      timeSpicyTemp: [], //分时段客人逗留分布趋势分组数据
      stayTenTemp:[], //停留10秒以上客流分布分组数据
      stayThirtyTemp:[],//停留30秒以上客流分布分组数据
      staySixtyTemp:[],////停留60秒以上客流分布分组数据

      
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
    console.log(this.$route.query.id,this.$route.query.from_time, this.$route.query.to_time);
    this.searchTime = {
      from_date: this.$dtime(this.$route.query.from_time)
        .format("YYYY-MM-DD")
        .replace(/-/g, ""),
      to_date: this.$dtime(this.$route.query.to_time)
        .format("YYYY-MM-DD")
        .replace(/-/g, ""),
      from_time: this.$route.query.from_time.substring(11,16),
      to_time: this.$route.query.to_time.substring(11,16)
    };
    this.startHour = Number(this.$route.query.from_time.substring(11,13));
    this.endHour = Number(this.$route.query.to_time.substring(11,13));
    this.getCameraData(); //获取进店客流接口数据
    /*echats图表初始化*/
    this.intEacharts(); //echarts初始化

    this.getHotData(); //调用区域关注热度接口
    this.getTenData(); //调用区域关注10s接口
    this.getThirtyData(); //调用区域关注30s接口
    this.getSixtyData(); //调用区域关注60s接口
    // 区域关注度分时段接口调用  10s,30s,60s
    this.getAvgTenData();
    this.getAvgThirdData();
    this.getAvgSixtyData();
    this.getPeopleAnalyseData(); //消费者画像
  },
  methods: {
    intEacharts() {
      intAllEcharts.intFlowTotal(); //客流总量仪表盘初始化
      intAllEcharts.intTotalStateArg(); //客均逗留时长表盘初始化
      intAllEcharts.intHoChart(); //热度图总览
      //消费者画像echarts初始化(年龄分析和男女分析)
      intAllEcharts.intAgeEcharts();
      intAllEcharts.intSexEcharts();

      intAllEcharts.intDayChart(); //日统计初始化echarts
      intAllEcharts.intStateArg(); //日均逗留时长echarts初始化

    },
    /*************获取接口模块***************/
    //获取进店客流接口数据
    getCameraData() {
      let data = {
        id: this.$route.query.id,
        from_time: this.$route.query.from_time,
        to_time: this.$route.query.to_time
      };
      this.$global.httpGet("", "show/hkrl/byhour", data).then(res => {
        this.totalPData = res.data;
        this.analyseTotalP(); //分时段表格处理
        this.analyseEacharts(); //分时段echarts数据处理

        this.$global.httpGet("", "show/hkrl/byday", data).then(res => {
          this.dayTotalPData = res.data;
          var allpeopleEnter = 0
          res.data.forEach(res =>{
            allpeopleEnter = allpeopleEnter + res.enter
          })
           this.analyse_titleDate.allPeople = allpeopleEnter
          this.analyseDay(); //调用日数据表格方法
        });
      });
    },

    /*************************************************/

    /********************每日进店客流模块 *****************************/
    //日数据表格处理
    analyseDay() {
      var dayX = [],
          dayY = [],
          temdata = [];
      var resData = analyseTable.analyseDay(this.dayTotalPData,this.searchTime.from_time,this.searchTime.to_time);
      this.daytotalEnterTable = resData.daytotalEnter
      var timePartTemp = {}
     for(var key in resData.daytotalEnter){
        var date = this.$dtime(key).format('MM-DD') +'('+ this.$dtime(key).format('ddd') +')'
        timePartTemp[date] = resData.daytotalEnter[key]
     }
     this.daytotalEnter = timePartTemp;
      this.dayTotalData = resData.dayTotalData;

      for (let k in resData.daytotalEnter) {
        var date = this.$dtime(k).format('MM-DD')+'('+this.$dtime(k).format('ddd')+')'
        dayX.push(date);
        temdata.push(resData.daytotalEnter[k]);
      }

      /* 更新仪表盘平均客流数据 */
      var max = Math.max.apply(Math, temdata);
      var min = Math.min.apply(Math, temdata);
      this.analyse_titleDate.minAvg = min;
      this.analyse_titleDate.maxAvg = max;
      var avg = this.avg(temdata).toFixed(0);
      var avgDate = [{ value: avg }];

      intAllEcharts.setAllTotalOptions(min, max, avgDate);
      dayY.push(
        {
          name: "日客流",
          type: "bar",
          barWidth: 20,
          label: { normal: { show: true, position: "top" } },
          data: temdata
        },
        { name: "", type: "line", data: temdata }
      );
      intAllEcharts.setDayOption(dayX, dayY); //日数据echarts更新

      this.getStateArgData(); //调用日逗留时长方法
      this.analyseTime(); //分时段比重表格数据处理函数
    },
    /*******************************************************/

    /****************每日客均逗留时长模块*********************/
    getStateArgData() {
      var data = {
        from_time: this.$dtime(this.$route.query.from_time).format(
          "YYYY-MM-DD"
        ),
        to_time: this.$dtime(this.$route.query.to_time).format("YYYY-MM-DD"),
        from_hour: 5,
        hours: 24
      };
      this.$global.httpGet("", "show/hkdl/byDay", data).then(res => {
        var dataTemp = [],
          legenddata = [],
          seriesData = [];
        var dateArg = { 日期: "逗留时长" };
        for (var i of res.data) {
          var dateTime =
            this.$dtime(i.date).format("MM-DD") +
            "(" +
            this.$dtime(i.date).format("ddd") +
            ")";
          legenddata.push(dateTime);
          seriesData.push(Number(i.time).toFixed(0));
          dateArg[dateTime] = Number(i.time).toFixed(0);
        }
        dataTemp.push(dateArg);
        this.averageStateTime = dataTemp;
        // 更新逗留时长分析
        var max = Math.max.apply(Math, seriesData);
        var min = Math.min.apply(Math, seriesData);
        this.analyse_titleDate.minStateAvg = min.toFixed(0);
        this.analyse_titleDate.maxStateAvg = max.toFixed(0);
        var avg = this.avg(seriesData).toFixed(0);
        //总览逗留时长更新
        intAllEcharts.setTotalStateArg(min, max, avg);
        //逗留时长图表分析
        intAllEcharts.setStateArg(legenddata, seriesData);
      });
    },
    /*******************************************************/

    /**********************分时段进店客流模块***************/

    //分时段echarts数据处理
    analyseEacharts() {
      var YDate = [],
        title = [],
        Xdata = [];
      if (this.totalPData.length > 0) {
        var chartDate = intAllEcharts.analysePDDayPart(this.totalPData,this.startHour,this.endHour);
        for (let i = this.startHour; i < this.endHour; i++) {
          Xdata.push(i + ":00");
        }
        chartDate.forEach(item => {
          var arr = [];
          for (let d in item) {
            arr.push(item[d]);
          }
          arr.shift();
          YDate.push({
            name: item.name,
            type: "line",
            smooth: true,
            data: arr,
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          });

          title.push(item.name);
        });
        intAllEcharts.setOptions(this, this.timePart, title, Xdata,this.chunk(YDate, 7));
      }
    },
    //分时段表格处理数据
    analyseTotalP() {
      var totalDate = {};
      if (this.totalPData.length > 0) {
        this.totalPData.forEach(res => {
          res.date = this.$dtime(res.start_time).format("YYYY-MM-DD");
        });

        var tableGroupData = analyseTable.gettableGroup(this.searchTime.from_time,this.searchTime.to_time,this.totalPData);
        this.totalPTableData = tableGroupData;
        this.timePart = tableGroupData;
        intAllEcharts.intDayParting(this, this.timePart); //分时段初始化echarts
      }
    },
    /*****************************************************/

    /***************客均分时段逗留时长模块*******************/

    //分析时段逗留时长表格数据处理
    analyseTime() {
      var data = {
        from_time:this.$dtime(this.$route.query.from_time).format('YYYY-MM-DD'),
        to_time:this.$dtime(this.$route.query.to_time).format('YYYY-MM-DD'),
        from_hour:'9',
        hours:18
      }
         this.$global.httpGet("", "show/hkdl/byHour", data).then(res => {
           
            var totalPData = []
            res.data.forEach(item =>{
              item.data.forEach(single =>{
                    var temp = {
                      date:item.date,
                      name:single.name,
                      enter:Number(single.time).toFixed(0)
                    }
                    totalPData.push(temp)
              })
            })
            this.timeTotalResData = totalPData
            var tableGroupData = analyseTable.gettableGroupTimePart(this.searchTime.from_time,this.searchTime.to_time,totalPData);
            this.timeSpicyTemp = tableGroupData;
            this.timeTotalDate = tableGroupData;
            this.analyseTimeSpicy(); 
         })
    },
    //分时段逗留比重echarts数据处理
    analyseTimeSpicy() {
      var echartsTimeSpicyData = [];
      if (this.timeTotalResData.length > 0) {
        var temp =
          this.$dtime(this.timeTotalResData[0].date).format("MM-DD") +
          "(" +
          this.$dtime(this.timeTotalResData[0].date).format("ddd") +
          ")";
        echartsTimeSpicyData.push({ name: temp });
        this.timeTotalResData.forEach(res => {
            var tempDate =
              this.$dtime(res.date).format("MM-DD") +
              "(" +
              this.$dtime(res.date).format("ddd") +
              ")";
            if (temp == tempDate) {
              echartsTimeSpicyData[echartsTimeSpicyData.length - 1][res.name] = res.enter
            } else {
              temp = tempDate;
              var tempRes = { name: tempDate };
              tempRes[res.name] = res.enter
              echartsTimeSpicyData.push(tempRes);
            }
          
        });
        var totaltitle = [],
          totalyAxis = ['午餐(10:00~13:00)','下午茶(13:00~17:00)','晚餐(17:00~21:00)','午夜(21:00~24:00)'],
          totalseries = [];
        echartsTimeSpicyData.forEach(item => {
          totaltitle.push(item.name);
          var arr = [];
          for (let d in item) {
            if (item[d] == 0) {
              arr.push("");
            } else {
              arr.push(item[d]);
            }
          }
          arr.shift();
          totalseries.push({
            name: item.name,
            data: arr,
            type: "bar",
            barWidth: 10,
            label: {
              normal: { show: true, position: "insideRight", formatter: "{c}" }
            }
          });
          // console.log(totalseries)
        });
        intAllEcharts.intTimeChart(this, this.timeSpicyTemp); //分时段客流比重初始化
        this.$nextTick(() => {
          for (let i = 1; i <= this.timeSpicyTemp.length; i++) {
            var myChart = echarts.init(
              document.getElementById("timeSpicy" + i)
            );
            myChart.setOption({
              legend: {
                data: this.chunk(totaltitle, 7)[i - 1]
              },
              yAxis: {
                data: totalyAxis
              },
              series: this.chunk(totalseries, 7)[i - 1]
            });
            window.onresize = function() {
              myChart.resize(); //若有多个图表变动，可多写
            };
          }
        });
      }
    },
    /******************************************************/

    /********************商品关注总览模块******************/

    //获取商品关注总览接口数据
    getHotData() {
      // var getHotData = intAllEcharts.anaHotData(this.allHotData)
      var data = {
        from_time: this.$route.query.from_time,
        to_time: this.$route.query.to_time,
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
        var hotDataAllTemp = [];
        for (var j in staydata) {
          var alldata = { 逗留时长: "" };
          for (var k of staydata[j]) {
            alldata["逗留时长"] = j;
            alldata[k.areaName] = k.stayPeopleCount;
          }
          hotDataAllTemp.push(alldata);
        }
        /***/
        var yAxisData = [],
          allserisData = [];

        for (var n in hotDataAllTemp[0]) {
          yAxisData.push(n);
        }
        yAxisData.shift();
        for (var k of hotDataAllTemp) {
          var seriesData = [];
          for (var l in k) {
            seriesData.push(k[l]);
          }
          var name = seriesData.shift();
          allserisData.push({
            name: name,
            type: "bar",
            label: { normal: { show: true, position: "insideRight" } },
            data: seriesData
          });
        }
        //更新热度总览echarts
        var myChart = echarts.init(document.getElementById("hotPicture"));
        myChart.setOption({
          yAxis: {
            data: yAxisData
          },
          series: allserisData
        });
      });
    },

    /************驻足停留人数日统计模块*****************/

    getTenData() {
      //驻足10秒 日统计
      var data = {
        from_time: this.$route.query.from_time,
        to_time: this.$route.query.to_time,
        staySecond: "10"
      };
      this.$global.httpGet("", "show/hkrq/byday", data).then(res => {
        /****/
        res.data.forEach(item =>{
            this.allHotData.push(item)
        })
        var hotDataStayten = analyseTable.analyseQUYUData(res.data);
        this.hotDataStayten = hotDataStayten
        this.stayTenTemp = hotDataStayten
        intAllEcharts.intStateFifteen(this,this.stayTenTemp); //热度停留10秒初始化

        var legenddata = [],
          allxAxisdata = [],
          allyAxisdata = [];
        for (var n in this.hotDataStayten) {
          var xAxisdata = []
          for(var m in this.hotDataStayten[n][0]){
            var date = this.$dtime(m).format('MM-DD')+'('+this.$dtime(m).format('ddd')+')'
              xAxisdata.push(date);
          }
          xAxisdata.shift();
          allxAxisdata.push(xAxisdata)
        }
        
        var allserisData = [],allserisName = []
        for(var key in this.hotDataStayten){
          var serisData = [],serisName = []
          for (var m of  this.hotDataStayten[key]) {
            legenddata.push(m["日期"]);
            var yAxisdata = [];
            for (var k in m) {
              yAxisdata.push(m[k]);
            }
            var name = yAxisdata.shift();
            serisData.push(yAxisdata)
            serisName.push(name)
          }
         allserisData.push(serisData)
         allserisName.push(serisName)
        }
        //echarts更新
        intAllEcharts.setStateTen(this,this.stayTenTemp,legenddata,allxAxisdata,allserisName,allserisData)
      });
    },

    //驻足30秒 日统计
    getThirtyData() {
      //30秒
      var data = {
        from_time: this.$route.query.from_time,
        to_time: this.$route.query.to_time,
        staySecond: "30"
      };
      this.$global.httpGet("", "show/hkrq/byday", data).then(res => {
        /******/
          res.data.forEach(item =>{
            this.allHotData.push(item)
        })
       var hotDataStayThirty = analyseTable.analyseQUYUData(res.data);
        this.hotDataStayThirty = hotDataStayThirty
        this.stayThirtyTemp = hotDataStayThirty
        intAllEcharts.intStateThirty(this,this.stayThirtyTemp); //热度30秒初始化

        var legenddata = [],
          allxAxisdata = [],
          allyAxisdata = [];
        for (var n in this.hotDataStayThirty) {
          var xAxisdata = []
          for(var m in this.hotDataStayThirty[n][0]){
              var date = this.$dtime(m).format('MM-DD')+'('+this.$dtime(m).format('ddd')+')'
              xAxisdata.push(date);
          }
          xAxisdata.shift();
          allxAxisdata.push(xAxisdata)
        }
        
        var allserisData = [],allserisName = []
        for(var key in this.hotDataStayThirty){
          var serisData = [],serisName = []
          for (var m of  this.hotDataStayThirty[key]) {
            legenddata.push(m["日期"]);
            var yAxisdata = [];
            for (var k in m) {
              yAxisdata.push(m[k]);
            }
            var name = yAxisdata.shift();
            serisData.push(yAxisdata)
            serisName.push(name)
          }
         allserisData.push(serisData)
         allserisName.push(serisName)
        }
        //echarts更新
        intAllEcharts.setStateThirty(this,this.stayThirtyTemp,legenddata,allxAxisdata,allserisName,allserisData)
  
      });
    },

    //驻足60秒 日统计
    getSixtyData() {
      var data = {
        from_time: this.$route.query.from_time,
        to_time: this.$route.query.to_time,
        staySecond: "60"
      };
      this.$global.httpGet("", "show/hkrq/byday", data).then(res => {
        /*******/
          res.data.forEach(item =>{
            this.allHotData.push(item)
        })
        var hotDataStaySixty = analyseTable.analyseQUYUData(res.data);
        this.hotDataStaySixty = hotDataStaySixty
        this.staySixtyTemp = hotDataStaySixty
        intAllEcharts.intStateSixty(this,this.staySixtyTemp); //热度30秒初始化
        var legenddata = [],
          allxAxisdata = [],
          allyAxisdata = [];
        for (var n in this.hotDataStaySixty) {
          var xAxisdata = []
          for(var m in this.hotDataStaySixty[n][0]){
              var date = this.$dtime(m).format('MM-DD')+'('+this.$dtime(m).format('ddd')+')'
              xAxisdata.push(date);
          }
          xAxisdata.shift();
          allxAxisdata.push(xAxisdata)
        }
        
        var allserisData = [],allserisName = []
        for(var key in this.hotDataStaySixty){
          var serisData = [],serisName = []
          for (var m of  this.hotDataStaySixty[key]) {
            legenddata.push(m["日期"]);
            var yAxisdata = [];
            for (var k in m) {
              yAxisdata.push(m[k]);
            }
            var name = yAxisdata.shift();
            serisData.push(yAxisdata)
            serisName.push(name)
          }
         allserisData.push(serisData)
         allserisName.push(serisName)
        }
        //echarts更新
           intAllEcharts.setStateSixty(this,this.staySixtyTemp,legenddata,allxAxisdata,allserisName,allserisData)
          
      });
    },

    /***************热区驻留人数分时段统计**********************/
    getAvgTenData() {
      //驻足10秒 分时段统计
      var data = {
        from_time: this.$route.query.from_time,
        to_time: this.$route.query.to_time,
        staySecond: "10"
      };
      //获取表格数据
      this.$global.httpGet("", "show/hkrq/byhour", data).then(res => {
        // console.log(res.data)
        var finnalavgData = analyseTable.analyseQUYUDaypart(res.data,this.searchTime.from_time,this.searchTime.to_time);
    
        /*****/
        var legendData = [],
          xAxisData = [];
        for (var i in finnalavgData[0][0]) {
          legendData.push(i);
        }
        legendData.shift();
        //x轴时间轴
        finnalavgData[0].forEach(item => {
          if (
            item["时间"] >= this.searchTime.from_time && item["时间"] < this.searchTime.to_time) {
            xAxisData.push(item["时间"]);
          }
        });
        this.hotDataAvgStayFifteentemp = finnalavgData;
        this.hotDataAvgStayFifteen = finnalavgData;
        //获取echarts数据
        this.$global.httpGet("", "show/hkrq/byecharts", data).then(res => {
          var  showEchartsData = [];
          for (var k in res.data) {
            var echartsTemp = [];
            for (var m of res.data[k]) {
              for (var n in m) {
                echartsTemp.push({
                  name: n,
                  data: m[n],
                  type: "line",
                  smooth: true,
                  label: { normal: { show: true, position: "top" } }
                });
              }
            }
            showEchartsData.push(echartsTemp);
          }
          intAllEcharts.inthotAvgStateten(this, this.hotDataAvgStayFifteentemp);
          this.$nextTick(() => {
            for (let i = 1; i <= this.hotDataAvgStayFifteentemp.length; i++) {
              var myChart = echarts.init(
                document.getElementById("hotAvgStateFifteen" + i)
              );
              myChart.setOption({
                legend: {
                  data: legendData
                },
                xAxis: {
                  data: xAxisData
                },
                series: showEchartsData[i - 1]
              });
            }
          });
        });
      });
    },

    //30秒
    getAvgThirdData() {
      var data = {
        from_time: this.$route.query.from_time,
        to_time: this.$route.query.to_time,
        staySecond: "30"
      };
      //获取表格数据
      this.$global.httpGet("", "show/hkrq/byhour", data).then(res => {
        var finnalavgData = analyseTable.analyseQUYUDaypart(res.data,this.searchTime.from_time,this.searchTime.to_time);
        /*********/

        var legendData = [],
          xAxisData = [];
        for (var i in finnalavgData[0][0]) {
          legendData.push(i);
        }
        legendData.shift(); //
        //x轴时间轴
        finnalavgData[0].forEach(item => {
          if (
            item["时间"] >=  this.searchTime.from_time &&  item["时间"] < this.searchTime.to_time
          ) {
            xAxisData.push(item["时间"]);
          }
        });
         this.hotDataAvgStayThirtytemp = finnalavgData;
        this.hotDataAvgStayThirty = finnalavgData;

        //获取echarts数据
        this.$global.httpGet("", "show/hkrq/byecharts", data).then(res => {
          var  showEchartsData = [];
          for (var k in res.data) {
            var echartsTemp = [];
            for (var m of res.data[k]) {
              for (var n in m) {
                echartsTemp.push({
                  name: n,
                  data: m[n],
                  type: "line",
                  smooth: true,
                  label: { normal: { show: true, position: "top" } }
                });
              }
            }
            showEchartsData.push(echartsTemp);
          }
         

          intAllEcharts.inthotAvgStateThirty(
            this,
            this.hotDataAvgStayThirtytemp
          ); //热度分时段30秒初始化
          this.$nextTick(() => {
            for (let i = 1; i <= this.hotDataAvgStayThirtytemp.length; i++) {
              var myChart = echarts.init(
                document.getElementById("hotAvgStateThirty" + i)
              );
              myChart.setOption({
                legend: {
                  data: legendData
                },
                xAxis: {
                  data: xAxisData
                },
                series: showEchartsData[i - 1]
              });
            }
          });
        });
      });
    },
    //60秒
    getAvgSixtyData() {
      var data = {
        from_time: this.$route.query.from_time,
        to_time: this.$route.query.to_time,
        staySecond: "60"
      };
      //获取表格数据
      this.$global.httpGet("", "show/hkrq/byhour", data).then(res => {
        var finnalavgData = analyseTable.analyseQUYUDaypart(res.data,this.searchTime.from_time,this.searchTime.to_time);
        /*********/
         var legendData = [],
          xAxisData = [];
        for (var i in finnalavgData[0][0]) {
          legendData.push(i);
        }
        legendData.shift(); //
        //x轴时间轴
        finnalavgData[0].forEach(item => {
          if (item["时间"] >= this.searchTime.from_time && item["时间"] < this.searchTime.to_time) {
            xAxisData.push(item["时间"]);
          }
        });
        this.hotDataAvgStaySixtytemp = finnalavgData;
        this.hotDataAvgStaySixty = finnalavgData;

        //获取echarts数据
        this.$global.httpGet("", "show/hkrq/byecharts", data).then(res => {
          var showEchartsData = [];
          for (var k in res.data) {
            var echartsTemp = [];
            for (var m of res.data[k]) {
              for (var n in m) {
                echartsTemp.push({
                  name: n,
                  data: m[n],
                  type: "line",
                  smooth: true,
                  label: { normal: { show: true, position: "top" } }
                });
              }
            }
            showEchartsData.push(echartsTemp);
          }
          

          intAllEcharts.inthotAvgStateSixty(this, this.hotDataAvgStaySixtytemp); //热度分时段60秒初始化
          this.$nextTick(() => {
            for (let i = 1; i <= this.hotDataAvgStaySixtytemp.length; i++) {
              var myChart = echarts.init(
                document.getElementById("hotAvgStateSixty" + i)
              );
              myChart.setOption({
                legend: {
                  data: legendData
                },
                xAxis: {
                  data: xAxisData
                },
                series: showEchartsData[i - 1]
              });
            }
          });
        });
      });
    },

    /******************消费者画像**********************/

    getPeopleAnalyseData() {
      var data = {
        from_time: this.$dtime(this.$route.query.from_time).format("YYYY-MM-DD"),
        to_time: this.$dtime(this.$route.query.to_time).format("YYYY-MM-DD"),
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

    /**************封装的一些方法模块*********************/

    //方法 把大数组分成n个等数组
    chunk(arr, size) {
      var arr2 = [];
      for (var i = 0; i < arr.length; i = i + size) {
        arr2.push(arr.slice(i, i + size));
      }
      return arr2;
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
.allcameraPage{
  width: 100%;
  /* background: #F2F6FA; */
}
.cameraPage {
  width: 84%;
  margin: auto;
  /* background: #F2F6FA; */
}
.pro_part {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.part_echarts {
  width: 50%;
}
.part_table {
  width: 50%;
}
.alltitle {
  padding-top: 15px;
  display: flex;
  justify-content: center;
}
.alltitle_left {
  width: 50%;
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
  background: #91c7ae;
  width: 150px;
  height: 100px;
  justify-content: center;
}
.title_all span {
  padding-bottom: 5px;
}
.big_title {
  font-size: 30px;
  font-weight: 500;
  text-align: center;
}
.small_title {
  padding-left: 30px;
}
.third_title {
  padding-left: 35px;
}
.titleHead_distance {
  text-align: center;
  height: 20px;
  font-size: 20px;
}
.titleHead_distance span {
  font-size: 25px;
}
.titleBig_distance {
  height: 35px;
}
.titleSmall_distance {
  height: 20px;
}
.title {
  font-size: 35px;
  text-align: center;
  height: 30px;
  /* font-family:'SimHei' */
}
.stateSpicy_title {
  font-size: 22px;
  padding: 25px;
}
.timeInterval_title,
.daytotal_title,
.stateArg_title {
  font-size: 25px;
  padding: 15px;
}
</style>
