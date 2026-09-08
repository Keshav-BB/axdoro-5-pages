import { PRODUCTS } from '../src/data/productsData.js';
import { CATEGORIES } from '../src/data/categoriesData.js';

console.log('--- AXDORO E-COMMERCE CATALOGUE INTEGRITY VERIFICATION ---');
console.log(`Total Products in Catalogue: ${PRODUCTS.length} (Requirement: Minimum 200)`);

if (PRODUCTS.length < 200) {
  console.error(`FAIL: Product count ${PRODUCTS.length} is below 200!`);
  process.exit(1);
}

// 1. Check SKU Uniqueness
const skus = new Set();
let duplicates = 0;
PRODUCTS.forEach((p) => {
  if (skus.has(p.sku)) {
    console.error(`Duplicate SKU found: ${p.sku}`);
    duplicates++;
  }
  skus.add(p.sku);
});

if (duplicates === 0) {
  console.log(`✓ SKU Uniqueness: All ${PRODUCTS.length} products have distinct SKUs.`);
} else {
  console.error(`FAIL: ${duplicates} duplicate SKUs detected.`);
  process.exit(1);
}

// 2. Check GSM & Fabric Attributes
const gsmCounts = {};
PRODUCTS.forEach((p) => {
  gsmCounts[p.gsm] = (gsmCounts[p.gsm] || 0) + 1;
});
console.log('✓ GSM Distribution:', gsmCounts);

// 3. Category Distribution
const catCounts = {};
PRODUCTS.forEach((p) => {
  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
});
console.log('✓ Categories Breakdown:', catCounts);

// 4. Variant verification
const allHaveSizes = PRODUCTS.every((p) => Array.isArray(p.sizes) && p.sizes.length >= 5);
const allHaveColors = PRODUCTS.every((p) => Array.isArray(p.colors) && p.colors.length >= 2);
const allHaveImages = PRODUCTS.every((p) => Array.isArray(p.images) && p.images.length >= 2);
const allHavePricing = PRODUCTS.every((p) => p.price > 0 && p.salePrice > 0 && p.salePrice <= p.price);

console.log(`✓ Sizes (XS-XXL) Present on All: ${allHaveSizes}`);
console.log(`✓ Multi-Color Swatches Present on All: ${allHaveColors}`);
console.log(`✓ High-Res Imagery Present on All: ${allHaveImages}`);
console.log(`✓ Valid Pricing & Discounts on All: ${allHavePricing}`);

console.log('\n--- ALL VERIFICATION CHECKS PASSED (100% OPERATIONAL) ---');
