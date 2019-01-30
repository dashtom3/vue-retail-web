import dtime from 'time-formater'
const tableAnalyse = {

    //
    //日数据表格处理
    analyseDay(dayTotalPData) {
        var totalDate = {};
        var echartsDate = {};
        if (dayTotalPData.length > 0) {
            var temp =
                dtime(dayTotalPData[0].start_time).format("YYYY-MM-DD") +
                "(" +
                dtime(dayTotalPData[0].start_time).format("dddd") +
                ")";
            dayTotalPData.forEach(res => {
                var tempDate =
                    dtime(res.start_time).format("YYYY-MM-DD") +
                    "(" +
                    dtime(res.start_time).format("ddd") +
                    ")";
                if (temp == tempDate) {
                    var dateObject = { 日期: "进店人数" };
                    dateObject[tempDate] = res.enter;
                    totalDate = dateObject;
                    echartsDate[tempDate] = res.enter;
                } else {
                    totalDate[tempDate] = res.enter;
                    echartsDate[tempDate] = res.enter;
                }
            });
            var daytotalEnter = echartsDate;
            var dayTotalData = [];
            dayTotalData.push(totalDate);
            return { dayTotalData: dayTotalData, daytotalEnter: daytotalEnter }

        }
    },
    //区域关注度日统计 10s,30s,60s数据分析
    analyseQUYUData(resData){

      var sameData = {};
        for (var i = 0; i < resData.length; i++) {
          var time =
            dtime(resData[i].time).format("YYYY-MM-DD") +
            "(" +
            dtime(resData[i].time).format("ddd") +
            ")";
          if (!sameData[time]) {
            var arr = [];
            arr.push(resData[i]);
            sameData[time] = arr;
          } else {
            sameData[time].push(resData[i]);
          }
        }
        var dataArr = []
        for(var key in sameData){
            var temp = {}
            temp.name = key
            temp.value = sameData[key]
            dataArr.push(temp)
        }
        var tabledata = this.chunk(dataArr,7)

        var dataAllTemp = []
        for(var k in tabledata){
          var dataTemp = []
          for(var d of tabledata[k]){
            for(var s of d.value){
                dataTemp.push(s)
            }
          }
          dataAllTemp.push(dataTemp)
        }

        
        var areaNameArr = []
        for(var k in dataAllTemp){
        var areaNameData = {};
        for (var i = 0; i < dataAllTemp[k].length; i++) {
          if (!areaNameData[dataAllTemp[k][i].areaName]) {
            var arr = [];
            arr.push(dataAllTemp[k][i]);
            areaNameData[dataAllTemp[k][i].areaName] = arr;
          } else {
            areaNameData[dataAllTemp[k][i].areaName].push(dataAllTemp[k][i]);
          }
        }
        areaNameArr.push(areaNameData)
        
      }

      var allDayAvgTemp1 = []
      for(var k in areaNameArr){
        var sameData1 = []
        for(var d in areaNameArr[k]){
            for(var s of areaNameArr[k][d]){
              var time =  dtime(s.time).format("YYYY-MM-DD") + "(" + dtime(s.time).format("ddd") +")";
          if (!sameData1[time]) {
            var arr = [];
            arr.push(s);
            sameData1[time] = arr;
          } else {
            sameData1[time].push(s);
          }
            }
        }
        
        var dayAvgTemp1 = { 日期: "平均关注度" };
        for (var n in sameData1) {
          var dayTotal = 0;
          for (var m of sameData1[n]) {
            dayTotal = dayTotal + m.stayPeopleCount;
          }
          dayAvgTemp1[n] = (dayTotal / sameData1[n].length).toFixed(0);
        }
        allDayAvgTemp1.push(dayAvgTemp1)
      }

        var allhotDataStaytenTemp = []
        for(var d in areaNameArr){
        var hotDataStaytenTemp = [];
        for (var j in areaNameArr[d]) {
             var dayTotal = 0,
            dayTemp = { 日期: "" };
          for (var k of areaNameArr[d][j]) {
            var time = dtime(k.time).format("YYYY-MM-DD") + "(" + dtime(k.time).format("ddd") + ")";
            dayTemp[time] = k.stayPeopleCount;
          }
          dayTemp["日期"] = j;
          hotDataStaytenTemp.push(dayTemp);
        }

        allhotDataStaytenTemp.push(hotDataStaytenTemp)
      }

        for(var i =0;i<allhotDataStaytenTemp.length;i++){
          allhotDataStaytenTemp[i].unshift(allDayAvgTemp1[i])
        }

        return allhotDataStaytenTemp
    },
    //区域关注度分时段表格数据分析 10s,30s,60s
    analyseQUYUDaypart(resData,startTime,endTime){
      // console.log(resData)
      var tableWeekData = [],tableUnweekData = []
        resData.forEach(item =>{
          var date = dtime(item.start_time).format('d')
          if(date == 0 || date == 6){
            tableUnweekData.push(item)
          }else{
            tableWeekData.push(item)
          }
        })
        //工作日处理
        var dataWeek = {};
        for (var i = 0; i < tableWeekData.length; i++) {
          var time = dtime(tableWeekData[i].start_time).format('HH:mm')
          if(time<=endTime && time>=startTime){
            if (!dataWeek[time]) {
                var arr = [];
                arr.push(tableWeekData[i]);
                dataWeek[time] = arr;
            } else {
              dataWeek[time].push(tableWeekData[i])
            }
          }
        }
        for (var m in dataWeek) {
          var data1 = {}
          for (var k of dataWeek[m]) {
                  if (!data1[k.areaName]) {
                      var arr1 = [];
                      arr1.push(k);
                      data1[k.areaName] = arr1;
                      dataWeek[m] = data1
                  } else {
                      data1[k.areaName].push(k)
                      dataWeek[m] = data1
                  }
              
          }
      }
     var weektempArr = []
     for(var key in dataWeek){
      var temp = {}
       for(var m in dataWeek[key]){
        var stayPeopleCount = 0
         for(var n of dataWeek[key][m]){
           stayPeopleCount = stayPeopleCount + n.stayPeopleCount
         }
        temp['时间'] = key;
        temp[m] = stayPeopleCount
       }
       weektempArr.push(temp)
     }
     //节假日处理
     var dataunWeek = {};
        for (var i = 0; i < tableUnweekData.length; i++) {
          var time = dtime(tableUnweekData[i].start_time).format('HH:mm')
          if(time<=endTime && time>=startTime){
            if (!dataunWeek[time]) {
                var arr = [];
                arr.push(tableUnweekData[i]);
                dataunWeek[time] = arr;
            } else {
              dataunWeek[time].push(tableUnweekData[i])
            }
          }
        }
        for (var m in dataunWeek) {
          var data1 = {}
          for (var k of dataunWeek[m]) {
                  if (!data1[k.areaName]) {
                      var arr1 = [];
                      arr1.push(k);
                      data1[k.areaName] = arr1;
                      dataunWeek[m] = data1
                  } else {
                      data1[k.areaName].push(k)
                      dataunWeek[m] = data1
                  }
              
          }
      }
      var unweektempArr = []
      for(var key in dataunWeek){
       var temp = {}
        for(var m in dataunWeek[key]){
         var stayPeopleCount = 0
          for(var n of dataunWeek[key][m]){
            stayPeopleCount = stayPeopleCount + n.stayPeopleCount
          }
         temp['时间'] = key;
         temp[m] = stayPeopleCount
        }
        unweektempArr.push(temp)
      }
      var allTempArr = [weektempArr,unweektempArr]
      return allTempArr
    },
    //分时段表格数组分组
    gettableGroup(from_time,to_time,totalPData){
         //表格每7天处理
         var tableGroupData = []
       var data = {};
       for (var i = 0; i < totalPData.length; i++) {
           var time = totalPData[i].date
           if (!data[time]) {
               var arr = [];
               arr.push(totalPData[i]);
               data[time] = arr;
           } else {
               data[time].push(totalPData[i])
           }
       }
       var dataArr = []
       for(var key in data){
         var temp = {}
         temp.name = key
         temp.value = data[key]
         dataArr.push(temp)
       }

       var dataTable = this.chunk(dataArr,7)
       dataTable.forEach(res =>{
         var arrList = {}
         res.forEach(single =>{  
           single.value.forEach(sin => {
               var time = dtime(sin.start_time).format("HH:mm");
              if (!arrList[time]) {
               var arr = [];
               arr.push(sin);
               arrList[time] = arr;
           } else {
               arrList[time].push(sin)
           }
           })
             
         })
           var allTemp = {},allArrList = []
          for(var k in arrList){
            if(k >= from_time && k <= to_time){
            var temp = {'时间':''}
            for(var d of arrList[k]){
              var date = dtime(d.start_time).format("YYYY-MM-DD") + "(" + dtime(d.start_time).format("ddd") + ")";
              temp['时间'] = k
              temp[date] = d.enter
              allTemp[k] = temp
            }
             }
          }
           allArrList.push(allTemp)
           tableGroupData.push(allArrList)
       })
       var groupArr = []
       for(var k in tableGroupData){
         var groupArrTemp = []
         for(var v of tableGroupData[k]){
           for(var d in v){
             groupArrTemp.push(v[d])
           }
         }
         groupArr.push(groupArrTemp)
       }

           return groupArr
    },
     //分时段比重表格数据处理
     gettableGroupTimePart(from_time,to_time,totalPData,daytotalEnter){
      //表格每7天处理
      var tableGroupData = []
    var data = {};
    for (var i = 0; i < totalPData.length; i++) {
        var time = totalPData[i].date
        if (!data[time]) {
            var arr = [];
            arr.push(totalPData[i]);
            data[time] = arr;
        } else {
            data[time].push(totalPData[i])
        }
    }
    var dataArr = []
    for(var key in data){
      var temp = {}
      temp.name = key
      temp.value = data[key]
      dataArr.push(temp)
    }
    
    var dataTable = this.chunk(dataArr,7)
    dataTable.forEach(res =>{
      var arrList = {}
      res.forEach(single =>{  
        single.value.forEach(sin => {
            var time = dtime(sin.start_time).format("HH:mm");
           if (!arrList[sin.name]) {
            var arr = [];
            arr.push(sin);
            arrList[sin.name] = arr;
        } else {
            arrList[sin.name].push(sin)
        }
        })
          
      })
      // console.log(arrList)
        var allTemp = {},allArrList = []
       for(var k in arrList){
         var temp = {'时间':''}
         for(var d of arrList[k]){
           var date = dtime(d.date).format("YYYY-MM-DD") + "(" + dtime(d.date).format("ddd") + ")";
           temp['时间'] = k
           temp[date] = d.enter
           allTemp[k] = temp
         }
          
       }
        allArrList.push(allTemp)
        tableGroupData.push(allArrList)
    })

    var groupArr = []
    for(var k in tableGroupData){
      var groupArrTemp = []
      for(var v of tableGroupData[k]){
        for(var d in v){
          groupArrTemp.push(v[d])
        }
      }
      groupArr.push(groupArrTemp)
    }
    // console.log(groupArr)
        return groupArr
 },
    //方法 把大数组分成n个等数组
    chunk(arr, size) {
      var arr2 = [];
      for (var i = 0; i < arr.length; i = i + size) {
        arr2.push(arr.slice(i, i + size));
      }
      return arr2;
    },
}
export default tableAnalyse