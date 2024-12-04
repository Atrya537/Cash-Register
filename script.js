let price = 20;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDiv = document.getElementById("change-due");
const priceSpan = document.getElementById("price");
const cidSpans = document.querySelectorAll(".cid-amount");

priceSpan.textContent = `$${price}`;

const updateCID = (cashInDrawer) => {
  for (let i = 0; i < cid.length; i++) {
    cidSpans[i].textContent = `$${cashInDrawer[i][1]}`;
  }
};

updateCID(cid);

const calculateChange = (cashPaid) => {
  let changeDue = Number((cashPaid - price).toFixed(2));
  const denominationMap = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  let returnedChange = [
    ["PENNY", 0],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ];

  if (changeDue === 0) {
    changeDueDiv.innerHTML =
      "<p>No change due - customer paid with exact cash</p>";
    return;
  } else if (changeDue < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    while (
      changeDue >= Object.entries(denominationMap)[i][1] &&
      cid[i][1] > 0
    ) {
      cid[i][1] = Number(
        (cid[i][1] - Object.entries(denominationMap)[i][1]).toFixed(2)
      );
      changeDue = Number(
        (changeDue - Object.entries(denominationMap)[i][1]).toFixed(2)
      );
      returnedChange[i][1] = Number(
        (returnedChange[i][1] + Object.entries(denominationMap)[i][1]).toFixed(2)
      );
    }
  }

  if (changeDue > 0) {
    changeDueDiv.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }

  if (cid.every((denom) => denom[1] === 0.0)) {
    changeDueDiv.innerHTML = "<p>Status: CLOSED</p>";
  } else {
    changeDueDiv.innerHTML = "<p>Status: OPEN</p>";
  }

  return returnedChange;
};

const renderChange = (changeArr) => {
  changeArr.forEach((denomination) => {
    if (denomination[1] > 0) {
      changeDueDiv.innerHTML += `<p>${denomination[0]}: $${denomination[1]}</p>`;
    }
  });
};

purchaseBtn.addEventListener("click", () => {
  changeDueDiv.innerHTML = "";
  const cashPaidByCustomer = Number(cash.value);
  const changeToRender = calculateChange(cashPaidByCustomer);

  if (changeToRender) {
    renderChange(changeToRender.reverse());
  }
  updateCID(cid);
});
