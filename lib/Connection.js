/* Copyright (C) 2020 Alejandro Lopez, All Rights Reserved */
'user strict';

import * as firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import TelemetryRecord from './TelemetryRecord.js'

export default class Connection {

    constructor() {

        let config = {
            apiKey: "AIzaSyBIqyeDbaP5SeAxhqI6Wt7jHrm2Z2glz5w",
            authDomain: "ltsonar-33e3d.firebaseapp.com",
            databaseURL: "https://ltsonar-33e3d.firebaseio.com",
            projectId: "ltsonar-33e3d",
            storageBucket: "ltsonar-33e3d.appspot.com",
            messagingSenderId: "142847879983",
            appId: "1:142847879983:web:7b687229f3bc254aec0fda",
            measurementId: "G-S7TP0P45XC"

        };

        firebase.initializeApp(config);

        this.dataStore = firebase.firestore();
    }

    get(collectionType){

        return new Promise( async (resolve, reject) => {
            let collection = this.dataStore.collection(collectionType);
            let temp = []
            let query = collection.get()
            .then(snapshot => {
                
                snapshot.forEach(doc => {
                    let tp ={
                        buildId: doc.data().data.buildId,
                        playerId: doc.data().data.playerId,
                        pos: {x: doc.data().data.pos.x, y: doc.data().data.pos.y},
                        action: doc.data().data.action,
                    } 
                    tp.count = doc.data().count;
                    temp.push(tp);
                });
                let stringTemp = JSON.stringify(temp);
                resolve(stringTemp);
            })
            .catch(err => {
                console.log(err);
            });
            
        });
    }

    post(collectionType, data){

        return new Promise( async (resolve, reject) => {
            let collection = this.dataStore.collection(collectionType);
            const docRef = await collection.add({...data}).catch(error => reject(error));
            resolve(docRef);
        });
    }
}