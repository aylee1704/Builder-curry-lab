import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Register:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-medical-input-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-medical-card-bg rounded-t-3xl p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="text-black font-zen-kaku text-xs font-normal leading-6 mb-1">
              PARA EMPEZAR
            </div>
            <h1 className="text-black font-zen-kaku text-2xl font-normal leading-11">
              Crea tu cuenta
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-14">
            <div className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-14 px-4 pt-6 pb-2 border border-medical-placeholder-gray rounded-lg bg-transparent text-black focus:border-medical-medium-gray focus:outline-none"
                  placeholder=" "
                />
                <label className="absolute left-3 top-0 px-2 text-xs text-medical-light-gray font-zen-kaku bg-medical-card-bg transform transition-all">
                  Nombre y Apellido
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-14 px-4 pt-6 pb-2 border border-medical-medium-gray rounded-lg bg-transparent text-black focus:border-medical-medium-gray focus:outline-none"
                  placeholder=" "
                />
                <label className="absolute left-3 top-0 px-2 text-xs text-medical-medium-gray font-zen-kaku bg-medical-card-bg transform transition-all">
                  Email
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-14 px-4 pt-6 pb-2 pr-12 border border-medical-placeholder-gray rounded-lg bg-transparent text-black focus:border-medical-medium-gray focus:outline-none"
                  placeholder=" "
                />
                <label className="absolute left-4 top-0 px-2 text-xs text-medical-light-gray font-zen-kaku bg-medical-card-bg transform transition-all">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Eye className="w-4 h-4 text-medical-placeholder-gray" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-14 bg-medical-dark-gray rounded-lg text-white font-zen-kaku text-xs font-bold tracking-wider hover:bg-medical-medium-gray transition-colors"
            >
              CONTINUAR
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-12 text-center">
            <span className="text-medical-dark-gray font-zen-kaku text-xs">
              Ya tienes una cuenta?{" "}
            </span>
            <Link
              to="/login"
              className="text-medical-dark-gray font-zen-kaku text-xs font-bold underline hover:no-underline"
            >
              INICIA SESIÓN AQUÍ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
