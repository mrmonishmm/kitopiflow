import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const SeasonalMenuManager = () => {
  const [selectedSeason, setSelectedSeason] = useState('current');
  const [viewMode, setViewMode] = useState('calendar');

  const seasonOptions = [
    { value: 'current', label: 'Current Season' },
    { value: 'spring', label: 'Spring 2025' },
    { value: 'summer', label: 'Summer 2025' },
    { value: 'fall', label: 'Fall 2025' },
    { value: 'winter', label: 'Winter 2025' }
  ];

  // Mock seasonal menu data
  const seasonalMenus = [
    {
      id: 1,
      name: 'Winter Comfort Menu',
      season: 'winter',
      startDate: '2024-12-01',
      endDate: '2025-02-28',
      status: 'active',
      brand: 'pizza-palace',
      items: [
        {
          id: 101,
          name: 'Butternut Squash Pizza',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
          category: 'mains',
          price: 18.99,
          isActive: true,
          popularity: 78
        },
        {
          id: 102,
          name: 'Truffle Mac & Cheese',
          image: 'https://images.unsplash.com/photo-1543826173-1ad4b5b4c6b1?w=300&h=200&fit=crop',
          category: 'sides',
          price: 12.99,
          isActive: true,
          popularity: 85
        }
      ]
    },
    {
      id: 2,
      name: 'Holiday Specials',
      season: 'winter',
      startDate: '2024-12-15',
      endDate: '2025-01-15',
      status: 'scheduled',
      brand: 'burger-barn',
      items: [
        {
          id: 201,
          name: 'Cranberry Turkey Burger',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
          category: 'mains',
          price: 16.99,
          isActive: false,
          popularity: 0
        },
        {
          id: 202,
          name: 'Peppermint Shake',
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop',
          category: 'beverages',
          price: 6.99,
          isActive: false,
          popularity: 0
        }
      ]
    },
    {
      id: 3,
      name: 'Spring Fresh Menu',
      season: 'spring',
      startDate: '2025-03-01',
      endDate: '2025-05-31',
      status: 'draft',
      brand: 'sushi-spot',
      items: [
        {
          id: 301,
          name: 'Cherry Blossom Roll',
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
          category: 'mains',
          price: 22.99,
          isActive: false,
          popularity: 0
        }
      ]
    }
  ];

  const campaigns = [
    {
      id: 1,
      name: 'Valentine\'s Day Special',
      startDate: '2025-02-10',
      endDate: '2025-02-16',
      status: 'scheduled',
      discount: 15,
      items: ['Romantic Dinner for Two', 'Heart-shaped Pizza'],
      brand: 'pizza-palace'
    },
    {
      id: 2,
      name: 'St. Patrick\'s Day',
      startDate: '2025-03-15',
      endDate: '2025-03-18',
      status: 'draft',
      discount: 10,
      items: ['Green Beer', 'Irish Stew Burger'],
      brand: 'burger-barn'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'scheduled': return 'text-warning';
      case 'draft': return 'text-muted-foreground';
      case 'expired': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'scheduled': return 'Clock';
      case 'draft': return 'Edit';
      case 'expired': return 'XCircle';
      default: return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Seasonal Menu Manager</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              iconSize={16}
              onClick={() => setViewMode('calendar')}
            >
              Calendar
            </Button>
            <Button
              variant={viewMode === 'campaigns' ? 'default' : 'outline'}
              size="sm"
              iconName="Megaphone"
              iconPosition="left"
              iconSize={16}
              onClick={() => setViewMode('campaigns')}
            >
              Campaigns
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              New Menu
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Select
            options={seasonOptions}
            value={selectedSeason}
            onChange={setSelectedSeason}
            placeholder="Select season"
            className="w-48"
          />
          <Input
            type="search"
            placeholder="Search menus..."
            className="w-64"
          />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'calendar' && (
          <div className="space-y-6">
            {/* Current Active Menus */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Active Seasonal Menus</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {seasonalMenus?.filter(menu => menu?.status === 'active')?.map((menu) => (
                    <div
                      key={menu?.id}
                      className="bg-background border border-border rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">{menu?.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">
                            {menu?.brand?.replace('-', ' ')} • {menu?.season}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon 
                            name={getStatusIcon(menu?.status)} 
                            size={16} 
                            className={getStatusColor(menu?.status)}
                          />
                          <span className={`text-sm font-medium capitalize ${getStatusColor(menu?.status)}`}>
                            {menu?.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <span>
                          <Icon name="Calendar" size={14} className="inline mr-1" />
                          {formatDate(menu?.startDate)} - {formatDate(menu?.endDate)}
                        </span>
                        <span>
                          <Icon name="Package" size={14} className="inline mr-1" />
                          {menu?.items?.length} items
                        </span>
                      </div>

                      {/* Menu Items Preview */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {menu?.items?.slice(0, 4)?.map((item) => (
                          <div key={item?.id} className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <Image
                                src={item?.image}
                                alt={item?.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground truncate">
                                {item?.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ${item?.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></div>
                          <span className="text-xs text-muted-foreground">
                            {menu?.items?.filter(item => item?.isActive)?.length} active items
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" iconName="Edit" />
                          <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Scheduled Menus */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Scheduled Menus</h3>
              <div className="space-y-3">
                {seasonalMenus?.filter(menu => menu?.status === 'scheduled')?.map((menu) => (
                    <div
                      key={menu?.id}
                      className="bg-background border border-border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Icon 
                              name={getStatusIcon(menu?.status)} 
                              size={16} 
                              className={getStatusColor(menu?.status)}
                            />
                            <div>
                              <h4 className="font-medium text-foreground">{menu?.name}</h4>
                              <p className="text-sm text-muted-foreground capitalize">
                                {menu?.brand?.replace('-', ' ')} • Starts {formatDate(menu?.startDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button variant="default" size="sm">
                            Activate Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Draft Menus */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Draft Menus</h3>
              <div className="space-y-3">
                {seasonalMenus?.filter(menu => menu?.status === 'draft')?.map((menu) => (
                    <div
                      key={menu?.id}
                      className="bg-background border border-border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Icon 
                              name={getStatusIcon(menu?.status)} 
                              size={16} 
                              className={getStatusColor(menu?.status)}
                            />
                            <div>
                              <h4 className="font-medium text-foreground">{menu?.name}</h4>
                              <p className="text-sm text-muted-foreground capitalize">
                                {menu?.brand?.replace('-', ' ')} • {menu?.items?.length} items planned
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" iconName="Edit">
                            Edit
                          </Button>
                          <Button variant="default" size="sm">
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'campaigns' && (
          <div className="space-y-6">
            {/* Active Campaigns */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Promotional Campaigns</h3>
              <div className="space-y-4">
                {campaigns?.map((campaign) => (
                  <div
                    key={campaign?.id}
                    className="bg-background border border-border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{campaign?.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {campaign?.brand?.replace('-', ' ')} • {campaign?.discount}% off
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon 
                          name={getStatusIcon(campaign?.status)} 
                          size={16} 
                          className={getStatusColor(campaign?.status)}
                        />
                        <span className={`text-sm font-medium capitalize ${getStatusColor(campaign?.status)}`}>
                          {campaign?.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <span>
                        <Icon name="Calendar" size={14} className="inline mr-1" />
                        {formatDate(campaign?.startDate)} - {formatDate(campaign?.endDate)}
                      </span>
                      <span>
                        <Icon name="Tag" size={14} className="inline mr-1" />
                        {campaign?.discount}% discount
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-2">Featured Items:</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign?.items?.map((item, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created 3 days ago</span>
                        <span>Last updated 1 day ago</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" iconName="Edit" />
                        <Button variant="ghost" size="sm" iconName="Copy" />
                        <Button variant="outline" size="sm">
                          {campaign?.status === 'draft' ? 'Activate' : 'View'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Templates */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Campaign Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Holiday Special', icon: 'Gift', description: 'Seasonal holiday promotions' },
                  { name: 'Flash Sale', icon: 'Zap', description: 'Limited time offers' },
                  { name: 'New Item Launch', icon: 'Rocket', description: 'Promote new menu items' },
                  { name: 'Customer Appreciation', icon: 'Heart', description: 'Loyalty rewards campaign' },
                  { name: 'Weekend Special', icon: 'Calendar', description: 'Weekend-only promotions' },
                  { name: 'Bundle Deal', icon: 'Package', description: 'Combo meal promotions' }
                ]?.map((template, index) => (
                  <div
                    key={index}
                    className="bg-background border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-micro"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={template?.icon} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{template?.name}</h4>
                        <p className="text-xs text-muted-foreground">{template?.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonalMenuManager;