//Get item's name, price quantity

function getItemName() {
  let itemName = document.getElementById("cart-item-name").value;
  // let itemListData = document.createElement("td");
  // itemListData.innerText = itemName;
  return itemName;
}

function getItemPrice() {
  let itemPrice = document.getElementById("cart-item-price").value;
  // let itemListData = document.createElement("td");
  // itemListData.innerText = itemName;
  return itemPrice;
}

function getItemQuantity() {
  let itemQuantity = document.getElementById("cart-item-quantity").value;
  // let itemListData = document.createElement("td");
  // itemListData.innerText = itemName;
  return itemQuantity;
}

//Add item

window.addEventListener("DOMContentLoaded", reconstructItemList);
window.addEventListener("DOMContentLoaded", totalPrice);

function addItem() {
  let itemListRow = document.createElement("tr");
  let ts = Date.now();
  itemListRow.setAttribute("id", ts);
  let itemListRowArray = [];

  let currentItemName = getItemName();
  let currentItemPrice = getItemPrice();
  let currentItemQuantity = getItemQuantity();

  let itemListDataName = document.createElement("td");
  itemListDataName.innerText = currentItemName;
  itemListRowArray.push(currentItemName);

  let itemListDataPrice = document.createElement("td");
  itemListDataPrice.innerText = currentItemPrice;
  itemListRowArray.push(currentItemPrice);

  let itemListDataQuantity = document.createElement("td");
  itemListDataQuantity.innerText = currentItemQuantity;
  itemListRowArray.push(currentItemQuantity);

  let itemListRemoveBtn = document.createElement("td");
  let newBtn = document.createElement("button");
  newBtn.className = "btn btn-danger";
  newBtn.addEventListener("click", removeItem);
  newBtn.innerText = "Remove";
  itemListRemoveBtn.appendChild(newBtn);
  let thisBtn = newBtn.innerHTML;
  itemListRowArray.push(thisBtn);

  let itemListDataTotal = document.createElement("td");
  itemListDataTotal.innerText = currentItemQuantity * currentItemPrice;
  itemListRowArray.push(currentItemQuantity * currentItemPrice);

  itemListRow.appendChild(itemListDataName);
  itemListRow.appendChild(itemListDataPrice);
  itemListRow.appendChild(itemListDataQuantity);
  itemListRow.appendChild(itemListRemoveBtn);
  itemListRow.appendChild(itemListDataTotal);

  let itemListBody = document.getElementById("item-list-body");
  itemListBody.appendChild(itemListRow);

  localStorage.setItem(ts, JSON.stringify(itemListRowArray));
  totalPrice();
}

// Total Price

function totalPrice() {
  let totalPriceCell = document.getElementById("total-price");
  let total = 0;
  for (a of Object.keys(localStorage)) {
    let itemDetails = JSON.parse(localStorage[a]);
    total += itemDetails[itemDetails.length - 1];
  }
  totalPriceCell.innerText = total;
}

//Checkout

function checkout() {
  let totalPriceCell = document.getElementById("total-price").innerText;
  alert(`Your total price is: ${totalPriceCell}`);
}

//Remove Item

function removeItem(e) {
  let itemToRemove = e.target.parentElement.parentElement;
  console.log(itemToRemove.id);
  localStorage.removeItem(itemToRemove.id);
  itemToRemove.remove();
  totalPrice();
}

// Reconstruction from local storage

function reconstructItemList(e) {
  for (a of Object.keys(localStorage)) {
    let itemListRow = document.createElement("tr");
    let itemDetails = JSON.parse(localStorage[a]);
    console.log(itemDetails);

    for (let i = 0; i < itemDetails.length; i++) {
      if (i == 3) {
        let itemListRemoveBtn = document.createElement("td");
        let newBtn = document.createElement("button");
        newBtn.className = "btn btn-remove";
        newBtn.addEventListener("click", removeItem);
        newBtn.innerText = "Remove";
        itemListRemoveBtn.appendChild(newBtn);
        itemListRow.appendChild(itemListRemoveBtn);
        continue;
      } else if (i == 0) {
        let itemListDataName = document.createElement("td");
        itemListDataName.innerText = itemDetails[0];
        itemListRow.appendChild(itemListDataName);
      } else if (i == 1) {
        let itemListDataPrice = document.createElement("td");
        itemListDataPrice.innerText = itemDetails[1];
        itemListRow.appendChild(itemListDataPrice);
      } else if (i == 2) {
        let itemListDataQuantity = document.createElement("td");
        itemListDataQuantity.innerText = itemDetails[2];
        itemListRow.appendChild(itemListDataQuantity);
      } else if (i == 4) {
        let itemListDataTotal = document.createElement("td");
        itemListDataTotal.innerText = itemDetails[4];
        itemListRow.appendChild(itemListDataTotal);
      }
    }

    itemListRow.setAttribute("id", a);
    let itemListBody = document.getElementById("item-list-body");
    itemListBody.appendChild(itemListRow);
  }
}
