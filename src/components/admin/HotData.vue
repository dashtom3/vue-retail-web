<template>
  <div class="main">
    <div class="down-wrapper">
      <div class="down_title">区域驻留人数数据折线图(今日)</div>
       <div class="up-wrapper">
      <!-- <div class="up_title">店铺数据查询</div> -->
      <el-form ref="staySecond" :model="staySecond" label-width="100px">
        <el-form-item label="选择驻留时长">
          <el-select v-model="staySecond.time" placeholder="请选择驻留时长" @change="change">
            <el-option v-for="item in staySecondData" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
      <el-container>
          <el-aside width="200px">
            <div class="leftside">
                <div class="leftshow" v-for="item in numTotal">
                    <span>{{item.dataTotal}}</span>
                    <span>{{item.name}}驻留人数</span>
                </div>
            </div>
          </el-aside>
          <el-main>
              <div id="hot_camera" style="width: 100%;height:600px;"></div>            
          </el-main>
          </el-container>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Park",
  data() {
    return {
      timer:null,
      areaData:[],
      stayData:[],
      staySecond:{
        time:10
      },
      staySecondData:[
        {value: 10,label: "10秒以上"},
        {value: 30,label: "30秒以上"},
        {value: 60,label: "60秒以上"}
        ],
      numTotal:[
        // {name:'区域一',dataTotal:0},
        // {name:'区域二',dataTotal:0},
        // {name:'区域三',dataTotal:0},
      ]
    };
  },
  created() {},
  mounted() {
    this.intEachart();
    this.getDate()
  },
  methods: {
    getNumTotal(){
        this.numTotal = []
       this.stayData.forEach(item => {
         var dataTotal = 0
         item.data.forEach(single => {
           dataTotal = dataTotal + single
         })
         this.numTotal.push({name:item.name,dataTotal:dataTotal})
       })
    },
    change(){
      this.getDate()
    },
    getDate() {
      this.stayData = []
       let data = {
          time:this.$dtime(new Date()).format('YYYY-MM-DD'),
          staySecond:this.staySecond.time
        }
       this.$global.httpGet("", "show/hkrq/byOneDay", data).then(res => {
          res.data.forEach(item => {
              var stayTotal = [] 
            this.areaData.push(item.storeAreaName)
						item.distributionDatas.forEach(single =>{
							stayTotal.push(single.stayPeopleCount)
            })
            this.stayData.push({name:item.storeAreaName,data:stayTotal,type: "line",
            smooth: true,
            // stack: "总数",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },})
          });
          this.setOption()
          this.getNumTotal()
          //  this.timer =  this.$schedule.scheduleJob('0 8 * * * *',()=>{
          //        console.log('数据更新',new Date())
          //        this.getDate()
          // });
        })

    },
    setOption(){
      var xAxisData = []
      for(var i = 0;i<=23;i++){
        if(i<9){
         xAxisData.push('0'+i+':'+'00')
        }else{
          xAxisData.push(i+':'+'00')
        }
      }
      // console.log(this.stayData)
      var myChart = echarts.init(document.getElementById("hot_camera"));
      myChart.setOption({
        
        legend: {
          data: this.areaData
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData
        },
        series: this.stayData
      })
    },
    //初始化图表
    intEachart() {
      var myChart = echarts.init(document.getElementById("hot_camera"));
      myChart.setOption({
        title: {
          // text: '最近24小时实时客流数据'
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          data: []
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: []
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-date-editor .el-range-separator {
  padding: 0px;
}
.main {
  /* width: 90%; */
  margin: auto;
  height: 100%;
  padding-top: 20px;
}
.up_title {
  height: 50px;
  font-size: 25px;
  line-height: 50px;
  background: #f5f5f5;
  padding: 0 10px;
  margin-bottom: 20px;
}
.down_title {
  height: 30px;
  font-size: 18px;
  line-height: 30px;
  background: #f5f5f5;
  padding: 0 10px;
  margin-bottom: 20px
}
.serach_button {
  margin-left: 30px;
}
.maxWidth {
  max-width: 350px;
}
.leftside{
  /* background: red; */
  margin-left: 50px;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:center;
}
.leftshow{
  /* background: #99D9EA; */
  width: 100%;
  height: 150px;
  margin-top: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction:column;
   justify-content: center;
   align-items: center
}
.leftshow span{
 line-height: 40px;
 color: black;
 font-size: 18px;
}
</style>