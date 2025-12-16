import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import CreateStore from "../modals/CreateStore";
import { fetchStores } from "@/services/store.service";
import toast from "react-hot-toast";
import { Store as StoreType } from "@/types/store";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";

export default function Store() {
  const [isOpenStore, setOpenStore] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [stores, setStores] = useState<StoreType[]>([]);

  const openStore = () => setOpenStore(true);
  const closeStore = () => setOpenStore(false);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      const data = await fetchStores(search);
      setStores(data.data);
    } catch (error) {
      toast.error("Failed to fetch stores. Please try again later.");
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              placeholder="Search stores..."
              value={search}
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
        {/* Desktop / Tablet Table */}
        <div className="hidden sm:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Store Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Sales Person
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Default Currency
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {stores.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                      No stores found
                    </td>
                  </tr>
                ) : (
                  stores.map((store) => (
                    <tr
                      key={store.id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{store.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        {store.sales_person_fullname ? (
                          <span className="text-sm text-gray-700">{store.sales_person_fullname}</span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {store.default_currency ? (
                          <span className="text-sm text-gray-700 uppercase">{store.default_currency}</span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {store.description ? (
                          <span className="text-sm text-gray-700 line-clamp-2">{store.description}</span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight className="w-5 h-5 text-gray-400 inline" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Mobile Cards */}
        <div className="sm:hidden bg-white rounded-lg divide-y divide-gray-200">
          {stores.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No stores found
            </div>
          ) : (
            stores.map((store) => (
              <div
                key={store.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{store.name}</h3>
                  <div className="mt-1 space-y-1 text-sm">
                    {store.sales_person_fullname ? (
                      <p className="text-gray-600 truncate">Sales Person: {store.sales_person_fullname}</p>
                    ) : (
                      <p className="text-gray-400">No sales person</p>
                    )}

                    {store.default_currency && (
                      <p className="text-gray-500 truncate">Currency: {store.default_currency.toUpperCase()}</p>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>
      {/* Create Store Modal */}
      {isOpenStore && (
        <CreateStore onClose={closeStore} onSave={() => fetchData()} />
      )}
    </>
  );
}
