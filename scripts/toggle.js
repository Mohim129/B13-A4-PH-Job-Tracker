const allFilterButton = document.getElementById("all-filter-button");
const interviewFilterButton = document.getElementById("interview-filter-button");
const rejectedFilterButton = document.getElementById("rejected-filter-button");


function toggleStyle(id){
    allFilterButton.classList.remove('btn-primary');
    interviewFilterButton.classList.remove('btn-primary');
    rejectedFilterButton.classList.remove('btn-primary');

    const addTo =document.getElementById(id);
    addTo.classList.add('btn-primary')
}