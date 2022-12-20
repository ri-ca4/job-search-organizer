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
        if (localStorage.getItem(storageKey) === null) { //if there is no job data
            $('#first-visit').show();
            $('#inputSection').hide();
            $('#subClear').hide();
            $('#updateCancel').hide();
            $('#displaySection').hide();

            }else{ //if there is job data

                alert('Welcome Back');
                $('#first-visit').hide();
                $('#inputSection').hide();
                $('#displaySection').show();
                displayJobs();

        }
        }else{// if there is no local storage available
            
            alert('No local storage available. Please choose a different browser');
            $('#first-visit').hide();
            $('#inputSection').hide();
            $('#displaySection').hide();

    }
};

//function to clear form
function clearForm(){
    var title           = $('#jobTitle');
    var company         = $('#company');
    var applyDate       = $('#dateApplied');
    var interviewDate   = $('#dateInterview');
    var notes           = $('#notes');

    $(title).val('')
    $(company).val('')
    $(applyDate).val('')
    $(interviewDate).val('')
    $(notes).val('')
    $("input[name='apply']").prop('checked', false);
    $("input[name='interview']").prop('checked', false);
    $("input[name='offer']").prop('checked', false);
}

//show input section on first visit
$('#first-visit-continue').click(function(){
    $('#first-visit').hide();
    alert('Add a job entry to get started!');
    $('#inputSection').show();
    $('#subClear').show();
    $('#cancelAdd').attr('disabled', true);
})


//function to display job list
function displayJobs() {
    jobArray = JSON.parse(localStorage.getItem(storageKey)); //get data and parse it to array

    var myString;
        if (jobArray.length == 0){//if there is no data
            alert('You have no current tasks!');
            $('#inputSection').show();
            $('#subClear').show();
            $('#updateCancel').hide();
            $('#displaySection').hide();
            $('#cancelAdd').attr('disabled', true)
        }else{
            $('#inputSection').hide();
            $('#subClear').hide();
            $('#updateCancel').hide();
            $('#displaySection').show();
            for (var i = 0; i < jobArray.length; i++) { 
                var jobTitle         = jobArray[i].title;
                var jobCompany       = jobArray[i].company;
                var jobApply         = jobArray[i].apply;
                var jobApplyDate     = jobArray[i].applyDate;
                var jobInterview     = jobArray[i].interview;
                var jobInterviewDate = jobArray[i].interviewDate;
                var jobOffer         = jobArray[i].offer;
                var jobNotes         = jobArray[i].notes;
                var jobId            = jobArray[i].id;
                var jobIndex         = i;

                var string =
                    `<tr class="job-item" id="${jobId}">
                        <td class="job-title">${jobTitle}</td>
                        <td class="job-company">${jobCompany}</td>
                        <td class="job-apply"><span class="${jobApply}"></span></td>
                        <td class="job-apply-date">${jobApplyDate}</td>
                        <td class="job-interview"><span class="${jobInterview}"></span></td>
                        <td class="job-interview-date">${jobInterviewDate}</td>
                        <td class="job-offer"><span class="${jobOffer}"></span></td>
                        <td class="job-note"><button class="view-notes" onClick="dispNote(${jobId})">View Notes</button></td>
                        <td class="job-btns">
                            <button class="job-edit" onclick="jobEditBtnFn(${jobIndex})">Edit</button>
                            <button class="job-del" onclick="jobDelBtnFn(${jobIndex})">Delete</button>
                        </td>
                    </tr>`

                myString += string;
            };

            $('#jobRows').html(myString);

        };
};

function dispNote(job) {
    var jobIndex = jobArray.map(object => object.id).indexOf(job);
    var noteDisplay = $('#noteDisplay');
    if(!jobArray[jobIndex].notes){
        noteDisplay.html('There are no notes for this job')
    }else{
        noteDisplay.html(jobArray[jobIndex].notes)
    }
}

function uniqueID() {
    return Math.floor(Math.random() * Date.now())
}

//create job object
function createNewJob(){
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
    jobObject.id            = uniqueID();

    return jobObject;
}

//function to add to jobArray, send to storage
function saveNewJob(){
    var newJob = createNewJob();
    jobArray.push(newJob);
    localStorage.setItem(storageKey, JSON.stringify(jobArray));
    clearForm();
}


//function to delete job objects <---this one works
function removeJob(clickedJob) {
    jobArray.splice(clickedJob, 1);
    localStorage.setItem(storageKey, JSON.stringify(jobArray));
    displayJobs();
};


//function to view edit job objects
function viewJob(clickedJob) {
    var job = jobArray[clickedJob];
    $('#updateJob').attr('data-id', job.id);

    var title           = $('#jobTitle');
    var company         = $('#company');
    var applyDate       = $('#dateApplied');
    var interviewDate   = $('#dateInterview');
    var notes           = $('#notes');

    $(title).val(job.title);
    $(company).val(job.company);
    $(`input[name='apply'][value='${job.apply}']`).prop('checked', true);
    $(applyDate).val(job.applyDate);
    $(`input[name='interview'][value='${job.interview}']`).prop('checked', true);
    $(interviewDate).val(job.interviewDate);
    $(`input[name='offer'][value='${job.offer}']`).prop('checked', true);
    $(notes).val(job.notes);

    $('#inputSection').show();
    $('#updateCancel').show();
    $('#subClear').hide();
    $('#displaySection').hide();
}

