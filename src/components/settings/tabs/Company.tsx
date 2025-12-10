import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Company() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [companyData, setCompanyData] = useState({
    companyName: "Benjamin Canac",
    address: "",
    crNumber: "Benjamin Canac",
    taxConfiguration: "Benjamin Canac",
    defaultCurrency: "",
    financialYear: "",
    timeZone: "",
  });

  const handleLogoUpload = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        //@ts-expect-error:res
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="bg-white rounded-lg p-8 space-y-6">
        <div className="grid grid-cols-3 gap-6 items-start">
          <label className="text-sm font-medium text-gray-900">
            Company Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={companyData.companyName}
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                companyName: e.target.value,
              })
            }
            className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 items-start">
          <label className="text-sm font-medium text-gray-900">Address</label>
          <textarea
            value={companyData.address}
            onChange={(e) =>
              setCompanyData({ ...companyData, address: e.target.value })
            }
            //@ts-expect-error:rows
            rows="3"
            className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 items-start">
          <label className="text-sm font-medium text-gray-900">
            CR number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={companyData.crNumber}
            onChange={(e) =>
              setCompanyData({ ...companyData, crNumber: e.target.value })
            }
            className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 items-start">
          <label className="text-sm font-medium text-gray-900">
            Tax configuration<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={companyData.taxConfiguration}
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                taxConfiguration: e.target.value,
              })
            }
            className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 items-start">
          <div>
            <label className="text-sm font-medium text-gray-900">
              Logo Upload
            </label>
            <p className="text-xs text-gray-500 mt-1">
              JPG, GIF or PNG. 1MB Max.
            </p>
          </div>
          <div className="col-span-2 flex items-center gap-4">
            {logoPreview && (
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <label className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer font-medium">
              Save changes
              <input
                type="file"
                //@ts-expect-error:Onchange
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 items-start">
          <label className="text-sm font-medium text-gray-900">
            Default Currency
          </label>
          <div className="col-span-2 relative">
            <select
              value={companyData.defaultCurrency}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  defaultCurrency: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="sar">SAR</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 items-start">
          <label className="text-sm font-medium text-gray-900">
            Financial Year Start/End
          </label>
          <div className="col-span-2 relative">
            <select
              value={companyData.financialYear}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  financialYear: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="jan-dec">January - December</option>
              <option value="apr-mar">April - March</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 items-start">
          <label className="text-sm font-medium text-gray-900">Time Zone</label>
          <div className="col-span-2 relative">
            <select
              value={companyData.timeZone}
              onChange={(e) =>
                setCompanyData({ ...companyData, timeZone: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="gmt">GMT</option>
              <option value="est">EST</option>
              <option value="pst">PST</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </>
  );
}
