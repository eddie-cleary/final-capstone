const Fraction = require("fractional").Fraction;

export const convertToMeasurement = (quantity, isLiquid) => {
  const values = getValues(isLiquid);

  let counts = {};

  for (let key in values) {
    // handle everything from teaspoon and up
    while (quantity >= values[key]) {
      if (counts[key]) {
        // if the key exists, increase value
        counts[key]++;
      } else {
        // if it doesn't exist, create it
        counts[key] = 1;
      }
      // subtract solid value each time through loop
      quantity = quantity - values[key];
    }
  }
  console.log("counts ", counts);
  // remaining values are less than a teaspoon
  // convert to a fraction
  console.log("remaining quantity is " + quantity);

  const divisor = 1 / Object.entries(values)[2][1];

  // let fraction = (quantity * 0.125).toString();
  let fraction = (quantity * divisor).toString();

  if (fraction == 0) {
    return formatCountsString(counts);
  } else {
    if (fraction.startsWith(0.66)) {
      fraction = "2/3";
    } else if (fraction.startsWith(0.33)) {
      fraction = "1/3";
    } else {
      fraction = new Fraction(quantity * 0.125);
      fraction = fraction.toString();
    }

    if (!isLiquid) {
      if (counts.teaspoon) {
        counts.teaspoon =
          counts.teaspoon + ` ${fraction === 0 ? "" : fraction}`;
      } else {
        // teaspoons don't exist, create teaspoon key and add remaining fraction
        counts.teaspoon = fraction === 0 ? "" : fraction;
      }
    } else {
      if (counts.ounce) {
        counts.ounce = counts.ounce + ` ${fraction === 0 ? "" : fraction}`;
      } else {
        // teaspoons don't exist, create teaspoon key and add remaining fraction
        counts.ounce = fraction === 0 ? "" : fraction;
      }
    }
  }

  return formatCountsString(counts);
};

export const calculateQuantity = (number, fraction, unitOfMeasure) => {
  const allValues = {
    teaspoon: 8,
    tablespoon: 24,
    ounce: 48,
    cup: 384,
    pint: 768,
    quart: 1536,
  };

  const measurement = unitOfMeasure.toLowerCase();
  const currQuantity = allValues[measurement];

  return (
    (number ? number * currQuantity : 0) +
    (fraction ? fraction * currQuantity : 0)
  );
};

const formatCountsString = (countsObj) => {
  let newString = "";
  for (let key in countsObj) {
    newString += `${countsObj[key]} ${key} `;
  }
  return newString;
};

const getValues = (isLiquid) => {
  const solidValues = {
    cup: 384,
    tablespoon: 24,
    teaspoon: 8,
  };
  const liquidValues = {
    quart: 1536,
    pint: 768,
    ounce: 48,
  };

  if (isLiquid) {
    return liquidValues;
  } else {
    return solidValues;
  }
};
