import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Download,
  Users,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Search,
  ArrowRight,
  Shield,
  Layers,
  Database
} from 'lucide-react';
import { exportProductsToWooCommerceCsv } from '../data/exportWooCommerceCsv';
import { useOrders } from '../context/OrderContext';

export default function AdminDashboardPage({ products }) {
  const { orders, bulkEnquiries } = useOrders();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'enquiries'
  const [productSearch, setProductSearch] = useState('');
  const [exportSuccess, setExportSuccess] = useState(false);

  const totalInventoryUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  const handleExportCsv = () => {
    exportProductsToWooCommerceCsv(products);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3500);
  };

  const filteredProducts = productSearch.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
          p.sku.toLowerCase().includes(productSearch.toLowerCase())
      )
    : products.slice(0, 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      
      {/* Top Banner */}
      <div className="bg-[#111111] text-[#F7F5F0] rounded-2xl p-6 sm:p-8 border border-[#2B2B2B] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
            <span className="text-xs uppercase tracking-widest font-mono text-[#C9A96E]">
              AXDORO MERCHANT ADMIN • SUPER ADMIN
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            OPERATIONS & CATALOGUE DASHBOARD
          </h1>
          <p className="text-xs text-[#D8C7B5] mt-1">
            Manage your 200+ product catalogue, live Razorpay transactions, Shiprocket dispatches, and export master CSV.
          </p>
        </div>

        {/* 1-Click WooCommerce CSV Export Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExportCsv}
            className="px-5 py-3.5 bg-[#C9A96E] hover:bg-[#D8C7B5] text-[#111111] font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center gap-2"
          >
            <Download size={16} />
            <span>EXPORT 200+ PRODUCTS TO WOOCOMMERCE CSV</span>
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="bg-[#2E7D32]/10 border border-[#2E7D32] text-[#2E7D32] p-4 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle size={16} />
          <span>
            WooCommerce master CSV downloaded successfully! Format: standard WooCommerce Product Import CSV with 210 products, attributes (Size, Color, GSM), SKUs, prices, and high-res image URLs.
          </span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E2DED6] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5F6368]">
            <span>Active Catalogue</span>
            <Package size={16} className="text-[#C9A96E]" />
          </div>
          <div className="font-heading font-black text-2xl text-[#111111]">{products.length}</div>
          <span className="text-[10px] text-[#2E7D32] font-semibold">100% 240/380 GSM Styles</span>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E2DED6] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5F6368]">
            <span>Total Units in Stock</span>
            <Layers size={16} className="text-[#C9A96E]" />
          </div>
          <div className="font-heading font-black text-2xl text-[#111111]">
            {totalInventoryUnits.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#5F6368]">Across 6 Streetwear Categories</span>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E2DED6] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5F6368]">
            <span>Orders Placed</span>
            <ShoppingBag size={16} className="text-[#C9A96E]" />
          </div>
          <div className="font-heading font-black text-2xl text-[#111111]">{orders.length}</div>
          <span className="text-[10px] text-[#2E7D32] font-semibold">Razorpay Verified</span>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E2DED6] space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5F6368]">
            <span>B2B Bulk Inquiries</span>
            <Users size={16} className="text-[#C9A96E]" />
          </div>
          <div className="font-heading font-black text-2xl text-[#111111]">{bulkEnquiries.length}</div>
          <span className="text-[10px] text-[#C9A96E] font-semibold">MOQ 30+ Pipeline</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#E2DED6] gap-6 text-xs font-bold">
        {[
          { id: 'overview', label: 'OVERVIEW & INTEGRATIONS' },
          { id: 'products', label: `PRODUCT CATALOGUE (${products.length})` },
          { id: 'orders', label: `CUSTOMER ORDERS (${orders.length})` },
          { id: 'enquiries', label: `B2B LEADS (${bulkEnquiries.length})` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`py-3 border-b-2 transition-all uppercase tracking-wider ${
              activeTab === t.id
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#5F6368] hover:text-[#111111]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
          
          {/* Integrations Health */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E2DED6] space-y-4">
            <h3 className="font-heading font-bold text-sm text-[#111111]">
              COMMERCE INTEGRATIONS STATUS
            </h3>

            <div className="divide-y divide-[#E2DED6] space-y-3">
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#111111]">Razorpay Gateway</h4>
                  <p className="text-[#5F6368]">Test & Live Credentials Configured • Webhook Active</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#2E7D32]/10 text-[#2E7D32] font-bold">
                  CONNECTED
                </span>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#111111]">Shiprocket Fulfilment</h4>
                  <p className="text-[#5F6368]">Tamil Nadu Priority Air + Pan-India Surface Tracking</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#2E7D32]/10 text-[#2E7D32] font-bold">
                  READY
                </span>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#111111]">AI Stylist & Knowledge Base</h4>
                  <p className="text-[#5F6368]">240 GSM Textile Specs + Sizing + WhatsApp Escalation</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#2E7D32]/10 text-[#2E7D32] font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#111111]">Free Shipping Rule</h4>
                  <p className="text-[#5F6368]">Free Pan-India Delivery on orders &gt; ₹1,499</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#C9A96E]/20 text-[#111111] font-bold">
                  ₹1,499 MIN
                </span>
              </div>
            </div>
          </div>

          {/* SOP Guidance */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E2DED6] space-y-4">
            <h3 className="font-heading font-bold text-sm text-[#111111]">
              DAY-TO-DAY ADMIN SOP
            </h3>
            <div className="space-y-2.5 text-[#5F6368] leading-relaxed">
              <p>• <strong>Bulk Product Import:</strong> Use the top 'Export WooCommerce CSV' button to get a full template of the 200+ products.</p>
              <p>• <strong>Order Processing:</strong> New orders appear immediately in the Orders tab once verified via Razorpay.</p>
              <p>• <strong>Shiprocket Manifest:</strong> AWB numbers are auto-generated upon packing.</p>
              <p>• <strong>B2B Quotes:</strong> All corporate and college bulk inquiries submitted via Page 4 are logged under 'B2B Leads'.</p>
            </div>
          </div>

        </div>
      )}

      {/* Tab: Products */}
      {activeTab === 'products' && (
        <div className="space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#E2DED6]">
            <div className="relative w-full sm:w-80">
              <Search size={14} className="absolute left-3 top-3 text-[#5F6368]" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Filter by title or SKU..."
                className="w-full pl-8 pr-3 py-2 bg-white border border-[#E2DED6] rounded-lg text-xs focus:outline-none focus:border-[#111111]"
              />
            </div>
            <span className="text-[#5F6368]">
              Showing {filteredProducts.length} of {products.length} parent products
            </span>
          </div>

          <div className="border border-[#E2DED6] rounded-xl overflow-hidden bg-white">
            <table className="w-full text-left">
              <thead className="bg-[#111111] text-[#F7F5F0] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">GSM</th>
                  <th className="py-3 px-4">Selling Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DED6]">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]">
                    <td className="py-3 px-4 font-mono font-bold text-[#111111]">{p.sku}</td>
                    <td className="py-3 px-4 font-semibold text-[#111111]">{p.name}</td>
                    <td className="py-3 px-4 text-[#5F6368]">{p.category}</td>
                    <td className="py-3 px-4 text-[#C9A96E] font-bold">{p.gsm}</td>
                    <td className="py-3 px-4 font-bold">₹{p.salePrice}</td>
                    <td className="py-3 px-4 font-mono">{p.stock} pcs</td>
                    <td className="py-3 px-4">
                      <span className="bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-0.5 rounded text-[10px] font-bold">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="border border-[#E2DED6] rounded-xl overflow-hidden bg-white text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#111111] text-[#F7F5F0] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Shiprocket Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DED6]">
              {orders.map((o) => (
                <tr key={o.orderId} className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 font-mono font-bold text-[#111111]">{o.orderId}</td>
                  <td className="py-3 px-4 text-[#5F6368]">{o.date}</td>
                  <td className="py-3 px-4 font-semibold text-[#111111]">{o.shippingAddress.fullName}</td>
                  <td className="py-3 px-4 text-[#5F6368]">{o.shippingAddress.state}</td>
                  <td className="py-3 px-4 font-bold">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-[#2E7D32] font-semibold">{o.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span className="bg-[#111111] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4 text-xs">
          {bulkEnquiries.length === 0 ? (
            <div className="bg-[#FAF8F5] p-12 text-center rounded-xl border border-[#E2DED6] space-y-2">
              <Users size={32} className="text-[#5F6368] mx-auto" />
              <h4 className="font-bold text-sm text-[#111111]">No B2B Inquiries Received Yet</h4>
              <p className="text-[#5F6368]">
                Inquiries submitted on Page 4 (Custom & Bulk Orders) will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="border border-[#E2DED6] rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left">
                <thead className="bg-[#111111] text-[#F7F5F0] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Company / College</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Qty</th>
                    <th className="py-3 px-4">Customization</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DED6]">
                  {bulkEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-4 font-mono font-bold text-[#111111]">{enq.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#111111]">{enq.fullName}</div>
                        <div className="text-[10px] text-[#5F6368]">{enq.phone} • {enq.email}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold">{enq.company || 'Private Client'}</td>
                      <td className="py-3 px-4 text-[#5F6368]">{enq.productType}</td>
                      <td className="py-3 px-4 font-bold text-[#C9A96E]">{enq.quantity} pcs</td>
                      <td className="py-3 px-4 text-[#5F6368] truncate max-w-xs">{enq.customization}</td>
                      <td className="py-3 px-4">
                        <span className="bg-[#C9A96E]/20 text-[#111111] border border-[#C9A96E] px-2 py-0.5 rounded text-[10px] font-bold">
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
