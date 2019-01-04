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
                    dtime(res.start_time).format("dddd") +
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
    //区域关注度 10s,30s,60s数据分析
    analyseQUYUData(resData){
        var areaNameData = {};
        for (var i = 0; i < resData.length; i++) {
          if (!areaNameData[resData[i].areaName]) {
            var arr = [];
            arr.push(resData[i]);
            areaNameData[resData[i].areaName] = arr;
          } else {
            areaNameData[resData[i].areaName].push(resData[i]);
          }
        }
        var sameData = {};
        for (var i = 0; i < resData.length; i++) {
          var time =
            dtime(resData[i].time).format("YYYY-MM-DD") +
            "(" +
            dtime(resData[i].time).format("dddd") +
            ")";
          if (!sameData[time]) {
            var arr = [];
            arr.push(resData[i]);
            sameData[time] = arr;
          } else {
            sameData[time].push(resData[i]);
          }
        }
        var dayAvgTemp = { 日期: "平均关注度" };
        for (var n in sameData) {
          var dayTotal = 0;
          for (var m of sameData[n]) {
            dayTotal = dayTotal + m.stayPeopleCount;
          }
          dayAvgTemp[n] = (dayTotal / sameData[n].length).toFixed(0);
        }

        var hotDataStaytenTemp = [];
        for (var j in areaNameData) {
          var dayTotal = 0,
            dayTemp = { 日期: "" };
          for (var k of areaNameData[j]) {
            var time =
              dtime(k.time).format("YYYY-MM-DD") +
              "(" +
              dtime(k.time).format("dddd") +
              ")";
            dayTemp[time] = k.stayPeopleCount;
          }
          dayTemp["日期"] = j;
          hotDataStaytenTemp.push(dayTemp);
        }
        hotDataStaytenTemp.unshift(dayAvgTemp);

        return hotDataStaytenTemp
    },
    
}
export default tableAnalyse