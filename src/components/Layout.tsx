import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  Camera, 
  History, 
  Menu, 
  X, 
  Droplets,
  User
} from "lucide-react";

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Activity },
    { name: "New Analysis", href: "/analysis", icon: Camera },
    { name: "History", href: "/history", icon: History },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-accent-light/20">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:flex lg:w-64 lg:flex-col
      `}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">HydroSkin</h1>
              <p className="text-xs text-muted-foreground">Moisture Analyzer</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Daily Goal</p>
                <p className="text-xs text-muted-foreground">3 readings today</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border bg-card/80 backdrop-blur-sm lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="font-semibold">HydroSkin</span>
          </div>
          <div /> {/* Spacer for centering */}
        </div>

        {/* Page content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;