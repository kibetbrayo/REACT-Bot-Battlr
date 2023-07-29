// FilterBar.js
import React from "react";

function FilterBar({ botClasses, handleFilter }) {
  return (
    <div>
      {botClasses.map((botClass) => (
        <div className="ui checkbox" key={botClass}>
          <input
            type="checkbox"
            onChange={() => handleFilter(botClass)}
            id={botClass}
          />
          <label htmlFor={botClass}>{botClass}</label>
        </div>
      ))}
    </div>
  );
}

export default FilterBar;
