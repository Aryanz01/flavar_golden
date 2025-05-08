"use client";

import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
  buttonPosition: { x: number; y: number };
  dishes: {
    category: string;
    items: {
      _id: string;
      name: string;
      price: string | number;
      serves: number;
      isVeg: boolean;
      description: string;
      image: string;
    }[];
  }[];
}

export function MenuPopup({ isOpen, onClose, buttonPosition, dishes }: MenuPopupProps) {
  const [popupPosition, setPopupPosition] = useState({ left: 0, bottom: 0 });
  const popupRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      let popupWidth = 240; // smaller width
      let popupHeight = 400; // fallback
      if (popupRef.current) {
        popupWidth = popupRef.current.offsetWidth;
        popupHeight = popupRef.current.offsetHeight;
      }
      
      // Position the menu below the button, aligned to the right
      let left = buttonPosition.x - popupWidth; // Align right edge with button
      let bottom = windowHeight - buttonPosition.y - 20; // Larger negative offset to position menu below button
      
      // Keep popup within horizontal bounds
      left = Math.max(10, Math.min(windowWidth - popupWidth - 40, left));
      // Keep popup within vertical bounds
      bottom = Math.max(10, Math.min(windowHeight - popupHeight - 1, bottom));
      
      setPopupPosition({ left, bottom });
    }
  }, [isOpen, buttonPosition]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/0" onClick={onClose}>
      <div 
        ref={popupRef}
        className="absolute bg-black rounded-[10px] shadow-xl w-[240px] max-h-[80vh] overflow-auto gold-gradient-border-menu-popup"
        style={{
          left: popupPosition.left,
          bottom: popupPosition.bottom,
          borderWidth: '1px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b gold-gradient-border-popup" style={{borderWidth: '0 0 1px 0'}}>
          <h3 className="text-xl font-bold font-playfair gold-gradient-text">Menu</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-[10px] hover:bg-[#0a0a0a]"
            style={{color: '#A09460'}}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="divide-y gold-gradient-border-popup" style={{borderWidth: '0'}}>
          {dishes.map((category) => (
            <div key={category.category} className="p-3">
              <h4 className="gold-gradient-text font-semibold text-base mb-2">{category.category}</h4>
              <ul className="space-y-1 text-sm">
                {category.items.map((item) => (
                  <li key={item._id} className="hover:bg-[#0a0a0a] px-2 py-1 rounded-md transition-colors duration-200 text-white">
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}