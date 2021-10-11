window.addEventListener("DOMContentLoaded", (event) => {
  const calculateMortgage = () => {
    // Declare variables
    const mortgageSlider = document.getElementById("js-mortgage-range-slider");
    const interestSlider = document.getElementById("js-interest-slider");
    const yearsOfMortgage = document.getElementById("js-YearsOfMortgage");
    const interest = document.getElementById("js-interest");
    const loan = document.getElementById("js-loan");
    const tax = document.getElementById("js-tax");
    const insurance = document.getElementById("js-insurance");
    const interestResult = document.getElementById("js-interest-result");
    const taxResult = document.getElementById("js-tax-result");
    const insuranceResult = document.getElementById("js-insurance-result");
    const totalResult = document.getElementById("js-total-result");
    const calculateButton = document.getElementById("js-calculate-button");

    // Set range slider default values
    mortgageSlider.value = 21;
    interestSlider.value = 5;

    // Sets text input for mortgage
    const setMortgageNumber = (e) => {
      yearsOfMortgage.value = e.target.value;
    };

    // Sets value of mortgage range slider
    const setMortgageSliderValue = (e) => {
      mortgageSlider.value = e.target.value;

      if (e.target.value === "") mortgageSlider.value = mortgageSlider.min;
      if (parseInt(e.target.value) > parseInt(mortgageSlider.max)) {
        e.target.value = mortgageSlider.max;
      }
      if (parseInt(e.target.value) === 0) {
        e.target.value = mortgageSlider.min;
      }
      mortgageSlider.style.backgroundSize =
        ((e.target.value - mortgageSlider.min) * 100) /
          (mortgageSlider.max - mortgageSlider.min) +
        "%";
    };

    // Sets text input for interest
    const setInterestNumber = (e) => {
      interest.value = e.target.value;
    };

    // Sets value of interest range slider
    const setInterestSliderValue = (e) => {
      interestSlider.value = e.target.value;

      if (e.target.value === "") interestSlider.value = interestSlider.min;
      if (parseInt(e.target.value) > parseInt(interestSlider.max)) {
        e.target.value = interestSlider.max;
      }
      if (parseInt(e.target.value) === 0) {
        e.target.value = interestSlider.min;
      }
      interestSlider.style.backgroundSize =
        ((e.target.value - interestSlider.min) * 100) /
          (interestSlider.max - interestSlider.min) +
        "%";
    };

    // Formula for dynamic range slider background
    const formula = (target, val, min, max) => {
      return (target.style.backgroundSize =
        ((val - min) * 100) / (max - min) + "%");
    };
    // Apply dynamic range slider background
    const dynamicSlideBackground = (e) => {
      let target = e.target;
      const min = target.min;
      const max = target.max;
      const val = target.value;
      formula(target, val, min, max);
    };

    // events for range sliders and text inputs
    mortgageSlider.addEventListener("input", setMortgageNumber);
    yearsOfMortgage.addEventListener("keyup", setMortgageSliderValue);
    mortgageSlider.addEventListener("input", dynamicSlideBackground);

    interestSlider.addEventListener("input", setInterestNumber);
    interest.addEventListener("keyup", setInterestSliderValue);
    interestSlider.addEventListener("input", dynamicSlideBackground);

    // Calculation for principal interest
    const principalInterest = () => {
      const interestVal = parseFloat(interest.value);
      const loanVal = parseFloat(loan.value);
      const yearsOfMortgageVal = parseFloat(yearsOfMortgage.value);
      const result = (
        ((interestVal / 100 / 12) * loanVal) /
        (1 - Math.pow(1 + interestVal / 100 / 12, -yearsOfMortgageVal * 12))
      ).toFixed(2);
      return result;
    };

    // Calculation for annual tax
    const annualTax = () => {
      const taxVal = parseFloat(tax.value);
      const result = (taxVal / 12).toFixed(2);
      return result;
    };

    // Calculation for annual insurance
    const annualInsurance = () => {
      const insuranceVal = parseFloat(insurance.value);
      const result = (insuranceVal / 12).toFixed(2);
      return result;
    };

    // Add results for results column
    const addResults = (interest, tax, insurance) => {
      interestResult.classList.remove("results__placeholder--medium");
      interestResult.classList.add("results__placeholder--dark");

      taxResult.classList.remove("results__placeholder--medium");
      taxResult.classList.add("results__placeholder--dark");

      insuranceResult.classList.remove("results__placeholder--medium");
      insuranceResult.classList.add("results__placeholder--dark");

      interestResult.innerText = `$${interest}`;
      taxResult.innerText = `$${tax}`;
      insuranceResult.innerText = `$${insurance}`;
    };

    // Keep state of valid entries
    let validEntry = [];
    const calculateTotalPayment = () => {
      const interest = principalInterest();
      const tax = annualTax();
      const insurance = annualInsurance();
      const total =
        parseFloat(interest) + parseFloat(tax) + parseFloat(insurance);

      // If invalid entries, do not add results
      if (validEntry.includes("not valid")) return false;
      addResults(interest, tax, insurance);

      totalResult.classList.remove("results__placeholder--medium");
      totalResult.classList.add("results__placeholder--dark");
      totalResult.innerText = `$${total.toFixed(2)}`;
      return total.toFixed(2);
    };

    // Validation
    const input = Array.from(document.querySelectorAll(".textInput"));
    const validate = () => {
      // Check for empty values
      validEntry = [];
      for (let i = 0; i < input.length; i++) {
        const dataAttr = input[i].dataset.input;
        const error = document.querySelector(`div[data-error="${dataAttr}"]`);
        if (input[i].value === "") {
          validEntry.push("not valid");
          error.classList.remove("hide");
          input[i].classList.add("text-input-required-highlight");
        }
      }
    };

    // Don't allow non digits
    input.forEach((element) => {
      element.onkeypress = (e) => {
        if (e.which < 48 || e.which > 57) {
          e.preventDefault();
        }
      };
    });

    // Check for empty values on blur
    input.forEach((element) => {
      element.onblur = (e) => {
        const dataAttr = e.target.dataset.input;
        const error = document.querySelector(`div[data-error="${dataAttr}"]`);
        if (element.value === "") {
          error.classList.remove("hide");
          e.target.classList.add("text-input-required-highlight");
        } else {
          error.classList.add("hide");
          e.target.classList.remove("text-input-required-highlight");
        }
      };
    });

    // Calculate button events
    calculateButton.addEventListener("click", validate);
    calculateButton.addEventListener("click", calculateTotalPayment);
  };

  calculateMortgage();
});
