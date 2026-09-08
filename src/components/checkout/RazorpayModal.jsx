import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Landmark, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function RazorpayModal({
  isOpen,
  onClose,
  totalAmount,
  customerInfo,
  onPaymentSuccess,
  onPaymentFailure
}) {
  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiMethod, setUpiMethod] = useState('qr'); // 'qr' | 'gpay' | 'phonepe' | 'id'
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({
    number: '4111 2222 3333 4444',
    expiry: '12/28',
    cvv: '821',
    name: customerInfo?.fullName || 'AXDORO Customer'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [processingState, setProcessingState] = useState('idle'); // 'idle' | 'processing' | 'success' | 'failed'
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handlePay = (shouldFail = false) => {
    setProcessingState('processing');
    setErrorMessage('');

    setTimeout(() => {
      if (shouldFail) {
        setProcessingState('failed');
        setErrorMessage('Transaction declined by issuing bank (Simulated Test Decline). Please try another method.');
      } else {
        setProcessingState('success');
        const paymentId = `pay_rzp_${Math.random().toString(36).substring(2, 11)}`;
        setTimeout(() => {
          onPaymentSuccess(paymentId, activeTab);
        }, 800);
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white text-[#111111] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-[#E2DED6] flex flex-col">
        
        {/* Razorpay Top Header */}
        <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-heading font-black text-[#C9A96E] text-base border border-white/20">
              AX
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-heading font-bold text-sm text-white">AXDORO Clothing Co.</h3>
                <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/40 px-1.5 py-0.2 rounded">
                  VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-gray-300">Order ID: AXD-CHECKOUT-SESSION</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-gray-400 block uppercase">Amount to Pay</span>
            <span className="font-heading font-extrabold text-lg text-white">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Razorpay Test Mode Banner */}
        <div className="bg-[#FFF8E1] text-[#7A5800] px-4 py-2 text-[11px] flex items-center justify-between border-b border-[#FFE082]">
          <span className="font-semibold flex items-center gap-1">
            <ShieldCheck size={14} className="text-[#F57F17]" />
            <span>Razorpay Sandbox / Test Mode Active</span>
          </span>
          <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-[#FFE082]">
            TEST GATEWAY
          </span>
        </div>

        {/* Processing State Screens */}
        {processingState === 'processing' ? (
          <div className="p-12 text-center space-y-4">
            <Loader2 size={40} className="text-[#0C2340] animate-spin mx-auto" />
            <h4 className="font-heading font-bold text-base text-[#111111]">
              Authorizing Payment with Bank...
            </h4>
            <p className="text-xs text-[#5F6368] max-w-xs mx-auto">
              Simulating encrypted Razorpay 256-bit webhook verification. Please do not refresh.
            </p>
          </div>
        ) : processingState === 'success' ? (
          <div className="p-12 text-center space-y-4">
            <CheckCircle2 size={48} className="text-[#2E7D32] mx-auto animate-bounce" />
            <h4 className="font-heading font-bold text-lg text-[#111111]">
              Payment Verified Successfully!
            </h4>
            <p className="text-xs text-[#5F6368]">
              Creating confirmed order and initiating Shiprocket fulfilment...
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row min-h-[320px]">
            
            {/* Left Tabs */}
            <div className="md:w-1/3 bg-[#F8F9FA] border-r border-[#E2DED6] p-2 flex md:flex-col gap-1">
              <button
                onClick={() => setActiveTab('upi')}
                className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-xs font-semibold transition-all text-left ${
                  activeTab === 'upi' ? 'bg-[#0C2340] text-white shadow' : 'text-[#5F6368] hover:bg-gray-200'
                }`}
              >
                <QrCode size={16} className={activeTab === 'upi' ? 'text-[#C9A96E]' : ''} />
                <span>UPI / QR</span>
              </button>

              <button
                onClick={() => setActiveTab('card')}
                className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-xs font-semibold transition-all text-left ${
                  activeTab === 'card' ? 'bg-[#0C2340] text-white shadow' : 'text-[#5F6368] hover:bg-gray-200'
                }`}
              >
                <CreditCard size={16} className={activeTab === 'card' ? 'text-[#C9A96E]' : ''} />
                <span>Cards</span>
              </button>

              <button
                onClick={() => setActiveTab('netbanking')}
                className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-xs font-semibold transition-all text-left ${
                  activeTab === 'netbanking' ? 'bg-[#0C2340] text-white shadow' : 'text-[#5F6368] hover:bg-gray-200'
                }`}
              >
                <Landmark size={16} className={activeTab === 'netbanking' ? 'text-[#C9A96E]' : ''} />
                <span>NetBanking</span>
              </button>
            </div>

            {/* Right Tab Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-[#B3261E] rounded text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* UPI Tab */}
              {activeTab === 'upi' && (
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-[#111111]">
                    Pay instantly using any UPI App
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setUpiMethod('qr')}
                      className={`flex-1 py-2 px-3 rounded text-xs font-semibold border ${
                        upiMethod === 'qr' ? 'border-[#0C2340] bg-[#0C2340]/5 text-[#0C2340]' : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      Scan QR
                    </button>
                    <button
                      onClick={() => setUpiMethod('apps')}
                      className={`flex-1 py-2 px-3 rounded text-xs font-semibold border ${
                        upiMethod === 'apps' ? 'border-[#0C2340] bg-[#0C2340]/5 text-[#0C2340]' : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      UPI Apps
                    </button>
                  </div>

                  {upiMethod === 'qr' ? (
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                      <div className="w-32 h-32 bg-white p-2 rounded shadow-sm border flex items-center justify-center relative">
                        {/* Simulated QR Pattern */}
                        <div className="grid grid-cols-4 gap-1 w-full h-full p-1 opacity-80">
                          {[...Array(16)].map((_, i) => (
                            <div
                              key={i}
                              className={`rounded-sm ${i % 3 === 0 || i === 0 || i === 3 || i === 12 ? 'bg-[#0C2340]' : 'bg-[#C9A96E]'}`}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-white px-2 py-0.5 text-[9px] font-bold text-[#0C2340] rounded shadow">
                            AXDORO UPI
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#5F6368] mt-2">
                        Scan with GPay, PhonePe, Paytm, or BHIM
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => handlePay(false)}
                        className="w-full flex items-center justify-between p-2.5 border rounded hover:border-[#0C2340] text-xs font-semibold"
                      >
                        <span>Google Pay</span>
                        <span className="text-green-600 text-[11px]">Instant</span>
                      </button>
                      <button
                        onClick={() => handlePay(false)}
                        className="w-full flex items-center justify-between p-2.5 border rounded hover:border-[#0C2340] text-xs font-semibold"
                      >
                        <span>PhonePe UPI</span>
                        <span className="text-green-600 text-[11px]">Instant</span>
                      </button>
                      <button
                        onClick={() => handlePay(false)}
                        className="w-full flex items-center justify-between p-2.5 border rounded hover:border-[#0C2340] text-xs font-semibold"
                      >
                        <span>Paytm UPI</span>
                        <span className="text-green-600 text-[11px]">Instant</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Cards Tab */}
              {activeTab === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="w-full border px-3 py-2 rounded text-xs font-mono focus:border-[#0C2340] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full border px-3 py-2 rounded text-xs font-mono focus:border-[#0C2340] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full border px-3 py-2 rounded text-xs font-mono focus:border-[#0C2340] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      className="w-full border px-3 py-2 rounded text-xs focus:border-[#0C2340] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* NetBanking Tab */}
              {activeTab === 'netbanking' && (
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-gray-600 block">Popular Indian Banks</label>
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra'].map((bank) => (
                    <label
                      key={bank}
                      className={`flex items-center justify-between p-2.5 border rounded cursor-pointer text-xs font-medium ${
                        selectedBank === bank ? 'border-[#0C2340] bg-blue-50/50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{bank}</span>
                      <input
                        type="radio"
                        name="bank"
                        checked={selectedBank === bank}
                        onChange={() => setSelectedBank(bank)}
                      />
                    </label>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <button
                  onClick={() => handlePay(false)}
                  className="w-full bg-[#0C2340] hover:bg-[#143966] text-white py-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow flex items-center justify-center gap-2"
                >
                  <Lock size={14} className="text-[#C9A96E]" />
                  <span>PAY ₹{totalAmount.toLocaleString('en-IN')} VIA RAZORPAY</span>
                </button>

                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <button
                    onClick={() => handlePay(true)}
                    className="text-red-500 hover:underline"
                    title="Simulate card declined to test error handling"
                  >
                    Simulate Payment Failure
                  </button>
                  <button onClick={onClose} className="hover:text-black">
                    Cancel & Return to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Razorpay Footer */}
        <div className="bg-gray-100 px-4 py-2 text-center text-[10px] text-gray-500 border-t border-gray-200">
          Powered by Razorpay Payment Gateway • PCI-DSS Level 1 Compliant
        </div>
      </div>
    </div>
  );
}

function Lock({ size = 14, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
