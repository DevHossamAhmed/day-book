import { ChevronRight, FileText, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import CreateVendor from "../modals/CreateVendor";
import { fetchVendors } from "@/services/vendor.service";
import toast from "react-hot-toast";
import { Vendor as Vendors } from "@/types/vendor";

export default function Vendor() {
  const [isOpenVendor, setOpenVendor] = useState<boolean>(false);
  const [vendors, setVendors] = useState<Vendors[]>([]);
  const openVendor = () => setOpenVendor(true);
  const closeVendor = () => setOpenVendor(false);

  useEffect(() => {
    fetchData();
  }, []);

  const onSave = () => {};

  const fetchData = async () => {
    try {
      const data = await fetchVendors();
      setVendors(data.data);
    } catch (error) {
      toast.error("Failed to fetch vendors. Please try again later.");
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-3">
          <button
            onClick={() => openVendor()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Create Vendor
          </button>
          <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-white rounded-lg divide-y divide-gray-200">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {vendor.name}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  {vendor.email && (
                    <span className="text-gray-600">{vendor.email}</span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
      {/* Create Vendor Modal */}
      {isOpenVendor && (
        <CreateVendor onClose={closeVendor} onSave={() => fetchData()} />
      )}
    </>
  );
}
