import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import CreateStore from "../modals/CreateStore";
import { fetchStores, exportStores } from "@/services/store.service";
import toast from "react-hot-toast";
import { Store as StoreType } from "@/types/store";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import FetchDataFromServer from "@/components/ui/FetchDataFromServer";
import { exportToExcel } from "@/lib/utils/excel.util";
import { formatDate } from "@/lib/utils/date.util";

export default function Store() {
  const [isOpenStore, setOpenStore] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [stores, setStores] = useState<StoreType[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const openStore = () => setOpenStore(true);
  const closeStore = () => setOpenStore(false);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const data = await fetchStores(search);
      setStores(data.data);
    } catch (error) {
      toast.error("Failed to fetch stores. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      const data = await exportStores();
      
      const exportData = data.map((store) => ({
        "Store Name": store.name,
        "Sales Person": store.sales_person_fullname || "—",
        "Default Currency": store.default_currency || "—",
        "Description": store.description || "—",
        "Added By": store.added_by_fullname || "—",
        "Created At": formatDate(new Date(store.created_at), "YYYY-MM-DD HH:mm:ss"),
        "Updated At": store.updated_at ? formatDate(new Date(store.updated_at), "YYYY-MM-DD HH:mm:ss") : "—",
      }));

      exportToExcel(exportData, `stores-${formatDate(new Date(), "YYYY-MM-DD")}`);
      toast.success("Stores exported successfully!");
    } catch (error) {
      toast.error("Failed to export stores. Please try again later.");
    } finally {
      setIsExporting(false);
    }
  };

  if (isFetching) {
    return (
      <FetchDataFromServer model="Stores" />
    );
  }

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
              onClick={handleExportExcel}
              disabled={isExporting}
              className="px-6 py-3 border cursor-pointer border-green-600 text-green-700 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ExcelIcon />
              {isExporting ? "Exporting..." : "Export Excel"}
            </button>

            <button
              onClick={openStore}
              className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Store
            </button>
          </div>
        </div>
        {/* Desktop / Tablet Table */}
        <div className="hidden sm:block bg-[var(--color-overviewTab)] rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[var(--color-overviewTab)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Store Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Sales Person
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Default Currency
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold ">
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
                        <div className="font-semibold ">{store.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        {store.sales_person_fullname ? (
                          <span className="text-sm ">{store.sales_person_fullname}</span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {store.default_currency ? (
                          <span className="text-sm  uppercase">{store.default_currency}</span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {store.description ? (
                          <span className="text-sm  line-clamp-2">{store.description}</span>
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
        <div className="sm:hidden bg-[var(--color-overviewTab)] rounded-lg divide-y divide-gray-200">
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
                  <h3 className="font-semibold  truncate">{store.name}</h3>
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
