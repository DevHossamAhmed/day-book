import { ChevronRight, FileText, TrendingUp } from "lucide-react";
import { useState } from "react";
import CreateVendor from "../modals/CreateVendor";

export default function Vendor() {
  const [isOpenVendor, setOpenVendor] = useState<boolean>(false);

  const openVendor = () => setOpenVendor(true);
  const closeVendor = () => setOpenVendor(false);

  const onSave = () => {};
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "A vendor name",
      description: "Full address of the company",
      percentage: "+3.85%",
    },
    { id: 2, name: "Al Rajhi", price: "$39,000", percentage: "+3.85%" },
    { id: 3, name: "Al Rajhi", price: "$39,000", percentage: "+3.85%" },
  ]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-3">
          <button
            onClick={() => openVendor()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Add Vendor
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
                  {vendor.description && (
                    <span className="text-gray-600">{vendor.description}</span>
                  )}
                  {vendor.price && (
                    <span className="text-gray-600">{vendor.price}</span>
                  )}
                  <span className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    {vendor.percentage}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
      {/* Create Vendor Modal */}
      {isOpenVendor && <CreateVendor onClose={closeVendor} onSave={onSave} />}
    </>
  );
}
