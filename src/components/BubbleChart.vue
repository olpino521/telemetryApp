<!-- Copyright (c) 2020. Omar Pino. All Rights Reserved. -->
<script>
import Controller from "@/../lib/controller";
import { Radar, mixins } from "vue-chartjs";
const {reactiveProp} = mixins

// import other components you use here...

class BubbleChartController extends Controller {
  constructor(name, subComponentList = []) {
    super(name, subComponentList);
    this.extends = Radar;

    this.vm = {
      someData: "Hello world",
      
    };
    this.props = {
      // props are passed in when using this component
      chartData: {},
      options: {}
    };
    this.mixins = [reactiveProp]
  }

  vue_mounted() {
    this.renderChart(this.chartData, this.options);
  }
}

export default new BubbleChartController(
  "bubbleChart" /* , { subComponent, anotherComponent } */
);
</script>
<style scoped>
/*
    Add "scoped" attribute to limit CSS to this component only <style scoped>
    styles that are specific to this component only, not sub-children
    */
.component-style {
  display: flex;
  height: 20vh;
  width: 100%;
}
</style>