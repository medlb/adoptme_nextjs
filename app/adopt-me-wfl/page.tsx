"use client";

import React, { useEffect, useState } from "react";
import type { Metadata } from "next";
import { TradeGrid, PetSelection } from "../../components/trade-grid";
import { PetSelectionModal, PetFromAPI } from "../../components/pet-selection-modal";
import { preloadImages } from "../../lib/image-cache";
import html2canvas from "html2canvas";
import { Calculator, Download, Share2, RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react";

const PETS_API_URL = "https://elvebredd.com/data/Pets.json";
type TradeSide = "you" | "them";

// Improved value calculation based on attribute logic
function getPetValue(pet: any, potionType: string): number {
  if (!pet || !potionType) return 0;
  // If pet has only a 'value' field, always use it
  if (
    pet["value"] !== undefined &&
    pet["nvalue"] === undefined &&
    pet["rvalue"] === undefined &&
    pet["mvalue"] === undefined
  ) {
    return pet["value"];
  }
  // If potionType is 'value', use value
  if (potionType === "value") {
    return pet["value"] ?? 0;
  }
  let value = 0;
  const attr = potionType.toLowerCase();
  if (attr.includes("d") || (!attr.includes("n") && !attr.includes("m"))) {
    if (attr.includes("f") && attr.includes("r")) {
      value = pet["rvalue - fly&ride"] ?? 0;
    } else if (attr.includes("f")) {
      value = pet["rvalue - fly"] ?? 0;
    } else if (attr.includes("r")) {
      value = pet["rvalue - ride"] ?? 0;
    } else if (pet["rvalue - nopotion"]) {
      value = pet["rvalue - nopotion"] ?? 0;
    } else {
      value = pet["rvalue"] ?? 0;
    }
  } else if (attr.includes("n")) {
    if (attr.includes("f") && attr.includes("r")) {
      value = pet["nvalue - fly&ride"] ?? 0;
    } else if (attr.includes("f")) {
      value = pet["nvalue - fly"] ?? 0;
    } else if (attr.includes("r")) {
      value = pet["nvalue - ride"] ?? 0;
    } else if (pet["nvalue - nopotion"]) {
      value = pet["nvalue - nopotion"] ?? 0;
    } else {
      value = pet["nvalue"] ?? 0;
    }
  } else if (attr.includes("m")) {
    if (attr.includes("f") && attr.includes("r")) {
      value = pet["mvalue - fly&ride"] ?? 0;
    } else if (attr.includes("f")) {
      value = pet["mvalue - fly"] ?? 0;
    } else if (attr.includes("r")) {
      value = pet["mvalue - ride"] ?? 0;
    } else if (pet["mvalue - nopotion"]) {
      value = pet["mvalue - nopotion"] ?? 0;
    } else {
      value = pet["mvalue"] ?? 0;
    }
  } else {
    value = pet["value"] ?? 0;
  }
  return value;
}

function ResultBar({ result, diff }: { result: "WIN" | "FAIR" | "LOSE"; diff: number }) {
  let color = "";
  let icon = null;
  let bgGradient = "";
  let borderColor = "";
  let shadowColor = "";
  
  if (result === "WIN") {
    color = "text-green-700";
    icon = <TrendingUp className="h-4 w-4 text-green-600" />;
    bgGradient = "bg-gradient-to-r from-green-50 via-emerald-50 to-green-100";
    borderColor = "border-green-200";
    shadowColor = "shadow-green-200/50";
  } else if (result === "FAIR") {
    color = "text-amber-700";
    icon = <Minus className="h-4 w-4 text-amber-600" />;
    bgGradient = "bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50";
    borderColor = "border-amber-200";
    shadowColor = "shadow-amber-200/50";
  } else {
    color = "text-red-700";
    icon = <TrendingDown className="h-4 w-4 text-red-600" />;
    bgGradient = "bg-gradient-to-r from-red-50 via-pink-50 to-red-100";
    borderColor = "border-red-200";
    shadowColor = "shadow-red-200/50";
  }
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm border ${bgGradient} ${borderColor} ${shadowColor} shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${color}`}>
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="font-bold tracking-wide">{result}</span>
      </div>
      {diff !== 0 && (
        <div className="flex items-center">
          <span className="w-px h-4 bg-current/30 mx-1.5"></span>
          <span className="text-xs font-medium bg-white/70 px-2 py-0.5 rounded-full border border-current/20">
            {diff > 0 ? "+" : ""}{Math.abs(diff).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}

export default function TradePage() {
  const [pets, setPets] = useState<any[]>([]);
  const [you, setYou] = useState<any[]>([]);
  const [them, setThem] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSide, setModalSide] = useState<TradeSide>("you");
  const [copied, setCopied] = useState(false);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pets from API on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(PETS_API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data format received from API');
        }
        
        const petsArr = Object.values(data)
          .map((pet: any) => ({ 
            ...pet, 
            image: pet.image ? `https://elvebredd.com${pet.image}` : "/placeholder.svg",
            id: pet.id || Math.random().toString(36).substr(2, 9),
            name: pet.name || 'Unknown Pet'
          }))
          .filter(
            (pet) =>
              pet &&
              typeof pet.name === "string" &&
              pet.name.length > 0 &&
              pet.name !== 'Unknown Pet' &&
              typeof pet.image === "string" &&
              pet.image.length > 0 &&
              pet.image !== "/placeholder.svg"
          );
        setPets(petsArr);
        
        // Preload first batch of images for better performance
        const firstBatchImages = petsArr.slice(0, 50).map(pet => pet.image);
        preloadImages(firstBatchImages);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching pets:', error);
        setError("Failed to load pets. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleAddPet = (side: TradeSide) => {
    if ((side === "you" && you.length >= 9) || (side === "them" && them.length >= 9)) return;
    setModalSide(side);
    setModalOpen(true);
  };

  const handleSelectPet = (pet: PetSelection) => {
    const petObj = pets.find((p) => p.id === pet.id && p.name === pet.name);
    if (!petObj) return;
    const petWithPotion = { ...petObj, potionType: pet.potionType };
    if (modalSide === "you") {
      if (you.length < 9) setYou([...you, petWithPotion]);
    } else {
      if (them.length < 9) setThem([...them, petWithPotion]);
    }
  };

  const handleRemovePet = (side: TradeSide, index: number) => {
    if (side === "you") {
      setYou(you.filter((_, i) => i !== index));
    } else {
      setThem(them.filter((_, i) => i !== index));
    }
  };

  const handleClear = () => {
    setYou([]);
    setThem([]);
  };

  const youTotal = you.reduce((sum, pet) => sum + getPetValue(pet, pet.potionType), 0);
  const themTotal = them.reduce((sum, pet) => sum + getPetValue(pet, pet.potionType), 0);

  let result: "WIN" | "FAIR" | "LOSE" = "FAIR";
  let diff = themTotal - youTotal;
  if (youTotal === 0 && themTotal === 0) {
    result = "FAIR";
  } else if (Math.abs(youTotal - themTotal) / Math.max(youTotal, themTotal) < 0.05) {
    result = "FAIR";
  } else if (youTotal > themTotal) {
    result = "LOSE";
  } else if (youTotal < themTotal) {
    result = "WIN";
  }

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-purple-700 mb-2">Loading Trading Value Calculator</h2>
          <p className="text-purple-600">Fetching pet data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-800 mb-4">
            Trading Value Calculator
          </h1>
          <p className="text-lg sm:text-xl text-purple-600 max-w-3xl mx-auto">
            Calculate the value of your pet trades and ensure fair exchanges
          </p>
        </div>

        {/* Results Display */}
        <div className="mb-2 sm:mb-2">
          <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border transition-all duration-300 ${
            you.length === 0 && them.length === 0 
              ? 'border-gray-200 opacity-60' 
              : 'border-purple-200'
          }`}>
            {you.length === 0 && them.length === 0 ? (
              // Empty state with prompt
              <div className="text-center">
                <div className="flex items-center justify-center ">
                  <Calculator className="h-8 w-8 text-gray-400 mr-3" />
                  <span className="text-lg font-semibold text-gray-500">Add pets to start trading</span>
                </div>
              </div>
            ) : (
              // Normal results display
              <div className="flex flex-row sm:flex-row items-center justify-between gap-4 sm:gap-6">
                {/* YOU Total */}
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start mb-2">
                    <Calculator className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-sm font-semibold text-purple-700">YOU</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-800">
                    {youTotal.toLocaleString()}
                  </div>
                </div>

                {/* Result Bar - Now inline */}
                <div className="flex items-center justify-center">
                  <ResultBar result={result} diff={diff} />
                </div>

                {/* THEM Total */}
                <div className="text-center sm:text-right">
                  <div className="flex items-center justify-center sm:justify-end mb-2">
                    <Calculator className="h-5 w-5 text-pink-500 mr-2" />
                    <span className="text-sm font-semibold text-pink-600">THEM</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-pink-700">
                    {themTotal.toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trade Grid */}
        <div ref={gridRef} className="mb-6 sm:mb-8 w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <TradeGrid
              you={you}
              them={them}
              onAddPet={handleAddPet}
              onRemovePet={handleRemovePet}
            />
            
            {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6">
            
          <button
            onClick={handleClear}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            Clear All
          </button>
        </div>
          </div>
        </div>
      </div>

      <PetSelectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectPet}
        pets={pets}
      />
    </main>
  );
}