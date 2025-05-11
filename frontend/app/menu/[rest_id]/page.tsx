"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { FilterChips } from "@/components/filter-chips"
import { FoodCard } from "@/components/food-card"
import { ARScreen } from "@/components/ar-screen"
import { MenuPopup } from "@/components/menu-popup"
import { CartBar } from "@/components/cart-bar"
import { CartScreen } from "@/components/cart-screen"
import React from "react"
import { MenuButton } from "@/components/menu-button"

interface FoodItem {
  _id: string
  name: string
  price: number
  serves: number
  isVeg: boolean
  description: string
  image: string
  glb_url: string
  usdz_url: string
  category1?: string
  category2?: string
  category3?: string
  availability: boolean
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  serves: number;
  isVeg: boolean;
  image: string;
}

// Add mock dishes for restaurant 3
const mockDishes = {
  "3": [
    {
      _id: "dish14",
      name: "Tandoori Chaap",
      price: 11.99,
      serves: 1,
      isVeg: true,
      description: "Soya chunks marinated in spices and grilled in a tandoor for smoky flavor",
      image: "/images/tandoori-chaap.png",
      glb_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/tandoori_chaap.glb",
      usdz_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/tandoori_chaap.usdz",
      category1: "Curry",
      availability: true
    },
    {
      _id: "dish20",
      name: "Chicken Bao Tacos",
      price: 15.99,
      serves: 1,
      isVeg: false,
      description: "Fusion bao tacos filled with crispy chicken, fresh vegetables, and Asian-inspired sauce",
      image: "/images/chicken bao.png",
      glb_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/11-03-2024-06-53-32_Chrispy_Chicken_Bao.glb",
      usdz_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/11-03-2024-06-53-32_Chrispy_Chicken_Bao.usdz",
      category1: "Appetizer",
      availability: true
    },
    {
      _id: "dish10",
      name: "Paneer Tikka",
      price: 10.99,
      serves: 1,
      isVeg: true,
      description: "Cubes of cottage cheese marinated and grilled to perfection",
      image: "/images/paneer-tikka.png",
      glb_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/15-04-2024-04-33-38_Paneer_65.glb",
      usdz_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/15-04-2024-04-33-38_Paneer_65.usdz",
      category1: "Appetizer",
      availability: true
    },
    {
      _id: "dish8",
      name: "Pizza",
      price: 12.99,
      serves: 2,
      isVeg: false,
      description: "Spicy Indo-Chinese style mushrooms in a delicious manchurian sauce",
      image: "/images/pizza.png",
      glb_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/pizza (1).glb",
      usdz_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/pizza (1).usdz",
      category1: "Indo-Chinese",
      availability: true
    },
    
    {
      _id: "dish15",
      name: "Veg Seekh Kabab",
      price: 3.99,
      serves: 1,
      isVeg: true,
      description: "Minced vegetable skewers grilled to perfection with aromatic spices",
      image: "/images/veg-seekh-kabab.png",
      glb_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/veg_sikh_kabab.glb",
      usdz_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/veg_sikh_kabab.usdz",
      category1: "Appetizer",
      availability: true
    },
    
    {
      _id: "dish8",
      name: "Mushroom Chilli",
      price: 12.99,
      serves: 2,
      isVeg: true,
      description: "Spicy Indo-Chinese style mushrooms in a delicious manchurian sauce",
      image: "/images/mushroom-manchurian.webp",
      glb_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/15-04-2024-04-29-13_Mushroom_Chilli.glb",
      usdz_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/usdz/15-04-2024-04-29-13_Mushroom_Chilli.usdz",
      category1: "Indo-Chinese",
      availability: true
    },
   
    
    {
      _id: "dish12",
      name: "Filling Cheese Dumpling",
      price: 6.99,
      serves: 2,
      isVeg: true,
      description: "Crispy pastry filled with spiced potatoes and peas",
      image: "/images/filling-cheese-dumpling.png",
      glb_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/15-04-2024-10-53-07_Filling_cheese_momo.glb",
      usdz_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/usdz/15-04-2024-10-53-07_Filling_cheese_momo.usdz",
      category1: "Appetizer",
      availability: true
    },
    {
      _id: "dish16",
      name: "Chicken Biryani",
      price: 13.99,
      serves: 2,
      isVeg: false,
      description: "Fragrant basmati rice cooked with chicken and aromatic spices",
      image: "/images/veg-biryani.png",
      glb_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/vegbiryani.glb",
      usdz_url: "https://d29pu3it4iogfy.cloudfront.net/models/681062b5f708e210f3d0110e/vegbiryani.usdz",
      category1: "Appetizer",
      availability: true
    },
    // {
    //   _id: "dish7",
    //   name: "Butter Chicken",
    //   price: 14.99,
    //   serves: 2,
    //   isVeg: false,
    //   description: "Tender chicken pieces in a rich, creamy tomato sauce",
    //   image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
    //   glb_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/15-04-2024-04-40-11_Paneer_Paratha.glb",
    //   usdz_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/usdz/15-04-2024-04-40-11_Paneer_Paratha.usdz",
    //   category1: "Curry",
    //   availability: true
    // },
    
    // {
    //   _id: "dish23",
    //   name: "Hot Garlic Momos",
    //   price: 8.99,
    //   serves: 2,
    //   isVeg: true,
    //   description: "Steamed dumplings tossed in a spicy garlic sauce",
    //   image: "/images/placeholder.jpg",
    //   glb_url: "/models/hot_garlic_momos.glb",
    //   usdz_url: "/models/hot_garlic_momos.usdz",
    //   category1: "Indo-Chinese",
    //   availability: true
    // },
    
    
    {
      _id: "dish9",
      name: "Paneer Malai Tikka",
      price: 15.99,
      serves: 2,
      isVeg: true,
      description: "Cubes of cottage cheese in a creamy marinade",
      image: "/images/paneer-malai-tikka.png",
      glb_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/15-04-2024-04-38-00_Paneer_Malai_Tikka.glb",
      usdz_url: "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/usdz/15-04-2024-04-38-00_Paneer_Malai_Tikka.usdz",
      category1: "Curry",
      availability: true
    },
   
    // {
    //   _id: "dish11",
    //   name: "Lamb Rogan Josh",
    //   price: 16.99,
    //   serves: 2,
    //   isVeg: false,
    //   description: "Aromatic curry with tender pieces of lamb cooked in Kashmiri spices",
    //   image: "https://images.unsplash.com/photo-1545247181-516773cae754",
    //   glb_url: "",
    //   usdz_url: "",
    //   category1: "Curry",
    //   availability: true
    // },
    
   
  ]
};

