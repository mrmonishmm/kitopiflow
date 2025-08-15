import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getPageTitle = () => {
    const pathMap = {
      '/multi-brand-operations-dashboard': 'Multi-Brand Operations',
      '/kitchen-display-system-kds': 'Kitchen Display System',
      '/order-management-hub': 'Order Management',
      '/inventory-management-system': 'Inventory Management',
      '/recipe-menu-management': 'Recipe & Menu Management',
      '/analytics-reporting-dashboard': 'Analytics & Reporting'
    };
    return pathMap?.[location?.pathname] || 'KitopiFlow';
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Menu Toggle & Title */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            iconName="Menu"
            iconSize={20}
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-foreground">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              iconSize={18}
              className="relative"
            >
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              iconSize={18}
            >
              <span className="sr-only">Search</span>
            </Button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileToggle}
              className="flex items-center gap-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">
                Kitchen Manager
              </span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md elevation-2 z-1100">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">Kitchen Manager</p>
                  <p className="text-xs text-muted-foreground">manager@kitopiflow.com</p>
                </div>
                
                <div className="py-2">
                  <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                    <Icon name="User" size={16} />
                    Profile Settings
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                    <Icon name="Settings" size={16} />
                    Preferences
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                    <Icon name="HelpCircle" size={16} />
                    Help & Support
                  </button>
                </div>
                
                <div className="border-t border-border py-2">
                  <button className="w-full px-3 py-2 text-left text-sm text-error hover:bg-muted transition-colors flex items-center gap-2">
                    <Icon name="LogOut" size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-border px-6 py-3">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search orders, recipes, inventory..."
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      </div>

      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-1000" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;