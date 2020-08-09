<template>
  <div class="about">
    <h1>Telemetry Admin</h1>
    <form @submit.prevent="saveRec">
      <label>Build ID:</label>
      <input type="text" v-model="currentRecord.buildId" />
      <br />
      <label>Player ID:</label>
      <input type="text" v-model="currentRecord.playerId" />
      <br />
      <label>X Position:</label>
      <input type="text" v-model="currentRecord.pos.x" />
      <br />
      <label>Y Position:</label>
      <input type="text" v-model="currentRecord.pos.y" />
      <br />
      <label>Action:</label>
      <input type="text" v-model="currentRecord.action" />
      <br />
      <input type="submit" value="Save" />
    </form>
    <button @click="loadTelemetryData">Load</button>
    <li v-for="item in savedRecords" :key="item">{{item}}</li>
  </div>
</template>
<script>
// typical Vue component controller defined and registered here
import Controller from "@/../lib/controller";
import TelemetryRecord from "@/../lib/TelemetryRecord";

class AdminController extends Controller {
  constructor(name, subComponentList = []) {
    super(name, subComponentList);
    this.vm = {
      currentRecord: new TelemetryRecord(),
      savedRecords: []
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

  saveRec() {
    //Save in firebase
    this.loadTelemetryData();
    let position = {
      x: parseInt(this.currentRecord.pos.x),
      y: parseInt(this.currentRecord.pos.y)
    };
    let tRec = new TelemetryRecord(
      this.currentRecord.buildId,
      parseInt(this.currentRecord.playerId),
      position,
      parseInt(this.currentRecord.action),
      this.getTelemetryArray.length
    );
    this.updateRecord(tRec);

    let recString = tRec.asString();
    this.savedRecords.push(recString);
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
      console.log(array)
      let tmArray = [];
      array.forEach(element => {
        let td = new TelemetryRecord();
        td.data = element;
        td.count = element.count;
        tmArray.push(td);
      });
      this.setTMRecords(tmArray)
      tmArray.forEach(element =>{
        this.savedRecords.push(element.asString());
      })
    });
  }
}

// export a definition for this view
export default new AdminController("telemetryAdmin", {});
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