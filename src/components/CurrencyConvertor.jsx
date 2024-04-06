import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [swap, setSwap] = useState(false);

  const [convertedAmount, setConvertedAmount] = useState("83.32");
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR"]
  );

  const getCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error in Fetching :", error);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  const currencyConvert = async () => {
    if (!amount) return;

    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency]);
    } catch (error) {
      console.error("Error in Fetching :", error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavorite = (currency) => {
    let updatedFav = [...favorites];

    if (favorites.includes(currency)) {
      updatedFav = updatedFav.filter((fav) => fav !== currency);
    } else {
      updatedFav.push(currency);
    }

    setFavorites(updatedFav);
    localStorage.setItem("favorites", JSON.stringify(updatedFav));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setSwap(!swap);
  };

  return (
    <div className="max-w-xl mx-auto my-10 max-sm:my-3 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-4xl max-sm:text-3xl text-center opacity-75 font-semibold text-gray-700">
        Currency Convertor
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-sm:gap-2 items-center">
        <div className="flex flex-col">
          <Dropdown
            favorites={favorites}
            title="From :"
            currencies={currencies}
            handleFavorite={handleFavorite}
            currency={fromCurrency}
            setCurrency={setFromCurrency}
          />

          <div className="mt-2">
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
            />
          </div>
        </div>

        <div className="flex justify-center -mb-5 sm:mb-0">
          <button onClick={swapCurrencies} className="p-2 cursor-pointer">
            <span className="text-xl text-gray-600">
              <i
                class={`fa-solid fa-arrow-right-arrow-left text-indigo-500 transition-all duration-300 max-sm:rotate-90 ${
                  swap && "rotate-180"
                }`}
              />
            </span>
          </button>
        </div>

        <div className="flex flex-col">
          <Dropdown
            favorites={favorites}
            title="To :"
            currencies={currencies}
            handleFavorite={handleFavorite}
            currency={toCurrency}
            setCurrency={setToCurrency}
          />

          <div className="mt-2">
            <input
              type="number"
              onChange={(e) => setConvertedAmount(e.target.value)}
              value={convertedAmount}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={currencyConvert}
          className={`max-sm:w-full px-10 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            converting && "animate-pulse"
          }`}
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default CurrencyConvertor;
