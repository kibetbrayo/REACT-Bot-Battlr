// SortBar.js
import React from "react";

function SortBar({ handleSort }) {
  return (
    <div className="ui buttons">
      <button className="ui button" onClick={() => handleSort("health")}>
        Sort by Health
      </button>
      <button className="ui button" onClick={() => handleSort("damage")}>
        Sort by Damage
      </button>
      <button className="ui button" onClick={() => handleSort("armor")}>
        Sort by Armor
      </button>
    </div>
  );
}

export default SortBar;
