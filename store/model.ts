import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface Model {
  areaId: number | null;
}

interface ModelStore {
  model: Model;
  setAreaId: (areaId: number) => void;
}

const useModelStore = create<ModelStore>((set) => ({
  model: { areaId: null },
  setAreaId: (areaId) =>
    set((store) => ({ model: { ...store.model, areaId } })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("useModel Store", useModelStore);

export default useModelStore;
