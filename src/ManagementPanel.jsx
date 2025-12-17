import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { Menu, Plus, Edit3, Trash2, Eye, Download, QrCode } from './Icons';

// Sidebar Navigation Icons
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const RestaurantIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
        <path d="M9 12v6" />
        <path d="M13 12v6" />
        <path d="M14 7.5c-1 0-1.5.5-1.5 1.5s.5 1.5 1.5 1.5" />
        <path d="M5 8c0-1.5 1.5-3 4-3s4 1.5 4 3-1.5 2-4 2-4-1.5-4-3" />
        <path d="M3 21h18" />
    </svg>
);

const CategoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
);

const MenuItemIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

const OrdersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
        <path d="M12 11h4" />
        <path d="M12 16h4" />
        <path d="M8 11h.01" />
        <path d="M8 16h.01" />
    </svg>
);

const QRIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
        <path d="M21 21v.01" />
        <path d="M12 7v3a2 2 0 0 1-2 2H7" />
        <path d="M3 12h.01" />
        <path d="M12 3h.01" />
        <path d="M12 16v.01" />
        <path d="M16 12h1" />
        <path d="M21 12v.01" />
        <path d="M12 21v-1" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
);

const MenuHamburger = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const ManagementPanel = (props) => {
    const {
        setCurrentView, liveOrders, handleSave, selectedRestaurant, setEditingRestaurant, editingRestaurant,
        updateRestaurant, newCategoryInput, setNewCategoryInput, categories, setCategories, menuItems,
        setMenuItems, handleOnDragEnd, setEditingItem, deleteMenuItem,
        qrTableNumber, setQrTableNumber, viewingImage, setViewingImage,
        generateCustomerMenuUrl, QRCodeComponent, downloadQRCode, currentUser,
        loadSampleData
    } = props;

    const { theme, toggleTheme } = useTheme();

    const [activeSection, setActiveSection] = useState('overview');
    const [restaurantError, setRestaurantError] = useState("");
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const customerMenuUrl = generateCustomerMenuUrl(currentUser?.uid, qrTableNumber);
    const isReadyForQR = selectedRestaurant?.name?.trim() && categories.length > 0 && menuItems.length > 0;

    const navItems = [
        { id: 'overview', label: 'Overview', icon: <HomeIcon /> },
        { id: 'restaurant', label: 'Restaurant Info', icon: <RestaurantIcon /> },
        { id: 'categories', label: 'Categories', icon: <CategoryIcon /> },
        { id: 'menuitems', label: 'Menu Items', icon: <MenuItemIcon /> },
        { id: 'qrcode', label: 'QR Code', icon: <QRIcon /> },
    ];

    const handleLogout = () => {
        setCurrentView("landing");
    };

    const renderOverview = () => (
        <div className="fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-2xl">📋</div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{menuItems.length}</div>
                            <div className="text-sm text-gray-500">Menu Items</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">📁</div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{categories.length}</div>
                            <div className="text-sm text-gray-500">Categories</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentView("orders")}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center text-2xl relative">
                            🔔
                            {liveOrders.length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{liveOrders.length}</div>
                            <div className="text-sm text-gray-500">Live Orders</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl">
                            {isReadyForQR ? '✅' : '⏳'}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{isReadyForQR ? 'Ready' : 'Setup'}</div>
                            <div className="text-sm text-gray-500">QR Status</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setEditingItem({ name: "", category: categories[0] || "", price: "", description: "", imageUrl: "", popular: false, isVeg: true, chefSpecial: false })}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Menu Item
                    </button>
                    <button
                        onClick={() => setCurrentView("orders")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors relative"
                    >
                        {liveOrders.length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-300 rounded-full animate-pulse"></span>}
                        <OrdersIcon /> View Orders ({liveOrders.length})
                    </button>
                    <button
                        onClick={() => setCurrentView("menu")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        <Eye className="w-4 h-4" /> Preview Menu
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                        💾 Save Changes
                    </button>
                    <button
                        onClick={loadSampleData}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                    >
                        ⚡ Load Sample Data
                    </button>
                </div>
            </div>

            {/* Recent Items Preview */}
            {menuItems.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Menu Items</h3>
                        <button
                            onClick={() => setActiveSection('menuitems')}
                            className="text-purple-600 font-medium hover:text-purple-700 text-sm"
                        >
                            View All →
                        </button>
                    </div>
                    <div className="space-y-3">
                        {menuItems.slice(0, 3).map(item => (
                            <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                                ) : (
                                    <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-2xl">🍽️</div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-gray-800">{item.name}</span>
                                        {item.popular && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Popular</span>}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>{item.isVeg ? '🟢' : '🔴'}</span>
                                        <span>₹{item.price}</span>
                                        <span>•</span>
                                        <span>{item.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderRestaurantInfo = () => (
        <div className="fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Restaurant Information</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                {editingRestaurant ? (
                    <div className="space-y-4">
                        {restaurantError && (
  <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
    ⚠️ This section is required (Restaurant name & description)
  </div>
)}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                            {restaurantError && (
  <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
    ⚠️ {restaurantError}
  </div>
)}

                            <input
                                type="text"
                                placeholder="Restaurant Name"
                                value={selectedRestaurant?.name || ""}
                                onChange={(e) => props.setSelectedRestaurant({ ...selectedRestaurant, name: e.target.value })}
                                className={`w-full px-4 py-3 border rounded-lg transition-all outline-none
                                ${!selectedRestaurant?.name?.trim() && restaurantError
                                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                  : "border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"}
                              `}
                              
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                placeholder="Describe your restaurant..."
                                value={selectedRestaurant?.description || ""}
                                onChange={(e) => props.setSelectedRestaurant({ ...selectedRestaurant, description: e.target.value })}
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition-all
                                ${restaurantError && !selectedRestaurant?.description?.trim()
                                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                  : "border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"}
                              `}
                                                              rows={4}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                        <button
  onClick={() => {
    if (!selectedRestaurant?.name?.trim() || !selectedRestaurant?.description?.trim()) {
      setRestaurantError("Restaurant name and description are required");
      toast.error("Please complete restaurant information");
      return;
    }

    setRestaurantError("");
    setEditingRestaurant(false);
    handleSave();
  }}
  className="px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
>
  Save Changes
</button>


                            <button
                                onClick={() => setEditingRestaurant(false)}
                                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedRestaurant?.name || "Not set"}</h3>
                                <p className="text-gray-600">{selectedRestaurant?.description || "No description provided"}</p>
                            </div>
                            <button
                                onClick={() => setEditingRestaurant(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                            >
                                <Edit3 className="w-4 h-4" /> Edit
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Enable Ordering</h3>
                                    <p className="text-sm text-gray-500 max-w-md">
                                        When turned off, customers can only view the menu and cannot place orders.
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={selectedRestaurant?.allowOrdering !== false}
                                        onChange={(e) => updateRestaurant({ ...selectedRestaurant, allowOrdering: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );

    const renderCategories = () => (
        <div className="fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        placeholder="Add new category..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                const trimmed = newCategoryInput.trim();
                                if (trimmed && !categories.includes(trimmed)) {
                                    setCategories(prev => [...prev, trimmed]);
                                }
                                setNewCategoryInput("");
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            const trimmed = newCategoryInput.trim();
                            if (trimmed && !categories.includes(trimmed)) {
                                setCategories(prev => [...prev, trimmed]);
                            }
                            setNewCategoryInput("");
                        }}
                        className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>

                {categories.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">📁</div>
                        <p>No categories added yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categories.map((cat, index) => (
                            <div
                                key={cat}
                                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
                            >
                                <span className="font-medium text-gray-700">{cat}</span>
                                <button
                                    onClick={() => setCategories(prev => prev.filter(c => c !== cat))}
                                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderMenuItems = () => (
        <div className="fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Menu Items ({menuItems.length})</h2>
                <button
                    onClick={() => setEditingItem({ name: "", category: categories[0] || "", price: "", description: "", imageUrl: "", popular: false, isVeg: true, chefSpecial: false })}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Item
                </button>
            </div>

            {menuItems.length > 0 ? (
                <div className="grid gap-4">
                    {menuItems.map(item => (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-xl object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => setViewingImage(item.imageUrl)}
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-3xl">
                                        🍽️
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                        <span className="font-bold text-lg text-gray-800">{item.name}</span>
                                        {item.popular && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">⭐ Popular</span>}
                                        {item.chefSpecial && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">👨‍🍳 Chef's Special</span>}
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.isVeg ? '🟢 Veg' : '🔴 Non-veg'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-purple-600 font-bold">₹{item.price}</span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-gray-500">{item.category || "Uncategorized"}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingItem(item)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Edit3 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => deleteMenuItem(item.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 text-center py-12">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No menu items yet</h3>
                    <p className="text-gray-500 mb-6">Add your first menu item to get started</p>
                    <button
                        onClick={() => setEditingItem({ name: "", category: categories[0] || "", price: "", description: "", imageUrl: "", popular: false, isVeg: true, chefSpecial: false })}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Your First Item
                    </button>
                </div>
            )}
        </div>
    );

    const renderQRCode = () => (
        <div className="fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer QR Code</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-center">
                    <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                        Generate a QR code for customers to scan and instantly access your digital menu. No app downloads required!
                    </p>

                    <div className="flex flex-col items-center gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300">
                            {isReadyForQR ? (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-full max-w-xs">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Table Number / Label</label>
                                        <input
                                            type="text"
                                            value={qrTableNumber}
                                            onChange={(e) => setQrTableNumber(e.target.value)}
                                            placeholder="e.g. 1, 5, Patio-2"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-center"
                                        />
                                    </div>
                                    <QRCodeComponent value={customerMenuUrl} size={220} />
                                </div>
                            ) : (
                                <div className="w-56 h-56 bg-gray-100 rounded-xl flex items-center justify-center p-6">
                                    <div className="text-center text-gray-400">
                                        <div className="text-4xl mb-2">📱</div>
                                        <p className="text-sm">QR Code will appear here</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {!isReadyForQR ? (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md">
                                <h3 className="font-semibold text-yellow-800 mb-3">⚠️ Setup Required</h3>
                                <p className="text-sm text-yellow-700 mb-3">Complete these steps to generate your QR code:</p>
                                <ul className="text-sm text-yellow-700 space-y-2">
                                    {!selectedRestaurant?.name?.trim() && (
                                        <li className="flex items-center gap-2">
                                            <span>❌</span> Set restaurant name
                                        </li>
                                    )}
                                    {categories.length === 0 && (
                                        <li className="flex items-center gap-2">
                                            <span>❌</span> Add at least one category
                                        </li>
                                    )}
                                    {menuItems.length === 0 && (
                                        <li className="flex items-center gap-2">
                                            <span>❌</span> Add at least one menu item
                                        </li>
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <div className="text-center">
                                <button
                                    onClick={() => {
                                        // Sanitize filename: remove special chars, replace spaces with dashes
                                        const safeRestaurantName = (selectedRestaurant?.name || "menu").replace(/[^a-z0-9]/gi, '-').toLowerCase();
                                        const fileName = `${safeRestaurantName}-qr.png`;
                                        downloadQRCode(fileName);
                                    }}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                                >
                                    <Download className="w-5 h-5" /> Download QR Code
                                </button>
                                <p className="text-xs text-gray-500 mt-4 max-w-md">
                                    Print this QR code and place it on tables. Customers can scan to view your menu instantly.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'overview': return renderOverview();
            case 'restaurant': return renderRestaurantInfo();
            case 'categories': return renderCategories();
            case 'menuitems': return renderMenuItems();
            case 'qrcode': return renderQRCode();
            default: return renderOverview();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo */}
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/qr-menu-logo.png" alt="QR Menu" className="w-10 h-10 rounded-lg object-contain bg-white" />
                            <div>
                                <h1 className="font-bold text-gray-800 dark:text-white">QR Menu</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                            </div>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 rounded">
                            <CloseIcon />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeSection === item.id
                                ? 'bg-purple-50 text-purple-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <span className={activeSection === item.id ? 'text-purple-600' : 'text-gray-400'}>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}

                    {/* Live Orders */}
                    <button
                        onClick={() => { setCurrentView("orders"); setSidebarOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <span className="text-gray-400"><OrdersIcon /></span>
                        <span>Live Orders</span>
                        {liveOrders.length > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {liveOrders.length}
                            </span>
                        )}
                    </button>
                </nav>

                {/* Bottom Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
                    <button
                        onClick={() => setCurrentView("menu")}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors mb-1"
                    >
                        <Eye className="w-5 h-5 text-gray-400" />
                        <span>Preview Menu</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <LogoutIcon />
                        <span>Back to Home</span>

                    </button>
                    <div className="mt-3 border-t border-gray-200 pt-3 space-y-1">
  <button
    onClick={() => setCurrentView("privacy")}
    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
  >
    Privacy Policy
  </button>

  <button
    onClick={() => setCurrentView("terms")}
    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
  >
    Terms of Service
  </button>

  <button
  onClick={() => setCurrentView("contact")}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
>
  📩 Contact Us
</button>

</div>

                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4 sticky top-0 z-30">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <MenuHamburger />
                            </button>
                            <h1 className="text-xl font-bold text-gray-800">
                                {navItems.find(n => n.id === activeSection)?.label || 'Dashboard'}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                            <button
                                onClick={handleSave}
                                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                                💾 Save
                            </button>
                            <button
                                onClick={() => setShowProfileModal(true)}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                                    {currentUser?.email?.split('@')[0] || 'User'}
                                </span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 lg:p-6">
                    {renderActiveSection()}
                </div>

            </main>

            {/* Profile Modal */}
            {
                showProfileModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative">
                                <button
                                    onClick={() => setShowProfileModal(false)}
                                    className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                                >
                                    <CloseIcon />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                        {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">{currentUser?.email?.split('@')[0] || 'User'}</h2>
                                        <p className="text-purple-100 text-sm">{currentUser?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">User ID</p>
                                        <p className="text-sm font-mono text-gray-700 break-all">{currentUser?.uid}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Account Status</p>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            <span className="text-sm text-gray-700 font-medium">Active</span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Phone Number</p>
                                        <input
                                            type="tel"
                                            placeholder="+1 234 567 8900"
                                            value={selectedRestaurant?.phoneNumber || ""}
                                            onChange={(e) => updateRestaurant({ ...selectedRestaurant, phoneNumber: e.target.value })}
                                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 flex gap-3">
                                    <button
                                        onClick={() => setShowProfileModal(false)}
                                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleSave();
                                            setShowProfileModal(false);
                                        }}
                                        className="flex-1 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ManagementPanel;