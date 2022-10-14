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
            
            alert('Add a job entry to get started!');
            $('#inputSection').show();
            $('#subClear').show();
            $('#updateCancel').hide();
            $('#displaySection').hide();
            $('#cancelAdd').attr('disabled', true);

            }else{ //if there is job data

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


//function to display job list
function displayJobs() {
    jobArray = JSON.parse(localStorage.getItem(storageKey)); //get data and parse it to array
    console.log(jobArray);
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
                            <button class="job-edit" onclick="jobEditBtnFn(${jobIndex})">Edit</button>
                            <button class="job-del" onclick="jobDelBtnFn(${jobIndex})">Delete</button>
                        </td>
                    </tr>`

                myString += string;
            };

            $('#jobTable').html(myString);

        };
};

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

    return jobObject;
}

//function to add to jobArray, send to storage
function saveNewJob(){
    var newJob = createNewJob();
    jobArray.push(newJob);
    localStorage.setItem(storageKey, JSON.stringify(jobArray));
    clearForm();
}


//function to delete job objects
function removeJob(clickedJob) {
    jobArray.splice(clickedJob, 1);
    localStorage.setItem(storageKey, JSON.stringify(jobArray));
    displayJobs();
};


//function to view edit job objects
function viewJob(clickedJob) {
    var job = jobArray[clickedJob];
    $('#updateJob').attr('data-index', clickedJob);

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
        for (var i = 0; i < list.length; i++) { 
            var jobTitle         = list[i].title;
            var jobCompany       = list[i].company;
            var jobApply         = list[i].apply;
            var jobApplyDate     = list[i].applyDate;
            var jobInterview     = list[i].interview;
            var jobInterviewDate = list[i].interviewDate;
            var jobOffer         = list[i].offer;
            var jobNote          = list[i].note;
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
                        <button class="job-edit" onclick="jobEditBtnFn(${jobIndex})">Edit</button>
                        <button class="job-del" onclick="jobDelBtnFn(${jobIndex})">Delete</button>
                    </td>
                </tr>`
            myString += string;
        };
    $('#jobTable').html(myString);
};


function sortByNotApplied(){
    console.log('not applied for');
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].apply == 'notAppliedFor'){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByApplied(){
    console.log('applied for');
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].apply == 'appliedFor'){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByApplyDate(){
    console.log('application date');
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
    console.log('not interviewed');
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].interview == 'notOffered' || jobArray[i].interview == 'willInterview'){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByWillInterview(){
    console.log('will interview');
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].interview == 'willInterview'){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByInterviewed(){
    console.log('interviewed');
    console.log('will interview');
    var list = [];
    for (i=0; i<jobArray.length; i++){
        if(jobArray[i].interview == 'interviewed'){
            list.push(jobArray[i])
        }
    }
    displaySorted(list);
}

function sortByInterviewDate(){
    console.log('interview date');
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
    console.log('offered');
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
    var clickedJob = $(this).attr('data-index');
    saveEdit(clickedJob);
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