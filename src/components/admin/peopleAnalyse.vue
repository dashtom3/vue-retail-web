<template>
  <div class="main">
    <div class="down-wrapper">
      <div class="down_title">门店客群分析</div>
      <template>
        <el-table :data="peopleData" border style="width: 80%;margin:auto" max-height="670">
          <el-table-column prop="dateTime" label="时间" align="center"></el-table-column> 
          <el-table-column label="性别" align="center"> 
          <el-table-column prop="hcMale" label="男" align="center"></el-table-column>
          <el-table-column prop="hcFemale" label="女" align="center"> </el-table-column>
          </el-table-column>
          <el-table-column label="年龄段" align="center">
          <el-table-column prop="hc0to18" label="0~18岁" align="center"></el-table-column>
          <el-table-column prop="hc19to29" label="19~29岁" align="center"></el-table-column>
          <el-table-column prop="hc30to39" label="30~39岁" align="center"></el-table-column>
          <el-table-column prop="hc40to64" label="40~64岁" align="center"></el-table-column>
          <el-table-column prop="hc65plus" label="65岁以上" align="center"></el-table-column>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Park",
  data() {
    return {
      peopleData: [],
      timeValue: [new Date() - 24 * 3600 * 1000, new Date()],
      fieldKey: {
        zeroEighteen: "0-18",
        eighteenTwentyEight: "19-29",
        familiarNum: "常客",
        femaleNum: "女性",
        fortySixtyFive: "40-64",
        guestNum: "访客",
        maleNum: "男性",
        memberNum: "会员",
        sixtyFiveMore: "65+",
        totalNum: "总客流",
        twentyEightForty: "30-39"
      },
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
  created() {},
  mounted() {
    this.getPeopleAnalyseData();
  },
  methods: {
    getPeopleAnalyseData() {
      var data = {
        from_time: this.$dtime(new Date()).format("YYYY-MM-DD") + " " + "00:00",
        to_time: this.$dtime(new Date()).format("YYYY-MM-DD") + " " + "24:00",
        type: 4
      };
      this.$global.httpGet("", "show/dxmrl/byDetail", data).then(res => {
        if(res.data.passengerFlows.length){
          res.data.passengerFlows.forEach(item =>{
            var dateTime = this.$dtime(item.beginTime).format('HH:mm')+'~'+this.$dtime(item.endTime).format('HH:mm')
             this.$set(item,"dateTime", dateTime)
          })
          this.peopleData = res.data.passengerFlows
        }
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
  /* width: 90%; */
  margin: auto;
  height: 100%;
  padding-top: 20px;
}
.down_top {
  padding-top: 40px;
}
.timeSelect {
  padding-right: 15px;
  padding-left: 5px;
}
.serach {
  margin-left: 25px;
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