import { ChevronRight, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import CreateBankAccount from "../modals/CreateBankAccount";
import { BankAccount as Bank } from "@/types/bank-account";
import { fetchBanks } from "@/services/bank.service";
import toast from "react-hot-toast";

export default function BankAccount() {
  const [isOpenBanckAccount, setOpenBanckAccount] = useState<boolean>(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const openBanckAccount = () => setOpenBanckAccount(true);
  const closeBanckAccount = () => setOpenBanckAccount(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchBanks();
      setBanks(data.data);
    } catch (error) {
      toast.error("Failed to fetch balances. Please try again later.");
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-3">
          <button
            onClick={() => openBanckAccount()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Create Account
          </button>
          <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-white rounded-lg divide-y divide-gray-200">
          {banks.map((bank: Bank) => (
            <div
              key={bank.id}
              className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {bank.name} ( {bank.account_number} )
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  {bank.iban && (
                    <span className="text-gray-600">IBAN ( {bank.iban} )</span>
                  )}
                  <span className="flex items-center gap-1">
                    Added By ( {bank.added_by_fullname} )
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
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
    </>
  );
}
