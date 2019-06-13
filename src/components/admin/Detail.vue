<template>
  <div class="main">
    <div class="up-wrapper">
      <!-- <div class="up_title">店铺数据查询</div> -->
    </div>
    <div class="down-wrapper">
      <div class="down_title">实时数据折线图</div>
      <el-form ref="shopData" :model="shopData" label-width="80px">
        <el-form-item label="选择店铺">
          <el-select v-model="shopData.shop" placeholder="请选择店铺名称" @change="change">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-container>
        <el-aside width="200px">
          <div class="leftside">
            <div class="leftshow">
              <span>{{numTotal.enter}}</span>
              <span>进店客流量</span>
            </div>
            <!-- <div class="leftshow">
                    <span>{{numTotal.exit}}</span>
                    <span>出店客流量</span>
                </div> -->
            <!-- <div class="leftshow">
                    <span>{{numTotal.pass}}</span>
                    <span>经过客流量</span>
                </div> -->
          </div>
        </el-aside>
        <el-main>
          <div id="main_camera" style="width: 100%;height:600px;"></div>
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
      timer: null, // 定时器名称
      options: [
        {
          value: 1,
          label: "店铺1"
        }
      ],
      shopData: {
        shop: 1
      },
      numTotal: {
        enter: 0,
        exit: 0
        // pass:0
      }
    };
  },
  created() {},
  mounted() {
    this.intEachart();
    this.getDate(this.shopData.shop);
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    change() {
      this.getDate(this.shopData.shop);
    },
    getDate(id) {
      var Xenter = [],
        Yenter = [],
        exitData = [],
        passData = [];
      let data = {
        id: id,
        from_time: this.$dtime(new Date()).format("YYYY-MM-DD") + " " + "00:00",
        to_time: this.$dtime(new Date()).format("YYYY-MM-DD") + " " + "24:00"
      };
      this.$global.httpGet("", "show/hkrl/byday", data).then(res => {
        // console.log(res.data[0])
        this.numTotal = res.data[0];
      });
      this.$global.httpGet("", "show/hkrl/byhour", data).then(res => {
        // console.log(res)
        var resData = res.data;
        if (resData.length < 1) {
          this.$message("没有查询到数据");
        }
        resData.forEach(item => {
          Xenter.push(item.start_time.substring(11, 13) + ":00");
          Yenter.push(item.enter);
          exitData.push(item.exit);
          passData.push(item.pass);
        });
        var myChart = echarts.init(document.getElementById("main_camera"));
        myChart.setOption({
          xAxis: {
            data: Xenter
          },
          series: [
            {
              data: Yenter
            }
            // {
            //   data: exitData
            // },
            // {
            //   data: passData
            // }
          ]
        });
      });
      this.timer = setInterval(() => {
        clearInterval(this.timer);
        console.log(new Date(), "时间戳");
        this.getDate(this.shopData.shop);
        // this.getNumTotal(this.shopData.shop)
      }, 1000 * 60);
    },
    //初始化图表
    intEachart() {
      var myChart = echarts.init(document.getElementById("main_camera"));
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
          data: ["进入人数"]
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          // boundaryGap: [0, '50%'],
          type: "value"
        },
        series: [
          {
            name: "进入人数",
            type: "line",
            smooth: true,
            stack: "总数",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            data: []
          }
          // {
          //   name: "离开人数",
          //   type: "line",
          //   smooth: true,
          //   stack: "总数",
          //   label: {
          //     normal: {
          //       show: false,
          //       position: "top"
          //     }
          //   },
          //   data: []
          // },
          // {
          //   name: "经过人数",
          //   type: "line",
          //   smooth: true,
          //   stack: "总数",
          //   label: {
          //     normal: {
          //       show: false,
          //       position: "top"
          //     }
          //   },
          // data: []
          // }
        ]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-date-editor .el-range-separator {
  padding: 0px;
}
.main {
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
  margin-bottom: 20px;
}
.serach_button {
  margin-left: 30px;
}
.maxWidth {
  max-width: 350px;
}
.leftside {
  /* background: red; */
  margin-left: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.leftshow {
  /* background: #99D9EA; */
  width: 100%;
  height: 150px;
  margin-top: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.leftshow span {
  line-height: 40px;
  color: black;
  font-size: 18px;
}
</style>