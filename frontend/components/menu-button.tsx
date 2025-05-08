import React from "react";
import { useCartVisibility } from "./cart-bar";

interface MenuButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
}

export function MenuButton({ onClick, isOpen }: MenuButtonProps) {
  const { isCartVisible } = useCartVisibility();

  if (isOpen) return null;

  return (
    <button
      className={`fixed w-[65px] h-[65px] right-6 gold-gradient-bg rounded-full flex flex-col items-center justify-center gap-1 shadow-lg z-40 transition-all duration-300 ease-in-out ${
        isCartVisible ? "bottom-24" : "bottom-6"
      }`}
      onClick={onClick}
    >
      <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 20.25V11.25C20 9.12825 20 8.06737 19.414 7.40925C18.828 6.75 17.886 6.75 16 6.75H4V20.25C4 22.3706 4 23.4315 4.586 24.0907C5.172 24.75 6.114 24.75 8 24.75H16C17.886 24.75 18.828 24.75 19.414 24.0907C20 23.4315 20 22.3706 20 20.25Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12.6874C12.7956 12.6874 13.5587 13.0627 14.1213 13.7309C14.6839 14.399 15 15.3051 15 16.2499M12 12.6874C11.2044 12.6874 10.4413 13.0627 9.87868 13.7309C9.31607 14.399 9 15.3051 9 16.2499M12 12.6874V11.4999M15 16.2499H16M15 16.2499H12H9M9 16.2499H8M8 21H16M4 6.74985L11.385 3.07568C13.034 2.25511 13.858 1.84423 14.515 2.05442C14.941 2.19036 15.3172 2.4897 15.585 2.90587C16 3.5495 16 4.61589 16 6.74985" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <rect width="10" height="13" transform="translate(7 10)" fill="#A09460"/>
      </svg>
      <span className="text-black text-xs font-medium">MENU</span>
    </button>
  );
} 