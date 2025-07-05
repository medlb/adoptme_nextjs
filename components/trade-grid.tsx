import React from "react";

// Type for a selected pet in the trade grid
export type PetSelection = {
  id: string;
  name: string;
  image: string;
  potionType: string;
};

// Props for the TradeGrid component
export type TradeGridProps = {
  you: PetSelection[];
  them: PetSelection[];
  onAddPet: (side: "you" | "them") => void;
  onRemovePet: (side: "you" | "them", index: number) => void;
  showCopyright?: boolean;
};

// Icon mapping for R, F, M, N - Updated to use SVG files
const OPTION_ICONS = {
  R: "/r.webp",
  F: "/f.webp",
  M: "/m.webp",
  N: "/n.webp",
};

// TradeSide renders 9 slots for pets (filled or empty)
const TradeSide = ({
  pets,
  onAdd,
  onRemove,
  showCopyright = false,
  side,
}: {
  pets: PetSelection[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  showCopyright?: boolean;
  side: "you" | "them";
}) => {
  const firstEmpty = pets.findIndex((p) => !p);
  const showAdd = firstEmpty === -1 ? pets.length : firstEmpty;
  
  const isYou = side === "you";
  const sideColor = isYou ? "purple" : "pink";
  
  return (
    <div className="w-full">
      {/* Side Label - Compact for mobile */}
      <div className={`text-center mb-2 sm:mb-3 px-1`}>
        <h3 className={`text-sm sm:text-lg md:text-xl font-bold tracking-wide ${
          isYou ? 'text-purple-700' : 'text-pink-600'
        }`}>
          {isYou ? "YOU" : "THEM"}
        </h3>
        <div className={`w-8 sm:w-12 h-0.5 sm:h-1 mx-auto mt-1 rounded-full bg-gradient-to-r ${
          isYou ? 'from-purple-400 to-blue-400' : 'from-pink-400 to-rose-400'
        }`}></div>
      </div>
      
      {/* Grid Container - Compact for mobile inline layout */}
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] mx-auto">
        {[...Array(9)].map((_, i) => {
          if (pets[i]) {
            const potionTypes = pets[i].potionType ? pets[i].potionType.split(",") : [];
            return (
              <div
                key={i}
                className={`relative group border border-${sideColor}-200 rounded-lg sm:rounded-xl p-1 sm:p-1.5 md:p-2 bg-gradient-to-br from-white/90 via-${sideColor}-50/70 to-${sideColor}-100/50 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg hover:border-${sideColor}-400 transition-all duration-200 hover:scale-105 aspect-square min-w-[50px] min-h-[50px] sm:min-w-[60px] sm:min-h-[60px] md:min-w-[70px] md:min-h-[70px] lg:min-w-[80px] lg:min-h-[80px] ring-1 ring-white/60 hover:ring-2 hover:ring-${sideColor}-300`}
              >
                <img
                  src={pets[i].image}
                  alt={pets[i].name}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14  object-contain"
                  loading="lazy"
                />
                
                {/* Potion icons - Smaller for mobile */}
                {potionTypes.length > 0 && (
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 flex space-x-0.5">
                    {potionTypes.map((opt) =>
                      OPTION_ICONS[opt as keyof typeof OPTION_ICONS] ? (
                        <img
                          key={opt}
                          src={OPTION_ICONS[opt as keyof typeof OPTION_ICONS]}
                          alt={opt}
                          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 "
                          loading="lazy"
                        />
                      ) : null
                    )}
                  </div>
                )}
                
                {/* Remove button - Smaller for mobile */}
                {!showCopyright && (
                  <button
                    className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 text-red-500 hover:text-red-700 text-xs sm:text-sm font-bold bg-white/95 rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 border border-red-200 shadow-sm hover:scale-110`}
                    onClick={() => onRemove(i)}
                    aria-label="Remove pet"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          } else if (i === showAdd && pets.length < 9) {
            return (
              <button
                key={i}
                className={`border border-dashed border-${sideColor}-300 rounded-lg sm:rounded-xl p-1 sm:p-1.5 md:p-2 bg-gradient-to-br from-${sideColor}-50/70 via-white/50 to-${sideColor}-100/50 flex items-center justify-center aspect-square min-w-[50px] min-h-[50px] sm:min-w-[60px] sm:min-h-[60px] md:min-w-[70px] md:min-h-[70px] lg:min-w-[80px] lg:min-h-[80px] hover:bg-gradient-to-br hover:from-${sideColor}-100/80 hover:to-white/70 transition-all duration-200 hover:shadow-md shadow-sm backdrop-blur-sm focus:ring-2 focus:ring-${sideColor}-300 focus:outline-none`}
                onClick={onAdd}
                aria-label="Add pet"
              >
                <span className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-${sideColor}-500 font-bold drop-shadow`}>
                  +
                </span>
              </button>
            );
          } else {
            return (
              <div
                key={i}
                className={`border border-dashed border-gray-200 rounded-lg sm:rounded-xl aspect-square min-w-[50px] min-h-[50px] sm:min-w-[60px] sm:min-h-[60px] md:min-w-[70px] md:min-h-[70px] lg:min-w-[80px] lg:min-h-[80px] bg-gradient-to-br from-white/40 via-gray-50/50 to-gray-100/40 backdrop-blur-sm shadow-inner`}
              ></div>
            );
          }
        })}
      </div>
      
    </div>
    
  );
};

// Main TradeGrid component
export const TradeGrid: React.FC<TradeGridProps> = ({
  you,
  them,
  onAddPet,
  onRemovePet,
  
}) => (
  <div className="relative w-full sm:min-h-[70vh] flex flex-col justify-center items-center py-3 sm:py-4 lg:py-6">
    <div className="flex flex-row justify-center w-full max-w-7xl mx-auto">
      
      {/* YOU Side */}
      <div className="flex-1 max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px]">
        <div className="bg-gradient-to-br from-white via-purple-50/90 to-blue-50/70 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg border border-purple-200/70 backdrop-blur-sm">
          <TradeSide
            pets={you}
            onAdd={() => onAddPet("you")}
            onRemove={(i) => onRemovePet("you", i)}
            
            side="you"
          />
        </div>
      </div>

      {/* Center Arrow - Always visible, compact on mobile */}
      <div className="flex flex-col items-center justify-center relative px-1 sm:px-2">
        {/* Top line */}
        <div className="w-px h-8 sm:h-12 md:h-16 lg:h-20 bg-gradient-to-b from-purple-300 via-pink-300 to-blue-300 opacity-60 mb-1 sm:mb-2 md:mb-3"></div>
        
        {/* Arrow button */}
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 shadow-md border-2 border-white text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-purple-600 hover:scale-105 transition-transform duration-200">
          ⇄
        </div>
        
        {/* Bottom line */}
        <div className="w-px h-8 sm:h-12 md:h-16 lg:h-20 bg-gradient-to-b from-blue-300 via-pink-300 to-purple-300 opacity-60 mt-1 sm:mt-2 md:mt-3"></div>
      </div>

      {/* THEM Side */}
      <div className="flex-1 max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px]">
        <div className="bg-gradient-to-br from-white via-pink-50/90 to-rose-50/70 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg border border-pink-200/70 backdrop-blur-sm">
          <TradeSide
            pets={them}
            onAdd={() => onAddPet("them")}
            onRemove={(i) => onRemovePet("them", i)}
            side="them"
          />
        </div>
      </div>
    </div>
    
    {/* Copyright Notice */}
    <div className="mt-4 sm:mt-6 lg:mt-8 text-center">
      <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide">
        © 2025 receivepets.com. All rights reserved.
      </p>
    </div>
  </div>
  
);    