import React from 'react';
import { db } from './firebase';
import { doc, getDoc, setDoc, collection, query, where, orderBy, onSnapshot, updateDoc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from './AuthContext';

import LiveOrders from './LiveOrders';
import ManagementPanel from './ManagementPanel';
import { Menu, Eye, X } from './Icons';
import { SAMPLE_MENU_DATA } from './seedData';


import { QRCodeCanvas } from 'qrcode.react';

const QRCodeComponent = ({ value, size = 200 }) => {
    return (
        <QRCodeCanvas
            id="qr-code-canvas"
            value={value}
            size={size}
            level={"H"}
            includeMargin={true}
            className="border-2 border-gray-300 rounded"
        />
    );
};

const downloadQRCode = (fileName) => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } else {
        toast.error("Could not generate QR code image");
    }
};
const generateCustomerMenuUrl = (restaurantId, tableNumber) => {
    // Use current origin for base URL to support local testing and production automatically
    const baseUrl = window.location.origin + window.location.pathname;
    // Remove trailing slash if present
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    if (tableNumber) { return `${cleanBaseUrl}/#/menu/${restaurantId}?table=${tableNumber}`; }
    return `${cleanBaseUrl}/#/menu/${restaurantId}`;
};
const MenuItemForm = ({ item, onSave, onCancel, categories }) => {
    const [formData, setFormData] = React.useState(item || { name: "", category: categories[0] || "", price: "", description: "", imageUrl: "", popular: false, isVeg: true, chefSpecial: false });
    const [imageFile, setImageFile] = React.useState(null);
    const [isUploading, setIsUploading] = React.useState(false);
    const handleImageUpload = async () => {
        if (!imageFile) return formData.imageUrl;
        setIsUploading(true);
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "dinex_uploads");
        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dlelfhwmi/image/upload", { method: "POST", body: data });
            const file = await res.json();
            setIsUploading(false);
            return file.secure_url;
        } catch (error) {
            setIsUploading(false); toast.error("Image upload failed."); return null;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price) return;
        const finalImageUrl = await handleImageUpload();
        if (finalImageUrl === null) return;
        onSave({ ...formData, imageUrl: finalImageUrl, price: parseFloat(formData.price) || 0, });
    };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card max-w-md w-full max-h-[90vh] overflow-y-auto fade-in">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">{item?.id ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
                        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Item Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                placeholder="e.g., Butter Chicken"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
                            >
                                {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                                placeholder="250"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                                rows={3}
                                placeholder="Describe this dish..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                            <input
                                type="url"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors mb-2"
                                placeholder="https://example.com/image.jpg"
                            />
                            <div className="flex items-center gap-3 my-3">
                                <div className="h-px flex-1 bg-gray-200"></div>
                                <span className="text-xs text-gray-400 font-medium">OR</span>
                                <div className="h-px flex-1 bg-gray-200"></div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                            />
                            {(formData.imageUrl || imageFile) && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                                    <p className="text-xs text-gray-500 mb-2 font-medium">Preview:</p>
                                    <img
                                        src={imageFile ? URL.createObjectURL(imageFile) : formData.imageUrl}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-xl object-cover shadow-sm"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isVeg}
                                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                />
                                <span className="text-sm font-medium text-gray-700">🟢 Vegetarian</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.popular}
                                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                />
                                <span className="text-sm font-medium text-gray-700">⭐ Popular Item</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.chefSpecial}
                                    onChange={(e) => setFormData({ ...formData, chefSpecial: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                />
                                <span className="text-sm font-medium text-gray-700">👨‍🍳 Chef's Special</span>
                            </label>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={isUploading}
                                className="flex-1 btn-premium"
                            >
                                {isUploading ? (
                                    <><span className="spinner"></span> Uploading...</>
                                ) : (
                                    item?.id ? 'Update Item' : 'Add Item'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ScanToSeeMenuApp = () => {
    const [currentView, setCurrentView] = React.useState("landing");
    const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
    const [menuItems, setMenuItems] = React.useState([]);
    const [editingItem, setEditingItem] = React.useState(null);
    const [editingRestaurant, setEditingRestaurant] = React.useState(false);
    const [viewingImage, setViewingImage] = React.useState(null);
    const [categories, setCategories] = React.useState([]);
    const [newCategoryInput, setNewCategoryInput] = React.useState("");
    const [qrTableNumber, setQrTableNumber] = React.useState("1");
    const [liveOrders, setLiveOrders] = React.useState([]);
    const { currentUser, logout } = useAuth();
    const isFirstLoad = React.useRef(true);

    React.useEffect(() => {
        if (!currentUser) return;
        const loadData = async () => {
            const docRef = doc(db, "menus", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setMenuItems(data.items || []);
                setCategories(data.categories || ["Appetizers", "Main Courses", "Breads", "Rice", "Desserts"]);
                setSelectedRestaurant(data.restaurantInfo || { name: "My Restaurant", description: "Delicious food." });
            } else {
                setCategories(["Appetizers", "Main Courses", "Breads", "Rice", "Desserts"]);
                setSelectedRestaurant({ name: "My Restaurant", description: "Delicious food." });
            }
        };
        loadData();
    }, [currentUser]);

    React.useEffect(() => {
        if (!currentUser) return;
        const ordersRef = collection(db, "orders");
        // Filter orders by restaurantId (which is the user uid)
        const q = query(ordersRef, where("restaurantId", "==", currentUser.uid), where("status", "in", ["new", "accepted"]), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (isFirstLoad.current) {
                isFirstLoad.current = false;
            } else {
                querySnapshot.docChanges().forEach((change) => {
                    if (change.type === "added" && change.doc.data().status === 'new') {
                        // Play notification sound
                        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                        audio.play().catch(e => console.log("Audio play failed", e));
                        toast.success(`New Order from Table ${change.doc.data().tableId}!`, { duration: 5000, icon: '🔔' });
                    }
                });
            }
            const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLiveOrders(orders);
        });
        return () => unsubscribe();
    }, [currentUser]);

    const addMenuItem = (newItem) => { const item = { ...newItem, id: Date.now() }; setMenuItems(prev => [...prev, item]); setEditingItem(null); };
    const updateMenuItem = (updatedItem) => { setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item)); setEditingItem(null); };
    const deleteMenuItem = (id) => { setMenuItems(prev => prev.filter(item => item.id !== id)); };
    const updateRestaurant = (updatedRestaurant) => { setSelectedRestaurant(updatedRestaurant); };
    const handleSave = async () => {
        if (!currentUser) return;
        try {
            await setDoc(doc(db, "menus", currentUser.uid), {
                items: menuItems,
                categories: categories,
                restaurantInfo: selectedRestaurant
            });
            toast.success('Menu saved successfully!');
        } catch (e) { console.error("Error saving document: ", e); toast.error('Error saving menu.'); }
    };
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(categories);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setCategories(items);
    };

    // Function to load sample menu data
    // Function to load sample menu data
    const loadSampleData = async () => {
        if (!currentUser) return;

        try {
            // Set sample data to Firebase
            await setDoc(doc(db, "menus", currentUser.uid), SAMPLE_MENU_DATA);
            // Update local state
            setMenuItems(SAMPLE_MENU_DATA.items);
            setCategories(SAMPLE_MENU_DATA.categories);
            setSelectedRestaurant(SAMPLE_MENU_DATA.restaurantInfo);
            toast.success("Sample menu loaded successfully! 🎉");
        } catch (error) {
            console.error("Error loading sample data:", error);
            toast.error("Failed to load sample data");
        }
    };
    const acceptOrder = async (orderId) => {
        const orderRef = doc(db, "orders", orderId);
        try { await updateDoc(orderRef, { status: "accepted" }); toast.success(`Order ${orderId.slice(-4)} accepted!`); }
        catch (e) { toast.error("Failed to accept order."); console.error(e); }
    };
    const serveOrder = async (orderId, tableId) => {
        const orderRef = doc(db, "orders", orderId);
        const tableRef = doc(db, "tables", tableId);
        try {
            await updateDoc(orderRef, { status: "served" });
            await updateDoc(tableRef, { status: "available" });
            toast.success(`Order for Table ${tableId} served!`);
        } catch (e) { toast.error("Failed to mark order as served."); console.error(e); }
    };
    const rejectOrder = async (orderId, tableId) => {
        const isConfirmed = window.confirm(`Are you sure you want to reject this order for Table ${tableId}? This action cannot be undone.`);
        if (!isConfirmed) { return; }
        const orderRef = doc(db, "orders", orderId);
        const tableRef = doc(db, "tables", tableId);
        try {
            await updateDoc(orderRef, { status: "rejected" });
            await updateDoc(tableRef, { status: "available" });
            toast.error(`Order for Table ${tableId} rejected.`);
        } catch (e) { toast.error("Failed to reject order."); console.error(e); }
    };

    const renderLandingPage = () => (
        <div className="min-h-screen animated-gradient-bg particles-bg flex items-center justify-center p-4">
            <div className="text-center">
                {/* Logo Icon */}
                <div className="inline-flex items-center justify-center mb-6">
                    <img src="/qr-menu-logo.png" alt="QR Menu" className="w-24 h-24 rounded-3xl shadow-2xl bg-white p-2" />
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">
                    Welcome to <span className="text-yellow-300">QR Menu</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-white/80 mb-2 font-light">
                    Powered by <span className="font-semibold text-white">Quintex Digital Solutions</span>
                </p>
                <p className="text-2xl md:text-3xl text-white mb-10 font-medium">
                    The Future of Restaurant Menus
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => setCurrentView("panel")}
                        className="group relative bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                        <span className="text-xl">🎛️</span>
                        Management Panel
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                    {currentUser && (
                        <button
                            onClick={logout}
                            className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-purple-800 transition-all duration-300 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" x2="9" y1="12" y2="12" />
                            </svg>
                            Logout
                        </button>
                    )}
                </div>

                {/* Stats badges */}
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/90 text-sm font-medium">
                        ✅ {menuItems.length} Menu Items
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/90 text-sm font-medium">
                        📁 {categories.length} Categories
                    </div>
                    {liveOrders.length > 0 && (
                        <div className="bg-red-500/80 backdrop-blur-sm rounded-full px-6 py-3 text-white text-sm font-medium animate-pulse">
                            🔔 {liveOrders.length} Live Orders
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderInternalPreview = () => (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <button
                        onClick={() => setCurrentView("panel")}
                        className="text-purple-600 hover:text-purple-800 font-medium self-start md:self-center flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to Panel
                    </button>
                    <div className="text-center flex-1 w-full md:w-auto">
                        <h1 className="text-xl font-bold text-gray-800">{selectedRestaurant?.name || "Restaurant Menu"}</h1>
                        {selectedRestaurant?.description && (<p className="text-sm text-gray-600">{selectedRestaurant.description}</p>)}
                    </div>
                    <div className="hidden md:block" style={{ width: 120 }} />
                </div>
            </div>
            <div className="max-w-2xl mx-auto px-4 py-6">
                {categories.map(category => {
                    const categoryItems = menuItems.filter(item => (item.category || "Uncategorized") === category);
                    if (categoryItems.length === 0) return null;
                    return (
                        <div key={category} className="mb-8 fade-in">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 px-4">{category}</h2>
                            <div className="space-y-4">
                                {categoryItems.map(item => (
                                    <div key={item.id} className="admin-card">
                                        <div className="flex gap-4">
                                            {item.imageUrl && (
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-20 h-20 rounded-xl object-cover cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
                                                    onClick={() => setViewingImage(item.imageUrl)}
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                                                    <div className="text-xl font-bold text-purple-600">₹{item.price}</div>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                                    {item.isVeg ? (
                                                        <span className="badge badge-veg">🟢 Veg</span>
                                                    ) : (
                                                        <span className="badge badge-nonveg">🔴 Non-veg</span>
                                                    )}
                                                    {item.popular && <span className="badge badge-popular">⭐ Popular</span>}
                                                    {item.chefSpecial && <span className="badge badge-chef">👨‍🍳 Chef's Special</span>}
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderContent = () => {
        const panelProps = {
            setCurrentView, liveOrders, handleSave, selectedRestaurant, setSelectedRestaurant: (val) => setSelectedRestaurant(val), editingRestaurant, setEditingRestaurant,
            updateRestaurant, newCategoryInput, setNewCategoryInput, categories, setCategories, menuItems,
            setMenuItems, handleOnDragEnd, setEditingItem, viewingImage, setViewingImage, deleteMenuItem,
            qrTableNumber, setQrTableNumber, generateCustomerMenuUrl, QRCodeComponent, downloadQRCode, currentUser,
            loadSampleData
        };
        switch (currentView) {
            case 'landing': return renderLandingPage();
            case 'panel': return <ManagementPanel {...panelProps} />;
            case 'orders': return <LiveOrders liveOrders={liveOrders} setCurrentView={setCurrentView} acceptOrder={acceptOrder} rejectOrder={rejectOrder} serveOrder={serveOrder} />;
            case 'menu': return renderInternalPreview();
            default: return renderLandingPage();
        }
    };

    return (
        <div>
            <Toaster position="bottom-center" />
            {editingItem && <MenuItemForm item={editingItem} onSave={editingItem.id ? updateMenuItem : addMenuItem} onCancel={() => setEditingItem(null)} categories={categories} />}
            {viewingImage && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 fade-in">
                    <div className="relative max-w-4xl max-h-[90vh] w-full">
                        <button
                            onClick={() => setViewingImage(null)}
                            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/20 transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img src={viewingImage} alt="Full size view" className="w-full h-full object-contain rounded-2xl shadow-2xl" />
                    </div>
                </div>
            )}
            {renderContent()}
        </div>
    );
};

export default ScanToSeeMenuApp;