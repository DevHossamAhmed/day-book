import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import CreateBankAccount from "../modals/CreateBankAccount";
import { BankAccount as Bank } from "@/types/bank-account";
import { fetchBanks } from "@/services/bank.service";
import toast from "react-hot-toast";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import ShowBankAccount from "../modals/ShowBankAccount";

export default function BankAccount() {
  const [isOpenBanckAccount, setOpenBanckAccount] = useState<boolean>(false);
  const [bankDetails, setBankDetails] = useState<Bank | null>(null);
  const [search, setSearch] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const openBanckAccount = () => setOpenBanckAccount(true);
  const closeBanckAccount = () => setOpenBanckAccount(false);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      const data = await fetchBanks(search);
      setBanks(data.data);
    } catch (error) {
      toast.error("Failed to fetch bank accounts. Please try again later.");
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
              placeholder="Search bank accounts..."
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
              onClick={openBanckAccount}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Bank Account
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
                    Bank Account
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    IBAN
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Note
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {banks.map((bank) => (
                  <tr
                    key={bank.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setBankDetails(bank)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{bank.name}</div>
                      {bank.account_number && (
                        <div className="text-sm text-gray-500">Account Number: {bank.account_number}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {bank.iban ? (
                        <span className="text-sm text-gray-700">{bank.iban}</span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {bank.note ? (
                        <span className="text-sm text-gray-700">{bank.note}</span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
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
          {banks.map((bank) => (
            <div
              key={bank.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              onClick={() => setBankDetails(bank)}
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{bank.name}</h3>
                <div className="mt-1 space-y-1 text-sm">
                  {bank.account_number ? (
                    <p className="text-gray-600 truncate">Account: {bank.account_number}</p>
                  ) : (
                    <p className="text-gray-400">No account number</p>
                  )}

                  {bank.iban && (
                    <p className="text-gray-500 truncate">IBAN: {bank.iban}</p>
                  )}
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>
      {/* Create Bank Account Modal */}
      {isOpenBanckAccount && (
        <CreateBankAccount
          onClose={closeBanckAccount}
          onSave={() => fetchData()}
        />
      )}
      {/* Show Bank Account Modal */}
      {bankDetails && (
        <ShowBankAccount
          onClose={() => setBankDetails(null)}
          isOpen={!!bankDetails}
          bankAccount={bankDetails}
          onSave={() => fetchData()}
        />
      )}
    </>
  );
}
