import { getRootArea } from "@/misc/areas";
import AreaCreateButton from "./AreaCreateButton";
import AreaListWrapper from "./AreaListWrapper";
import ListView from "./ListView";

const ModelsPage = async () => {
  const rootArea = await getRootArea();

  return (
    <ListView>
      <div className="list-view__heading">Areas</div>
      <AreaListWrapper area={rootArea!} />
      {!rootArea && <AreaCreateButton />}
    </ListView>
  );
};

export default ModelsPage;
