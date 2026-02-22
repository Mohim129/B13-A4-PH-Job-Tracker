let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectCount = document.getElementById("rejected-count");
let totalCount2 = document.getElementById('total-count-2')

const allJobs = document.getElementById('all-jobs-cards');
const allJobs2 = document.getElementById('all-jobs-cards');
const interviewJobs = document.getElementById("interview-jobs-cards");  
const rejectedJobs = document.getElementById('rejected-jobs-cards')  

let aJ = Number(allJobs.children.length);
let iJ = Number(interviewJobs.children.length);
let rJ = Number(rejectedJobs.children.length);

function calculateCount(){
    totalCount.innerText = Number(allJobs.children.length);
    totalCount2.innerText = Number(allJobs.children.length);
    interviewCount.innerText = Number(interviewJobs.children.length);
    rejectCount.innerText = Number(rejectedJobs.children.length);
}
calculateCount()