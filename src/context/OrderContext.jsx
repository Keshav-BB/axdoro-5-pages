import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

const SAMPLE_INITIAL_ORDERS = [
  {
    orderId: 'AXD-74921',
    date: '2026-09-02',
    items: [
      {
        id: 1,
        name: 'AXDORO Signature Oversized Heavy Tee',
        selectedSize: 'L',
        selectedColor: { name: 'Urban Black', hex: '#111111' },
        quantity: 1,
        price: 999,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 52,
        name: 'Aetherial Spectrum Backprint Graphic Tee',
        selectedSize: 'XL',
        selectedColor: { name: 'Washed Charcoal', hex: '#3A3A3C' },
        quantity: 1,
        price: 1199,
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      }
    ],
    totalAmount: 2198,
    paymentMethod: 'Razorpay UPI (Verified)',
    paymentId: 'pay_Nz9K28402XmQ',
    shippingAddress: {
      fullName: 'Vikram Sundaram',
      phone: '+91 98401 23456',
      street: '42 Khader Nawaz Khan Road, Nungambakkam',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600006',
    },
    shiprocketAwb: 'SR-TN-98248109',
    status: 'In Transit',
    timeline: [
      { status: 'Order Confirmed', time: '02 Sep 2026, 11:30 AM', done: true, desc: 'Payment verified via Razorpay webhook.' },
      { status: 'Packed at Chennai Hub', time: '02 Sep 2026, 04:15 PM', done: true, desc: 'Quality checked, 240 GSM garments sealed.' },
      { status: 'Handed to Courier Partner', time: '03 Sep 2026, 09:20 AM', done: true, desc: 'Shiprocket AWB SR-TN-98248109 assigned.' },
      { status: 'In Transit', time: '04 Sep 2026, 02:45 PM', done: true, desc: 'Arrived at delivery sorting facility.' },
      { status: 'Out for Delivery', time: 'Expected by tomorrow', done: false, desc: 'Our courier partner will deliver between 10 AM - 6 PM.' }
    ]
  }
];

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('axdoro_orders');
      return saved ? JSON.parse(saved) : SAMPLE_INITIAL_ORDERS;
    } catch (e) {
      return SAMPLE_INITIAL_ORDERS;
    }
  });

  const [bulkEnquiries, setBulkEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('axdoro_bulk_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('axdoro_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('axdoro_bulk_enquiries', JSON.stringify(bulkEnquiries));
    } catch (e) {
      console.error('Failed to save bulk enquiries', e);
    }
  }, [bulkEnquiries]);

  const placeOrder = ({ items, shippingAddress, totalAmount, paymentMethod, paymentId }) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `AXD-${randomSuffix}`;
    const awbNumber = `SR-TN-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder = {
      orderId: newOrderId,
      date: new Date().toISOString().slice(0, 10),
      items,
      totalAmount,
      paymentMethod,
      paymentId: paymentId || `pay_mock_${Date.now()}`,
      shippingAddress,
      shiprocketAwb: awbNumber,
      status: 'Order Confirmed',
      timeline: [
        {
          status: 'Order Confirmed',
          time: 'Just now',
          done: true,
          desc: 'Payment captured securely via Razorpay.'
        },
        {
          status: 'Packing at Chennai Hub',
          time: 'In queue',
          done: false,
          desc: 'Barcoding and sealing 240 GSM heavy cotton pieces.'
        },
        {
          status: 'Shiprocket Pickup',
          time: 'Pending pickup',
          done: false,
          desc: `Courier manifest created: AWB #${awbNumber}`
        },
        {
          status: 'In Transit',
          time: 'Est. 24-48 hrs',
          done: false,
          desc: 'Express dispatch across Tamil Nadu / Pan-India.'
        },
        {
          status: 'Delivered',
          time: 'Pending',
          done: false,
          desc: 'Delivered to doorstep.'
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id) => {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    return orders.find((o) => o.orderId.toUpperCase() === cleanId) || null;
  };

  const addBulkEnquiry = (enquiryData) => {
    const newEnquiry = {
      id: `ENQ-${Date.now()}`,
      date: new Date().toISOString(),
      ...enquiryData,
      status: 'Pending Review',
    };
    setBulkEnquiries((prev) => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
        bulkEnquiries,
        addBulkEnquiry,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
