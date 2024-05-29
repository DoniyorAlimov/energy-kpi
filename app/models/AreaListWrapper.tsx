import { Asset } from "@/entities/Assets";
import AreasList from "./AreasList";

const AreaListWrapper = ({ area }: { area: Asset }) => {

 if (!area) return null

  return (
    <ul className="list-view__list">
      <AreasList area={area} />
    </ul>
  );
};

export default AreaListWrapper;
