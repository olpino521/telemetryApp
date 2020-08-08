<template>
  <div class="about">
    <h1>Chart</h1>

  </div>
</template>
<script>
    // typical Vue component controller defined and registered here
    import Controller from '@/../lib/controller'

    class AdminController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList );
            this.vm = {
                buildId: 1234,
                playerId: 0,
                pos: {x: 0, y:0},
                action: 0
            }
            this.props = {};
        }

        saveRec(){
          //Save in firebase
        }
    }

    // export a definition for this view
    export default new AdminController('telemetryAdmin', {});

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