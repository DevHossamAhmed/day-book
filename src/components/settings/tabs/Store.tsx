import { ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import CreateStore from "../modals/CreateStore";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";

export default function Store() {
  const [isOpenStore, setOpenStore] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const openStore = () => setOpenStore(true);
  const closeStore = () => setOpenStore(false);

  const onSave = () => {};

  const [stores, setStores] = useState([
    {
      id: 1,
      name: "Illaqi Online",
      manager: "Sajid Nahvi",
      percentage: "+3.85%",
    },
    { id: 2, name: "Store", price: "$39,000", percentage: "+3.85%" },
    { id: 3, name: "1MG", price: "$39,000", percentage: "+3.85%" },
  ]);
  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              placeholder="Search stores..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <SearchIcon />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 font-medium flex items-center gap-2"
            >
              <ExcelIcon />
              Export Excel
            </button>

            <button
              onClick={openStore}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Store
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg divide-y divide-gray-200">
          {stores.map((store) => (
            <div
              key={store.id}
              className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {store.name}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  {store.manager && (
                    <span className="text-gray-600">{store.manager}</span>
                  )}
                  {store.price && (
                    <span className="text-gray-600">{store.price}</span>
                  )}
                  <span className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    {store.percentage}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
      {/* Create Store Modal */}
      {isOpenStore && <CreateStore onClose={closeStore} onSave={onSave} />}
    </>
  );
}
