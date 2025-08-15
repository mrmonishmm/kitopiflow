import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, isOpen = false, onClose }) => {
  const location = useLocation();
  const [selectedBrand, setSelectedBrand] = useState('all-brands');
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  const brands = [
    { value: 'all-brands', label: 'All Brands', count: 12 },
    { value: 'pizza-palace', label: 'Pizza Palace', count: 3 },
    { value: 'burger-barn', label: 'Burger Barn', count: 4 },
    { value: 'taco-time', label: 'Taco Time', count: 2 },
    { value: 'sushi-spot', label: 'Sushi Spot', count: 3 }
  ];

  const navigationItems = [
    {
      section: 'Operations',
      items: [
        {
          label: 'Kitchen Display System',
          path: '/kitchen-display-system-kds',
          icon: 'Monitor',
          tooltip: 'Real-time order tracking and preparation'
        },
        {
          label: 'Order Management',
          path: '/order-management-hub',
          icon: 'ClipboardList',
          tooltip: 'Process and manage incoming orders'
        }
      ]
    },
    {
      section: 'Management',
      items: [
        {
          label: 'Multi-Brand Dashboard',
          path: '/multi-brand-operations-dashboard',
          icon: 'BarChart3',
          tooltip: 'Overview of all brand operations'
        },
        {
          label: 'Analytics & Reporting',
          path: '/analytics-reporting-dashboard',
          icon: 'TrendingUp',
          tooltip: 'Performance insights and reports'
        }
      ]
    },
    {
      section: 'Resources',
      items: [
        {
          label: 'Inventory Management',
          path: '/inventory-management-system',
          icon: 'Package',
          tooltip: 'Track and manage stock levels'
        },
        {
          label: 'Recipe & Menu',
          path: '/recipe-menu-management',
          icon: 'BookOpen',
          tooltip: 'Manage recipes and menu items'
        }
      ]
    }
  ];

  const quickActions = [
    { label: 'Emergency Stop', icon: 'AlertTriangle', variant: 'destructive' },
    { label: 'Shift Handover', icon: 'Users', variant: 'outline' },
    { label: 'System Status', icon: 'Activity', variant: 'ghost' }
  ];

  const isActive = (path) => location?.pathname === path;

  const handleBrandChange = (brandValue) => {
    setSelectedBrand(brandValue);
    setIsBrandDropdownOpen(false);
  };

  const sidebarClasses = `
    fixed top-0 left-0 h-full bg-card border-r border-border z-1000 transition-layout
    ${isCollapsed ? 'w-16' : 'w-60'}
    lg:translate-x-0
    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-1000 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="ChefHat" size={20} color="white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">KitopiFlow</span>
                <span className="text-xs text-muted-foreground">Kitchen Management</span>
              </div>
            )}
          </div>

          {/* Brand Selector */}
          {!isCollapsed && (
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Building2" size={16} />
                    <span className="text-sm">
                      {brands?.find(b => b?.value === selectedBrand)?.label}
                    </span>
                  </div>
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`transition-transform ${isBrandDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </Button>

                {/* Brand Dropdown */}
                {isBrandDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-md elevation-2 z-1100">
                    {brands?.map((brand) => (
                      <button
                        key={brand?.value}
                        onClick={() => handleBrandChange(brand?.value)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between"
                      >
                        <span className={selectedBrand === brand?.value ? 'font-medium text-primary' : 'text-foreground'}>
                          {brand?.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {brand?.count} locations
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {navigationItems?.map((section) => (
                <div key={section?.section}>
                  {!isCollapsed && (
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                      {section?.section}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section?.items?.map((item) => (
                      <Link
                        key={item?.path}
                        to={item?.path}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-micro hover-scale
                          ${isActive(item?.path) 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-foreground hover:bg-muted'
                          }
                          ${isCollapsed ? 'justify-center' : ''}
                        `}
                        title={isCollapsed ? item?.tooltip : ''}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={18} 
                          className="flex-shrink-0"
                        />
                        {!isCollapsed && (
                          <span className="font-medium">{item?.label}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Status Indicator */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
                {!isCollapsed && (
                  <span className="text-xs text-muted-foreground">System Online</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                className="w-full justify-between mb-2"
              >
                <span className="text-xs font-medium">Quick Actions</span>
                <Icon 
                  name="ChevronUp" 
                  size={14} 
                  className={`transition-transform ${isQuickActionsOpen ? 'rotate-180' : ''}`}
                />
              </Button>

              {isQuickActionsOpen && (
                <div className="space-y-1">
                  {quickActions?.map((action) => (
                    <Button
                      key={action?.label}
                      variant={action?.variant}
                      size="xs"
                      iconName={action?.icon}
                      iconPosition="left"
                      iconSize={14}
                      className="w-full justify-start"
                    >
                      {action?.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
      {/* Click outside to close dropdowns */}
      {(isBrandDropdownOpen || isQuickActionsOpen) && (
        <div 
          className="fixed inset-0 z-1000" 
          onClick={() => {
            setIsBrandDropdownOpen(false);
            setIsQuickActionsOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Sidebar;