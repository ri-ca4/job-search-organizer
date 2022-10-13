// alert('connected')

/*
    title: job search organizer
    date: 10/13/22
    author: ri-ca4
*/

var jobArray = [];
var storageKey = 'myJobList';

//function to test local storage
function storageAvailable() {
    try {
      var x = '__storage_test__';
      localStorage.setItem(x, x);
      localStorage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
};

//function to get job list from storage
function main() {
    if (storageAvailable() === true) { //check if local storage is available
        if (localStorage.getItem(storageKey) === null) { //if there is local storage but no job data
            
        }else{ //if there is local storage and there is job data
            
        }else{// if there is no local storage available

        };
};

//function to create job objects, add to jobArray, send to storage
function getNewJob() {

    //make user input into an object
    let jobObject = new Object();

    //add task to array
    jobArray.push(jobObject);

    //send item to storage
    localStorage.setItem(storageKey, JSON.stringify(jobArray));

    //reset input fields

    displayJobs();
}

//function to delete job objects
function removeJob() {
    var jobToRemove

    //remove job from array

    //save changes in local storage
    localStorage.setItem(storageKey, JSON.stringify(jobArray));
    displayJobs();
};

//function to display job list
function displayJobs() {
    jobArray = JSON.parse(localStorage.getItem(storageKey)); //get data and parse it to array
    var myString = '';
        if (jobArray.length == 0){//if there is no data

        }else{
            for (var i = 0; i < jobArray.length; i++) { 

            };

        };
};

//functions to sort list

//event listeners