/*
VUEX Data Store.
Copyright (c) 2019. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
import Vue from 'vue'
import Vuex from 'vuex'
import TelemetryRecord from '@/../lib/TelemetryRecord';
Vue.use( Vuex )

// Modules

// Store with modules
/* const store = new Vuex.Store({
    modules: {
        ModelStore,
        PlayerStore,
        GameStore,
        ChatStore,
    }
}); */

//      OR

// Store with local definitions
const store = new Vuex.Store({ 
    state: {
        currentRec: new TelemetryRecord()
    }, 
    mutations: {
        SET_CURRENT_RECORD: (state, newRecord) => {
            state.currentRec = newRecord
        }
    }, 
    actions: {
        updateRecord({commit}, newRec){
            commit('SET_CURRENT_RECORD', newRec)
        }
    }, 
    getters: {
        getCurrentRecord: state => state.currentRec
    } 
});

export default store;