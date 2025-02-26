// const BASE_URL = "https://api.frankfurter.app/latest?amount=10&from=USD&to=EUR";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

for (select of dropdowns) {
  for (currencyCode in countryList) {
    let newOPtion = document.createElement("option");
    newOPtion.innerText = currencyCode;
    newOPtion.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOPtion.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      newOPtion.selected = "selected";
    }
    select.append(newOPtion);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let cuurencyCode = element.value;
  let countryCode = countryList[cuurencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".number");
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    alert("Please enter a valid amount");
    return;
  }
  // console.log(fromCurrency.value, toCurrency.value);
  const URL = `https://api.frankfurter.app/latest?amount=${amtValue}&from=${fromCurrency.value}&to=${toCurrency.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[toCurrency.value];
  let result = document.querySelector(".result");
  result.innerText = `${amtValue} ${fromCurrency.value} = ${rate} ${toCurrency.value}`;
});
