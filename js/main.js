// alert('connected')

/*
    title: job search organizer
    date: 10/13/22
    author: ri-ca4
*/
var jobArray = [];
const storageKey = 'myJobList';

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

    if (storageAvailable()) { //check if local storage is available
        if (localStorage.getItem(storageKey) === null) { //if there is job data
            alert('Add a job entry to get started!');
            $('#inputSection').show();
            $('#displaySection').hide();

            }else{ //if there is no job data

                alert('Welcome Back');
                $('#inputSection').hide();
                $('#displaySection').show();
                displayJobs();

        }
        }else{// if there is no local storage available
            alert('No local storage available. Please choose a different browser');
            $('#inputSection').hide();
            $('#displaySection').hide();
    }
};

//function to create job objects, add to jobArray, send to storage
function getNewJob() {
    
    var title           = $('#jobTitle');
    var company         = $('#company');
    var apply           = $('input[name="apply"]:checked');
    var applyDate       = $('#dateApplied');
    var interview       = $('input[name="interview"]:checked');
    var interviewDate   = $('#dateInterview');
    var offer           = $('input[name="offer"]:checked');
    var notes           = $('#notes');

    //make user input into an object
    let jobObject           = new Object();
    jobObject.title         = $(title).val();
    jobObject.company       = $(company).val();
    jobObject.apply         = $(apply).val();
    jobObject.applyDate     = $(applyDate).val();
    jobObject.interview     = $(interview).val();
    jobObject.interviewDate = $(interviewDate).val();
    jobObject.offer         = $(offer).val();
    jobObject.notes         = $(notes).val();

    //add task to array
    jobArray.push(jobObject);

    //send item to storage
    localStorage.setItem(storageKey, JSON.stringify(jobArray));

    //reset input fields
    $(title).val('')
    $(company).val('')
    $(applyDate).val('')
    $(interviewDate).val('')
    $(notes).val('')

    displayJobs();
}

//function to delete job objects
function removeJob(clickedJob) {
    // console.log(clickedJob);
    //remove job from array
    jobArray.splice(clickedJob, 1)
    localStorage.setItem(storageKey, JSON.stringify(jobArray));
    displayJobs();
};

//function to "edit" job objects

//function to display job list
function displayJobs() {
    console.log('called')
    jobArray = JSON.parse(localStorage.getItem(storageKey)); //get data and parse it to array
    console.log (jobArray)
    var myString
        if (jobArray.length == 0){//if there is no data
            alert('You have no current tasks!');
            $('#inputSection').show();
            $('#displaySection').hide();
        }else{
            $('#inputSection').hide();
            $('#displaySection').show();
            for (var i = 0; i < jobArray.length; i++) { 
                var jobTitle         = jobArray[i].title;
                var jobCompany       = jobArray[i].company;
                var jobApply         = jobArray[i].apply;
                var jobApplyDate     = jobArray[i].applyDate;
                var jobInterview     = jobArray[i].interview;
                var jobInterviewDate = jobArray[i].interviewDate;
                var jobOffer         = jobArray[i].offer;
                var jobNote          = jobArray[i].note;
                var jobIndex         = i;

                var string =
                    `<tr class="job-item" id="job${jobIndex}">
                        <td class="job-title">${jobTitle}</td>
                        <td class="job-company">${jobCompany}</td>
                        <td class="job-apply">${jobApply}</td>
                        <td class="job-apply-date">${jobApplyDate}</td>
                        <td class="job-interview">${jobInterview}</td>
                        <td class="job-interview-date">${jobInterviewDate}</td>
                        <td class="job-offer">${jobOffer}</td>
                        <td class="job-note">${jobNote}</td>
                        <td class="job-btns">
                            <button class="job-edit" data-index="${jobIndex}">Edit</button>
                            <button class="job-del" data-index="${jobIndex}">Delete</button>
                        </td>
                    </tr>`

                myString += string;
            };

            $('#jobTable').html(myString);

        };
};

//functions to sort list

//event listeners
$(window).on('load', main());

$('#submitJob').on('click', function(){
    console.log('click')
    getNewJob()
});

$('.job-del').on('click', function(){
    console.log('click')
    var clickedJob = $(this).attr('data-index')
    removeJob(clickedJob)
})
