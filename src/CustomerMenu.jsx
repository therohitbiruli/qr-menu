import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';

import { Menu, Search, Filter, X } from './Icons';

// Sample menu data for demo/testing
const SAMPLE_MENU = {
    restaurantInfo: {
        name: "Demo Restaurant",
        description: "Welcome to our demo menu! This is sample data for testing purposes."
    },
    categories: ["Appetizers", "Main Course", "Breads", "Beverages", "Desserts"],
    items: [
        {
            id: 1,
            name: "Paneer Tikka",
            category: "Appetizers",
            price: 249,
            description: "Soft cottage cheese cubes marinated in spices and grilled to perfection",
            imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400",
            isVeg: true,
            popular: true,
            chefSpecial: false
        },
        {
            id: 2,
            name: "Chicken 65",
            category: "Appetizers",
            price: 299,
            description: "Spicy deep-fried chicken with curry leaves and peppers",
            imageUrl: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400",
            isVeg: false,
            popular: true,
            chefSpecial: false
        },
        {
            id: 3,
            name: "Butter Chicken",
            category: "Main Course",
            price: 349,
            description: "Tender chicken in rich tomato-based creamy gravy with butter",
            imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
            isVeg: false,
            popular: true,
            chefSpecial: true
        },
        {
            id: 4,
            name: "Paneer Butter Masala",
            category: "Main Course",
            price: 299,
            description: "Cottage cheese cubes in smooth tomato and cashew gravy",
            imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
            isVeg: true,
            popular: true,
            chefSpecial: false
        },
        {
            id: 5,
            name: "Dal Makhani",
            category: "Main Course",
            price: 249,
            description: "Slow-cooked black lentils with butter and cream",
            imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
            isVeg: true,
            popular: false,
            chefSpecial: true
        },
        {
            id: 6,
            name: "Biryani",
            category: "Main Course",
            price: 329,
            description: "Fragrant basmati rice cooked with aromatic spices and herbs",
            imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
            isVeg: false,
            popular: true,
            chefSpecial: true
        },
        {
            id: 7,
            name: "Butter Naan",
            category: "Breads",
            price: 49,
            description: "Soft leavened bread brushed with butter",
            imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
            isVeg: true,
            popular: true,
            chefSpecial: false
        },
        {
            id: 8,
            name: "Garlic Naan",
            category: "Breads",
            price: 59,
            description: "Butter naan topped with fresh garlic and coriander",
            imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
            isVeg: true,
            popular: false,
            chefSpecial: false
        },
        {
            id: 9,
            name: "Masala Chai",
            category: "Beverages",
            price: 39,
            description: "Traditional Indian spiced tea with milk",
            imageUrl: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=400",
            isVeg: true,
            popular: true,
            chefSpecial: false
        },
        {
            id: 10,
            name: "Mango Lassi",
            category: "Beverages",
            price: 89,
            description: "Creamy yogurt drink blended with fresh mango",
            imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400",
            isVeg: true,
            popular: true,
            chefSpecial: false
        },
        {
            id: 11,
            name: "Gulab Jamun",
            category: "Desserts",
            price: 99,
            description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
            imageUrl: "https://images.unsplash.com/photo-1666190077771-f47d6f95f523?w=400",
            isVeg: true,
            popular: true,
            chefSpecial: false
        },
        {
            id: 12,
            name: "Rasmalai",
            category: "Desserts",
            price: 129,
            description: "Soft cottage cheese patties in sweetened, thickened milk",
            imageUrl: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400",
            isVeg: true,
            popular: false,
            chefSpecial: true
        }
    ]
};

