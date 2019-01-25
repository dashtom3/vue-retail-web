<template>
  <div>
    <div class="title">
      <span>实体</span>
      <el-input class="titleinput" placeholder="请输入内容" v-model="subshopName" :disabled="true"></el-input>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="显示图表" name="first">
          <div id="main" style="width:100%;height:400px"></div>
        </el-tab-pane>
        <el-tab-pane label="显示数据" name="second">
          配置管理
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
      subshopName: "上海辰尚科技",
      activeName: "first"
    };
  },
  mounted() {
    this.intEcharts()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
