/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { ChevronDown, Save, X, TrendingUp, ChevronRight, FileText, Upload } from 'lucide-react';

const CompanySettings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [showModal, setShowModal] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Company Details State
  const [companyData, setCompanyData] = useState({
    companyName: 'Benjamin Canac',
    address: '',
    crNumber: 'Benjamin Canac',
    taxConfiguration: 'Benjamin Canac',
    defaultCurrency: '',
    financialYear: '',
    timeZone: ''
  });

  // Stores State
  const [stores, setStores] = useState([
    { id: 1, name: 'Illaqi Online', manager: 'Sajid Nahvi', percentage: '+3.85%' },
    { id: 2, name: 'Store', price: '$39,000', percentage: '+3.85%' },
    { id: 3, name: '1MG', price: '$39,000', percentage: '+3.85%' }
  ]);

  const [storeForm, setStoreForm] = useState({
    storeName: '',
    salesperson: '',
    defaultCurrency: '',
    description: ''
  });

  // Vendors State
  const [vendors, setVendors] = useState([
    { id: 1, name: 'A vendor name', description: 'Full address of the company', percentage: '+3.85%' },
    { id: 2, name: 'Al Rajhi', price: '$39,000', percentage: '+3.85%' },
    { id: 3, name: 'Al Rajhi', price: '$39,000', percentage: '+3.85%' }
  ]);

  const [vendorForm, setVendorForm] = useState({
    vendorName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    attachment: null
  });

  // Bank Accounts State
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, name: 'Al Rajhi', amount: '$39,000', percentage: '+3.85%' },
    { id: 2, name: 'Al Rajhi', amount: '$39,000', percentage: '+3.85%' },
    { id: 3, name: 'Al Rajhi', amount: '$39,000', percentage: '+3.85%' }
  ]);

  const [bankForm, setBankForm] = useState({
    bankName: '',
    initialAmount: ''
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: false,
    weeklyDigest: false,
    productUpdates: true,
    importantUpdates: true
  });

  const handleLogoUpload = (e: { target: { files: any[]; }; }) => {
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

  const handleSaveCompany = () => {
    console.log('Saving company data:', companyData);
    alert('Company details saved successfully!');
  };

  const handleCreateStore = () => {
    if (storeForm.storeName) {
      const newStore = {
        id: stores.length + 1,
        name: storeForm.storeName,
        manager: storeForm.salesperson,
        percentage: '+3.85%'
      };
      setStores([...stores, newStore]);
      setStoreForm({ storeName: '', salesperson: '', defaultCurrency: '', description: '' });
      setShowModal(null);
      alert('Store created successfully!');
    }
  };

  const handleAddVendor = () => {
    if (vendorForm.vendorName) {
      const newVendor = {
        id: vendors.length + 1,
        name: vendorForm.vendorName,
        description: vendorForm.address,
        percentage: '+3.85%'
      };
      setVendors([...vendors, newVendor]);
      setVendorForm({ vendorName: '', contactPerson: '', phone: '', email: '', address: '', note: '', attachment: null });
      setShowModal(null);
      alert('Vendor added successfully!');
    }
  };

  const handleCreateAccount = () => {
    if (bankForm.bankName) {
      const newAccount = {
        id: bankAccounts.length + 1,
        name: bankForm.bankName,
        amount: bankForm.initialAmount,
        percentage: '+3.85%'
      };
      setBankAccounts([...bankAccounts, newAccount]);
      setBankForm({ bankName: '', initialAmount: '' });
      setShowModal(null);
      alert('Bank account created successfully!');
    }
  };

  const tabs = [
    { id: 'company', label: 'Company Details' },
    { id: 'stores', label: 'Stores' },
    { id: 'vendors', label: 'Vendors' },
    { id: 'bank', label: 'Bank Accounts' },
    { id: 'notifications', label: 'Notifications' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-white bg-blue-600 rounded-t-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Company Details Tab */}
        {activeTab === 'company' && (
          <div className="bg-white rounded-lg p-8 space-y-6">
            <div className="grid grid-cols-3 gap-6 items-start">
              <label className="text-sm font-medium text-gray-900">
                Company Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={companyData.companyName}
                onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-3 gap-6 items-start">
              <label className="text-sm font-medium text-gray-900">Address</label>
              <textarea
                value={companyData.address}
                onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
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
                onChange={(e) => setCompanyData({ ...companyData, crNumber: e.target.value })}
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
                onChange={(e) => setCompanyData({ ...companyData, taxConfiguration: e.target.value })}
                className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-3 gap-6 items-start">
              <div>
                <label className="text-sm font-medium text-gray-900">Logo Upload</label>
                <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. 1MB Max.</p>
              </div>
              <div className="col-span-2 flex items-center gap-4">
                {logoPreview && (
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer font-medium">
                  Save changes
                  <input type="file" 
                  //@ts-expect-error:Onchange
                  onChange={handleLogoUpload} accept="image/*" className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 items-start">
              <label className="text-sm font-medium text-gray-900">Default Currency</label>
              <div className="col-span-2 relative">
                <select
                  value={companyData.defaultCurrency}
                  onChange={(e) => setCompanyData({ ...companyData, defaultCurrency: e.target.value })}
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
              <label className="text-sm font-medium text-gray-900">Financial Year Start/End</label>
              <div className="col-span-2 relative">
                <select
                  value={companyData.financialYear}
                  onChange={(e) => setCompanyData({ ...companyData, financialYear: e.target.value })}
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
                  onChange={(e) => setCompanyData({ ...companyData, timeZone: e.target.value })}
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
        )}

        {/* Stores Tab */}
        {activeTab === 'stores' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                onClick={
                  //@ts-expect-error:createStore
                  () => setShowModal('createStore')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Create Store
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FileText className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="bg-white rounded-lg divide-y divide-gray-200">
              {stores.map((store) => (
                <div key={store.id} className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{store.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      {store.manager && <span className="text-gray-600">{store.manager}</span>}
                      {store.price && <span className="text-gray-600">{store.price}</span>}
                      <span className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        {store.percentage}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === 'vendors' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                onClick={
                  //@ts-expect-error:addVendor
                  () => setShowModal('addVendor')}
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
                <div key={vendor.id} className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{vendor.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      {vendor.description && <span className="text-gray-600">{vendor.description}</span>}
                      {vendor.price && <span className="text-gray-600">{vendor.price}</span>}
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
        )}

        {/* Bank Accounts Tab */}
        {activeTab === 'bank' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                onClick={
                  //@ts-expect-error:createAccount
                  () => setShowModal('createAccount')}
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
                <div key={account.id} className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{account.name}</h3>
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
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <label className="text-sm font-medium text-gray-900">Email</label>
                <button
                  onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.email ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-4">
                <label className="text-sm font-medium text-gray-900">Desktop</label>
                <button
                  onClick={() => setNotifications({ ...notifications, desktop: !notifications.desktop })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.desktop ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.desktop ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account updates</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4">
                  <label className="text-sm font-medium text-gray-900">Weekly digest</label>
                  <button
                    onClick={() => setNotifications({ ...notifications, weeklyDigest: !notifications.weeklyDigest })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.weeklyDigest ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <label className="text-sm font-medium text-gray-900">Product updates</label>
                  <button
                    onClick={() => setNotifications({ ...notifications, productUpdates: !notifications.productUpdates })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.productUpdates ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.productUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <label className="text-sm font-medium text-gray-900">Important updates</label>
                  <button
                    onClick={() => setNotifications({ ...notifications, importantUpdates: !notifications.importantUpdates })}
                    className={`relative inline-flex h-6 w-11 items-centers rounded-full transition-colors ${
                      notifications.importantUpdates ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.importantUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Store Modal */}
      {showModal === 'createStore' && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-end z-[9999]">
          <div className="bg-white shadow-xl w-full max-w-2xl h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">Create Source Channel #DF429</h2>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Store Name</label>
                <input
                  type="text"
                  value={storeForm.storeName}
                  onChange={(e) => setStoreForm({ ...storeForm, storeName: e.target.value })}
                  placeholder="Select date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Salesperson</label>
                <div className="relative">
                  <input
                    type="text"
                    value={storeForm.salesperson}
                    onChange={(e) => setStoreForm({ ...storeForm, salesperson: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Default Currency</label>
                <div className="relative">
                  <select
                    value={storeForm.defaultCurrency}
                    onChange={(e) => setStoreForm({ ...storeForm, defaultCurrency: e.target.value })}
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

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                <textarea
                  value={storeForm.description}
                  onChange={(e) => setStoreForm({ ...storeForm, description: e.target.value })}
                  placeholder="Receipt Info (optional)"
                  //@ts-expect-error:rows
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowModal(null)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Save and New
              </button>
              <button
                onClick={handleCreateStore}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showModal === 'addVendor' && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-end z-[9999]">
          <div className="bg-white shadow-xl w-full max-w-2xl h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">Add Vendor</h2>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Vendor Name</label>
                <input
                  type="text"
                  value={vendorForm.vendorName}
                  onChange={(e) => setVendorForm({ ...vendorForm, vendorName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Contact Person</label>
                <input
                  type="text"
                  value={vendorForm.contactPerson}
                  onChange={(e) => setVendorForm({ ...vendorForm, contactPerson: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
                <input
                  type="tel"
                  value={vendorForm.phone}
                  onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={vendorForm.email}
                  onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Address</label>
                <textarea
                  value={vendorForm.address}
                  onChange={(e) => setVendorForm({ ...vendorForm, address: e.target.value })}
                  placeholder="Receipt Info (optional)"
                  //@ts-expect-error:rows
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Note</label>
                <textarea
                  value={vendorForm.note}
                  onChange={(e) => setVendorForm({ ...vendorForm, note: e.target.value })}
                  placeholder="Receipt Info (optional)"
                  //@ts-expect-error:rows
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Attachment</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Drag & Drop Receipt</p>
                  <input
                    type="file"
                    onChange={
                      //@ts-expect-error:file
                      (e) => setVendorForm({ ...vendorForm, attachment: e.target.files[0] })}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowModal(null)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Save and New
              </button>
              <button
                onClick={handleAddVendor}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Bank Account Modal */}
      {showModal === 'createAccount' && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-end z-[9999]">
          <div className="bg-white shadow-xl w-full max-w-2xl h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">Create Account</h2>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Bank Name</label>
                <input
                  type="text"
                  value={bankForm.bankName}
                  onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                  placeholder="Select date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Initial Amount</label>
                <input
                  type="text"
                  value={bankForm.initialAmount}
                  onChange={(e) => setBankForm({ ...bankForm, initialAmount: e.target.value })}
                  placeholder="Select date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowModal(null)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Save and New
              </button>
              <button
                onClick={handleCreateAccount}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySettings;