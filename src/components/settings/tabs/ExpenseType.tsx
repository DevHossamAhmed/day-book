import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import CreateExpenseType from "../modals/CreateExpenseType";
import { fetchExpenseTypes } from "@/services/expense-type.service";
import toast from "react-hot-toast";
import { ExpenseType as ExpenseTypes } from "@/types/expense-type";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import ShowExpenseType from "../modals/ShowExpenseType";
import FetchDataFromServer from "@/components/ui/FetchDataFromServer";

export default function ExpenseType() {
  const [isOpenExpenseType, setOpenExpenseType] = useState<boolean>(false);
  const [expenseTypeDetails, setExpenseTypeDetails] = useState<ExpenseTypes | null>(null);
  const [search, setSearch] = useState<string>("");
  const [expenseTypes, setExpenseTypes] = useState<ExpenseTypes[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const openExpenseType = () => setOpenExpenseType(true);
  const closeExpenseType = () => setOpenExpenseType(false);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const data = await fetchExpenseTypes(search);
      setExpenseTypes(data.data);
    } catch (error) {
      toast.error("Failed to fetch expense types. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) {
    return (
      <FetchDataFromServer model="Epense Types" />
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
              placeholder="Search expense types..."
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
              onClick={openExpenseType}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Expense Type
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
                    Expense Type
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {expenseTypes.map((expenseType) => (
                  <tr
                    key={expenseType.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpenseTypeDetails(expenseType)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{expenseType.name}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-5 h-5 text-gray-400 inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Mobile Cards */}
        <div className="sm:hidden bg-white rounded-lg divide-y divide-gray-200">
          {expenseTypes.map((expenseType) => (
            <div
              key={expenseType.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              onClick={() => setExpenseTypeDetails(expenseType)}
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{expenseType.name}</h3>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>
      {/* Create Expense Type Modal */}
      {isOpenExpenseType && (
        <CreateExpenseType onClose={closeExpenseType} onSave={() => fetchData()} />
      )}
      {/* Show Expense Type Modal */}
      {expenseTypeDetails && (
        <ShowExpenseType
          onClose={() => setExpenseTypeDetails(null)}
          isOpen={!!expenseTypeDetails}
          expenseType={expenseTypeDetails}
          onSave={() => fetchData()}
        />
      )}
    </>
  );
}
