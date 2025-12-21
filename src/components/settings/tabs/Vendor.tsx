import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import CreateVendor from "../modals/CreateVendor";
import { fetchVendors } from "@/services/vendor.service";
import toast from "react-hot-toast";
import { Vendor as Vendors } from "@/types/vendor";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import ShowVendor from "../modals/ShowVendor";
import FetchDataFromServer from "@/components/ui/FetchDataFromServer";

export default function Vendor() {
  const [isOpenVendor, setOpenVendor] = useState<boolean>(false);
  const [vendorDetails, setVendorDetails] = useState<Vendors | null>(null);
  const [search, setSearch] = useState<string>("");
  const [vendors, setVendors] = useState<Vendors[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const openVendor = () => setOpenVendor(true);
  const closeVendor = () => setOpenVendor(false);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const data = await fetchVendors(search);
      setVendors(data.data);
    } catch (error) {
      toast.error("Failed to fetch vendors. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) {
    return (
      <FetchDataFromServer model="Vendors" />
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
              placeholder="Search vendors..."
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
              onClick={openVendor}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Vendor
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
                    Vendor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Address
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
                {vendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setVendorDetails(vendor)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{vendor.name}</div>
                      {vendor.contact_person && (
                        <div className="text-sm text-gray-500">Contact Person: {vendor.contact_person}</div>
                      )}
                      {vendor.phone && (
                        <div className="text-sm text-gray-500">Phone: {vendor.phone}</div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {vendor.email ? (
                        <span className="text-sm text-gray-700">{vendor.email}</span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {vendor.address ? (
                        <span className="text-sm text-gray-700">{vendor.address}</span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {vendor.note ? (
                        <span className="text-sm text-gray-700">{vendor.note}</span>
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
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              onClick={() => setVendorDetails(vendor)}
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{vendor.name}</h3>
                <div className="mt-1 space-y-1 text-sm">
                  {vendor.email ? (
                    <p className="text-gray-600 truncate">{vendor.email}</p>
                  ) : (
                    <p className="text-gray-400">No email</p>
                  )}

                  {vendor.phone && (
                    <p className="text-gray-500 truncate">{vendor.phone}</p>
                  )}
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>
      {/* Create Vendor Modal */}
      {isOpenVendor && (
        <CreateVendor onClose={closeVendor} onSave={() => fetchData()} />
      )}
      {/* Show Vendor Modal */}
      {vendorDetails && (
        <ShowVendor 
          onClose={() => setVendorDetails(null)} 
          isOpen={!!vendorDetails} 
          vendor={vendorDetails}
          onSave={() => fetchData()}
        />
      )}
    </>
  );
}
