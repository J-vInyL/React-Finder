const brand = [
  {
    _id: 0,
    name: "모든 브랜드"
  },
  {
    _id: 1,
    name: "Nike"
  },
  {
    _id: 2,
    name: "Adidas"
  },
  {
    _id: 3,
    name: "New Balance"
  },
  {
    _id: 4,
    name: "Vans"
  },
  {
    _id: 5,
    name: "Converse"
  },
  {
    _id: 6,
    name: "Dr.martin"
  },
  {
    _id: 7,
    name: "Balenciaga"
  },
  {
    _id: 8,
    name: "Other"
  }
];

const price = [
  {
    _id: 0,
    name: "모든 가격",
    array: []
  },
  {
    _id: 1,
    name: "10만원 - 이하",
    array: [0, 99999]
  },
  {
    _id: 2,
    name: "10만원 - 30만원 이하",
    array: [100000, 299999]
  },
  {
    _id: 3,
    name: "30만원 - 50만원 이하",
    array: [300000, 499999]
  },
  {
    _id: 4,
    name: "50만원 이상",
    array: [500000]
  }
];

export { brand, price };
