<!--
<some-tag-name title="My Component">
    -- user can add their own HTML code here, replaces 'slot' component --
</some-tag-name>

@copyright (c) 2019. Scott Henshaw. All Rights Reserved.
-->
<template>

    <section class="component-style">  <!-- Just one main element per template -->
        <div>{{ title }}</div>
        <div>
            <!-- Put your HTML template here-->
            <slot></slot>
        </div>
        <button @click="doIt( event )">Do it!</button>
    </section>

</template>
<script>
    import Controller from '@/../lib/controller'

    // import other components you use here...

    class ComponentController extends Controller {

        constructor( name, subComponentList = []) {
            super( name, subComponentList )
            this.vm = {
                someData: "Hello world"
            }
            this.props = { // props are passed in when using this component
                title: String
            }
        }

        doIt( event ) {
            // A method that does something to the props or viewModel, or global state
        }
    }

    export default new ComponentController('someTagName'/* , { subComponent, anotherComponent } */);

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