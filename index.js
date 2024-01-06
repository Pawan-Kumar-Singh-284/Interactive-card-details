const submitBtn = document.querySelector(".submit-btn");
const allInputs = document.querySelectorAll(".form input");
const cardNumbers = document.querySelector(".card-numbers");
const cardName = document.querySelector(".user-info");
const cardMonth = document.querySelector(".month");
const cardYear = document.querySelector(".years");
const cvvNumber = document.querySelector(".back-card-details .cvv");
const formSubmit = document.querySelector(".form");
const welcome = document.querySelector(".welcome");
const continueBtn = document.querySelector(".continue");

const cardDetails = {
  name: "",
  number: "",
  month: "",
  year: "",
  cvv: "",
};

allInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    checkInput(e.target);
    cardDetails[e.target.name] = e.target.value;
    if (e.target.name === "number") {
      cardNumbers.textContent = cardDetails.number;
    } else if (e.target.name === "name") {
      cardName.textContent = cardDetails.name;
    } else if (e.target.name === "month") {
      cardMonth.textContent = e.target.value;
    } else if (e.target.name === "year") {
      cardYear.textContent = e.target.value;
    } else if (e.target.name === "cvv") {
      cvvNumber.textContent = e.target.value;
    }
  });
});

function checkInput(input) {
  if (input.name === "number" && visaCard(input.value) === "false") {
    input.setCustomValidity("Card number should start with 4");
    return false;
  } else if (input.name === "name" && input.value.length < 3) {
    input.setCustomValidity("Invalid name");
    return false;
  } else if (
    (input.name === "month" && input.value > 12) ||
    input.value < 0 ||
    !input.value.length
  ) {
    input.setCustomValidity("Invalid month");
    return false;
  } else if (
    (input.name === "year" && input.value.length > 2) ||
    !input.value.length
  ) {
    input.setCustomValidity("Invalid year");
    return false;
  } else if (
    (input.name === "cvv" && input.value.length !== 3) ||
    !input.value.length
  ) {
    input.setCustomValidity("Invalid cvv Number");
    return false;
  } else {
    input.setCustomValidity("");
    return true;
  }
}

formSubmit.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const { cvv, month, name, number, year } = cardDetails;
    if (
      !year.length ||
      !month.length ||
      !name.length ||
      !number.length ||
      !cvv.length
    ) {
      allInputs.forEach((item) => checkInput(item));
      return;
    }
    formSubmit.classList.add("welcomeMessage");
    welcome.classList.add("welcomeMessageShow");
  } catch (err) {
    alert(err?.message);
  }
});

function visaCard(Number) {
  let regex = new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/);

  if (Number == null) {
    return "false";
  }

  if (regex.test(Number) == true) {
    return "true";
  } else {
    return "false";
  }
}

continueBtn.addEventListener("click", () => {
  formSubmit.classList.add("display");
  welcome.classList.add("display2");
});
