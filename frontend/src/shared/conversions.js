const Fraction = require("fractional").Fraction;

export const convertToMeasurement = (quantity, isLiquid) => {
  const values = getValues(isLiquid);

  let counts = {};

  for (let key in values) {
    // handle everything from teaspoon and up
    while (
      quantity >= values[key] ||
      (quantity / values[key]).toFixed(2) == 0.75 ||
      (quantity / values[key]).toFixed(2) == 0.67 ||
      (quantity / values[key]).toFixed(2) == 0.5 ||
      (quantity / values[key]).toFixed(2) == 0.33 ||
      (quantity / values[key]).toFixed(2) == 0.25
    ) {
      if (!counts[key]) {
        counts[key] = "";
      }
      if ((quantity / values[key]).toFixed(2) == 0.75) {
        counts[key] = `${counts[key]} 3/4`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if ((quantity / values[key]).toFixed(2) == 0.67) {
        counts[key] = `${counts[key]} 2/3`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if ((quantity / values[key]).toFixed(2) == 0.5) {
        counts[key] = `${counts[key]} 1/2`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if ((quantity / values[key]).toFixed(2) == 0.33) {
        counts[key] = `${counts[key]} 1/3`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if ((quantity / values[key]).toFixed(2) == 0.25) {
        counts[key] = `${counts[key]} 1/4`;
        quantity /= values[key];
        quantity = Math.trunc(quantity);
        continue;
      } else if (quantity >= values[key]) {
        // if the key exists, increase value
        counts[key]++;
        quantity = quantity - values[key];
      }
      // subtract solid value each time through loop
    }
  }
  // remaining values are less than a teaspoon
  // convert to a fraction

  if (quantity === 0) {
    return formatCountsString(counts);
  }

  const divisor = 1 / Object.entries(values)[2][1];

  let fraction = (quantity * divisor).toString();

  if (fraction == 0) {
    return formatCountsString(counts);
  } else {
    if (fraction.startsWith(0.66)) {
      fraction = "2/3";
    } else if (fraction.startsWith(0.33)) {
      fraction = "1/3";
    } else {
      fraction = new Fraction(fraction);
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
  return newString.replace(/\s+/g, " ").trim();
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
