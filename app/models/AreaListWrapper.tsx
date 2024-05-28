import React from "react";
import AreasList from "./AreasList";
import { Asset } from "./page";

const AreaListWrapper = ({ area }: { area: Asset }) => {
  return (
    <ul className="list-view__list">
      <AreasList area={area} />
    </ul>
  );
};

export default AreaListWrapper;