//function to save edited job and rm old job
function saveEdit(clickedJob){
    var editedJob = createNewJob();
    jobArray.push(editedJob);
    localStorage.setItem(storageKey, JSON.stringify(jobArray));
    clearForm();
    removeJob(clickedJob);
}

//sort functions
function displaySorted(list){
    var myString;
        if(list.length == 0){myString = ''}
        for (var i = 0; i < list.length; i++) { 
            var jobTitle         = list[i].title;
            var jobCompany       = list[i].company;
            var jobApply         = list[i].apply;
            var jobApplyDate     = list[i].applyDate;
            var jobInterview     = list[i].interview;
            var jobInterviewDate = list[i].interviewDate;
            var jobOffer         = list[i].offer;
            var jobId            = list[i].id
            var jobIndex         = jobArray.map(object => object.id).indexOf(list[i].id);

            var string =
                `<tr class="job-item" id="${jobId}">
                    <td class="job-title">${jobTitle}</td>
                    <td class="job-company">${jobCompany}</td>
                    <td class="job-apply"><span class="${jobApply}"></span></td>
                    <td class="job-apply-date">${jobApplyDate}</td>
                    <td class="job-interview"><span class="${jobInterview}"></span></td>
                    <td class="job-interview-date">${jobInterviewDate}</td>
                    <td class="job-offer"><span class="${jobOffer}"></span></td>
                    <td class="job-note"><button class="view-notes" onClick="dispNote(${jobId})">View Notes</button></td>
                    <td class="job-btns">
                        <button class="job-edit" onclick="jobEditBtnFn(${jobIndex})">Edit</button>
                        <button class="job-del" onclick="jobDelBtnFn(${jobIndex})">Delete</button>
                    </td>
                </tr>`
            myString += string;
        };
    $('#jobRows').html(myString);
};


function sortByNotApplied(){
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].apply == 'notAppliedFor' || jobArray[i].apply == null){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByApplied(){
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].apply == 'appliedFor'){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByApplyDate(){
    var list = [];
    var listB = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].apply == 'appliedFor'){
            list.push(jobArray[i])
        }else{
            listB.push(jobArray[i])
        }
    }
    list.sort((a, b) =>(a.applyDate > b.applyDate) ? 1 : -1);
    list = list.concat(listB);
    displaySorted(list);
}

function sortByNotInterview(){
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].interview == 'notOffered' || jobArray[i].interview == 'willInterview' || jobArray[i].interview == null){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByWillInterview(){
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].interview == 'willInterview'){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByInterviewed(){
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].interview == 'interviewed'){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByInterviewDate(){
    var list = [];
    var listB = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].interview == 'interviewed' || jobArray[i].interview == 'willInterview'){
            list.push(jobArray[i])
        }else{
            listB.push(jobArray[i])
        }
    }
    list.sort((a, b) =>(a.interviewDate > b.interviewDate) ? 1 : -1);
    list = list.concat(listB);
    displaySorted(list);
}

function sortByOffered(){
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].offer == 'jobOffered'){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}


//Event Listeners

$(window).on('load', main());

$('#clearEntry').click(function(){
    clearForm()
});

$('#submitJob').click(function(){
    saveNewJob();
    displayJobs();
});

$('#cancelEdit').click(function(){
    clearForm();
    $('#inputSection').hide();
    $('#subClear').hide();
    $('#updateCancel').hide();
    $('#displaySection').show();
})

$('#updateJob').click(function(){
    var thisId = parseInt($(this).attr('data-id'));
    var job = jobArray.map(object => object.id).indexOf(thisId);
    saveEdit(job);
})

$('#cancelAdd').click(function(){
    clearForm();
    $('#inputSection').hide();
    $('#subClear').hide();
    $('#updateCancel').hide();
    $('#displaySection').show();
})

//onclick functions
function jobDelBtnFn(e){
    removeJob(e);
}

function jobEditBtnFn(e){
    viewJob(e);
}

function newJobBtn(){
    $('#inputSection').show();
    $('#subClear').show();
    $('#updateCancel').hide();
    $('#displaySection').hide();
    $('#cancelAdd').attr('disabled', false);
}

function sortJobs(){
    var sort = $('#sortBy');
    var sortBy = sort.val();

    if(sortBy == 'all'){displayJobs()};
    if(sortBy == 'notApplied'){sortByNotApplied()}
    if(sortBy == 'appliedFor'){sortByApplied()}
    if(sortBy == 'applicationDate'){sortByApplyDate()}
    if(sortBy == 'notInterviewed'){sortByNotInterview()}
    if(sortBy == 'willInterview'){sortByWillInterview()}
    if(sortBy == 'interviewed'){sortByInterviewed()}
    if(sortBy == 'interviewDate'){sortByInterviewDate()}
    if(sortBy == 'offered'){sortByOffered()}
}