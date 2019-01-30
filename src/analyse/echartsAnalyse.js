import echarts from 'echarts'
import dtime from 'time-formater'
const echartsAnalyse = {
    //客流总量仪表盘初始化
    intFlowTotal() {
        var myChart = echarts.init(document.getElementById("flowTotal"));
        myChart.setOption({
            title: {
                text: "日均客流量",
                subtext: "(人次)",
                top: "300",
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
                formatter: function (v) {
                    return v.toFixed(0);
                }
            },
            series: [
                {
                    name: "客流量",
                    type: "gauge",
                    min: 0,
                    max: 850,
                    detail: { formatter: "{value}" },
                    data: []
                }
            ]
        });
    },
     //客流总量仪表盘更新
     setAllTotalOptions(min, max, echartsDate) {
        var myChart = echarts.init(document.getElementById("flowTotal"));
        myChart.setOption({
            series: {
                min: min,
                max: max,
                data: echartsDate
            }
        });
    },

    //客流平均逗留时长仪表盘初始化
    intTotalStateArg() {
        var myChart = echarts.init(document.getElementById("TotalStateArg"));
        myChart.setOption({
            title: {
                text: "客均逗留时长",
                subtext: "(分钟)",
                top: "300",
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
                formatter: function (v) {
                    return v.toFixed(0);
                }
            },
            series: [
                {
                    name: "客均逗留时长",
                    type: "gauge",
                    min: 15,
                    max: 38,
                    detail: { formatter: "{value}" },
                    data: [{ value: 26 }]
                }
            ]
        });
    },
    // 客流平均逗留时长仪表盘更新
   setTotalStateArg(min,max,avg){
    var myChart = echarts.init(document.getElementById("TotalStateArg"));
    myChart.setOption({
      series: [
        {
          name: "客均逗留时长",
          type: "gauge",
          min: min,
          max: max,
          detail: { formatter: "{value}" },
          data: [{ value: avg }]
        }
      ]
    });
   },

    //热度图总览echarts初始化
    intHoChart() {
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

    //日统计初始化图表
    intDayChart() {
        var myChart = echarts.init(document.getElementById("day_camera"));
        myChart.setOption({
            color: ["#3398DB"],
            title: {},
            tooltip: {
                formatter: "{a} <br/>{b} {c}",
                trigger: "axis"
            },
            toolbox: {
                feature: {}
            },
            legend: {},
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: [
                {
                    type: "category",
                    data: [],
                    axisPointer: {
                        type: "shadow"
                    },
                    axisLabel:{
                      interval:0,
                      rotate:45,//倾斜度 -90 至 90 默认为0
                      margin:4,
                      // textStyle:{
                      //   fontWeight:"bolder",
                      //     color:"#000000"
                      // }
                  },
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: "人次"
                }
            ],
            series: [
                {
                    name: "日人数统计",
                    type: "line",
                    stack: "总量",
                    label: {
                        normal: {
                            show: true,
                            position: "top"
                        }
                    },
                    data: []
                }
            ]
        });
    },
    //日数据echats更新
    setDayOption(dayX, dayY) {
        var myChart = echarts.init(document.getElementById("day_camera"));
        myChart.setOption({
            xAxis: {
                data: dayX
            },
            series: dayY
        });
        window.onresize = function () {
            myChart.resize(); //若有多个图表变动，可多写
        };
    },

    //客均逗留时长echarts初始化
    intStateArg() {
        var myChart = echarts.init(document.getElementById("stateArg"));
        myChart.setOption({
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          legend: {
            data: ["客均逗留时长"]
          },
          xAxis: [
            {
              type: "category",
              data: [],
              // axisTick: {
              //   alignWithLabel: true
              // },
              axisLabel:{
                interval:0,
                rotate:45,//倾斜度 -90 至 90 默认为0
                margin:4,
                // textStyle:{
                //   fontWeight:"bolder",
                //     color:"#000000"
                // }
            },
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "时长"
            }
          ],
          series: [
            {
              name: "客均逗留时长",
              type: "bar",
              barWidth: "20",
              label: {
                normal: {
                  show: true,
                  position: "top"
                }
              },
              data: []
            },
            {
              name: "",
              type: "line",
              // barWidth: "60",
              data: []
            }
          ]
        });
      },
      //客均逗留时长echarts更新
    setStateArg(legenddata,seriesData){
        var myChart = echarts.init(document.getElementById("stateArg"));
        myChart.setOption({
          xAxis: [
            {
              data: legenddata
            }
          ],
          series: [
            {
              name: "客均逗留时长",
              type: "bar",
              barWidth: "20",
              label: {
                normal: {
                  show: true,
                  position: "top"
                }
              },
              data: seriesData
            },
            {
              name: "",
              type: "line",
              // barWidth: "60",
              data: seriesData
            }
          ]
        });
    },
    //分时段统计echarts初始化
    intDayParting(this_,timePart) {
      this_.$nextTick(() => {
        for (var i = 1; i <= timePart.length; i++) {
        var myChart = echarts.init(document.getElementById("main_camera"+i));
        myChart.setOption({
          title: {
            // text: '折线图堆叠'
          },
          tooltip: {
            trigger: "axis"
          },
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
            type: "value",
            name: "人次"
          },
          series: []
        });
      }
      })
      },
      //分时段统计echarts更新
      setOptions(this_,timePart,title, Xdata, YDate) {
        this_.$nextTick(() => {
       for (var i = 1; i <= timePart.length; i++) {
        var myChart = echarts.init(document.getElementById("main_camera"+i));
        myChart.setOption({
          legend: {
            data: title
          },
          xAxis: {
            data: Xdata
          },
          series: YDate[i-1]
        });
        window.onresize = function() {
          myChart.resize(); //若有多个图表变动，可多写
        };
      }
      })
      },
      //分时段echarts数据分析
     analysePDDayPart(totalPData,startHour,endHour){
       var chartDate = []
      if (totalPData.length > 0) {
        var temp =  dtime(totalPData[0].start_time).format("MM-DD") + "(" + dtime(totalPData[0].start_time).format("ddd") + ")";
        chartDate.push({ name: temp });
        totalPData.forEach((res, index) => {
          var tempHour = dtime(res.start_time).format("HH:mm");
          var tempHour2 = parseInt(dtime(res.start_time).format("HH"));
          if (tempHour2 >= startHour && tempHour2 <= endHour) {
            var tempDate = dtime(res.start_time).format("MM-DD") + "(" + dtime(res.start_time).format("ddd") + ")";
            if (temp == tempDate) {
              chartDate[chartDate.length - 1][tempHour] = res.enter;
            } else {
              temp = tempDate;
              var tempRes = { name: tempDate };
              var tempRes1 = { name: tempDate };
              tempRes[tempHour] = res.enter;
              tempRes1[tempHour] = res.exit;
              chartDate.push(tempRes);
            }   
          }
        });
        
      }
      return chartDate
     },
       //区域关注度逗留时间10秒
    intStateFifteen(this_,stayTenTemp) {
      this_.$nextTick(() => {
        for (var i = 1; i <= stayTenTemp.length; i++) {
        var myChart = echarts.init(document.getElementById("hotStateFifteen"+i));
        myChart.setOption({
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: []
          },
          xAxis: [
            {
              type: "category",
              data: [],
              axisPointer: {
                type: "shadow"
              },
              axisLabel: {  
                interval:0,  
                // rotate:40  
             }  
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "人数",
              axisLabel: {
                formatter: "{value} "
              }
            }
          ],
          series: []
        });
      }
      })
      },
      //区域关注度逗留时间10s 更新 
      setStateTen(this_,stayTenTemp,legenddata,allxAxisdata,allserisName,allserisData){
        this_.$nextTick(() => {
          for (var i = 1; i <= stayTenTemp.length; i++) {
        var myChart = echarts.init(document.getElementById("hotStateFifteen"+i));
        myChart.setOption({
          legend: {
            data: legenddata
          },
          xAxis: [
            {
              data: allxAxisdata[i-1]
            }
          ],
          series: [{
              name: allserisName[i-1][0],
              type: "line",
              label: { normal: { show: false, position: "top" } },
              data:allserisData[i-1][0]
          },
          {
              name: allserisName[i-1][1],
              type: "bar",
              barWidth: 12,
              label: { normal: { show: true, position: "top" } },
              data:allserisData[i-1][1]
          },
          {
              name: allserisName[i-1][2],
              type: "bar",
              barWidth: 12,
              label: { normal: { show: true, position: "top" } },
              data:allserisData[i-1][2]
          },
          {
              name: allserisName[i-1][3],
              type: "bar",
              barWidth: 12,
              label: { normal: { show: true, position: "top" } },
              data:allserisData[i-1][3]
          },
          ]
        });
          }
        })
      },

      //区域关注度逗留30秒
      intStateThirty(this_,stayThirtyTemp) {
        this_.$nextTick(() => {
          for (var i = 1; i <= stayThirtyTemp.length; i++) {
        var myChart = echarts.init(document.getElementById("hotStateThirty"+i));
        myChart.setOption({
          tooltip: {
            trigger: "axis"
          },
          toolbox: {},
          legend: {
            data: []
          },
          xAxis: [
            {
              type: "category",
              data: [],
              axisPointer: {
                type: "shadow"
              },
              axisLabel: {  
                interval:0,  
                // rotate:40  
             } 
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "人数",
              axisLabel: {
                formatter: "{value} "
              }
            }
          ],
          series: []
        });
        }
        })
      },
      //区域关注度逗留时间30s 更新 
      setStateThirty(this_,stayThirtyTemp,legenddata,allxAxisdata,allserisName,allserisData){
        this_.$nextTick(() => {
          for (var i = 1; i <= stayThirtyTemp.length; i++) {
        var myChart = echarts.init(document.getElementById("hotStateThirty"+i));
        myChart.setOption({
          legend: {
            data: legenddata
          },
          xAxis: [
            {
              data: allxAxisdata[i-1]
            }
          ],
          series: [{
              name: allserisName[i-1][0],
              type: "line",
              label: { normal: { show: false, position: "top" } },
              data:allserisData[i-1][0]
          },
          {
              name: allserisName[i-1][1],
              type: "bar",
              barWidth: 12,
              label: { normal: { show: true, position: "top" } },
              data:allserisData[i-1][1]
          },
          {
              name: allserisName[i-1][2],
              type: "bar",
              barWidth: 12,
              label: { normal: { show: true, position: "top" } },
              data:allserisData[i-1][2]
          },
          {
              name: allserisName[i-1][3],
              type: "bar",
              barWidth: 12,
              label: { normal: { show: true, position: "top" } },
              data:allserisData[i-1][3]
          },
          ]
        });
          }
        })
      },
      //区域关注度逗留60秒
      intStateSixty(this_,staySixtyTemp) {
        this_.$nextTick(() => {
          for (var i = 1; i <= staySixtyTemp.length; i++) {
        var myChart = echarts.init(document.getElementById("hotStateSixty"+i));
        myChart.setOption({
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: []
          },
          xAxis: [
            {
              type: "category",
              data: [],
              axisPointer: {
                type: "shadow"
              },
              axisLabel: {  
                interval:0,  
                // rotate:40  
             } 
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "人数",
              axisLabel: {
                formatter: "{value} "
              }
            }
          ],
          series: []
        });
      }
      })
      },
      //区域关注度逗留时间60s 更新 
      setStateSixty(this_,staySixtyTemp,legenddata,allxAxisdata,allserisName,allserisData){
        this_.$nextTick(() => {
          for (var i = 1; i <= staySixtyTemp.length; i++) {
        var myChart = echarts.init(document.getElementById("hotStateSixty"+i));
        myChart.setOption({
          legend: {
            data: legenddata
          },
          xAxis: [
            {
              data: allxAxisdata[i-1]
            }
          ],
          series: [{
              name: allserisName[i-1][0],
              type: "line",
              barWidth: 12,
              label: { normal: { show: false, position: "top" } },
              data:allserisData[i-1][0]
          },
          {
              name: allserisName[i-1][1],
              type: "bar",
              barWidth: 12,
              label: { normal: { show: true, position: "top" } },
              data:allserisData[i-1][1]
          },
          {
              name: allserisName[i-1][2],
              type: "bar",
              barWidth: 12,
              label: { normal: { show: true, position: "top" } },
              data:allserisData[i-1][2]
          },
          {
              name: allserisName[i-1][3],
              type: "bar",
              barWidth: 12,
              label: { normal: { show: true, position: "top" } },
              data:allserisData[i-1][3]
          },
          ]
        });
          }
        })
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
              fontSize: 30
            }
          },
          series: [
            {
              name: "年龄比例",
              type: "pie",
              radius: ["50%", "70%"],
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
              fontSize: 30
            }
          },
          series: [
            {
              name: "男女比例",
              type: "pie",
              radius: ["50%", "70%"],
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
      //区域关注度分时段驻留10秒 echarts初始化
      inthotAvgStateten(this_,hotDataAvgStayFifteentemp) {
        this_.$nextTick(() => {
          for (var i = 1; i <= hotDataAvgStayFifteentemp.length; i++) {
            var myChart = echarts.init(
              document.getElementById("hotAvgStateFifteen" + i)
            );
            myChart.setOption({
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: []
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              toolbox: {},
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
          }
        });
      },
      //区域关注度分时段驻留30s echarts初始化
      inthotAvgStateThirty(this_,hotDataAvgStayThirtytemp) {
        this_.$nextTick(() => {
          for (var i = 1; i <= hotDataAvgStayThirtytemp.length; i++) {
            var myChart = echarts.init(
              document.getElementById("hotAvgStateThirty" + i)
            );
            myChart.setOption({
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: []
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              toolbox: {},
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
          }
        });
      },
      //区域关注度分时段驻留60s echarts初始化
      inthotAvgStateSixty(this_,hotDataAvgStaySixtytemp) {
        this_.$nextTick(() => {
          for (var i = 1; i <= hotDataAvgStaySixtytemp.length; i++) {
            var myChart = echarts.init(
              document.getElementById("hotAvgStateSixty" + i)
            );
            myChart.setOption({
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: []
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              toolbox: {},
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
          }
        });
      },
    //分时段逗留人数比重初始图像
    intTimeChart(this_,timeSpicyTemp) {
        this_.$nextTick(() => {
          for (let i = 1; i <= timeSpicyTemp.length; i++) {
            var myChart = echarts.init(document.getElementById("timeSpicy" + i));
            myChart.setOption({
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow"
                },
                // formatter: "{a} <br/>{b} {c}%"
              },
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
                type: "value",
                axisLabel: { formatter: "{value}" }
              },
              yAxis: {
                type: "category",
                data: []
              },
              series: []
            });
          }
        });
      },
    
}
export default echartsAnalyse