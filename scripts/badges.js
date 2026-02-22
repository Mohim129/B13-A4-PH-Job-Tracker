let interviewStatus = false;
let rejectStatus = false;

function setInterview(btnId) {
  const notAppliedBadge = document.getElementById("not-applied-badge");
  const interviewBadge = document.getElementById("interview-badge");
  const rejectedBadge = document.getElementById("reject-badge");

  notAppliedBadge.classList.add("hidden");
  interviewBadge.classList.add("hidden");
  rejectedBadge.classList.add("hidden");

  if (interviewStatus === false && btnId === "interview-badge") {
    interviewBadge.classList.remove("hidden");
    interviewStatus = true;
        rejectStatus = false;
  } else if (interviewStatus === true && btnId === "interview-badge") {
    notAppliedBadge.classList.remove("hidden");
    interviewBadge.classList.add("hidden");
    rejectedBadge.classList.add("hidden");

    interviewStatus = false;
    // rejectStatus = false;
  }

  if (rejectStatus === false && btnId === "reject-badge") {
    rejectedBadge.classList.remove("hidden");
    rejectStatus = true;
    interviewStatus = false;
  } else if (rejectStatus === true && btnId === "reject-badge") {
    notAppliedBadge.classList.remove("hidden");
    interviewBadge.classList.add("hidden");
    rejectedBadge.classList.add("hidden");

    // interviewStatus = false;
    rejectStatus = false;
  }
}
