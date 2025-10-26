import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Sparkles,
  CreditCard,
  BarChart3,
  MessageSquare,
  Settings,
  Package,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: Stethoscope, label: "Doctors & Staff", path: "/staff" },
  { icon: Sparkles, label: "Services", path: "/services" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: MessageSquare, label: "Feedback", path: "/feedback" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border shadow-elegant z-40 flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-3xl font-heading font-bold text-primary">KENDI</h1>
          <p className="text-sm text-muted-foreground mt-1">Beauty Lounge & Wellness</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => setShowLogout(true)}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {showLogout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-2xl shadow-gold max-w-md w-full mx-4 border border-primary/20">
            <h3 className="text-2xl font-heading font-semibold mb-4">Confirm Logout</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowLogout(false)}>
                Cancel
              </Button>
              <Button onClick={() => alert("Logged out successfully!")}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
