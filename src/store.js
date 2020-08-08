/*
VUEX Data Store.
Copyright (c) 2019. Scott Henshaw, Kibble Online Inc. All Rights Reserved.
*/
import Vue from 'vue'
import Vuex from 'vuex'
import TelemetryRecord from '@/../lib/TelemetryRecord';
import Connection from '@/../lib/Connection'
Vue.use( Vuex )

const cloud = new Connection()

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
        currentRec: new TelemetryRecord(),
        telemetryArray: []
    }, 
    mutations: {
        SET_CURRENT_RECORD: (state, newRecord) => {
            state.currentRec = newRecord
            state.telemetryArray.push(newRecord)
        }
    }, 
    actions: {
        async updateRecord({commit}, newRec){
            commit('SET_CURRENT_RECORD', newRec)

            let id = await cloud.post('telemetry', newRec)
            .catch(err =>{
                console.log(err)
                return
            })
        }
    }, 
    getters: {
        getCurrentRecord: state => state.currentRec,
        getTelemetryArray: state => state.telemetryArray
    } 
});

export default store;