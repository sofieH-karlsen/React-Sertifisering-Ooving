export const CURRENCIES = {
    USD: {code: 'USD', name: 'United States Dollar'},
    EUR: {code: 'EUR', name: 'Euro'},
    GBP: {code: 'GBP', name: 'British Pound' },
    JPY: {code: 'JPY', name: 'Japanese Yen' },
};

export const EXCAHNGERATES={
    USD: {USD:1,EUR: 0.91, GBP: 0.78, JPY: 134.21},
    EUR: {USD: 1.10, EUR: 1, GBP: 0.86, JPY: 147.32},
    GBP: {USD: 1.28, EUR: 1.16, GBP: 1, JPY: 171.45},
    JPY: {USD: 0.0075, EUR: 0.0068, GBP: 0.0058, JPY: 1},
};

export function getAllCurrencies() {
    return  Object.values(CURRENCIES);
}

export function getExchangeRates(currencyCode) {
    return EXCAHNGERATES[currencyCode];
}
