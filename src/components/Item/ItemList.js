import React from "react";
import ItemSummary from "./ItemSummary";

const ItemList = ({ items }) => {
  const itemsL = items.map((item, idx) => {
    return idx === 5 ? (
      <ItemSummary item={item} hoverItem="right-44" key={idx} />
    ) : (
      <ItemSummary item={item} hoverItem="left-44" key={idx} />
    );
  });
  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-4 xl:grid-cols-6">
      {itemsL}
    </div>
  );
};

export default ItemList;
