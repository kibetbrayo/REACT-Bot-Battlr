import React, { useState, useEffect } from "react";
import BotCard from "./BotCard";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";
import BotSpecs from "./BotSpecs";
import SortBar from "./SortBar";
import FilterBar from "./FilterBar";

const API_URL = "http://localhost:8000"; 

const botTypeClasses = {
  Assault: "icon military",
  Defender: "icon shield",
  Support: "icon plus circle",
  Medic: "icon ambulance",
  Witch: "icon magic",
  Captain: "icon star",
};

function App() {
  const [bots, setBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortedBots, setSortedBots] = useState([]);
  const [filterClasses, setFilterClasses] = useState([]);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      const response = await fetch(`${API_URL}/bots`);
      if (!response.ok) {
        throw new Error("Failed to fetch bots");
      }
      const data = await response.json();
      setBots(data);
      setSortedBots(data);
    } catch (error) {
      console.error("Error fetching bots:", error);
    }
  };
  const enlistBot = (bot) => {
    if (!enlistedBots.find((enlistedBot) => enlistedBot.id === bot.id)) {
      const updatedEnlistedBots = [bot, ...enlistedBots]; // Add the enlisted bot to the beginning
      setEnlistedBots(updatedEnlistedBots);
    }
  };
  
  const deleteBot = async (bot) => {
    try {
      const response = await fetch(`${API_URL}/bots/${bot.id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete bot");
      }
  
      setEnlistedBots(enlistedBots.filter((enlistedBot) => enlistedBot.id !== bot.id));
      setSortedBots(sortedBots.filter((sortedBot) => sortedBot.id !== bot.id));
    } catch (error) {
      console.error("Error deleting bot:", error);
    }
  };

  const viewDetails = (bot) => {
    setSelectedBot(bot);
  };

  const goBackToList = () => {
    setSelectedBot(null);
  };

  const handleSort = (sortBy) => {
    const sorted = [...sortedBots].sort((a, b) => b[sortBy] - a[sortBy]);
    setSortedBots(sorted);
  };

  const handleFilter = (botClass) => {
    if (filterClasses.includes(botClass)) {
      setFilterClasses(filterClasses.filter((cls) => cls !== botClass));
    } else {
      setFilterClasses([...filterClasses, botClass]);
    }
  };

  const filteredBots = filterClasses.length > 0
    ? sortedBots.filter(bot => filterClasses.includes(bot.bot_class))
    : sortedBots;

  
    return (
      <div className="App">
        {selectedBot ? (
          <BotSpecs bot={selectedBot} goBack={goBackToList} enlistBot={enlistBot} />
        ) : (
          <div>
            <h1>Your Bot Army</h1>
            <YourBotArmy bots={enlistedBots} removeBot={deleteBot} />
            <h1>All Bots</h1>
            <SortBar handleSort={handleSort} />
            <FilterBar botClasses={Object.keys(botTypeClasses)} handleFilter={handleFilter} />
            <BotCollection bots={filteredBots} viewDetails={viewDetails} deleteBot={deleteBot} />
          </div>
        )}
      </div>
    );
  }
  
  export default App;