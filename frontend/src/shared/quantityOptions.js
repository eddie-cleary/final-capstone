export const quantityOptions = (measurement) => {
  switch (measurement) {
    case "Teaspoon":
      return [
        { value: 1, label: "1/8" },
        { value: 2, label: "1/4" },
        { value: 4, label: "1/2" },
        { value: 6, label: "3/4" },
        { value: 8, label: "1" },
        { value: 12, label: "1.5" },
        { value: 16, label: "2" },
        { value: 20, label: "2.5" },
      ];
    case "Tablespoon":
      return [
        { value: 24, label: "1" },
        { value: 36, label: "1.5" },
        { value: 48, label: "2" },
        { value: 60, label: "2.5" },
        { value: 72, label: "3" },
        { value: 84, label: "3.5" },
      ];
    case "Cup":
      return [
        { value: 96, label: "1/4" },
        { value: 128, label: "1/3" },
        { value: 192, label: "1/2" },
        { value: 256, label: "2/3" },
        { value: 288, label: "3/4" },
        { value: 384, label: "1" },
        { value: 512, label: "1 1/3" },
        { value: 576, label: "1.5" },
        { value: 640, label: "1 2/3" },
        { value: 768, label: "2" },
        { value: 896, label: "2.5" },
        { value: 1152, label: "3" },
        { value: 1344, label: "3.5" },
        { value: 1536, label: "4" },
      ];
    case "Ounce":
      return [
        { value: 48, label: "1" },
        { value: 96, label: "2" },
        { value: 144, label: "3" },
      ];
    case "Pint":
      return [
        { value: 192, label: "1/4" },
        { value: 384, label: "1/2" },
        { value: 576, label: "3/4" },
        { value: 768, label: "1" },
        { value: 1152, label: "1.5" },
      ];
    case "Quart":
      return [
        { value: 1536, label: "1" },
        { value: 2304, label: "1.5" },
        { value: 3072, label: "2" },
      ];
    default:
      return [""];
  }
};
