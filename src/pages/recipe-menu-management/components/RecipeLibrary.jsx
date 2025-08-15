import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RecipeLibrary = ({ recipes, selectedRecipe, onRecipeSelect, onNewRecipe }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const brandOptions = [
    { value: 'all', label: 'All Brands' },
    { value: 'pizza-palace', label: 'Pizza Palace' },
    { value: 'burger-barn', label: 'Burger Barn' },
    { value: 'taco-time', label: 'Taco Time' },
    { value: 'sushi-spot', label: 'Sushi Spot' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'appetizers', label: 'Appetizers' },
    { value: 'mains', label: 'Main Courses' },
    { value: 'sides', label: 'Sides' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'beverages', label: 'Beverages' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Recipes' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'quick-prep', label: 'Quick Prep (<15 min)' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const filteredRecipes = recipes?.filter(recipe => {
    const matchesSearch = recipe?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         recipe?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || recipe?.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'all' || recipe?.category === selectedCategory;
    const matchesFilter = selectedFilter === 'all' || recipe?.tags?.includes(selectedFilter);
    
    return matchesSearch && matchesBrand && matchesCategory && matchesFilter;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getPopularityStars = (popularity) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < popularity ? 'Star' : 'Star'}
        size={12}
        className={i < popularity ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recipe Library</h2>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            onClick={onNewRecipe}
          >
            New Recipe
          </Button>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="mb-3"
        />

        {/* Filters */}
        <div className="space-y-2">
          <Select
            options={brandOptions}
            value={selectedBrand}
            onChange={setSelectedBrand}
            placeholder="Select brand"
          />
          
          <div className="grid grid-cols-2 gap-2">
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Category"
            />
            <Select
              options={filterOptions}
              value={selectedFilter}
              onChange={setSelectedFilter}
              placeholder="Filter"
            />
          </div>
        </div>
      </div>
      {/* Recipe List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {filteredRecipes?.map((recipe) => (
            <div
              key={recipe?.id}
              onClick={() => onRecipeSelect(recipe)}
              className={`
                p-3 rounded-lg border cursor-pointer transition-micro hover-scale
                ${selectedRecipe?.id === recipe?.id 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              <div className="flex gap-3">
                {/* Recipe Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <Image
                    src={recipe?.image}
                    alt={recipe?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Recipe Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-foreground text-sm truncate">
                      {recipe?.name}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      {getPopularityStars(recipe?.popularity)}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {recipe?.description}
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        <Icon name="Clock" size={12} className="inline mr-1" />
                        {recipe?.prepTime}min
                      </span>
                      <span className={getDifficultyColor(recipe?.difficulty)}>
                        <Icon name="TrendingUp" size={12} className="inline mr-1" />
                        {recipe?.difficulty}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">
                      ${recipe?.cost?.toFixed(2)}
                    </span>
                  </div>

                  {/* Tags */}
                  {recipe?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {recipe?.tags?.slice(0, 2)?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {recipe?.tags?.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{recipe?.tags?.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No recipes found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
              onClick={() => {
                setSearchTerm('');
                setSelectedBrand('all');
                setSelectedCategory('all');
                setSelectedFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      {/* Stats Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{filteredRecipes?.length} recipes</span>
          <span>Updated 2 hours ago</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeLibrary;