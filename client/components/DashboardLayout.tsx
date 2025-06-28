import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Settings,
  BarChart3,
  Users,
  Activity,
  Home,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: "principal",
      label: "Principal",
      icon: Home,
      path: "/dashboard",
    },
    {
      id: "historial",
      label: "Historial",
      icon: BarChart3,
      path: "/dashboard/historial",
    },
    {
      id: "pacientes",
      label: "Pacientes",
      icon: Users,
      path: "/dashboard/pacientes",
    },
    {
      id: "reportes",
      label: "Reportes",
      icon: Activity,
      path: "/dashboard/reportes",
    },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-medical-bg-light flex">
      {/* Sidebar */}
      <div className="w-80 bg-medical-bg-sidebar flex flex-col">
        {/* Profile Section */}
        <div className="p-6 flex items-center justify-center">
          <div className="w-44 h-44 bg-gray-300 rounded-full"></div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              const Icon = item.icon;

              return (
                <div key={item.id} className="relative">
                  {isActive && (
                    <div className="absolute left-0 top-1 w-1 h-12 bg-medical-orange rounded-r-sm"></div>
                  )}
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-6 py-4 rounded-lg transition-colors ${
                      isActive
                        ? "bg-medical-orange text-white shadow-lg ml-10"
                        : "text-medical-active-gray hover:bg-gray-100 ml-6"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-nunito text-base font-bold">
                      {item.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 text-medical-active-gray hover:bg-gray-100 rounded-lg transition-colors w-full"
          >
            <Settings className="w-5 h-5" />
            <span className="font-nunito text-base font-bold">
              Cerrar sesión
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="p-6">
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-medical-active-gray" />
              <input
                type="text"
                placeholder="Search"
                className="w-full h-11 pl-12 pr-4 bg-medical-bg-sidebar rounded-lg text-medical-active-gray font-lato font-bold placeholder:text-medical-active-gray focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
