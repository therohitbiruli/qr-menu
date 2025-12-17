// Run this file once to seed sample menu data to your Firebase
// Usage: Open browser console at http://localhost:5173 while logged in, and paste this code

import { db } from './firebase';
import { doc, setDoc } from "firebase/firestore";

// Sample menu data
const SAMPLE_MENU_DATA = {
    restaurantInfo: {
        name: "Demo Restaurant",
        description: "Authentic Indian cuisine with a modern twist"
    },
    categories: ["Appetizers", "Main Course", "Breads", "Beverages", "Desserts"],
    items: [
        {
            id: "item_1",
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
            id: "item_2",
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
            id: "item_3",
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
            id: "item_4",
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
            id: "item_5",
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
            id: "item_6",
            name: "Chicken Biryani",
            category: "Main Course",
            price: 329,
            description: "Fragrant basmati rice cooked with aromatic spices and tender chicken",
            imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
            isVeg: false,
            popular: true,
            chefSpecial: true
        },
        {
            id: "item_7",
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
            id: "item_8",
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
            id: "item_9",
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
            id: "item_10",
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
            id: "item_11",
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
            id: "item_12",
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

// Function to seed data to a specific user's menu
export async function seedMenuData(userId) {
    if (!userId) {
        console.error("User ID is required");
        return false;
    }

    try {
        const menuDocRef = doc(db, "menus", userId);
        await setDoc(menuDocRef, SAMPLE_MENU_DATA);
        console.log("✅ Sample menu data added successfully!");
        return true;
    } catch (error) {
        console.error("❌ Error adding sample menu:", error);
        return false;
    }
}

export { SAMPLE_MENU_DATA };
