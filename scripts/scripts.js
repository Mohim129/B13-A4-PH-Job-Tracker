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
const filterDiv2 = document.getElementById("rejected-jobs-cards");



function calculateCount() {
  totalCount.innerText = Number(allJobs.children.length);
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejectList.length;

  if (!allJobs.classList.contains("hidden")) {
    totalCount2.innerText = Number(allJobs.children.length);
  } else if (!interviewJobs.classList.contains("hidden")) {
    totalCount2.innerText = interviewList.length;
  } else if (!rejectedJobs.classList.contains("hidden")) {
    totalCount2.innerText = rejectList.length;
  }
}
calculateCount();

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const jobCard = event.target.parentNode.parentNode;
    const companyName = jobCard.querySelector(".company-name").innerText;
    const jobTitle = jobCard.querySelector(".job-position").innerText;
    const salaryInfo = jobCard.querySelector(".salary-info").innerText;
    const jobDescription = jobCard.querySelector(".notes").innerText;

    function statusChange() {
      let badge = jobCard.querySelector(".status-badge");
      let currentText = badge.innerText;

      if (currentText == "Not Applied" || currentText == "Rejected") {

        badge.classList.remove(
          "bg-info-content/10",
          "text-info-content",
          "bg-error",
          "text-white",
        );

        badge.classList.add("bg-success", "text-white");
        badge.innerText = "Interview";
        return badge.innerText;
      } else if (currentText == "Interview") {
        badge.classList.remove(
          "bg-success",
          "text-white",
          "bg-error",
          "text-white",
        );
        badge.classList.add("bg-info-content/10", "text-info-content");
        badge.innerText = "Not Applied";
        return badge.innerText;
      }
    }

    const newStatus = statusChange();

    const jobInfo = {
      companyName,
      jobTitle,
      salaryInfo,
      jobDescription,
      jobStatus: newStatus,
    };


    const existingInterview = interviewList.find(
      (item) => item.companyName == jobInfo.companyName,
    );

    if (!existingInterview) {
      interviewList.push(jobInfo);
      rejectList = rejectList.filter((item) => item.companyName != companyName);
    } else if (newStatus == "Not Applied") {
      interviewList = interviewList.filter(
        (item) => item.companyName != companyName,
      );
    }

    calculateCount();
    addInterviewJob();
    addRejectedJob();
  } else if (event.target.classList.contains("reject-btn")) {
    const jobCard = event.target.parentNode.parentNode;
    const companyName = jobCard.querySelector(".company-name").innerText;
    const jobTitle = jobCard.querySelector(".job-position").innerText;
    const salaryInfo = jobCard.querySelector(".salary-info").innerText;
    const jobDescription = jobCard.querySelector(".notes").innerText;

    function statusChange() {
      let badge = jobCard.querySelector(".status-badge");
      let currentText = badge.innerText;

      if (currentText == "Not Applied" || currentText == "Interview") {

        badge.classList.remove(
          "bg-info-content/10",
          "text-info-content",
          "bg-success",
          "text-white",
        );

        badge.classList.add("bg-error", "text-white");

        badge.innerText = "Rejected";

        return badge.innerText;
      } else if (currentText == "Rejected") {
        badge.classList.remove(
          "bg-error",
          "text-white",
          "bg-success",
          "text-white",
        );
        badge.classList.add("bg-info-content/10", "text-info-content");
        badge.innerText = "Not Applied";
        return badge.innerText;
      }
    }
    const newStatus = statusChange();

    const jobInfo = {
      companyName,
      jobTitle,
      salaryInfo,
      jobDescription,
      jobStatus: newStatus,
    };

    const existingRejects = rejectList.find(
      (item) => item.companyName == jobInfo.companyName,
    );

    if (!existingRejects) {
      rejectList.push(jobInfo);
      interviewList = interviewList.filter(
        (item) => item.companyName != companyName,
      );
    } else if (newStatus == "Not Applied") {
      rejectList = rejectList.filter((item) => item.companyName != companyName);
    }
    interviewList = interviewList.filter(
      (item) => item.companyName != companyName,
    );
    calculateCount();
    addRejectedJob();
    addInterviewJob();
  }
});


mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-trash-can")) {
    const card = event.target.closest('.card');
    if (!card) {
      return;
    }
    const companyName = card.querySelector('.company-name').innerText;

    const allCards = document.querySelectorAll('#all-jobs-cards .card');
    allCards.forEach(c => {
      if (c.querySelector('.company-name').innerText === companyName) c.remove();
    });

    const interviewCards = document.querySelectorAll('#interview-jobs-cards .card');
    interviewCards.forEach(c => {
      if (c.querySelector('.company-name').innerText === companyName) c.remove();
    });

    const rejectedCards = document.querySelectorAll('#rejected-jobs-cards .card');
    rejectedCards.forEach(c => {
      if (c.querySelector('.company-name').innerText === companyName) c.remove();
    });

    interviewList = interviewList.filter(job => job.companyName !== companyName);
    rejectList = rejectList.filter(job => job.companyName !== companyName);
    calculateCount();
  }
});

function addInterviewJob() {
  filterDiv.innerHTML = "";

  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.className = "card bg-white w-full shadow-sm";

    let badgeClassInfo = "";
    if (interview.jobStatus === "Interview") {
      badgeClassInfo = "bg-success text-white";
    } else if (interview.jobStatus === "Rejected") {
      badgeClassInfo = "bg-error text-white";
    } else {
      badgeClassInfo = "bg-info-content/10 text-info-content";
    }

    div.innerHTML = `
            <div class="card-body">
              <div class="flex justify-between items-center">
                <h2 class="company-name text-info-content text-xl">
                  ${interview.companyName}
                </h2>

              </div>
              <h4 class="job-position text-[#64748b] mb-4">
                ${interview.jobTitle}
              </h4>
              <h4 class="salary-info text-[#64748b] text-xs">
                ${interview.salaryInfo}
              </h4>

              <!-- badge  -->
              <div class="card-actions flex">
                <button
                  class="status-badge btn ${badgeClassInfo}"
                  disabled
                >${interview.jobStatus}</button>
              </div>

              <p class="notes text-info-content">
                ${interview.jobDescription}
              </p>
              <!-- buttons  -->
              <div class="interview-btn card-actions flex">
                <button class="interview-btn btn border-success text-success">
                  Interview
                </button>
                <button class="reject-btn btn border-error text-error">
                  Reject
                </button>
              </div>
            </div> 
        `;

    filterDiv.appendChild(div);
  }
}

function addRejectedJob() {
  filterDiv2.innerHTML = "";
  for (let reject of rejectList) {
    let div = document.createElement("div");
    div.className = "card bg-white w-full shadow-sm";
    let badgeClassInfo = "";
    if (reject.jobStatus === "Interview") {
      badgeClassInfo = "bg-success text-white";
    } else if (reject.jobStatus === "Rejected") {
      badgeClassInfo = "bg-error text-white";
    } else {
      badgeClassInfo = "bg-info-content/10 text-info-content";
    }
    div.innerHTML = `
            <div class="card-body">
              <div class="flex justify-between items-center">
                <h2 class="company-name text-info-content text-xl">
                  ${reject.companyName}
                </h2>
              </div>
              <h4 class="job-position text-[#64748b] mb-4">
                ${reject.jobTitle}
              </h4>
              <h4 class="salary-info text-[#64748b] text-xs">
                ${reject.salaryInfo}
              </h4>

              <!-- badge  -->
              <div class="card-actions flex">
                <button
                  class="status-badge btn ${badgeClassInfo}"
                  disabled
                >${reject.jobStatus}
                </button>
              </div>

              <p class="notes text-info-content">
                ${reject.jobDescription}
              </p>
              <!-- buttons  -->
              <div class="interview-btn card-actions flex">
                <button class="interview-btn btn border-success text-success">
                  Interview
                </button>
                <button class="reject-btn btn border-error text-error">
                  Reject
                </button>
              </div>
            </div> 
        `;
    filterDiv2.appendChild(div);
  }
}
