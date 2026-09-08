import React, { useState } from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';
import { SIZE_CHART } from '../../data/sizeGuideData';

export default function SizeGuideModal({ isOpen, onClose, categorySlug = 'oversized-tees' }) {
  const [unit, setUnit] = useState('inches'); // 'inches' | 'cm'
  const [activeTab, setActiveTab] = useState(
    categorySlug.includes('hoodie') ? 'hoodies' : categorySlug.includes('cargo') ? 'cargos-bottoms' : 'oversized-tees'
  );

  if (!isOpen) return null;

  const currentChart = SIZE_CHART[activeTab] || SIZE_CHART['oversized-tees'];

  const convertVal = (val) => {
    if (typeof val === 'string') return val;
    if (unit === 'cm') {
      return (val * 2.54).toFixed(1);
    }
    return val;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#F7F5F0] text-[#111111] w-full max-w-2xl rounded-xl shadow-2xl border border-[#E2DED6] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#111111] text-[#F7F5F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler size={20} className="text-[#C9A96E]" />
            <h3 className="font-heading font-bold text-base tracking-wide">
              AXDORO FIT & SIZE GUIDE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#F7F5F0] hover:text-[#C9A96E] transition-colors"
            aria-label="Close size guide"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Tabs & Unit Switch */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E2DED6] flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('oversized-tees')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                activeTab === 'oversized-tees'
                  ? 'bg-[#111111] text-[#F7F5F0]'
                  : 'bg-white text-[#5F6368] hover:text-[#111111] border border-[#E2DED6]'
              }`}
            >
              240 GSM Oversized Tees
            </button>
            <button
              onClick={() => setActiveTab('hoodies')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                activeTab === 'hoodies'
                  ? 'bg-[#111111] text-[#F7F5F0]'
                  : 'bg-white text-[#5F6368] hover:text-[#111111] border border-[#E2DED6]'
              }`}
            >
              380 GSM Hoodies
            </button>
            <button
              onClick={() => setActiveTab('cargos-bottoms')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                activeTab === 'cargos-bottoms'
                  ? 'bg-[#111111] text-[#F7F5F0]'
                  : 'bg-white text-[#5F6368] hover:text-[#111111] border border-[#E2DED6]'
              }`}
            >
              Cargos & Bottoms
            </button>
          </div>

          <div className="flex items-center bg-[#E2DED6]/70 rounded p-0.5 text-xs">
            <button
              onClick={() => setUnit('inches')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                unit === 'inches' ? 'bg-[#111111] text-[#F7F5F0]' : 'text-[#5F6368]'
              }`}
            >
              INCHES
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                unit === 'cm' ? 'bg-[#111111] text-[#F7F5F0]' : 'text-[#5F6368]'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E2DED6] text-xs text-[#5F6368] leading-relaxed">
            <span className="font-bold text-[#111111]">Fitting Philosophy: </span>
            {currentChart.description}
          </div>

          {/* Measurements Table */}
          <div className="border border-[#E2DED6] rounded-lg overflow-hidden bg-white">
            <table className="w-full text-xs text-center">
              <thead className="bg-[#111111] text-[#F7F5F0] font-heading font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3 text-left">Size</th>
                  {activeTab !== 'cargos-bottoms' ? (
                    <>
                      <th className="py-3 px-3">Chest ({unit})</th>
                      <th className="py-3 px-3">Length ({unit})</th>
                      <th className="py-3 px-3">Shoulder ({unit})</th>
                      <th className="py-3 px-3">Sleeve ({unit})</th>
                    </>
                  ) : (
                    <>
                      <th className="py-3 px-3">Waist ({unit})</th>
                      <th className="py-3 px-3">Length ({unit})</th>
                      <th className="py-3 px-3">Thigh ({unit})</th>
                      <th className="py-3 px-3">Leg Opening ({unit})</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DED6]">
                {currentChart.measurements.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-3 text-left font-bold text-[#111111] bg-[#FAF8F5]/60">
                      {row.size}
                    </td>
                    {activeTab !== 'cargos-bottoms' ? (
                      <>
                        <td className="py-3 px-3 font-semibold text-[#111111]">{convertVal(row.chest)}</td>
                        <td className="py-3 px-3 text-[#5F6368]">{convertVal(row.length)}</td>
                        <td className="py-3 px-3 text-[#5F6368]">{convertVal(row.shoulder)}</td>
                        <td className="py-3 px-3 text-[#5F6368]">{convertVal(row.sleeve)}</td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-3 font-semibold text-[#111111]">{convertVal(row.waist)}</td>
                        <td className="py-3 px-3 text-[#5F6368]">{convertVal(row.length)}</td>
                        <td className="py-3 px-3 text-[#5F6368]">{convertVal(row.thigh)}</td>
                        <td className="py-3 px-3 text-[#5F6368]">{convertVal(row.legOpening)}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Fit Recommendations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2 p-3 bg-white border border-[#E2DED6] rounded">
              <CheckCircle size={16} className="text-[#2E7D32] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111111]">True to Streetwear Fit:</strong>
                <p className="text-[#5F6368] mt-0.5">Order your usual standard t-shirt size for the authentic drop shoulder silhouette.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-white border border-[#E2DED6] rounded">
              <CheckCircle size={16} className="text-[#C9A96E] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111111]">Pre-Shrunk Guarantee:</strong>
                <p className="text-[#5F6368] mt-0.5">All 240 GSM garments are bio-washed. They will not shrink after home washing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#E2DED6] flex items-center justify-between">
          <span className="text-xs text-[#5F6368]">Need personal sizing help? Use our AI assistant below.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#111111] text-[#F7F5F0] hover:bg-[#C9A96E] hover:text-[#111111] text-xs font-bold rounded transition-colors"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
}
