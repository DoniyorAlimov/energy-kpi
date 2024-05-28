import prisma from "@/prisma/client";
import { Asset as Base } from "@prisma/client";
import AreaListWrapper from "./AreaListWrapper";

export interface Asset extends Base {
  children: Asset[];
}

const ModelsPage = async () => {
  const rootArea = await getRootArea();

  return (
    <div className="list-view">
      <div className="list-view__heading">Areas</div>
      <AreaListWrapper area={rootArea!} />
    </div>
  );
};

const getRootArea = async (): Promise<Asset | null> => {
  const AreaType = await prisma.assetType.findUnique({
    where: { name: "area" },
  });
  if (!AreaType) return null;

  const areas = await prisma.asset.findMany({
    where: { assetTypeId: AreaType?.id },
    orderBy: { id: "asc" },
  });

  const map: { [key: number]: Asset } = {};
  areas.forEach(
    (area) => (map[area.id] = { ...area, children: [] as Asset[] })
  );

  let root: Asset | null = null;

  areas.forEach((area) => {
    if (!area.parentAssetId) root = map[area.id];
    else if (map[area.parentAssetId])
      map[area.parentAssetId].children.push(map[area.id]);
  });

  return root;
};

export default ModelsPage;
