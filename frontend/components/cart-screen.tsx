import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { ShoppingBag } from "lucide-react";

interface CartScreenProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    id: string;
    name: string;
    price: number;
    serves: number;
    isVeg: boolean;
    image: string;
  }>;
  quantities: { [key: string]: number };
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export function CartScreen({
  isOpen,
  onClose,
  items,
  quantities,
  onUpdateQuantity,
}: CartScreenProps) {
  // Calculate total dynamically
  const total = items.reduce((sum, item) => sum + item.price * (quantities[item.id] || 0), 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * (quantities[item.id] || 0), 0);
  
  // Ref for cart container
  const cartRef = useRef<HTMLDivElement>(null);
  
  // Add body lock when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate footer height to add padding to scrollable content
  const footerHeight = items.length > 0 ? 165 : 0;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* Cart panel */}
      <div 
        ref={cartRef}
        className="fixed inset-x-0 bottom-0 bg-black z-[101] rounded-t-[10px] gold-gradient-border-cart-screen"
        style={{
          borderWidth: '1px 0 0 0',
          height: '90vh',
          maxHeight: '90vh',
        }}
      >
        {/* Header - fixed at top */}
        <div 
          className="p-5 border-b gold-gradient-border-cart-screen flex justify-between items-center bg-black" 
          style={{borderWidth: '0 0 1px 0'}}
        >
          <h2 className="gold-gradient-text font-semibold text-xl font-playfair">Your Order</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-[10px] hover:bg-[#0a0a0a] border transition-colors duration-200 gold-gradient-border-cart-screen" 
            style={{borderWidth: '1px'}}
          >
            <X className="w-5 h-5" style={{color: '#A09460'}} />
          </button>
        </div>

        {/* Scrollable content area with padding bottom for the footer */}
        <div 
          className="overflow-y-auto bg-black no-scrollbar" 
          style={{ 
            scrollbarWidth: 'none', 
            height: 'calc(90vh - 76px)',
            paddingBottom: `${footerHeight}px` 
          }}
        >
          {items.length > 0 ? (
            <div className="divide-y gold-gradient-border-cart-screen" style={{borderWidth: '0'}}>
              {items.map((item) => (
                <div key={item.id} className="p-5 flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden shadow-md">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium gold-gradient-text font-playfair">{item.name}</h3>
                      <p className="text-gray-400 text-sm">₹{item.price} × {quantities[item.id]}</p>
                      <p className="gold-gradient-text font-semibold">₹{(item.price * quantities[item.id]).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center rounded-[0px] overflow-hidden bg-[#0a0a0a] shadow-[0_0_10px_rgba(160,148,96,0.1)] gold-gradient-border-cart-screen" style={{borderWidth: '1px'}}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-3 py-2 font-bold hover:bg-[#121212] transition-colors duration-150"
                      style={{color: '#A09460'}}
                    >
                      -
                    </button>
                    <span className="px-3 py-2 gold-gradient-text font-semibold">{quantities[item.id]}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-3 py-2 font-bold hover:bg-[#121212] transition-colors duration-150"
                      style={{color: '#A09460'}}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-[#0a0a0a] rounded-[10px] flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(160,148,96,0.1)] gold-gradient-border-cart-screen" style={{borderWidth: '1px'}}>
                <ShoppingBag className="w-10 h-10" style={{color: '#A09460'}} />
              </div>
              <h3 className="gold-gradient-text font-semibold mb-2 font-playfair text-lg">Your cart is empty</h3>
              <p className="text-gray-400 text-sm">Add items to get started</p>
            </div>
          )}
        </div>

        {/* Fixed position footer with super high z-index - positioned higher */}
        {items.length > 0 && (
          <div 
            className="fixed left-0 right-0 border-t gold-gradient-border-cart-screen bg-black"
            style={{
              borderWidth: '1px 0 0 0',
              zIndex: 9999,
              maxWidth: '100%',
              width: '100%',
              bottom: '10vh' // Position it 10% from the bottom instead of at the bottom
            }}
          >
            <div className="p-5">
              <div className="space-y-4 mb-5">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gold-gradient-text font-semibold text-lg font-playfair">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full gold-gradient-bg text-[#121212] font-semibold py-3 rounded-[10px] transition-colors duration-200 shadow-[0_4px_20px_rgba(160,148,96,0.3)] hover:shadow-[0_4px_25px_rgba(160,148,96,0.4)]">
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}