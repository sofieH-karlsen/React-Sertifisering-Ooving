import { getAllCurrencies,getExchangeRates } from "./services/currencyservive";
import { useState } from "react";

export default function CurrencyConverter() {
    const [fromCurrency, setFromCurrency] = useState("Select");
    const [toCurrency, setToCurrency] = useState("Select");
    const [amount, setAmount] = useState(0);

    function convertCurrency({ fromCurrency, toCurrency }) {
        if (fromCurrency === "Select" || toCurrency === "Select") {
            return 0;
        }
        const conversionRate = getExchangeRates(fromCurrency)[toCurrency];
        return (amount * conversionRate).toFixed(2);
    }
    
    return (    
        <>
            <h2>Currency Converter</h2>
            <Input amount={amount} setAmount={setAmount}/> <br />
            <Select currency = {fromCurrency} setCurrency={setFromCurrency}/> <br />
            <Select currency = {toCurrency} setCurrency={setToCurrency}/> <br />
            <p><b>{amount.toFixed(2)} {"Select" === fromCurrency ? "" : fromCurrency}</b> is equal to <b>{convertCurrency({ fromCurrency, toCurrency })} {"Select" === toCurrency ? "" : toCurrency}</b> </p>
        </>
    );
}

function Select({ currency, setCurrency }){

    return (
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="Select">Select</option>
            {getAllCurrencies().map(curr => (
                <option key={curr.code} value={curr.code}>
                    {curr.name}
                </option>
            ))}
        </select>
    );
}

function Input({ amount, setAmount }) {

    return (
        <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
        />
    );
}