export default function MenuPage({ params }: { params: { rest_id: string } }) {
  const { rest_id } = params
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [menuButtonPosition, setMenuButtonPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log(`Fetching menu for restaurant ${rest_id}`);
        
        // Use mock data for restaurant ID 3
        if (rest_id === "3") {
          setFoodItems(mockDishes["3"]);
          setLoading(false);
          return;
        }
        
        // Otherwise try the API
        const response = await fetch(`http://localhost:3005/menu/dishes/${rest_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch menu: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Menu data received:", data);
        
        if (!data.dishes || !Array.isArray(data.dishes)) {
          console.error("Invalid dishes data:", data);
          setError("Menu data format is invalid");
          return;
        }
        
        setFoodItems(data.dishes);
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [rest_id])

  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDish, setSelectedDish] = useState<FoodItem | null>(null)
  const [isAROpen, setIsAROpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<{ [key: string]: number }>({})

  const filteredItems = foodItems
    .filter((item) => {
      if (filter === "veg") return item.isVeg
      if (filter === "non-veg") return !item.isVeg
      return true
    })
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const cartItemsCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)

  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const newQty = (prev[itemId] || 0) + delta
      if (newQty <= 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [itemId]: removed, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: newQty }
    })
  }

  const cartItems: CartItem[] = foodItems
    .filter((item) => cart[item._id])
    .map((item) => ({
      id: item._id,
      name: item.name,
      price: typeof item.price === 'number' ? item.price : parseFloat(String(item.price)),
      serves: item.serves,
      isVeg: item.isVeg,
      image: item.image || '/placeholder.svg'
    }))

  if (loading) return <div className="text-center py-10">Loading menu...</div>
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>

  function groupDishesByCategory(foodItems: FoodItem[]) {
    const categoryMap: Record<string, FoodItem[]> = {};
  
    foodItems.forEach((item) => {
      // Add to category1
      if (item.category1) {
        if (!categoryMap[item.category1]) {
          categoryMap[item.category1] = [];
        }
        categoryMap[item.category1].push(item);
      }
  
      // Add to category2
      if (item.category2) {
        if (!categoryMap[item.category2]) {
          categoryMap[item.category2] = [];
        }
        categoryMap[item.category2].push(item);
      }
  
      // Add to category3
      if (item.category3) {
        if (!categoryMap[item.category3]) {
          categoryMap[item.category3] = [];
        }
        categoryMap[item.category3].push(item);
      }
    });
  
    // Convert the map to an array of category groups
    return Object.keys(categoryMap).map((category) => ({
      category,
      items: categoryMap[category],
    }));
  }

  // Create the categories needed for MenuPopup
  const categorizedDishes = groupDishesByCategory(foodItems);

  return (
    <main className="min-h-screen pb-20 bg-[#0a0a0a]">
      <Header onSearch={setSearchTerm} />
      <FilterChips activeFilter={filter} onFilterChange={setFilter} />

      <div className="p-4">
        {filteredItems.map((item) => (
          <FoodCard
            key={item._id}
            name={item.name}
            price={parseFloat(item.price.toString())}
            serves={item.serves}
            isVeg={item.isVeg}
            image={item.image}
            quantity={cart[item._id] || 0}
            onQuantityChange={(delta) => updateQuantity(item._id, delta)}
            onAdd={() => addToCart(item._id)}
            onViewAR={() => {
              setSelectedDish(item)
              setIsAROpen(true)
            }}
          />
        ))}
      </div>

      {/* Menu Button with automatic positioning */}
      <MenuButton 
        isOpen={isMenuOpen}
        onClick={(e) => {
          const button = e.currentTarget.getBoundingClientRect();
          setMenuButtonPosition({
            x: button.right,
            y: button.top + (button.height / 2)
          });
          setIsMenuOpen(true);
        }}
      />

      {selectedDish && (
        <ARScreen 
          isOpen={isAROpen} 
          onClose={() => setIsAROpen(false)} 
          dish={selectedDish} 
        />
      )}
      
      <MenuPopup 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        buttonPosition={menuButtonPosition}
        dishes={categorizedDishes}
      />

      {cartItemsCount > 0 && (
        <CartBar 
          itemCount={cartItemsCount} 
          onViewCart={() => setIsCartOpen(true)} 
        />
      )}

      <CartScreen
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        quantities={cart}
        onUpdateQuantity={(itemId, delta) => {
          updateQuantity(itemId, delta);
        }}
      />
    </main>
  )
}