import DashboardLayout from "@/components/DashboardLayout";

export default function Principal() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-medical-navy font-lato text-5xl font-normal leading-tight mb-6">
            Test del monofilamento
          </h1>
          <div className="w-full h-0 border-t border-medical-border-gray"></div>
        </div>

        {/* Content */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-medical-navy font-lato text-xl font-normal mb-8">
              Body 1
            </h2>
          </div>

          {/* Medical Illustration */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a3d1d7ba63a2bea88e11ae7f4d9c6b8775925b9?width=2880"
              alt="Test del monofilamento illustration"
              className="max-w-md w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
