import React from 'react';
import { X } from './Icons';

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const LiveOrders = ({ liveOrders, setCurrentView, acceptOrder, rejectOrder, serveOrder }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                        <button
                            onClick={() => setCurrentView("panel")}
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                        >
                            <ChevronLeftIcon />
                            Back
                        </button>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Live Orders</h1>
                            {liveOrders.length > 0 && (
                                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-2">
                                    <span className="pulse-dot w-2 h-2"></span>
                                    {liveOrders.length}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Grid */}
            <div className="p-4 md:p-6 max-w-7xl mx-auto">
                {liveOrders.length === 0 ? (
                    <div className="admin-card text-center py-16 fade-in">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
                        <p className="text-gray-500">Waiting for new orders to come in...</p>
                        <div className="mt-6">
                            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                                <span className="pulse-dot"></span>
                                Listening for orders
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {liveOrders.map((order, index) => (
                            <div
                                key={order.id}
                                className="admin-card fade-in relative overflow-hidden"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Status indicator bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1 ${order.status === 'new' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'}`}></div>

                                <div className="pt-2">
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">🪑</span>
                                            <h3 className="font-bold text-xl text-gray-800">Table {order.tableId}</h3>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${order.status === 'new' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {order.status === 'new' ? '🔴 New' : '⏳ Preparing'}
                                        </span>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                        <ClockIcon />
                                        <span>
                                            {order.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>

                                    {/* Order Items */}
                                    <div className="bg-gray-50 rounded-xl p-3 mb-4">
                                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Order Items</p>
                                        <ul className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="flex justify-between items-center text-sm">
                                                    <span className="font-medium text-gray-700">{item.name}</span>
                                                    <span className="text-purple-600 font-semibold">₹{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                                            <span className="text-sm font-semibold text-gray-600">Total</span>
                                            <span className="text-lg font-bold text-purple-600">
                                                ₹{order.items.reduce((sum, item) => sum + (item.price || 0), 0)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-2">
                                        {order.status === 'new' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => acceptOrder(order.id)}
                                                    className="flex-1 btn-action btn-action-success text-center justify-center"
                                                >
                                                    ✓ Accept
                                                </button>
                                                <button
                                                    onClick={() => rejectOrder(order.id, order.tableId)}
                                                    className="flex-1 btn-action btn-action-danger text-center justify-center"
                                                >
                                                    ✕ Reject
                                                </button>
                                            </div>
                                        )}
                                        {order.status === 'accepted' && (
                                            <>
                                                <button
                                                    onClick={() => serveOrder(order.id, order.tableId)}
                                                    className="w-full btn-action btn-action-success text-center justify-center"
                                                >
                                                    ✓ Mark as Served
                                                </button>
                                                <button
                                                    onClick={() => rejectOrder(order.id, order.tableId)}
                                                    className="w-full btn-action btn-action-secondary text-red-600 text-center justify-center hover:bg-red-50"
                                                >
                                                    Cancel Order
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveOrders;