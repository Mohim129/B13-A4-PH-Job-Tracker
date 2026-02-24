let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectCount = document.getElementById("rejected-count");
let totalCount2 = document.getElementById("total-count-2");

let interviewList = [];
let rejectList = [];

const allJobs = document.getElementById("all-jobs-cards");
// const allJobs2 = document.getElementById("all-jobs-cards");
const interviewJobs = document.getElementById("interview-jobs-cards");
const rejectedJobs = document.getElementById("rejected-jobs-cards");

const mainContainer = document.querySelector("main");
const filterDiv = document.getElementById("interview-jobs-cards");
const filterDiv2 = document.getElementById("rejected-jobs-cards");

function fixJobStatus() {
  const allCards = document.querySelectorAll("#all-jobs-cards .card");
  allCards.forEach((card) => {
    const companyName = card.querySelector(".company-name").innerText;
    const badge = card.querySelector(".status-badge");

    const isInterview = interviewList.some(
      (job) => job.companyName.trim() === companyName.trim(),
    );
    const isRejected = rejectList.some(
      (job) => job.companyName.trim() === companyName.trim(),
    );

    badge.classList.remove(
      "bg-info-content/10",
      "text-info-content",
      "bg-success",
      "text-white",
      "bg-error",
      "text-white",
    );
    if (isInterview) {
      badge.innerText = "Interview";
      badge.classList.add("bg-success", "text-white");
    } else if (isRejected) {
      badge.innerText = "Rejected";
      badge.classList.add("bg-error", "text-white");
    } else {
      badge.innerText = "Not Applied";
      badge.classList.add("bg-info-content/10", "text-info-content");
    }
  });
}

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
  const jobCard = event.target.closest(".card");
  if (!jobCard) {
    return;
  }

  if (event.target.classList.contains("interview-btn")) {
    // const jobCard = event.target.parentNode.parentNode;
    const companyName = jobCard.querySelector(".company-name").innerText;
    const index = interviewList.findIndex(
      (job) => job.companyName.trim() === companyName.trim(),
    );

    if (index > -1) {
      interviewList.splice(index, 1);
    } else {
      const jobInfo = {
        companyName,
        jobTitle: jobCard.querySelector(".job-position").innerText,
        salaryInfo: jobCard.querySelector(".salary-info").innerText,
        jobDescription: jobCard.querySelector(".notes").innerText,
        jobStatus: "Interview",
      };
      interviewList.push(jobInfo);
      rejectList = rejectList.filter(
        (job) => job.companyName.trim() !== companyName.trim(),
      );
    }
    fixJobStatus();
    calculateCount();
    addInterviewJob();
    addRejectedJob();
  } else if (event.target.classList.contains("reject-btn")) {
    // const jobCard = event.target.parentNode.parentNode;
    const companyName = jobCard.querySelector(".company-name").innerText;
    const index = rejectList.findIndex(
      (job) => job.companyName.trim() === companyName.trim(),
    );

    if (index > -1) {
      rejectList.splice(index, 1);
    } else {
      const jobInfo = {
        companyName,
        jobTitle: jobCard.querySelector(".job-position").innerText,
        salaryInfo: jobCard.querySelector(".salary-info").innerText,
        jobDescription: jobCard.querySelector(".notes").innerText,
        jobStatus: "Rejected",
      };
      rejectList.push(jobInfo);
      interviewList = interviewList.filter(
        (job) => job.companyName.trim() !== companyName.trim(),
      );
    }
    fixJobStatus();
    calculateCount();
    addInterviewJob();
    addRejectedJob();
  }
});

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-trash-can")) {
    const card = event.target.closest(".card");
    if (!card) {
      return;
    }
    const companyName = card.querySelector(".company-name").innerText.trim();

    const allCards = document.querySelectorAll("#all-jobs-cards .card");
    allCards.forEach((c) => {
      if (c.querySelector(".company-name").innerText.trim() === companyName.trim())
        c.remove();
    });

    const interviewCards = document.querySelectorAll(
      "#interview-jobs-cards .card",
    );
    interviewCards.forEach((c) => {
      if (c.querySelector(".company-name").innerText.trim() === companyName.trim())
        c.remove();
    });

    const rejectedCards = document.querySelectorAll(
      "#rejected-jobs-cards .card",
    );
    rejectedCards.forEach((c) => {
      if (c.querySelector(".company-name").innerText === companyName)
        c.remove();
    });

    interviewList = interviewList.filter(
      (job) => job.companyName.trim() !== companyName.trim(),
    );
    rejectList = rejectList.filter((job) => job.companyName.trim() !== companyName.trim());

    addInterviewJob();
    addRejectedJob();
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
                <h2 class="company-name text-info-content text-xl">
                  ${interview.companyName}
                </h2>
                <i
                  class="fa-regular fa-trash-can text-gray-400 cursor-pointer"
                ></i>

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
                  class="status-badge btn bg-success text-white"
                  disabled
                >Interview</button>
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
    div.innerHTML = `
            <div class="card-body">
              <div class="flex justify-between items-center">
                <h2 class="company-name text-info-content text-xl">
                  ${reject.companyName}
                </h2>
                <i
                class="fa-regular fa-trash-can text-gray-400 cursor-pointer"
                ></i> 
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
                  class="status-badge btn bg-error text-white"
                  disabled
                >Rejected
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
