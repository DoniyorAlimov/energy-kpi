import { getRootArea } from "@/misc/areas";
import AreaListWrapper from "./AreaListWrapper";
import ListView from "./ListView";

const ModelsPage = async () => {
  const rootArea = await getRootArea();

  return (
    <ListView>
      <div className="list-view__heading">Areas</div>
      <AreaListWrapper area={rootArea!} />
    </ListView>
  );
};

export default ModelsPage;
