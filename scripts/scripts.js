let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectCount = document.getElementById("rejected-count");
let totalCount2 = document.getElementById("total-count-2");

let interviewList = [];
let rejectList = [];

const allJobs = document.getElementById("all-jobs-cards");
const allJobs2 = document.getElementById("all-jobs-cards");
const interviewJobs = document.getElementById("interview-jobs-cards");
const rejectedJobs = document.getElementById("rejected-jobs-cards");

const mainContainer = document.querySelector("main");
const filterDiv = document.getElementById("interview-jobs-cards");

function calculateCount() {
  totalCount.innerText = Number(allJobs.children.length);
  totalCount2.innerText = Number(allJobs.children.length);
  interviewCount.innerText = interviewList.length;
  console.log(interviewList.length);
  console.log(interviewCount.innerText);
  rejectCount.innerText = rejectList.length;
}
calculateCount();

mainContainer.addEventListener("click", function (event) {
    // console.log(event.target.parentNode.parentNode);
    // console.log(event.target.classList.contains("interview-btn"));
  if (event.target.classList.contains("interview-btn")) {
    const jobCard = event.target.parentNode.parentNode;
    const companyName = jobCard.querySelector(".company-name").innerText;
    const jobTitle = jobCard.querySelector(".job-position").innerText;
    const salaryInfo = jobCard.querySelector(".salary-info").innerText;
    const jobDescription = jobCard.querySelector(".notes").innerText;

    function statusChange() {
    jobCard.querySelector(".status-badge").classList.add("hidden");
    jobCard.querySelector(".interview-badge").classList.remove("hidden");
    const jobStatus = "Interview";
    return jobStatus;
    }
    const jobInfo = {
      companyName,
      jobTitle,
      salaryInfo,
      jobDescription,
      jobStatus: statusChange()
    };
    // console.log(jobInfo);

    const existingInterview = interviewList.find(
      (item) => item.companyName == jobInfo.companyName,
    );

    // jobCard.querySelector(".status-badge").classList.add('hidden');
    // jobCard.querySelector(".interview-badge").classList.remove('hidden');
    
    if (!existingInterview) {
      interviewList.push(jobInfo);
    //   console.log(interviewList);
      addInterviewJob();
    }
    calculateCount();
  }

});

function addInterviewJob() {
  filterDiv.innerHTML = "";
  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.className = "card bg-white w-full shadow-sm";
    div.innerHTML = `
            <div class="card-body">
              <div class="flex justify-between items-center">
                <h2 class="company-name text-info-content text-xl">${interview.companyName}</h2>
                <i
                  id="delete"
                  onclick=""
                  class="fa-regular fa-trash-can text-gray-400 cursor-pointer"
                ></i>
              </div>
              <h4 class="job-position text-[#64748b] mb-4">${interview.jobTitle}</h4>
              <h4 class=" salary-info text-[#64748b] text-xs">
                ${interview.salaryInfo}
              </h4>

              <!-- badge  -->
              <div id="badges" class="card-actions flex">
                <button
                  id="not-applied-badge"
                  class="status-badge btn bg-info-content/10 text-info-content hidden"
                  disabled
                >
                  Not Applied
                </button>
                <button
                  id="interview-badge"
                  class="interview-badge btn bg-success text-white"
                  disabled
                >
                  Interview
                </button>
                <button
                  id="reject-badge"
                  class="reject-badge btn bg-error text-white hidden"
                  disabled
                >
                  Reject
                </button>
              </div>


              <p class="notes text-info-content">
                ${interview.jobDescription}
              </p>
              <!-- buttons  -->
              <div class="interview-btn card-actions flex">
                <button onclick="setInterview('interview-badge','job-card-1')"
                  id="interview-btn"
                  class="interview-btn btn border-success text-success"
                >
                  Interview
                </button>
                <button
                  onclick="setInterview('reject-badge','job-card-1')"
                  id="reject-btn"
                  class="reject-btn btn border-error text-error"
                >
                  Reject
                </button>
              </div>
            </div>
        `;

    // console.log(div.innerHTML);
    filterDiv.appendChild(div);
  }
}
