import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle, ArrowRight, ShoppingBag, Ruler, Package, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '../../data/productsData';
import { FAQ_DATA } from '../../data/faqData';
import { useOrders } from '../../context/OrderContext';

export default function AIChatbot({ onProductSelect, onNavigate }) {
  const { orders } = useOrders();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hey! I am AXDORO AI, your personal streetwear and sizing assistant. Ask me anything about our 240 GSM heavyweight cotton, find a specific drop, or get custom fit recommendations.',
      options: [
        'What is 240 GSM?',
        'Recommend black oversized tees',
        'Help me pick my size',
        'Track my order',
        'Custom bulk orders (B2B)'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      generateBotResponse(query);
      setIsTyping(false);
    }, 600);
  };

  const generateBotResponse = (query) => {
    const qLower = query.toLowerCase();
    let responseText = '';
    let productSuggestions = [];
    let showWhatsAppButton = false;

    // 1. GSM & Fabric
    if (qLower.includes('240 gsm') || qLower.includes('gsm') || qLower.includes('fabric') || qLower.includes('cotton')) {
      responseText = 'AXDORO uses 240 GSM 100% Super Combed Cotton. Standard commercial t-shirts are only 160-180 GSM, which cling and warp easily. Our 240 GSM knit offers heavyweight structure, a clean architectural drop-shoulder drape, and is bio-washed & pre-shrunk to eliminate post-wash shrinkage.';
    }
    // 2. Sizing Help
    else if (qLower.includes('size') || qLower.includes('fit') || qLower.includes('height') || qLower.includes('weight') || qLower.includes('kg')) {
      // Analyze height/weight if provided
      if (qLower.includes('5\'') || qLower.includes('6\'') || qLower.includes('kg')) {
        responseText = 'Based on your measurements and our drop-shoulder streetwear cut: We recommend Size L for an authentic oversized silhouette, or Size M if you prefer a standard tailored drape. Our Lycra-ribbed 1.25" neckband ensures the collar never sags.';
      } else {
        responseText = 'Our garments have an intentional drop-shoulder oversized cut. We suggest taking your standard regular t-shirt size for the signature street drape. If you prefer a trimmer classic fit, choose one size down. Tell me your height & weight for a tailored recommendation!';
      }
    }
    // 3. Track Order
    else if (qLower.includes('track') || qLower.includes('order') || qLower.includes('where is my order') || qLower.includes('status')) {
      if (orders.length > 0) {
        const latest = orders[0];
        responseText = `I found your latest order #${latest.orderId}! Status: ${latest.status}. Shiprocket AWB: ${latest.shiprocketAwb}. Your items are scheduled for express delivery via our Chennai hub.`;
      } else {
        responseText = 'You currently have no active orders in this session. Once you place an order, you can track it live via your AXDORO account or using the Shiprocket AWB sent to your WhatsApp and email.';
      }
    }
    // 4. Custom & Bulk B2B
    else if (qLower.includes('bulk') || qLower.includes('custom') || qLower.includes('corporate') || qLower.includes('b2b') || qLower.includes('college')) {
      responseText = 'For custom corporate, college, or brand drops, our MOQ is 30 units. We offer custom 240 GSM / 380 GSM blank manufacturing, screen printing, puff prints, and custom labeling. Would you like to submit a quote or chat with our B2B team on WhatsApp?';
      showWhatsAppButton = true;
    }
    // 5. Shipping & Payment
    else if (qLower.includes('shipping') || qLower.includes('delivery') || qLower.includes('how long') || qLower.includes('cod')) {
      responseText = 'We offer FREE Pan-India Shipping on orders above ₹1,499 (flat ₹99 below that). Tamil Nadu orders arrive in 24-48 hours; Metro cities in 2-4 days. Payments are securely prepaid via Razorpay (UPI, GPay, PhonePe, Cards).';
    }
    // 6. Product search
    else if (qLower.includes('black') || qLower.includes('hoodie') || qLower.includes('graphic') || qLower.includes('tee') || qLower.includes('cargo')) {
      productSuggestions = PRODUCTS.filter((p) => {
        const matchTitle = p.name.toLowerCase().includes(qLower);
        const matchCategory = p.category.toLowerCase().includes(qLower);
        const matchColor = p.colors.some((c) => c.name.toLowerCase().includes(qLower));
        return matchTitle || matchCategory || matchColor;
      }).slice(0, 3);

      if (productSuggestions.length === 0) {
        productSuggestions = PRODUCTS.slice(0, 3);
      }
      responseText = `Here are some of our top-rated drops matching "${query}":`;
    }
    // Default fallback
    else {
      responseText = 'I can help you explore our 240 GSM streetwear drops, recommend the ideal size, check order tracking, or explain our return policies. You can also connect directly with an AXDORO stylist on WhatsApp.';
      showWhatsAppButton = true;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        products: productSuggestions,
        showWhatsApp: showWhatsAppButton,
        options: ['What is 240 GSM?', 'Show Oversized Drops', 'Size Guide', 'Contact Human Stylist']
      }
    ]);
  };

  const handleWhatsAppHandoff = () => {
    const text = encodeURIComponent('Hi AXDORO Team! I was speaking with the AI assistant on your website and would like human assistance with an order/product.');
    window.open(`https://wa.me/919840029367?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-[#111111] hover:bg-[#C9A96E] hover:text-[#111111] text-[#F7F5F0] px-4 py-3 rounded-full shadow-2xl transition-all duration-300 group border border-[#C9A96E]/40"
            aria-label="Open AI Fashion Assistant"
          >
            <div className="w-6 h-6 rounded-full bg-[#C9A96E] text-[#111111] flex items-center justify-center">
              <Sparkles size={14} />
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold leading-tight">AXDORO AI</span>
              <span className="block text-[10px] text-[#D8C7B5] group-hover:text-black">240 GSM Sizing & Style</span>
            </div>
          </button>
        )}
      </div>

      {/* Expandable Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[95vw] sm:w-[400px] h-[580px] max-h-[85vh] bg-[#FAF8F5] text-[#111111] rounded-2xl shadow-2xl border border-[#E2DED6] flex flex-col overflow-hidden animate-fade-in">
          
          {/* Top Bar */}
          <div className="bg-[#111111] text-[#F7F5F0] p-4 flex items-center justify-between border-b border-[#2B2B2B]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C9A96E] text-[#111111] flex items-center justify-center font-black text-sm">
                <Bot size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-sm">AXDORO Stylist AI</h3>
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                </div>
                <p className="text-[10px] text-[#D8C7B5]">Heavyweight Streetwear Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleWhatsAppHandoff}
                className="p-1.5 text-[#C9A96E] hover:text-white transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#F7F5F0] hover:text-[#C9A96E] transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#111111] text-[#F7F5F0] rounded-br-none'
                      : 'bg-white border border-[#E2DED6] text-[#111111] rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Render Embedded Product Recommendations if any */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.products.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setIsOpen(false);
                            onProductSelect(p);
                          }}
                          className="flex items-center gap-2.5 p-2 bg-[#FAF8F5] border border-[#E2DED6] rounded-lg hover:border-[#111111] transition-all cursor-pointer group"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-14 object-cover rounded bg-[#EAE7E0]"
                          />
                          <div className="flex-1">
                            <h5 className="font-heading font-semibold text-[11px] text-[#111111] line-clamp-1 group-hover:text-[#C9A96E]">
                              {p.name}
                            </h5>
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span className="font-bold text-[#111111]">₹{p.salePrice}</span>
                              <span className="text-[#5F6368] font-mono">{p.gsm}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render WhatsApp Escalation Button if required */}
                  {msg.showWhatsApp && (
                    <button
                      onClick={handleWhatsAppHandoff}
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-3 rounded text-xs font-bold transition-all shadow"
                    >
                      <MessageCircle size={14} />
                      <span>Chat on WhatsApp (+91 98400 AXDOR)</span>
                    </button>
                  )}
                </div>

                {/* Render Quick Reply Option Pills */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSend(opt)}
                        className="bg-white hover:bg-[#111111] hover:text-white border border-[#E2DED6] px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#5F6368] transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-[11px] text-[#5F6368] bg-white p-2.5 rounded-lg border border-[#E2DED6] w-24">
                <div className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-[#E2DED6]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about 240 GSM, fit, or drops..."
                className="flex-1 bg-[#FAF8F5] border border-[#E2DED6] px-3.5 py-2.5 rounded-full text-xs focus:outline-none focus:border-[#111111]"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#111111] hover:bg-[#C9A96E] hover:text-black text-[#F7F5F0] flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Send Message"
              >
                <Send size={15} />
              </button>
            </form>
            <div className="mt-1.5 text-center text-[9px] text-[#5F6368]">
              Verified AXDORO Knowledge Engine • Escalates to WhatsApp
            </div>
          </div>
        </div>
      )}
    </>
  );
}
