/*
VUE App's MAIN Component.
Copyright (c) 2018. Omar Pino. All Rights Reserved.
*/
'use strict';import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from '@/store'
import router from '@/router'

Vue.config.productionTip = false

class MainApp {

    constructor () {
        new Vue({
            router,
            store,
            components: { App },
            render: h => h( App ),
        }).$mount('#app');
    }

}

// Main entry point of the application
document.addEventListener('DOMContentLoaded', event => {

    const app = new MainApp();
});