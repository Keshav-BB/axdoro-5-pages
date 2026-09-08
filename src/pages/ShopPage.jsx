import React, { useState, useMemo } from 'react';
import { Filter, X, SlidersHorizontal, ChevronDown, Check, ArrowUpDown, RotateCcw, Sparkles } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { CATEGORIES, FITS, GSM_OPTIONS, COLOR_SWATCHES, SIZES } from '../data/categoriesData';

export default function ShopPage({
  products,
  initialCategory,
  onProductClick,
  onQuickView,
  onOpenSizeGuide,
  onNavigate
}) {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFit, setSelectedFit] = useState('All');
  const [selectedGsm, setSelectedGsm] = useState('All');
  const [selectedSleeve, setSelectedSleeve] = useState('All');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  
  // Sort State
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'newest' | 'bestseller' | 'price-low' | 'price-high' | 'rating'

  // Pagination / Load More
  const [visibleCount, setVisibleCount] = useState(16);

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Fit
      if (selectedFit !== 'All' && p.fit !== selectedFit) {
        return false;
      }
      // GSM
      if (selectedGsm !== 'All' && p.gsm !== selectedGsm) {
        return false;
      }
      // Sleeve
      if (selectedSleeve !== 'All' && p.sleeve !== selectedSleeve) {
        return false;
      }
      // Max Price
      if (p.salePrice > maxPrice) {
        return false;
      }
      // In Stock
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = selectedSizes.some((s) => p.sizes.includes(s));
        if (!hasSize) return false;
      }
      // Colors
      if (selectedColors.length > 0) {
        const hasColor = selectedColors.some((cName) =>
          p.colors.some((c) => c.name.toLowerCase() === cName.toLowerCase())
        );
        if (!hasColor) return false;
      }
      // Local Search Filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchTitle = p.name.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchTitle && !matchSku && !matchCat) return false;
      }

      return true;
    });
  }, [
    products,
    selectedCategory,
    selectedSizes,
    selectedColors,
    selectedFit,
    selectedGsm,
    selectedSleeve,
    maxPrice,
    inStockOnly,
    searchFilter,
  ]);

  // Sort Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'newest') {
      return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    if (sortBy === 'bestseller') {
      return list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.salePrice - b.salePrice);
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.salePrice - a.salePrice);
    }
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list; // 'featured'
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  // Active filters count
  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedFit !== 'All' ? 1 : 0) +
    (selectedGsm !== 'All' ? 1 : 0) +
    (selectedSleeve !== 'All' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (maxPrice < 3000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchFilter ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFit('All');
    setSelectedGsm('All');
    setSelectedSleeve('All');
    setMaxPrice(3000);
    setInStockOnly(false);
    setSearchFilter('');
    setVisibleCount(16);
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  // Reusable Filter Sidebar Content
  const renderFilterPanel = () => (
    <div className="space-y-6 text-xs text-[#111111]">
      {/* Category */}
      <div>
        <h4 className="font-heading font-bold uppercase tracking-wider text-xs mb-2.5 text-[#111111]">
          Categories
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`w-full text-left py-1 px-2 rounded font-semibold transition-colors flex items-center justify-between ${
              selectedCategory === 'All' ? 'bg-[#111111] text-[#F7F5F0]' : 'hover:bg-[#FAF8F5]'
            }`}
          >
            <span>All Streetwear</span>
            <span>{products.length}</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`w-full text-left py-1 px-2 rounded font-semibold transition-colors flex items-center justify-between ${
                selectedCategory === cat.name ? 'bg-[#111111] text-[#F7F5F0]' : 'hover:bg-[#FAF8F5]'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[#5F6368] font-normal">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fit Silhouette */}
      <div className="pt-4 border-t border-[#E2DED6]">
        <h4 className="font-heading font-bold uppercase tracking-wider text-xs mb-2.5 text-[#111111]">
          Silhouette / Fit
        </h4>
        <div className="space-y-1">
          {['All', 'Oversized', 'Boxy', 'Relaxed'].map((fit) => (
            <label key={fit} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input
                type="radio"
                name="fitRadio"
                checked={selectedFit === fit}
                onChange={() => setSelectedFit(fit)}
                className="accent-[#111111]"
              />
              <span className={selectedFit === fit ? 'font-bold' : ''}>{fit === 'All' ? 'All Fits' : fit}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fabric GSM */}
      <div className="pt-4 border-t border-[#E2DED6]">
        <h4 className="font-heading font-bold uppercase tracking-wider text-xs mb-2.5 text-[#111111]">
          Fabric Weight (GSM)
        </h4>
        <div className="space-y-1">
          {['All', '240 GSM', '380 GSM', '280 GSM'].map((gsm) => (
            <label key={gsm} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input
                type="radio"
                name="gsmRadio"
                checked={selectedGsm === gsm}
                onChange={() => setSelectedGsm(gsm)}
                className="accent-[#111111]"
              />
              <span className={selectedGsm === gsm ? 'font-bold text-[#C9A96E]' : ''}>
                {gsm === 'All' ? 'All Fabric Weights' : gsm}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="pt-4 border-t border-[#E2DED6]">
        <div className="flex justify-between items-center mb-2.5">
          <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-[#111111]">
            Sizes
          </h4>
          <button
            onClick={() => onOpenSizeGuide('oversized-tees')}
            className="text-[10px] text-[#C9A96E] hover:underline font-bold uppercase"
          >
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {SIZES.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-1.5 text-xs font-bold rounded border transition-all ${
                  isSelected
                    ? 'bg-[#111111] text-[#F7F5F0] border-[#111111]'
                    : 'bg-white text-[#111111] border-[#E2DED6] hover:border-[#111111]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="pt-4 border-t border-[#E2DED6]">
        <h4 className="font-heading font-bold uppercase tracking-wider text-xs mb-2.5 text-[#111111]">
          Color Swatches
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {COLOR_SWATCHES.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center relative ${
                  isSelected
                    ? 'border-[#111111] ring-2 ring-[#C9A96E] scale-110'
                    : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {isSelected && (
                  <Check
                    size={12}
                    className={color.hex === '#F7F5F0' ? 'text-black' : 'text-white'}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider */}
      <div className="pt-4 border-t border-[#E2DED6]">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-[#111111]">
            Max Price
          </h4>
          <span className="font-bold text-[#111111]">₹{maxPrice}</span>
        </div>
        <input
          type="range"
          min="800"
          max="3000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#111111] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#5F6368] mt-1">
          <span>₹800</span>
          <span>₹3,000</span>
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-4 border-t border-[#E2DED6]">
        <label className="flex items-center gap-2 cursor-pointer font-semibold">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-[#111111] w-4 h-4 rounded"
          />
          <span>In-Stock Drops Only</span>
        </label>
      </div>

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <button
          onClick={resetAllFilters}
          className="w-full py-2 bg-[#FAF8F5] border border-[#E2DED6] hover:bg-[#E2DED6] text-[#111111] font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw size={13} />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2DED6] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#5F6368] mb-1">
            <button onClick={() => onNavigate('home')} className="hover:text-[#111111]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#111111] font-semibold">Shop Catalogue</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-4xl text-[#111111]">
            {selectedCategory === 'All' ? 'ALL STREETWEAR DROPS' : selectedCategory.toUpperCase()}
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-1">
            Showing <strong className="text-[#111111]">{sortedProducts.length}</strong> styles engineered with signature heavyweight 240 GSM combed cotton.
          </p>
        </div>

        {/* Quick Search and Sort controls */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#E2DED6] text-xs font-bold text-[#111111]"
          >
            <SlidersHorizontal size={14} />
            <span>FILTERS</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className="bg-white border border-[#E2DED6] text-xs font-semibold px-3 py-2 rounded-lg appearance-none pr-8 focus:outline-none focus:border-[#111111] cursor-pointer"
            >
              <option value="featured">Sort: Featured Drops</option>
              <option value="newest">Sort: Newest First</option>
              <option value="bestseller">Sort: Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 pointer-events-none text-[#5F6368]" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips Strip */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-xs text-[#5F6368] font-medium mr-1">Active Filters:</span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2DED6] rounded-full text-xs font-semibold">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')}><X size={12} /></button>
            </span>
          )}
          {selectedFit !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2DED6] rounded-full text-xs font-semibold">
              Fit: {selectedFit}
              <button onClick={() => setSelectedFit('All')}><X size={12} /></button>
            </span>
          )}
          {selectedGsm !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2DED6] rounded-full text-xs font-semibold text-[#C9A96E]">
              GSM: {selectedGsm}
              <button onClick={() => setSelectedGsm('All')}><X size={12} /></button>
            </span>
          )}
          {selectedSizes.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2DED6] rounded-full text-xs font-semibold">
              Size: {s}
              <button onClick={() => toggleSize(s)}><X size={12} /></button>
            </span>
          ))}
          {selectedColors.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2DED6] rounded-full text-xs font-semibold">
              Color: {c}
              <button onClick={() => toggleColor(c)}><X size={12} /></button>
            </span>
          ))}
          {maxPrice < 3000 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2DED6] rounded-full text-xs font-semibold">
              Max ₹{maxPrice}
              <button onClick={() => setMaxPrice(3000)}><X size={12} /></button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2DED6] rounded-full text-xs font-semibold">
              In Stock Only
              <button onClick={() => setInStockOnly(false)}><X size={12} /></button>
            </span>
          )}
          <button
            onClick={resetAllFilters}
            className="text-xs text-[#B3261E] hover:underline font-bold ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Shop Layout: Sidebar + Grid */}
      <div className="flex gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0 bg-[#FAF8F5] p-5 rounded-xl border border-[#E2DED6] self-start sticky top-28 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2DED6]">
            <h3 className="font-heading font-bold text-sm tracking-wide text-[#111111] flex items-center gap-2">
              <SlidersHorizontal size={15} />
              <span>REFINE DROPS</span>
            </h3>
            {activeFiltersCount > 0 && (
              <span className="text-[10px] font-bold bg-[#111111] text-white px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {renderFilterPanel()}
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1 space-y-8">
          {displayedProducts.length === 0 ? (
            <div className="bg-[#FAF8F5] p-16 rounded-2xl border border-[#E2DED6] text-center space-y-4">
              <h3 className="font-heading font-black text-xl text-[#111111]">
                No drops match your active filters
              </h3>
              <p className="text-xs text-[#5F6368] max-w-sm mx-auto">
                Try widening your price range or clearing selected sizes/colors to browse our full 200+ streetwear catalogue.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 bg-[#111111] text-[#F7F5F0] text-xs font-bold rounded hover:bg-[#C9A96E] hover:text-[#111111] transition-colors"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <>
              {/* 4-column desktop / 2-column mobile grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onProductClick}
                    onQuickView={onQuickView}
                    onOpenSizeGuide={onOpenSizeGuide}
                  />
                ))}
              </div>

              {/* Load More Pagination */}
              {visibleCount < sortedProducts.length && (
                <div className="text-center pt-8 border-t border-[#E2DED6] space-y-3">
                  <div className="text-xs text-[#5F6368]">
                    Showing <strong className="text-[#111111]">{displayedProducts.length}</strong> of{' '}
                    <strong className="text-[#111111]">{sortedProducts.length}</strong> products
                  </div>
                  <div className="w-48 h-1.5 bg-[#E2DED6] rounded-full mx-auto overflow-hidden">
                    <div
                      className="bg-[#111111] h-full rounded-full transition-all"
                      style={{ width: `${(displayedProducts.length / sortedProducts.length) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 16)}
                    className="px-8 py-3.5 bg-[#111111] hover:bg-[#C9A96E] hover:text-black text-[#F7F5F0] font-heading font-bold text-xs uppercase tracking-widest rounded transition-all shadow-md"
                  >
                    LOAD MORE DROPS (+16)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#FAF8F5] h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2DED6] mb-6">
                <h3 className="font-heading font-bold text-sm tracking-wide text-[#111111] flex items-center gap-2">
                  <SlidersHorizontal size={16} />
                  <span>FILTER DROPS</span>
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#111111] hover:text-[#C9A96E]"
                >
                  <X size={20} />
                </button>
              </div>
              {renderFilterPanel()}
            </div>
            
            <div className="pt-6 border-t border-[#E2DED6] mt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#111111] text-[#F7F5F0] rounded font-bold text-xs tracking-wider uppercase"
              >
                VIEW {sortedProducts.length} RESULTS
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
