import firebase from 'firebase';
import { Injectable } from '@angular/core';
//import * as _ from 'lodash';

@Injectable()
export class UserProvider {

    dataUser: Array<any>;


    constructor() {

    }

    setUser() {
        return firebase.database().ref('user').once('value', snapshot => {
            let userArray = [];
            let counter = 0;
            for (let i in snapshot.val()) {
                userArray[counter] = snapshot.val()[i];
                userArray[counter].id = i;
                counter++;
            }
            this.dataUser = userArray;
            //this.dataUser = _.sortBy(this.dataUser, "score").reverse();
        });
    }

}
