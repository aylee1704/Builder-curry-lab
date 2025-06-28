import DashboardLayout from "@/components/DashboardLayout";

export default function Pacientes() {
  const profileRows = Array.from({ length: 3 }, (_, i) => i);
  const dataRows = Array.from({ length: 3 }, (_, i) => i);

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-medical-navy font-lato text-5xl font-normal leading-tight mb-6">
            Pacientes
          </h1>
          <div className="w-full h-0 border-t border-medical-border-gray"></div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Profile Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-black font-lato text-xl font-bold mb-2">
                Perfil
              </h2>
              <p className="text-black/50 font-lato text-lg">
                Nombres, Apellidos, Correo electrónico
              </p>
            </div>
            <div className="space-y-3">
              {profileRows.map((index) => (
                <div
                  key={index}
                  className="w-full h-10 bg-white rounded-md border border-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Data Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-black font-lato text-xl font-bold mb-2">
                Datos
              </h2>
              <p className="text-black/50 font-lato text-lg">
                Peso, Talla, Glucosa
              </p>
            </div>
            <div className="space-y-3">
              {dataRows.map((index) => (
                <div
                  key={index}
                  className="w-full h-10 bg-white rounded-md border border-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Add Patient Button */}
          <div className="pt-4">
            <button className="bg-medical-navy text-white px-6 py-3 rounded-md font-lato font-bold hover:bg-medical-navy/90 transition-colors">
              Añadir paciente
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
