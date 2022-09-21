const Fraction = require("fractional").Fraction;

// m = measurement
// mq = measurementQuantity (in 1/8 teaspoons)
// rq = remaining quantity

export const convertToMeasurement = (rq, liquid) => {
  // turns quantity of 1/8 teaspoons into a string.
  // string can contain multiple measurements like "1 cup 2 teaspoons"
  const mq = getMeasurementQuantities(liquid);

  let counts = {};
  // handle everything from teaspoon and up (see line 62)

  for (let m in mq) {
    while (
      rq >= mq[m] ||
      (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.75 && rq > 24) ||
      (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.67 && rq > 24) ||
      (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.5 && rq > 24) ||
      (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.33 && rq > 24) ||
      (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.25 && rq > 24)
    ) {
      if (!counts[m]) {
        counts[m] = "";
      }

      if (rq > 24) {
        if (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.75) {
          counts[m] = `${counts[m]} 3/4`;
          rq /= mq[m];
          rq = Math.trunc(rq);
          continue;
        } else if (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.67) {
          counts[m] = `${counts[m]} 2/3`;
          rq /= mq[m];
          rq = Math.trunc(rq);
          continue;
        } else if (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.5) {
          counts[m] = `${counts[m]} 1/2`;
          rq /= mq[m];
          rq = Math.trunc(rq);
          continue;
        } else if (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.33) {
          counts[m] = `${counts[m]} 1/3`;
          rq /= mq[m];
          rq = Math.trunc(rq);
          continue;
        } else if (Number.parseFloat((rq / mq[m]).toFixed(2)) === 0.25) {
          counts[m] = `${counts[m]} 1/4`;
          rq /= mq[m];
          rq = Math.trunc(rq);
          continue;
        }
      }

      if (rq >= mq[m]) {
        // if the m exists, increase value
        counts[m]++;
        // subtract value each time through loop
        rq = rq - mq[m];
      }
    }
  }

  // remaining measurement quantities are less than a teaspoon
  // convert those to a fraction

  if (rq === 0) {
    return formatCountsString(counts);
  }

  const divisor = 1 / Object.entries(mq)[2][1];

  let fraction = (rq * divisor).toString();

  if (Number.parseFloat(fraction === 0.0)) {
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

    if (!liquid) {
      if (counts.teaspoon) {
        counts.teaspoon =
          counts.teaspoon + ` ${fraction === 0 ? "" : fraction}`;
      } else {
        // teaspoons don't exist in counts object, create teaspoon key and add remaining fraction
        counts.teaspoon = fraction === 0 ? "" : fraction;
      }
    } else {
      if (counts.ounce) {
        counts.ounce = counts.ounce + ` ${fraction === 0 ? "" : fraction}`;
      } else {
        // ounces don't exist in counts object, create ounces key and add remaining fraction
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

const getMeasurementQuantities = (liquid) => {
  const solidQuantities = {
    cup: 384,
    tablespoon: 24,
    teaspoon: 8,
  };
  const liquidQuantities = {
    quart: 1536,
    pint: 768,
    ounce: 48,
  };

  if (liquid) {
    return liquidQuantities;
  } else {
    return solidQuantities;
  }
};
