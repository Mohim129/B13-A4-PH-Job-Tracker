const allFilterButton = document.getElementById("all-filter-button");
const interviewFilterButton = document.getElementById("interview-filter-button");
const rejectedFilterButton = document.getElementById("rejected-filter-button");


const allJobsDiv = document.getElementById("all-jobs-cards");
const interviewJobsDiv = document.getElementById("interview-jobs-cards");
const rejectedJobsDiv = document.getElementById("rejected-jobs-cards");

function toggleStyle(id,parent){
    allFilterButton.classList.remove('btn-primary');
    interviewFilterButton.classList.remove('btn-primary');
    rejectedFilterButton.classList.remove('btn-primary');

    allJobsDiv.classList.add('hidden');
    interviewJobsDiv.classList.add('hidden');
    rejectedJobsDiv.classList.add('hidden');

    const addTo =document.getElementById(id);
    const parentHide = document.getElementById(parent);

    const noJob = document.getElementById('no-jobs')
    noJob.classList.add('hidden')

    const childCount = Number(parentHide.children.length);


    addTo.classList.add('btn-primary')

    if(childCount===0){
        noJob.classList.remove("hidden");
    }
    else{
        parentHide.classList.remove("hidden");
    }
    // parentHide.classList.remove('hidden')
}