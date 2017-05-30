import firebase from 'firebase';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class QuoteManagementProvider {

    dataQuotes: Array<any>;
    dataSubmittedQuotes: Array<any>;
    dataReportedQuotes: Array<any>;
    dataUser: Array<any>;
    dataCategory: Array<any>;
    dataAuthor: Array<any>;


    constructor() {

    }

    setQuotes() {
        return firebase.database().ref('quotes').once('value', snapshot => {
            let quotesArray = [];
            let counter = 0;
            for (let i in snapshot.val()) {
                quotesArray[counter] = snapshot.val()[i];
                quotesArray[counter].id = i;
                counter++;
            }
            this.dataQuotes = quotesArray;
        });
    }

    setSubmitted() {
        return firebase.database().ref('submittedQuotes').once('value', snapshot => {
            let submittedArray = [];
            let counter = 0;
            for (let i in snapshot.val()) {
                submittedArray[counter] = snapshot.val()[i];
                submittedArray[counter].id = i;
                submittedArray[counter].deleted = false;
                counter++;
            }
            this.dataSubmittedQuotes = submittedArray;
        });
    }

    setReported() {
        return firebase.database().ref('reportedQuotes').once('value', snapshot => {
            let reportedArray = [];
            let counter = 0;
            for (let i in snapshot.val()) {
                reportedArray[counter] = snapshot.val()[i];
                reportedArray[counter].id = i;
                reportedArray[counter].deleted = false;
                counter++;
            }
            this.dataReportedQuotes = reportedArray;
        });
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
            this.dataUser = _.sortBy(this.dataUser, "score").reverse();
        });
    }

    setAuthor() {
        return firebase.database().ref('authors').once('value', snapshot => {
            let authorArray = [];
            let counter = 0;
            for (let i in snapshot.val()) {
                authorArray[counter] = snapshot.val()[i];
                authorArray[counter].id = i;
                counter++;
            }
            this.dataAuthor = authorArray;
        });
    }

    setCategory() {
        return firebase.database().ref('category').once('value', snapshot => {
            let categoryArray = [];
            let counter = 0;
            for (let i in snapshot.val()) {
                categoryArray[counter] = snapshot.val()[i];
                categoryArray[counter].id = i;
                counter++;
            }
            this.dataCategory = categoryArray;
        });
    }

}
