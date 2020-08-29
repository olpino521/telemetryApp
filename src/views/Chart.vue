<template>
  <div class="about">
    <h1>Chart</h1>
    <barChart v-if="loaded" :chartData="chartData" :options="options"></barChart>
    <lineChart v-if="loaded" :chartData="chartData" :options="options"></lineChart>
    <pieChart v-if="loaded" :chartData="chartData" :options="options"></pieChart>
    <bubbleChart v-if="loaded" :chartData="chartData" :options="options"></bubbleChart>
    <button @click="loadTelemetryData">Load</button>
  </div>
</template>
<script>
// typical Vue component controller defined and registered here
import Controller from "@/../lib/controller";
import barChart from "@/components/BarChart.vue";
import lineChart from "@/components/LineChart.vue";
import pieChart from "@/components/PieChart.vue";
import bubbleChart from "@/components/BubbleChart.vue";
import TelemetryRecord from "@/../lib/TelemetryRecord";

class AdminController extends Controller {
  constructor(name, subComponentList = []) {
    super(name, subComponentList);
    this.vm = {
      loaded: false,
      savedRecords: [],
      chartData: {
        labels: ["BuildId", "PlayerId", "PositionX", "PositionY", "Action"],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
    this.props = {};

    
    this.injectActions(["updateRecord"]);
    this.injectActions(["getRecords"]);
    this.injectActions(["setTMRecords"]);
    this.injectActions(["clearRecords"]);
    this.injectGetters(["getCurrentRecord"]);
    this.injectGetters(["getTelemetryArray"]);
    this.injectGetters(["getStringRecords"]);
  }

  loadTelemetryData() {
    this.clearRecords();
    this.savedRecords = [];
    return new Promise((resolve, reject) => {
      this.getRecords();
      try {
        JSON.parse(this.getStringRecords)
      } catch (error) {
        console.log("Press the load button again. The promise had not finished retreving data")
        return;
      }
      let array = JSON.parse(this.getStringRecords);
      let tmArray = [];
      array.forEach(element => {
        let td = new TelemetryRecord();
        td.data = element;
        td.count = element.count;
        tmArray.push(td);
      });
      this.setTMRecords(tmArray)
      this.chartData.datasets = []
      tmArray.forEach(element =>{
        let newDataset = {}
        newDataset.label = "player " + element.data.playerId;
        newDataset.backgroundColor = "#f87979";
        newDataset.data = [element.data.buildId,element.data.playerId,element.data.pos.x,element.data.pos.y,element.data.action];
        this.savedRecords.push(element.asString());
        this.chartData.datasets.push(newDataset);
      })
      this.loaded = true;
    });
  }
}

// export a definition for this view
export default new AdminController("telemetryAdmin", { barChart, lineChart, pieChart, bubbleChart });
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>