const CustomerMenu = () => {
    const { theme, toggleTheme } = useTheme();
    const [menuItems, setMenuItems] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [viewingImage, setViewingImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [tableId, setTableId] = useState(null);
    const [order, setOrder] = useState([]);
    const [tableStatus, setTableStatus] = useState("available");
    const [isLoading, setIsLoading] = useState(true);
    const [isDemo, setIsDemo] = useState(false);
    const { restaurantId } = useParams();

    useEffect(() => {
        const hashParts = window.location.hash.split('?');
        const params = new URLSearchParams(hashParts.length > 1 ? hashParts[1] : "");
        const tableNum = params.get("table");
        setTableId(tableNum);

        const loadData = async () => {
            setIsLoading(true);

            // If no restaurantId or it's "demo", show sample data
            if (!restaurantId || restaurantId === "demo") {
                setMenuItems(SAMPLE_MENU.items);
                setCategories(SAMPLE_MENU.categories);
                setSelectedRestaurant(SAMPLE_MENU.restaurantInfo);
                setIsDemo(true);
                setIsLoading(false);
                return;
            }

            try {
                const menuDocRef = doc(db, "menus", restaurantId);
                const menuDocSnap = await getDoc(menuDocRef);

                if (menuDocSnap.exists()) {
                    const data = menuDocSnap.data();
                    const items = data.items || [];

                    // If no items in the database, show sample data
                    if (items.length === 0) {
                        setMenuItems(SAMPLE_MENU.items);
                        setCategories(SAMPLE_MENU.categories);
                        setSelectedRestaurant({
                            name: data.restaurantInfo?.name || "Demo Restaurant",
                            description: data.restaurantInfo?.description || "Sample menu - Add items from admin panel"
                        });
                        setIsDemo(true);
                    } else {
                        setMenuItems(items);
                        if (data.categories && data.categories.length > 0) {
                            setCategories(data.categories);
                        } else {
                            const defaultCategories = [...new Set(items.map(item => item.category || "Uncategorized"))];
                            setCategories(defaultCategories);
                        }
                        if (data.restaurantInfo) {
                            setSelectedRestaurant(data.restaurantInfo);
                        }
                        setIsDemo(false);
                    }
                } else {
                    // No menu found, show sample data
                    setMenuItems(SAMPLE_MENU.items);
                    setCategories(SAMPLE_MENU.categories);
                    setSelectedRestaurant({
                        ...SAMPLE_MENU.restaurantInfo,
                        name: "Demo Restaurant",
                        description: "Menu not found - showing sample data"
                    });
                    setIsDemo(true);
                }
            } catch (error) {
                console.error("Error loading menu:", error);
                // On error, show sample data
                setMenuItems(SAMPLE_MENU.items);
                setCategories(SAMPLE_MENU.categories);
                setSelectedRestaurant(SAMPLE_MENU.restaurantInfo);
                setIsDemo(true);
            }

            setIsLoading(false);
        };

        const checkTableStatus = async () => {
            if (tableNum) {
                try {
                    const tableDocRef = doc(db, "tables", tableNum);
                    const tableDocSnap = await getDoc(tableDocRef);
                    if (tableDocSnap.exists() && tableDocSnap.data().status === 'ordering') {
                        setTableStatus('ordering');
                    } else {
                        setTableStatus('available');
                    }
                } catch (error) {
                    console.error("Error checking table status:", error);
                }
            }
        };

        loadData();
        checkTableStatus();
    }, [restaurantId]);

    const availableFilters = ["Vegetarian", "Non-Vegetarian", "Popular", "Chef Special"];

    const getFilteredItems = () => {
        let filtered = menuItems;
        if (searchQuery) { filtered = filtered.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.description || "").toLowerCase().includes(searchQuery.toLowerCase()) || (item.category || "").toLowerCase().includes(searchQuery.toLowerCase())); }
        if (activeFilters.length > 0) {
            filtered = filtered.filter(item => {
                return activeFilters.every(filter => {
                    switch (filter) {
                        case "Vegetarian": return item.isVeg;
                        case "Non-Vegetarian": return !item.isVeg;
                        case "Popular": return item.popular;
                        case "Chef Special": return item.chefSpecial;
                        default: return true;
                    }
                });
            });
        }
        return filtered;
    };

    const toggleFilter = (filter) => {
        setActiveFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
    };
    const getItemQuantity = (itemId) => {
        const item = order.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    };

    const updateQuantity = (item, delta) => {
        if (tableStatus === 'ordering') return;

        setOrder(prevOrder => {
            const existingItem = prevOrder.find(i => i.id === item.id);
            if (existingItem) {
                const newQuantity = existingItem.quantity + delta;
                if (newQuantity <= 0) {
                    return prevOrder.filter(i => i.id !== item.id);
                }
                return prevOrder.map(i => i.id === item.id ? { ...i, quantity: newQuantity } : i);
            } else {
                if (delta > 0) {
                    if (isDemo) toast.success(`${item.name} added!`);
                    return [...prevOrder, { ...item, quantity: 1 }];
                }
                return prevOrder;
            }
        });
    };

    const placeOrder = async () => {
        if (order.length === 0) { toast.error("Your order is empty!"); return; }

        if (isDemo) {
            toast.success("Demo order placed! In production, this would be sent to the kitchen.");
            setOrder([]);
            return;
        }

        if (!tableId) { toast.error("Table number not found. Please scan the QR code again."); return; }
        const orderId = `table-${tableId}-${Date.now()}`;
        try {
            await setDoc(doc(db, "orders", orderId), {
                tableId: tableId,
                items: order,
                status: "new",
                createdAt: new Date(),
                restaurantId: restaurantId,
                totalAmount: order.reduce((total, item) => total + (item.price * item.quantity), 0)
            });
            await setDoc(doc(db, "tables", tableId), { status: "ordering", lastOrderId: orderId });
            setTableStatus("ordering");
            setOrder([]);
            toast.success("Order placed successfully!");
        } catch (e) { console.error("Error placing order: ", e); toast.error("Could not place order. Please try again."); }
    };

    const filteredItems = getFilteredItems();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading menu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Toaster position="bottom-center" />

            {/* Demo Banner */}
            {isDemo && (
                <div className="bg-yellow-400 text-yellow-900 text-center py-2 text-sm font-medium">
                    🎯 Demo Mode - Sample menu for testing
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-200">
                <div className="max-w-2xl mx-auto px-4 py-4 relative">
                    {/* Back to Home Link */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <a href="/" className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white flex items-center gap-1">
                            <span>←</span> <span className="hidden sm:inline">Home</span>
                        </a>
                    </div>
                    {/* Theme Toggle */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{selectedRestaurant?.name || "Restaurant Menu"}</h1>
                        {selectedRestaurant?.description && (<p className="text-sm text-gray-600 dark:text-gray-300">{selectedRestaurant.description}</p>)}
                    </div>
                </div>
            </div>
            <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
                {selectedRestaurant?.allowOrdering === false && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r shadow-sm animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center gap-3">
                            <div className="text-red-500">🚫</div>
                            <div>
                                <p className="font-bold text-red-800">Ordering Disabled</p>
                                <p className="text-sm text-red-700">Ordering is currently disabled. You can only view the menu.</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border dark:border-gray-700 mb-6 transition-colors duration-200">
                    <div className="relative mb-4"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="text" placeholder="Search menu items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition-colors" /></div>
                    <div className="flex items-center gap-2 mb-3"><button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"><Filter className="w-4 h-4" /> Filters {activeFilters.length > 0 && (<span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{activeFilters.length}</span>)}</button>{activeFilters.length > 0 && (<button onClick={() => setActiveFilters([])} className="text-sm text-gray-600 hover:text-gray-800">Clear all</button>)}</div>
                    {showFilters && (<div className="grid grid-cols-2 gap-2">{availableFilters.map(filter => (<button key={filter} onClick={() => toggleFilter(filter)} className={`px-3 py-2 text-sm rounded-lg border transition-colors ${activeFilters.includes(filter) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>{filter}</button>))}</div>)}
                </div>
                {filteredItems.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <Menu className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-lg font-medium mb-2">No menu items found</p>
                        <p className="text-sm">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    categories.map(category => {
                        const categoryItems = filteredItems.filter(item => (item.category || "Uncategorized") === category);
                        if (categoryItems.length === 0) return null;
                        return (
                            <div key={category} className="mb-8">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 px-4">{category}</h2>
                                <div className="space-y-4">
                                    {categoryItems.map(item => {
                                        const qty = getItemQuantity(item.id);
                                        return (
                                            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border dark:border-gray-700 transition-colors duration-200">
                                                <div className="flex gap-4">
                                                    {item.imageUrl && (
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            className="w-20 h-20 rounded-lg object-cover cursor-pointer flex-shrink-0"
                                                            onClick={() => setViewingImage(item.imageUrl)}
                                                        />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h3 className="font-semibold text-gray-800 dark:text-white text-lg">{item.name}</h3>
                                                            <div className="text-xl font-bold text-gray-800 dark:text-white">₹{item.price}</div>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                                            {item.isVeg ? <span className="text-green-600 text-sm">🟢</span> : <span className="text-red-600 text-sm">🔴</span>}
                                                            {item.popular && <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">⭐ Popular</span>}
                                                            {item.chefSpecial && <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">👨‍🍳 Chef's Special</span>}
                                                        </div>
                                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                                                        <div className="mt-3">
                                                            {selectedRestaurant?.allowOrdering !== false && (
                                                                qty > 0 ? (
                                                                    <div className="flex items-center gap-3">
                                                                        <button
                                                                            onClick={() => updateQuantity(item, -1)}
                                                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <span className="font-bold text-gray-800 w-6 text-center">{qty}</span>
                                                                        <button
                                                                            onClick={() => updateQuantity(item, 1)}
                                                                            className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-lg text-white font-bold hover:bg-purple-700 transition-colors"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => updateQuantity(item, 1)}
                                                                        disabled={tableStatus === 'ordering'}
                                                                        className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                                                    >
                                                                        Add to Order
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                )}
                <div className="text-center py-8 border-t mt-8">
                    <p className="text-sm text-gray-500">Powered by <span className="font-semibold">QR Menu</span> - Quintex Digital Solutions</p>
                    <a href="/" className="text-xs text-blue-500 hover:underline mt-2 block">Back to Home</a>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50/70 backdrop-blur-sm border-t">
                {selectedRestaurant?.allowOrdering !== false && (
                    tableStatus === 'ordering' ? (<div className="bg-yellow-100 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-lg text-center"><p className="font-bold">Your order is being prepared.</p><p className="text-sm">You can place a new order after this one has been served.</p></div>) : order.length > 0 ? (<div className="bg-white p-4 rounded-xl shadow-lg border flex items-center justify-between"><div><p className="font-bold text-lg">{order.reduce((acc, item) => acc + item.quantity, 0)} items in your order</p><p className="text-sm text-gray-600">Total: ₹{order.reduce((total, item) => total + (item.price * item.quantity), 0)}</p></div><button onClick={placeOrder} className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700">Place Order</button></div>) : null
                )}
            </div>
            {viewingImage && (<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"><button onClick={() => setViewingImage(null)} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"><X className="w-8 h-8" /></button><img src={viewingImage} alt="Full size view" className="w-full h-full object-contain rounded-lg" /></div>)}
        </div>
    );
};
export default CustomerMenu;