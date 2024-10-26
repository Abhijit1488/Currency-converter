
import React, { useEffect, useState } from "react";
import countryList from "./Code";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Home() {

    const BaseUrl = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [message, setMessage] = useState("");
    const [exchangeRate, setExchangeRate] = useState(1);

    // Fetch exchange rate and update the message when component loads or when currencies change
    useEffect(() => {
        const updateExchangeRate = async () => {
            const response = await fetch(`${BaseUrl}/${fromCurrency.toLowerCase()}.json`);
            const data = await response.json();
            const rate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
            setExchangeRate(rate);
            setMessage(`${amount} ${fromCurrency} = ${amount * rate} ${toCurrency}`);
        };

        updateExchangeRate();
    }, [fromCurrency, toCurrency, amount]);

    // Function to update the flag
    const updateFlag = (currency, type) => {
        const countryCode = countryList[currency];
        return `https://flagsapi.com/${countryCode}/flat/64.png`;
    };

    // Function to handle the currency switch
    const handleCurrencySwitch = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to fetch exchange rate and calculate converted amount
        setMessage(`${amount} ${fromCurrency} = ${amount * exchangeRate} ${toCurrency}`);
    };
    return (
        <div>
            <div className="container">
                <h1>Currency Converter</h1>
                <form onSubmit={handleSubmit}>
                    <div className="amount">
                        <p>Enter Amount</p>
                        <input
                            type="number"
                            value={amount}
                            // onChange={(e) => setAmount(e.target.value > 0 ? e.target.value : 1)}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="dropdown">
                        <div className="from">
                            <p>From</p>
                            <div className="select-container">
                                <img src={updateFlag(fromCurrency, "from")} alt="From currency flag" />
                                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                                    {Object.keys(countryList).map((code) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* <i className="fa-solid fa-arrow-right-arrow-left" onClick={handleCurrencySwitch}></i> */}
                        <div className="icon">
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} onClick={handleCurrencySwitch} style={{ cursor: 'pointer' }}/>
                        </div>
                        <div className="to">
                            <p>To</p>
                            <div className="select-container">
                                <img src={updateFlag(toCurrency, "to")} alt="To currency flag" />
                                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                                    {Object.keys(countryList).map((code) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="msg">{message}</div>
                    <button type="submit">Get Exchange Rate</button>
                </form>
            </div>
        </div>
    )
}

export default Home;
