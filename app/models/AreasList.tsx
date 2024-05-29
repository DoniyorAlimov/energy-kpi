"use client";

import { Asset } from "@/entities/Assets";
import useModelStore from "@/store/model";
import classNames from "classnames";
import { useState } from "react";
import AreaCreateButton from "./AreaCreateButton";

const AreasList = ({ area }: { area: Asset }) => {
  const [showChildren, setShowChildren] = useState(false);
  const { areaId } = useModelStore((s) => s.model);
  const setAreaId = useModelStore((s) => s.setAreaId);

  const handleClick = () => {
    setShowChildren(!showChildren);
    setAreaId(area.id);
  };

  return (
    <li>
      <div
        className={classNames({
          "list-view__item--selected": area.id === areaId,
          "list-view__item": true,
        })}
      >
        <span onClick={handleClick}>{area.name}</span>
        <span>
          <AreaCreateButton area={area} />
        </span>
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
