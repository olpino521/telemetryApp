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
        telemetryArray: [],
        stringRecords: "",
    }, 
    mutations: {
        SET_CURRENT_RECORD: (state, newRecord) => {
            state.currentRec = newRecord
            state.telemetryArray.push(newRecord)
        },
        SET_RECORDS: (state, loadedRecords) => {
            state.stringRecords = loadedRecords
        },
        SET_TM: (state, records) => {
            state.telemetryArray = records
        },
        CLEAR_RECORDS: (state) => state.telemetryArray = []
    }, 
    actions: {
        async updateRecord({commit}, newRec){
            commit('SET_CURRENT_RECORD', newRec)

            let id = await cloud.post('telemetry', newRec)
            .catch(err =>{
                console.log(err)
                return
            })
        },
        async getRecords({commit}){
            
            let get = await cloud.get('telemetry')
            .catch(err => {
                console.log(err)
                return
            })
            commit('SET_RECORDS', get)
            
        },
        clearRecords({commit}){
            commit('CLEAR_RECORDS')
        },
        setTMRecords({commit}, telemetry){
            commit('SET_TM', telemetry)
        }
    }, 
    getters: {
        getCurrentRecord: state => state.currentRec,
        getTelemetryArray: state => state.telemetryArray,
        getStringRecords: state => state.stringRecords,
    } 
});

export default store;