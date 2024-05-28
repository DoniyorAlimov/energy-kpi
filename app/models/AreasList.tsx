"use client";

import { useState } from "react";
import { Asset } from "./page";

const AreasList = ({ area }: { area: Asset }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <li>
      <div className="list-view__item" onClick={handleClick}>
        {area.name}
      </div>
      {showChildren && area.children && (
        <ul className="list-view__list">
          {area.children.map((childArea) => (
            <AreasList key={childArea.id} area={childArea} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default AreasList;
