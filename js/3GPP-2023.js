import { getApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

async function writeToDB(data) {
  const defaultApp = getApp();
  const db = getDatabase(defaultApp);
  const dbRef = ref(db, "/forms");
  const newDataRef = push(dbRef);
  const successWrapper = document.getElementById("success-event");
  const errorWrapper = document.getElementById("error-event");

  grecaptcha.ready(function () {
    grecaptcha
      .execute("6Ld0ENAlAAAAAM8nZ4oz4EO4kwevOv2c_it2EAdU", {
        action: "submit",
      })
      .then(function (token) {
        const payload = {
          ...data,
          source: "beta",
          createdAt: serverTimestamp(),
          inviteSent: false,
          status: false,
        };

        set(newDataRef, payload)
          .then(() => {
            document.getElementById("visa-apply").reset();
            successWrapper.classList.remove("display-none");
            window.lastSubmitted = {
              key: newDataRef.key,
              payload,
            };

          })
          .catch((error) => {
            errorWrapper.classList.remove("display-none");
          });
      });
  });
}

const visaForm = document.getElementById("visa-apply");
if (visaForm) {
  visaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(visaForm);
    let email = formData.get("email");
    let firstName = formData.get("firstName");
    let lastName = formData.get("lastName");
    let dob = formData.get("dob");
    let nationality = formData.get("nationality");
    let passportNumber = formData.get("passportNumber");
    let passportIssuePlace = formData.get("passportIssuePlace");
    let passportIssueDate = formData.get("passportIssueDate");
    let passportValidityDate = formData.get("passportValidityDate");
    let representingName = formData.get("representingName");
    let hotelReservationNumber = formData.get("hotelReservationNumber");
    let hotelName = formData.get("hotelName");
    let dateArrival = formData.get("dateArrival");
    let dateDeparture = formData.get("dateDeparture");
    let title = formData.get("title");
    let notes = formData.get("notes") ? formData.get("notes") : "";
    let contactNumber = formData.get("contactNumber");
    let isPhysicalCopyRequired =
      formData.get("isPhysicalCopyRequired") === "on" ? true : false;
    let SA_101_bangalore =
      formData.get("SA_101_bangalore") === "on" ? true : false;
    let CT_101_bangalore =
      formData.get("CT_101_bangalore") === "on" ? true : false;
    let RAN_101_bangalore =
      formData.get("RAN_101_bangalore") === "on" ? true : false;
    let meetings = [];
    if (SA_101_bangalore) {
      meetings.push("3GPP SA#101");
    }
    if (CT_101_bangalore) {
      meetings.push("3GPP CT#101");
    }
    if (RAN_101_bangalore) {
      meetings.push("3GPP RAN#101");
    }

    if (
      ![SA_101_bangalore, CT_101_bangalore, RAN_101_bangalore].some(
        (e) => e === true
      )
    ) {
      alert("Select atleast one meeting");
      return false;
    }

    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      dob === "" ||
      nationality === "" ||
      passportNumber === "" ||
      passportIssueDate === "" ||
      passportIssuePlace === "" ||
      passportValidityDate === "" ||
      representingName === "" ||
      hotelReservationNumber === "" ||
      dateArrival === "" ||
      dateDeparture === "" ||
      hotelName === "" ||
      meetings === "" ||
      title === "" ||
      contactNumber === ""
    ) {
      alert("Enter all required fields");
      return false;
    }

    if (isPhysicalCopyRequired && notes === "") {
      alert("Address is required if physical copy is needed.");
      return false;
    }

    const data = {
      email,
      firstName,
      lastName,
      dob,
      nationality,
      passportNumber,
      passportIssueDate,
      passportIssuePlace,
      passportValidityDate,
      representingName,
      hotelReservationNumber,
      dateArrival,
      dateDeparture,
      notes,
      isPhysicalCopyRequired,
      hotelName,
      meetings,
      title,
      contactNumber
    };
    writeToDB(data);
  });
}
