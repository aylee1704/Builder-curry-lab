import DashboardLayout from "@/components/DashboardLayout";
import { Plus } from "lucide-react";

export default function Historial() {
  const cards = Array.from({ length: 4 }, (_, i) => i);

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-medical-navy font-lato text-5xl font-normal leading-tight mb-6">
            Historial
          </h1>
          <div className="w-full h-0 border-t border-medical-border-gray"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((index) => (
            <div
              key={index}
              className="w-full h-72 bg-gray-300 rounded-[35px] hover:bg-gray-400 transition-colors cursor-pointer"
            ></div>
          ))}
        </div>

        {/* Add Button */}
        <div className="w-full border-4 border-medical-border-gray rounded-sm p-4 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
          <Plus className="w-6 h-6 text-medical-active-gray" />
        </div>
      </div>
    </DashboardLayout>
  );
}
