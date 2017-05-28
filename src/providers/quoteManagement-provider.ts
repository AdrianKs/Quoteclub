import firebase from 'firebase';
import { Injectable } from '@angular/core';
//import * as _ from 'lodash';

@Injectable()
export class QuoteManagementProvider {

    dataSubmittedQuotes: Array<any>;
    dataReportedQuotes: Array<any>;


    constructor() {

    }

    setSubmitted() {
        return firebase.database().ref('submittedQuotes').once('value', snapshot => {
            let submittedArray = [];
            let counter = 0;
            for (let i in snapshot.val()) {
                submittedArray[counter] = snapshot.val()[i];
                submittedArray[counter].id = i;
                counter++;
            }
            this.dataSubmittedQuotes = submittedArray;
            //this.dataUser = _.sortBy(this.dataUser, "score").reverse();
        });
    }

    setReported() {
        return firebase.database().ref('reportedQuotes').once('value', snapshot => {
            let reportedArray = [];
            let counter = 0;
            for (let i in snapshot.val()) {
                reportedArray[counter] = snapshot.val()[i];
                reportedArray[counter].id = i;
                counter++;
            }
            this.dataReportedQuotes = reportedArray;
            //this.dataUser = _.sortBy(this.dataUser, "score").reverse();
        });
    }

}
