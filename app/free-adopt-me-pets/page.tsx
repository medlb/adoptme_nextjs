import { PetGrid } from "@/components/pet-grid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function FreeAdoptMePetsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-x-hidden">
      <div className="relative z-10">
        <PetGrid />
      </div>
    </div>
  );
} 