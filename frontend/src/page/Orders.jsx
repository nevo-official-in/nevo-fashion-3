import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const Orders = () => {
  const location = useLocation();
  const paymentId = location.state?.payment_id || "NV-99210-X";

  const orders = [
    {
      id: paymentId,
      date: "24 Feb 2026",
      status: "Confirmed",
      amount: "₹12,400.00",
      items: "Oversized Shell Tee"
    }
  ];

  return (
    <>
      <Helmet><title>Orders | NEVO ARCHIVE</title></Helmet>
      {/* Background black rakha hai taaki About page wala overlap na dikhe */}
      <div className="min-h-screen pt-48 pb-20 px-6 md:px-12 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <div className="border-b border-white/10 pb-10 mb-10">
            <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase block mb-4">Account</span>
            <h1 className="text-5xl font-normal tracking-tighter uppercase">Order History</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.3em] text-white/30 border-b border-white/5">
                  <th className="py-4 font-medium italic font-serif">ID</th>
                  <th className="py-4 font-medium">Date</th>
                  <th className="py-4 font-medium">Product</th>
                  <th className="py-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order, index) => (
                  <tr key={index} className="text-[12px] tracking-widest uppercase">
                    <td className="py-8 font-medium text-white/80">{order.id}</td>
                    <td className="py-8 text-white/40">{order.date}</td>
                    <td className="py-8 text-white/40">{order.items}</td>
                    <td className="py-8 text-right">
                      <span className="px-4 py-1.5 bg-white text-black text-[9px] font-bold">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders; // <--- YE SABSE ZAROORI HAI DEFAULT IMPORT KE LIYE