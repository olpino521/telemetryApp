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
    <li v-for="item in saveRecords" :key="item">{{item}}</li>
  </div>
</template>
<script>
// typical Vue component controller defined and registered here
import Controller from "@/../lib/controller";
import TelemetryRecord from "@/../lib/TelemetryRecord"

class AdminController extends Controller {
  constructor(name, subComponentList = []) {
    super(name, subComponentList);
    this.vm = {
      currentRecord: new TelemetryRecord(),
      saveRecords: []
    };
    this.props = {};

    this.injectActions(['updateRecord']);
    this.injectGetters(['getCurrentRecord'])
  }

  compute_records() {
    return this.saveRecords;
  }

  saveRec() {
    //Save in firebase
    let position = {
      x: parseInt(this.currentRecord.pos.x),
      y: parseInt(this.currentRecord.pos.y)
    };
    let tRec = new TelemetryRecord(
      this.currentRecord.buildId,
      parseInt(this.currentRecord.playerId),
      position,
      parseInt(this.currentRecord.action),
      this.saveRecords.length
    );
    this.updateRecord(tRec)
    let recString = tRec.asString();
    this.saveRecords.push(recString);
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