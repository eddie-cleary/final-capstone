export const quantityOptions = (measurement) => {
  switch (measurement) {
    case "Teaspoon":
      return 8;
    case "Tablespoon":
      return 24;
    case "Cup":
      return 384;
    case "Ounce":
      return 48;
    case "Pint":
      return 768;
    case "Quart":
      return 1536;
    default:
      return [""];
  }
};

export const fractionOptions = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1 / 8,
    label: "1/8",
  },
  {
    value: 1 / 4,
    label: "1/4",
  },
  {
    value: 1 / 3,
    label: "1/3",
  },
  {
    value: 1 / 2,
    label: "1/2",
  },
  {
    value: 2 / 3,
    label: "2/3",
  },
  {
    value: 3 / 4,
    label: "3/4",
  },
];
