"use client";
import React from "react";

interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterChips({ activeFilter, onFilterChange }: FilterChipsProps) {
  const filters = [
    { id: "veg", label: "Veg" },
    { id: "non-veg", label: "Non-Veg" },
    { id: "recommended", label: "Recommended" },
    { id: "indian", label: "Indian Cuisine" },
  ]; 
  return (
    <div className="filter-chips-bar flex gap-3 p-5 overflow-x-auto bg-[#0a0a0a] shadow-md gold-gradient-border-bottom">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200
          ${activeFilter === "all" 
            ? "gold-gradient-bg text-[#121212] shadow-[0_0_15px_rgba(160,148,96,0.3)]" 
            : "bg-[#000000] border gold-gradient-border-filter hover:shadow-[0_0_10px_rgba(160,148,96,0.2)]"}`}
        style={activeFilter !== "all" ? {borderWidth: '1px'} : {}}
      >
        {activeFilter !== "all" && (
          <span className="gold-gradient-text">All</span>
        )}
        {activeFilter === "all" && "All"}
      </button>
      
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200
            ${activeFilter === filter.id 
              ? "gold-gradient-bg text-[#121212] shadow-[0_0_15px_rgba(160,148,96,0.3)]" 
              : "bg-[#000000] border gold-gradient-border-filter hover:shadow-[0_0_10px_rgba(160,148,96,0.2)]"}`}
          style={activeFilter !== filter.id ? {borderWidth: '1px'} : {}}
        >
          {activeFilter !== filter.id && (
            <span className="gold-gradient-text">{filter.label}</span>
          )}
          {activeFilter === filter.id && filter.label}
        </button>
      ))}
      <style jsx>{`
        @media (max-width: 1440px) {
          .filter-chips-bar {
            padding: 8px 2px;
            gap: 6px;
          }
          .filter-chips-bar button {
            font-size: 0.8rem;
            padding: 0.4rem 0.9rem;
          }
        }
        @media (max-width: 600px) {
          .filter-chips-bar {
            padding: 16px 4px;
            gap: 12px;
          }
          .filter-chips-bar button {
            font-size: 1.15rem;
            padding: 0.9rem 1.5rem;
            border-radius: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default FilterChips