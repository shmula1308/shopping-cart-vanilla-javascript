import { DUMMY_ITEMS, updateDataHandler } from "./data.js";

const app = {
  init: () => {
    document.addEventListener("DOMContentLoaded", app.displayItemsHandler);
    let itemsContainer = document.querySelector(".list");
    itemsContainer.addEventListener("click", app.itemsActionHandler);
  },
  displayItemsHandler: () => {
    let itemsContainer = document.querySelector(".list");
    let df = new DocumentFragment();

    DUMMY_ITEMS.forEach((item) => {
      let li = document.createElement("li");
      li.classList.add("item");
      li.id = item.id;

      li.innerHTML = `
      <div class="content">
        <img src="${item.thumbnail}" alt="${item.alt}" />
        <div>
          <h4 class="name">${item.name}</h4>
          <p class="price">$${item.price}</p>
          <button class="remove-btn" data-action-type="removeItem">remove</button>
        </div>
      </div>
      <div class="actions">
        <button class="arrow up" data-action-type="increaseAmount">
          <svg
            width="15px"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chevron-up"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
            ></path>
          </svg>
        </button>
        <span class="amount">${item.amount}</span>
        <button class="arrow" data-action-type="decreaseAmount">
          <svg
            width="15px"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chevron-down"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
            ></path>
          </svg>
        </button>
      </div>
    `;
      df.append(li);
    });
    itemsContainer.append(df);

    app.updateTotalHandler();
  },

  itemsActionHandler: (ev) => {
    let clickedButton = ev.target.closest("button");
    let clickedItemID = clickedButton.parentNode.parentNode.id;
    let clickedItem = document.getElementById(clickedItemID);

    if (!clickedButton) return;

    let actionType = clickedButton.dataset.actionType;

    if (actionType === "increaseAmount") {
      let amountContainer = clickedItem.querySelector(".amount");
      let prevAmount = Number(amountContainer.textContent);
      amountContainer.textContent = ++prevAmount;
      updateDataHandler({ type: "INCREASE", id: clickedItemID });
    }
    if (actionType === "decreaseAmount") {
      let amountContainer = clickedItem.querySelector(".amount");
      let prevAmount = amountContainer.textContent;
      Number(prevAmount) === 1 ? app.removeItemHandler(clickedItemID) : Number(prevAmount);
      amountContainer.textContent = --prevAmount;
      updateDataHandler({ type: "DECREASE", id: clickedItemID });
    }
    if (actionType === "removeItem") {
      let clickedItemID = clickedButton.parentNode.parentNode.parentNode.id;
      app.removeItemHandler(clickedItemID);
      updateDataHandler({ type: "REMOVE", id: clickedItemID });
      app.updateTotalHandler();
    }
  },
  removeItemHandler: (id) => {
    document.getElementById(id).remove();
  },

  updateTotalHandler: () => {
    let totalPriceContainer = document.querySelector(".total-price");
    let totalPrice = DUMMY_ITEMS.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    totalPriceContainer.textContent = "$" + totalPrice;
  },
};

app.init();
