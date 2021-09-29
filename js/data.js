export let DUMMY_ITEMS = [
  {
    id: "p1",
    name: "Samsung Galaxy S8",
    price: 399.99,
    amount: 1,
    thumbnail: "../images/samsung galaxy s8.png",
    alt: "samsung galaxy s8",
  },
  {
    id: "p2",
    name: "Google Pixel",
    price: 499.99,
    amount: 1,
    thumbnail: "../images/google pixel.png",
    alt: "google pixel",
  },
  {
    id: "p3",
    name: "Xiaomi Redmi Note 2",
    price: 699.99,
    amount: 1,
    thumbnail: "../images/xiaomi redmi n2.png",
    alt: "xiaomi redmi n2",
  },
  {
    id: "p4",
    name: "Samsung Galaxy S7",
    price: 599.99,
    amount: 1,
    thumbnail: "../images/samsung galaxy s7.png",
    alt: "samsung galaxy s7",
  },
];

export const updateDataHandler = (action) => {
  if (action.type === "REMOVE") {
    let updatedItems = DUMMY_ITEMS.filter((item) => item.id !== action.id);
    DUMMY_ITEMS = updatedItems;
  }
  // if (action.type === "INCREASE") {
  //   let existingItem = DUMMY_ITEMS.find((item) => item.id === action.id);
  //   let existingItemIndex = DUMMY_ITEMS.findIndex((item) => item.id === action.id);

  //   let updatedItem = {
  //     ...existingItem,
  //     amount: ++existingItem.amount,
  //   };

  //   let items = [...DUMMY_ITEMS];
  //   let updatedItems = items[existingItemIndex];
  //   DUMMY_ITEMS = updatedItems;
  // }
};
