import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import RecipeLibrary from './components/RecipeLibrary';
import RecipeEditor from './components/RecipeEditor';
import MenuEngineering from './components/MenuEngineering';
import SeasonalMenuManager from './components/SeasonalMenuManager';
import Icon from '../../components/AppIcon';


const RecipeMenuManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeView, setActiveView] = useState('recipes');

  // Mock recipes data
  const recipes = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
      brand: 'pizza-palace',
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      prepTime: 15,
      cookTime: 12,
      servings: 2,
      difficulty: 'easy',
      cost: 8.50,
      popularity: 5,
      tags: ['vegetarian', 'popular', 'signature'],
      ingredients: [
        { id: 1, name: 'Pizza Dough', quantity: '1', unit: 'pieces', cost: 2.00 },
        { id: 2, name: 'Tomato Sauce', quantity: '0.5', unit: 'cups', cost: 1.50 },
        { id: 3, name: 'Fresh Mozzarella', quantity: '8', unit: 'oz', cost: 4.00 },
        { id: 4, name: 'Fresh Basil', quantity: '0.25', unit: 'cups', cost: 1.00 }
      ],
      instructions: [
        { id: 1, step: 1, text: 'Preheat oven to 475°F (245°C)' },
        { id: 2, step: 2, text: 'Roll out pizza dough on floured surface' },
        { id: 3, step: 3, text: 'Spread tomato sauce evenly over dough' },
        { id: 4, step: 4, text: 'Add fresh mozzarella pieces' },
        { id: 5, step: 5, text: 'Bake for 10-12 minutes until golden' },
        { id: 6, step: 6, text: 'Top with fresh basil and serve immediately' }
      ],
      images: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 2,
      name: 'Classic Cheeseburger',
      description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
      brand: 'burger-barn',
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      prepTime: 10,
      cookTime: 8,
      servings: 1,
      difficulty: 'medium',
      cost: 6.75,
      popularity: 4,
      tags: ['popular', 'signature'],
      ingredients: [
        { id: 1, name: 'Ground Beef', quantity: '0.25', unit: 'lbs', cost: 3.00 },
        { id: 2, name: 'Burger Bun', quantity: '1', unit: 'pieces', cost: 0.75 },
        { id: 3, name: 'Cheddar Cheese', quantity: '1', unit: 'oz', cost: 1.00 },
        { id: 4, name: 'Lettuce', quantity: '2', unit: 'pieces', cost: 0.50 },
        { id: 5, name: 'Tomato', quantity: '2', unit: 'pieces', cost: 0.75 },
        { id: 6, name: 'Special Sauce', quantity: '1', unit: 'tbsp', cost: 0.75 }
      ],
      instructions: [
        { id: 1, step: 1, text: 'Form ground beef into patty and season with salt and pepper' },
        { id: 2, step: 2, text: 'Heat grill or pan to medium-high heat' },
        { id: 3, step: 3, text: 'Cook patty for 3-4 minutes per side' },
        { id: 4, step: 4, text: 'Add cheese in last minute of cooking' },
        { id: 5, step: 5, text: 'Toast bun lightly' },
        { id: 6, step: 6, text: 'Assemble burger with sauce, lettuce, tomato, and patty' }
      ],
      images: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 3,
      name: 'Chicken Tacos',
      description: 'Grilled chicken with fresh salsa, avocado, and lime',
      brand: 'taco-time',
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
      prepTime: 20,
      cookTime: 15,
      servings: 3,
      difficulty: 'medium',
      cost: 9.25,
      popularity: 4,
      tags: ['gluten-free', 'popular'],
      ingredients: [
        { id: 1, name: 'Chicken Breast', quantity: '0.5', unit: 'lbs', cost: 4.00 },
        { id: 2, name: 'Corn Tortillas', quantity: '6', unit: 'pieces', cost: 1.50 },
        { id: 3, name: 'Avocado', quantity: '1', unit: 'pieces', cost: 1.25 },
        { id: 4, name: 'Tomatoes', quantity: '2', unit: 'pieces', cost: 1.00 },
        { id: 5, name: 'Onion', quantity: '0.25', unit: 'pieces', cost: 0.50 },
        { id: 6, name: 'Lime', quantity: '1', unit: 'pieces', cost: 0.50 },
        { id: 7, name: 'Cilantro', quantity: '0.25', unit: 'cups', cost: 0.50 }
      ],
      instructions: [
        { id: 1, step: 1, text: 'Season chicken with cumin, chili powder, salt, and pepper' },
        { id: 2, step: 2, text: 'Grill chicken for 6-7 minutes per side until cooked through' },
        { id: 3, step: 3, text: 'Let chicken rest, then slice into strips' },
        { id: 4, step: 4, text: 'Dice tomatoes and onions for salsa' },
        { id: 5, step: 5, text: 'Warm tortillas on griddle' },
        { id: 6, step: 6, text: 'Assemble tacos with chicken, salsa, avocado, and cilantro' },
        { id: 7, step: 7, text: 'Serve with lime wedges' }
      ],
      images: [
        'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 4,
      name: 'California Roll',
      description: 'Fresh crab, avocado, and cucumber wrapped in nori and rice',
      brand: 'sushi-spot',
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
      prepTime: 30,
      cookTime: 0,
      servings: 2,
      difficulty: 'hard',
      cost: 12.50,
      popularity: 3,
      tags: ['gluten-free', 'signature'],
      ingredients: [
        { id: 1, name: 'Sushi Rice', quantity: '1', unit: 'cups', cost: 2.00 },
        { id: 2, name: 'Nori Sheets', quantity: '2', unit: 'pieces', cost: 1.00 },
        { id: 3, name: 'Crab Meat', quantity: '4', unit: 'oz', cost: 6.00 },
        { id: 4, name: 'Avocado', quantity: '1', unit: 'pieces', cost: 1.25 },
        { id: 5, name: 'Cucumber', quantity: '0.5', unit: 'pieces', cost: 0.75 },
        { id: 6, name: 'Sesame Seeds', quantity: '1', unit: 'tbsp', cost: 0.50 },
        { id: 7, name: 'Rice Vinegar', quantity: '2', unit: 'tbsp', cost: 1.00 }
      ],
      instructions: [
        { id: 1, step: 1, text: 'Prepare sushi rice with rice vinegar seasoning' },
        { id: 2, step: 2, text: 'Place nori sheet on bamboo mat' },
        { id: 3, step: 3, text: 'Spread rice evenly over nori, leaving 1-inch border' },
        { id: 4, step: 4, text: 'Flip nori so rice is on bottom' },
        { id: 5, step: 5, text: 'Add crab, avocado, and cucumber in center' },
        { id: 6, step: 6, text: 'Roll tightly using bamboo mat' },
        { id: 7, step: 7, text: 'Sprinkle with sesame seeds and slice into 8 pieces' }
      ],
      images: [
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 5,
      name: 'Truffle Risotto',
      description: 'Creamy arborio rice with truffle oil and parmesan cheese',
      brand: 'pizza-palace',
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
      prepTime: 10,
      cookTime: 25,
      servings: 4,
      difficulty: 'hard',
      cost: 15.75,
      popularity: 2,
      tags: ['vegetarian', 'signature'],
      ingredients: [
        { id: 1, name: 'Arborio Rice', quantity: '1.5', unit: 'cups', cost: 3.00 },
        { id: 2, name: 'Vegetable Broth', quantity: '4', unit: 'cups', cost: 2.00 },
        { id: 3, name: 'White Wine', quantity: '0.5', unit: 'cups', cost: 2.50 },
        { id: 4, name: 'Onion', quantity: '1', unit: 'pieces', cost: 1.00 },
        { id: 5, name: 'Parmesan Cheese', quantity: '1', unit: 'cups', cost: 4.00 },
        { id: 6, name: 'Truffle Oil', quantity: '2', unit: 'tbsp', cost: 3.00 },
        { id: 7, name: 'Butter', quantity: '2', unit: 'tbsp', cost: 0.25 }
      ],
      instructions: [
        { id: 1, step: 1, text: 'Heat vegetable broth in separate pot and keep warm' },
        { id: 2, step: 2, text: 'Sauté diced onion in butter until translucent' },
        { id: 3, step: 3, text: 'Add arborio rice and stir for 2 minutes' },
        { id: 4, step: 4, text: 'Add white wine and stir until absorbed' },
        { id: 5, step: 5, text: 'Add warm broth one ladle at a time, stirring constantly' },
        { id: 6, step: 6, text: 'Continue until rice is creamy and al dente (20-25 minutes)' },
        { id: 7, step: 7, text: 'Stir in parmesan cheese and truffle oil before serving' }
      ],
      images: [
        'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 6,
      name: 'BBQ Wings',
      description: 'Crispy chicken wings tossed in tangy BBQ sauce',
      brand: 'burger-barn',
      category: 'appetizers',
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop',
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      difficulty: 'easy',
      cost: 8.25,
      popularity: 5,
      tags: ['popular', 'spicy'],
      ingredients: [
        { id: 1, name: 'Chicken Wings', quantity: '2', unit: 'lbs', cost: 5.00 },
        { id: 2, name: 'BBQ Sauce', quantity: '0.5', unit: 'cups', cost: 1.50 },
        { id: 3, name: 'Hot Sauce', quantity: '1', unit: 'tbsp', cost: 0.25 },
        { id: 4, name: 'Garlic Powder', quantity: '1', unit: 'tsp', cost: 0.25 },
        { id: 5, name: 'Paprika', quantity: '1', unit: 'tsp', cost: 0.25 },
        { id: 6, name: 'Salt', quantity: '1', unit: 'tsp', cost: 0.10 },
        { id: 7, name: 'Black Pepper', quantity: '0.5', unit: 'tsp', cost: 0.10 },
        { id: 8, name: 'Vegetable Oil', quantity: '2', unit: 'tbsp', cost: 0.80 }
      ],
      instructions: [
        { id: 1, step: 1, text: 'Preheat oven to 425°F (220°C)' },
        { id: 2, step: 2, text: 'Pat wings dry and season with salt, pepper, garlic powder, and paprika' },
        { id: 3, step: 3, text: 'Toss wings with vegetable oil' },
        { id: 4, step: 4, text: 'Arrange on baking sheet and bake for 20-25 minutes' },
        { id: 5, step: 5, text: 'Mix BBQ sauce with hot sauce' },
        { id: 6, step: 6, text: 'Toss cooked wings in sauce mixture' },
        { id: 7, step: 7, text: 'Serve immediately with celery sticks and ranch dressing' }
      ],
      images: [
        'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop'
      ]
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setActiveView('recipes');
  };

  const handleNewRecipe = () => {
    setSelectedRecipe(null);
    setActiveView('recipes');
  };

  const handleSaveRecipe = (recipeData) => {
    console.log('Saving recipe:', recipeData);
    // Here you would typically save to your backend
    setSelectedRecipe(null);
  };

  const handleCancelEdit = () => {
    setSelectedRecipe(null);
  };

  const viewTabs = [
    { id: 'recipes', label: 'Recipe Editor', icon: 'ChefHat' },
    { id: 'engineering', label: 'Menu Engineering', icon: 'BarChart3' },
    { id: 'seasonal', label: 'Seasonal Menus', icon: 'Calendar' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {/* Main Content */}
      <div className={`transition-layout ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        {/* Header */}
        <Header
          onMenuToggle={handleSidebarToggle}
          isMenuOpen={isSidebarOpen}
        />

        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Recipe & Menu Management</h1>
                  <p className="text-muted-foreground">
                    Create, optimize, and manage recipes with cost analysis and menu engineering
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="hidden lg:flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{recipes?.length}</p>
                    <p className="text-xs text-muted-foreground">Total Recipes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">
                      {recipes?.filter(r => r?.tags?.includes('popular'))?.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Popular Items</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      ${recipes?.reduce((sum, r) => sum + r?.cost, 0)?.toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Cost</p>
                  </div>
                </div>
              </div>

              {/* View Tabs */}
              <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
                {viewTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveView(tab?.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-micro
                      ${activeView === tab?.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="hidden sm:inline">{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="h-[calc(100vh-200px)]">
              {activeView === 'recipes' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                  {/* Recipe Library - 4 columns */}
                  <div className="lg:col-span-4 h-full">
                    <RecipeLibrary
                      recipes={recipes}
                      selectedRecipe={selectedRecipe}
                      onRecipeSelect={handleRecipeSelect}
                      onNewRecipe={handleNewRecipe}
                    />
                  </div>

                  {/* Recipe Editor - 8 columns */}
                  <div className="lg:col-span-8 h-full">
                    <RecipeEditor
                      recipe={selectedRecipe}
                      onSave={handleSaveRecipe}
                      onCancel={handleCancelEdit}
                    />
                  </div>
                </div>
              )}

              {activeView === 'engineering' && (
                <MenuEngineering recipes={recipes} />
              )}

              {activeView === 'seasonal' && (
                <SeasonalMenuManager />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecipeMenuManagement;