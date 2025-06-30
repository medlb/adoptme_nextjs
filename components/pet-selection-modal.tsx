import React, { useState, useCallback, useRef, useEffect } from "react";
import { PetSelection } from "./trade-grid";
import { preloadImages } from "../lib/image-cache";
import { useImagePreloader } from "../hooks/use-image-preloader";

// Type for a pet as received from the API
export type PetFromAPI = {
  id: string;
  name: string;
  image: string;
  type?: string;
  score?: number;
  value?: number;
  rvalue?: number;
  // ...other fields from API if needed
};

// Props for the PetSelectionModal
export type PetSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (pet: PetSelection) => void;
  pets: PetFromAPI[];
};

const OPTION_ICONS = {
  R: "/r.webp",
  F: "/f.webp",
  M: "/m.webp",
  N: "/n.webp",
};
const OPTION_LABELS = {
  F: "Fly",
  R: "Ride",
  M: "Mega",
  N: "Neon",
};
const OPTION_ORDER = { F: 2, R: 3, M: 1, N: 1 };
const OPTIONS = ["F", "R", "M", "N"];

// Performance constants
const INITIAL_LOAD_COUNT = 20;
const LOAD_MORE_COUNT = 10;
const SCROLL_THRESHOLD = 200; // pixels from bottom to trigger load more

function sortOptions(options: string[]): string[] {
  return options.sort((a, b) => OPTION_ORDER[a as keyof typeof OPTION_ORDER] - OPTION_ORDER[b as keyof typeof OPTION_ORDER]);
}

export const PetSelectionModal: React.FC<PetSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  pets,
}) => {
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState<PetFromAPI | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Use image preloader hook for better performance
  const petImages = pets.map(pet => pet.image);
  useImagePreloader({
    images: petImages,
    preloadCount: Math.min(visibleCount + 20, pets.length),
    enabled: isOpen
  });

  // Preload images when modal opens or pets change
  useEffect(() => {
    if (isOpen && pets.length > 0) {
      const visiblePetImages = pets.slice(0, Math.min(visibleCount + 10, pets.length)).map(pet => pet.image);
      preloadImages(visiblePetImages);
    }
  }, [isOpen, pets, visibleCount]);

  // Helper to check if pet has N/F/R/M values
  function hasNFRM(pet: any) {
    return (
      pet && (
        pet["nvalue"] !== undefined || pet["mvalue"] !== undefined
        
        
      )
    );
  }

  // When a pet is selected, default to F and R if N/F/R/M are available
  React.useEffect(() => {
    if (selectedPet && hasNFRM(selectedPet)) {
      setSelectedOptions(["F", "R"]);
    } else if (selectedPet) {
      setSelectedOptions([]);
    }
  }, [selectedPet]);

  // Reset visible count when search or filter changes
  useEffect(() => {
    setVisibleCount(INITIAL_LOAD_COUNT);
  }, [search, typeFilter]);

  // Get all unique types from pets
  const allTypes = Array.from(new Set(pets.map((pet) => pet.type).filter(Boolean)));

  // Filter and sort pets
  let filteredPets = pets
    .filter((pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "all" || pet.type === typeFilter)
    )
    .sort((a, b) => (b.rvalue ?? 0) - (a.rvalue ?? 0));
    

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;
    if (!loadMoreElement || visibleCount >= filteredPets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && visibleCount < filteredPets.length) {
            setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredPets.length));
          }
        });
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '100px', // Start loading when within 100px of the element
        threshold: 0.1
      }
    );

    observer.observe(loadMoreElement);

    return () => {
      observer.disconnect();
    };
  }, [visibleCount, filteredPets.length]);

  // Get only visible pets for performance
  const visiblePets = filteredPets.slice(0, visibleCount);

  // Update visible count when filtered pets change
  useEffect(() => {
    if (visibleCount > filteredPets.length) {
      setVisibleCount(Math.min(visibleCount, filteredPets.length));
    }
  }, [filteredPets.length, visibleCount]);

  // Handle option click logic
  function handleOptionClick(option: string) {
    let newOptions = [...selectedOptions];
    const hasOption = newOptions.includes(option);
    if (hasOption) {
      newOptions = newOptions.filter((o) => o !== option);
    } else {
      if (option === "M" || option === "N") {
        // Remove the other if exists
        newOptions = newOptions.filter((o) => o !== (option === "M" ? "N" : "M"));
        newOptions.push(option);
      } else if (option === "R") {
        if (!newOptions.includes("R")) newOptions.unshift("R");
      } else if (option === "F") {
        if (!newOptions.includes("F")) {
          if (newOptions.includes("R")) {
            const rIdx = newOptions.indexOf("R");
            newOptions.splice(rIdx + 1, 0, "F");
          } else {
            newOptions.unshift("F");
          }
        }
      }
    }
    // After any selection, sort
    newOptions = sortOptions(Array.from(new Set(newOptions)));
    setSelectedOptions(newOptions);
  }

  function handleSelect() {
    if (selectedPet && selectedOptions.length > 0) {
      // Compose potionType string (e.g. "R,F,M")
      onSelect({
        id: selectedPet.id,
        name: selectedPet.name,
        image: selectedPet.image,
        potionType: selectedOptions.join(","),
      });
      setSelectedPet(null);
      setSelectedOptions([]);
      onClose();
    }
  }

  function handleBack() {
    setSelectedPet(null);
    setSelectedOptions([]);
  }

  if (!isOpen) return null;

  // Main pet grid
  if (!selectedPet) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6">
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-1 truncate">Choose Your Pet</h2>
                <p className="text-blue-100 text-xs sm:text-sm hidden sm:block">Select the perfect companion for your adventure</p>
              </div>
              <button 
                onClick={onClose} 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center text-lg sm:text-xl font-bold backdrop-blur-sm flex-shrink-0 ml-2"
              >
                ×
              </button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search pets by name..."
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm text-sm sm:text-base"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              {/* Type Filter */}
              <div className="sm:w-48 relative">
                <select
                  className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm appearance-none cursor-pointer text-sm sm:text-base"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {allTypes.map((type) => (
                    <option key={type} value={type}>
                      {typeof type === 'string' ? type.charAt(0).toUpperCase() + type.slice(1) : ''}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-3 sm:mt-4 flex items-center justify-between">
              <div className="text-xs sm:text-sm text-gray-600">
                <span className="font-semibold text-blue-600">{visiblePets.length}</span> of <span className="font-semibold">{filteredPets.length}</span> pets shown
              </div>
              {filteredPets.length > 0 && (
                <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  Scroll to load more
                </div>
              )}
            </div>
          </div>

          {/* Scrollable pet grid */}
          <div 
            ref={scrollContainerRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-4 sm:p-6 overflow-y-auto flex-1 bg-gradient-to-br from-gray-50 to-white"
            style={{ 
              maxHeight: 'calc(80vh - 200px)',
              scrollBehavior: 'smooth'
            }}
          >
            {visiblePets.map((pet, index) => (
              <button
                key={pet.id}
                className="group relative bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-blue-300 overflow-hidden touch-manipulation"
                onClick={() => setSelectedPet(pet)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Pet Image */}
                <div className="relative mb-2 sm:mb-3">
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 p-2">
                    <img 
                      src={pet.image} 
                      alt={pet.name} 
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
                
                {/* Pet Info */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 text-xs sm:text-sm mb-1 group-hover:text-blue-600 transition-colors duration-200 truncate">
                    {pet.name}
                  </h3>
                  {typeof pet.type === 'string' && (
                    <span className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                      {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
                    </span>
                  )}
                </div>
                
                {/* Selection indicator */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  ✓
                </div>
              </button>
            ))}
            
            {/* Loading indicator */}
            {visiblePets.length < filteredPets.length && (
              <div 
                ref={loadMoreRef}
                className="col-span-full flex flex-col items-center justify-center py-6 sm:py-8 space-y-3"
              >
                <div className="flex items-center space-x-2 text-gray-500 bg-white rounded-lg px-4 py-2 shadow-sm border">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-blue-500"></div>
                  <span className="text-xs sm:text-sm">Loading more pets... ({visiblePets.length} of {filteredPets.length})</span>
                </div>
                <button
                  onClick={() => setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredPets.length))}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Load More Pets
                </button>
              </div>
            )}
            
            {/* Empty state */}
            {filteredPets.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-8 sm:py-12 text-gray-500">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">No pets found</p>
                <p className="text-xs sm:text-sm text-center">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Pet detail modal
  const showNFRM = hasNFRM(selectedPet);
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 relative">
          <button 
            onClick={handleBack} 
            className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
          >
            ←
          </button>
          <button 
            onClick={onClose} 
            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
          >
            ×
          </button>
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-bold">Pet Details</h2>
          </div>
        </div>

        {/* Pet Content */}
        <div className="p-4 sm:p-6">
          {/* Pet Image */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4 shadow-lg">
                <img 
                  src={selectedPet.image} 
                  alt={selectedPet.name} 
                  className="w-full h-full object-contain" 
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl -z-10" />
            </div>
          </div>

          {/* Pet Name */}
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{selectedPet.name}</h3>
            {typeof selectedPet.type === 'string' && (
              <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                {selectedPet.type.charAt(0).toUpperCase() + selectedPet.type.slice(1)}
              </span>
            )}
          </div>

          {/* NFRM Options */}
          {showNFRM && (
            <div className="mb-4 sm:mb-6">
              {/* <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 text-center">Select Potions</h4> */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    className={`relative flex flex-col items-center p-2 sm:p-3 rounded-xl border-2 transition-all duration-200 touch-manipulation ${
                      selectedOptions.includes(opt) 
                        ? "bg-gradient-to-br from-blue-500 to-purple-500 border-blue-500 text-white shadow-lg transform scale-105" 
                        : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50"
                    }`}
                    onClick={() => handleOptionClick(opt)}
                  >
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 rounded-lg overflow-hidden ${
                      selectedOptions.includes(opt) ? "bg-white/20" : "bg-gray-100"
                    }`}>
                      <img 
                        src={OPTION_ICONS[opt as keyof typeof OPTION_ICONS]} 
                        alt={opt} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <span className="text-xs font-medium">{OPTION_LABELS[opt as keyof typeof OPTION_LABELS]}</span>
                    {selectedOptions.includes(opt) && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Value Display */}
          {!showNFRM && (
            <div className="mb-4 sm:mb-6 text-center">
              <div className="inline-block px-3 sm:px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full">
                <span className="text-base sm:text-lg font-bold text-green-700">
                  Value: {selectedPet.type === 'eggs' ? (selectedPet.rvalue ?? 0) : (selectedPet.value ?? 0)}
                </span>
              </div>
            </div>
          )}

          {/* Select Button */}
          <button
            className="w-full py-3 sm:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl touch-manipulation"
            onClick={() => {
              let potionType = "";
              if (showNFRM) {
                if (selectedOptions.length > 0) {
                  potionType = selectedOptions.join(",");
                } else {
                  // If no NFRM selected, use 'd' for NFRM pets
                  potionType = "d";
                }
              } else {
                // For value-only pets and eggs
                potionType = selectedPet.type === 'eggs' ? "egg" : "value";
              }
              onSelect({
                id: selectedPet.id,
                name: selectedPet.name,
                image: selectedPet.image,
                potionType,
              });
              setSelectedPet(null);
              setSelectedOptions([]);
              onClose();
            }}
          >
            {showNFRM ? "Select Pet with Potions" : "Select Pet"}
          </button>
        </div>
      </div>
    </div>
  );
}; 