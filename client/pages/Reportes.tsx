import DashboardLayout from "@/components/DashboardLayout";

export default function Reportes() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-medical-navy font-lato text-5xl font-normal leading-tight mb-6">
            Reportes
          </h1>
          <div className="w-full h-0 border-t border-medical-border-gray"></div>
        </div>

        {/* Report Card */}
        <div className="bg-gray-200 rounded-lg p-8 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <div>
                <h2 className="text-orange-500 font-lato text-xl font-bold">
                  USER 1
                </h2>
              </div>
            </div>
            <div className="text-medical-active-gray font-lato text-base font-bold text-center">
              PRESENCIA DE SENSIBILIDAD
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
