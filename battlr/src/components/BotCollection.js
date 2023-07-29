import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, viewDetails, deleteBot }) {
  return (
    <div className="ui four column grid">
      <div className="row">
        {bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} viewDetails={viewDetails} deleteBot={deleteBot} />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
