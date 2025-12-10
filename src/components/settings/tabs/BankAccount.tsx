import { ChevronRight, FileText, TrendingUp } from "lucide-react";
import { useState } from "react";
import CreateBankAccount from "../modals/CreateBankAccount";

export default function BankAccount() {
  const [isOpenBanckAccount, setOpenBanckAccount] = useState<boolean>(false);

  const openBanckAccount = () => setOpenBanckAccount(true);
  const closeBanckAccount = () => setOpenBanckAccount(false);

  const onSave = () => {};

  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, name: "Al Rajhi", amount: "$39,000", percentage: "+3.85%" },
    { id: 2, name: "Al Rajhi", amount: "$39,000", percentage: "+3.85%" },
    { id: 3, name: "Al Rajhi", amount: "$39,000", percentage: "+3.85%" },
  ]);

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
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {account.name}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">{account.amount}</span>
                  <span className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    {account.percentage}
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
        <CreateBankAccount onClose={closeBanckAccount} onSave={onSave} />
      )}
    </>
  );
}
