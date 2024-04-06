import React from "react";

const Dropdown = (props) => {
  // Method: to check if currency is marked favorite
  const isFavorite = (curr) => favorites.includes(curr);

  // Destructuring Props values
  const {
    title = "",
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
  } = props;

  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700 px-1"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 max-sm:py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favorites?.map((currency) => {
            return (
              <option className="bg-gray-200" value={currency} key={currency}>
                {currency}
              </option>
            );
          })}

          <hr />
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>

        <button
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 pr-10 flex items-center text-sm leading-5"
        >
          {isFavorite(currency) ? (
            <i class="fa-solid fa-bookmark" />
          ) : (
            <i class="fa-regular fa-bookmark" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
