import { fetchGetIdNameList } from "@/services/user.service";
import { MemberIdNameList } from "@/types/member";
import { ChevronDown, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function CreateStore({ onClose, onSave }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<MemberIdNameList[]>([]);
  const [members, setMembers] = useState<MemberIdNameList[]>([]);

  const closeDailog = () => {
    onClose();
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetchGetIdNameList()
      setMembers(res.data)
    } catch (error) {
      toast.error("Failed to fetch members. Please try again later.");
    }

  }

  return (
    <>
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-end z-9999">
        <div className="bg-white shadow-xl w-full max-w-2xl h-full overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
            <h2 className="text-xl font-semibold text-gray-900">
              Create Source Channel #DF429
            </h2>
            <button
              onClick={() => closeDailog()}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Store Name
              </label>
              <input
                type="text"
                placeholder="Select date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Sales Person
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select</option>
                  {members.map((member) => {
                    return (
                      <option key={member.id} value={member.id}>{member.full_name}</option>
                    )
                  })}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Default Currency
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select</option>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="sar">SAR</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                placeholder="Receipt Info (optional)"
                //@ts-expect-error:rows
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
            <button
              onClick={() => closeDailog()}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Save and New
            </button>
            <button
              onClick={() => closeDailog()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
