export const supportedCurrencies = {
  dollar: {
    code: "USD",
    symbol: "$",
    name: "United States Dollar",
    decimalPlaces: 2,
  },
  pounds: {
    code: "GBP",
    symbol: "£",
    name: "British Pound Sterling",
    decimalPlaces: 2,
  },
  euros: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    decimalPlaces: 2,
  },
  naira: {
    code: "NGN",
    symbol: "₦",
    name: "Naira",
    decimalPlaces: 2,
  },
  canadian_dollar: {
    code: "CAD",
    symbol: "CA$",
    name: "Canadian Dollar",
    decimalPlaces: 2,
  },
};


export const currencies: string[] = Object.keys(supportedCurrencies);
export const currencyList = Array.from(Object.values(supportedCurrencies));