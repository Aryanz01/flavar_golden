import { ShoppingCart, Sparkles } from "lucide-react";
import React from "react";

interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  serves: number;
  image: string;
  isVeg: boolean;
  description: string;
  modelSrc: string;
  iosSrc: string;
  quantity: number;
  onQuantityChange: (delta: number) => void;
  onAdd: () => void;
  onViewAR: () => void;
}

const VegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="#A09460" /> */}
    <circle cx="6" cy="6" r="3" fill="#117C3F" />
  </svg>
);

const NonVegIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="#000000" stroke="#A09460" /> */}
    <path d="M5.35048 2.625C5.70392 2.0625 6.54608 2.0625 6.89952 2.625L10.0726 8.25C10.4261 8.8125 10.0425 9.5 9.42306 9.5H2.82694C2.20745 9.5 1.82391 8.8125 2.17735 8.25L5.35048 2.625Z" fill="#9A0101" />
  </svg>
);


export function FoodCard({
  name,
  price,
  serves,
  image,
  isVeg,
  quantity,
  onQuantityChange,
  onAdd,
  onViewAR,
}: Omit<FoodCardProps, 'id' | 'modelSrc' | 'iosSrc' | 'description'>) {
  // Get a pseudo-random value based on the dish name to determine if it's recommended
  const isRecommended = name.charCodeAt(0) % 5 === 0;
  
  return (
    <div className="premium-card p-5 mb-4">
      <div className="flex justify-between gap-2">
        <div className="space-y-4 flex-1">
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
              {isVeg ? (
                <div className="flex items-center text-xs font-medium">
                  <VegIcon />
                  <span className="gold-gradient-text ml-1">Veg</span>
                </div>
              ) : (
                <div className="flex items-center text-xs font-medium">
                  <NonVegIcon />
                  <span className="gold-gradient-text ml-1">Non-Veg</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold gold-gradient-text text-lg font-playfair block mb-1">{name}</h3><br />
            <p className="font-medium gold-gradient-text block mb-1">₹{price}</p>
            <p className="text-xs text-gray-400">Serves {serves}</p>
          </div>
          
          <div>
            {quantity > 0 ? (
              <div>
                  <div className="flex items-center px-3 py-2 rounded-[10px] font-semibold text-sm w-fit bg-[#000000] shadow-[0_0_10px_rgba(160,148,96,0.1)] gold-gradient-border-quantity" style={{borderWidth: '1px'}}>
                    <button 
                      className="font-bold px-2 hover:scale-110 transition-transform" 
                      onClick={() => onQuantityChange(-1)}
                      style={{color: '#A09460'}}
                    >
                      -
                    </button>
                    <span className="gold-gradient-text font-semibold px-3">{quantity}</span>
                    <button 
                      className="font-bold px-2 hover:scale-110 transition-transform" 
                      onClick={() => onQuantityChange(1)}
                      style={{color: '#A09460'}}
                    >
                      +
                    </button>
                  </div>
                
              </div>
            ) : (
              <button
                onClick={onAdd}
                className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-[10px] font-semibold bg-[#000000] hover:bg-[#0a0a0a] hover:shadow-[0_0_15px_rgba(160,148,96,0.2)] transition-all duration-200 gold-gradient-border-quantity"
                style={{borderWidth: '1px'}}
              >
                <span className="gold-gradient-text">ADD</span>
                <ShoppingCart className="w-4 h-4" style={{stroke: '#A09460'}} />
              </button>
            )}
          </div>
        </div>

        <div className="relative w-[174px] h-[146px] flex-shrink-0">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover rounded-[10px] shadow-md"
          />
          <div className="absolute bottom-[-12px] right-0 left-0 flex justify-center">
            <button
              className="luxury-button text-xs px-3 py-1 rounded-[10px] transform transition-all duration-200 hover:scale-105 ar-view-button"
              onClick={onViewAR}
              style={{
                borderRadius: '10px',
              }}
            >
              View in AR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

<style jsx>{`
  .ar-view-button {
    min-width: 80px;
    max-width: 104px;
    width: 100%;
    min-height: 28px;
    max-height: 35px;
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;
    font-size: 0.95em;
  }
  
  /* Responsive food card styles */
  .premium-card {
    width: 100%;
    transition: all 0.3s ease;
  }
  
  /* Custom media queries for responsive design */
  @media (max-width: 768px) {
    .premium-card {
      padding: 16px;
    }
    
    .premium-card .space-y-5 > div {
      margin-top: 16px;
      margin-bottom: 16px;
    }
    
    .premium-card h3 {
      font-size: 1.05rem;
    }
    
    .premium-card .relative {
      width: 140px;
      height: 105px;
    }
    
    .ar-view-button {
      min-width: 70px;
      max-width: 90px;
      min-height: 26px;
      max-height: 32px;
      font-size: 0.9em;
    }
  }
  
  @media (max-width: 480px) {
    .premium-card {
      padding: 12px;
    }
    
    .premium-card .space-y-5 > div {
      margin-top: 12px;
      margin-bottom: 12px;
    }
    
    .premium-card h3 {
      font-size: 1.05rem;
    }
    
    .premium-card .relative {
      width: 100px;
      height: 75px;
    }
    
    .premium-card .flex.items-center.px-3 {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      font-size: 0.75rem;
    }
    
    .premium-card .flex.items-center.px-3 button {
      padding-left: 0.25rem;
      padding-right: 0.25rem;
    }
    
    .premium-card .flex.items-center.px-3 span {
      padding-left: 0.375rem;
      padding-right: 0.375rem;
    }
    
    .premium-card button.flex.items-center.justify-center {
      gap: 0.25rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      font-size: 0.75rem;
    }
    
    .premium-card button.flex.items-center.justify-center svg {
      width: 0.75rem;
      height: 0.75rem;
    }
    
    .ar-view-button {
      min-width: 60px;
      max-width: 80px;
      min-height: 24px;
      max-height: 30px;
      font-size: 0.75em;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 0.125rem;
      padding-bottom: 0.125rem;
    }
  }
  
  @media (max-width: 1440px) {
    .premium-card {
      min-height: calc((100vh - 220px) / 3); /* 220px is an estimate for header, filter chips, and padding */
      max-height: calc((100vh - 220px) / 3);
    }
    .premium-card .relative {
      width: 110px;
      height: 82px;
    }
    .premium-card h3 {
      font-size: 0.85rem;
    }
  }
  
  @media (max-width: 1440px) and (min-height: 2960px) {
    .premium-card {
      min-height: calc((100vh - 160px) / 3); /* 160px is an estimate for header, filter chips, and padding */
      max-height: calc((100vh - 160px) / 3);
    }
  }
  
  @media (min-width: 1024px) {
    .premium-card {
      min-height: calc((100vh - 220px) / 3);
      max-height: calc((100vh - 220px) / 3);
      padding: 40px;
    }
    .premium-card h3 {
      font-size: 1.8rem;
    }
    .premium-card .relative {
      width: 260px;
      height: 200px;
    }
    .premium-card .flex.items-center.px-3 {
      font-size: 1.3rem;
      padding: 1.2rem 2.2rem;
    }
    .premium-card button.flex.items-center.justify-center {
      font-size: 1.2rem;
      padding: 1.1rem 2.2rem;
    }
    .premium-card button.flex.items-center.justify-center svg {
      width: 1.5rem;
      height: 1.5rem;
    }
    .ar-view-button {
      min-width: 120px;
      max-width: 160px;
      min-height: 40px;
      max-height: 60px;
      font-size: 1.2em;
      padding: 0.8rem 1.5rem;
    }
  }
  
  @media (max-width: 600px) {
    .premium-card {
      padding: 22px;
      min-height: calc((100vh - 170px) / 3);
      max-height: calc((100vh - 170px) / 3);
    }
    .premium-card h3 {
      font-size: 1.1rem;
    }
    .premium-card p.font-medium {
      font-size: 1.25rem;
    }
    .premium-card p.text-xs {
      font-size: 1.1rem;
    }
    .premium-card .relative {
      width: 150px;
      height: 120px;
    }
    .premium-card .flex.items-center.px-3 {
      font-size: 1.15rem;
      padding: 1rem 1.5rem;
    }
    .premium-card button.flex.items-center.justify-center {
      font-size: 1.15rem;
      padding: 1rem 1.5rem;
    }
    .premium-card button.flex.items-center.justify-center svg {
      width: 1.3rem;
      height: 1.3rem;
    }
    .ar-view-button {
      min-width: 90px;
      max-width: 120px;
      min-height: 36px;
      max-height: 48px;
      font-size: 1.15em;
      padding: 0.7rem 1.2rem;
    }
  }
  
  @media (max-width: 430px) and (min-height: 900px) {
    /* Samsung Galaxy S20 Ultra and similar tall phones */
    .premium-card {
      min-height: calc((100vh - 170px) / 3);
      max-height: calc((100vh - 170px) / 3);
      padding: 26px;
    }
    .premium-card h3 {
      font-size: 1.3rem;
    }
    .premium-card p.font-medium {
      font-size: 1.3rem;
    }
    .premium-card p.text-xs {
      font-size: 1.15rem;
    }
    .premium-card .relative {
      width: 170px;
      height: 135px;
    }
    .premium-card .flex.items-center.px-3 {
      font-size: 1.25rem;
      padding: 1.2rem 1.7rem;
    }
    .premium-card button.flex.items-center.justify-center {
      font-size: 1.25rem;
      padding: 1.2rem 1.7rem;
    }
    .premium-card button.flex.items-center.justify-center svg {
      width: 1.4rem;
      height: 1.4rem;
    }
    .ar-view-button {
      min-width: 110px;
      max-width: 140px;
      min-height: 44px;
      max-height: 56px;
      font-size: 1.25em;
      padding: 0.9rem 1.4rem;
    }
  }

  .premium-card h3 {
    font-size: clamp(0.85rem, 2.5vw, 1.2rem);
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 100%;
    display: block;
  }
`}</style>