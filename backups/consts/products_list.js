const products = [
  {
    _id: {
      $oid: 1,
    },
    name: "Hadero coffee",
    price: "20/kg",
    like: true,
    img: require("../../../../../assets/coffee.png"),
    category: {
      $oid: "1",
    },
    description:
      "Succulent Plantis coffee one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.",
    __v: 0,
  },

  {
    _id: {
      $oid: 2,
    },
    name: "Ethiopian Avocado",
    price: "10/kg",
    like: false,
    img: require("../../../../../assets/avocado.png"),
    category: {
      $oid: "1",
    },
    description:
      "Succulent Plantis coffee one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.",
    __v: 0,
  },
  {
    _id: {
      $oid: 3,
    },
    name: "Ethiopian cut flower",
    price: "13/bucket",
    like: false,
    img: require("../../../../../assets/flower.png"),
    category: {
      $oid: "1",
    },
    description:
      "Succulent Plantis coffee one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.",
    __v: 0,
  },
  {
    _id: {
      $oid: 4,
    },
    name: "Pulses",
    price: "15/kg",
    like: false,
    img: require("../../../../../assets/pulses.png"),
    category: {
      $oid: "1",
    },
    description:
      "Succulent Plantis coffee one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.",
  },
  {
    _id: {
      $oid: 5,
    },
    name: "Strawberries",
    price: "18/kg",
    like: false,
    img: require("../../../../../assets/straw.png"),
    category: {
      $oid: "1",
    },
    description:
      "Succulent Plantis coffee one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.",
  },
  {
    _id: {
      $oid: 5,
    },
    name: "sesame",
    price: "8/kg",
    like: false,
    img: require("../../../../../assets/sesame.png"),
    category: {
      $oid: "1",
    },
    description:
      "Succulent Plantis coffee one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.",
  },
];
export default products;
