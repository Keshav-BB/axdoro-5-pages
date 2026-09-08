import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Curated high-aesthetic streetwear photos from Unsplash
const STREETWEAR_IMAGES = [
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618354691438-25bc04584c03?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578632767114-114407b4695b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80'
];

const COLORS_POOL = [
  { name: 'Urban Black', hex: '#111111' },
  { name: 'Off White', hex: '#F7F5F0' },
  { name: 'Washed Charcoal', hex: '#3A3A3C' },
  { name: 'Sage Green', hex: '#607062' },
  { name: 'Sand Dune', hex: '#D2BBA0' },
  { name: 'Mocha Brown', hex: '#583D2C' },
  { name: 'Terracotta', hex: '#A3523B' },
  { name: 'Navy Blue', hex: '#1B263B' },
  { name: 'Muted Olive', hex: '#4A5320' },
  { name: 'Slate Grey', hex: '#707784' }
];

const OVERSIZED_TITLES = [
  'AXDORO Signature Oversized Heavy Tee',
  'Tokyo Neon Cyberpunk Drop Shoulder Tee',
  'Urban Nomad Heavyweight Boxy Tee',
  'Renaissance Glitch 240 GSM Tee',
  'Monochrome Heavyweight Streetwear Tee',
  'Astral Dimension Backprint Oversized Tee',
  'Nocturnal Rebellion Drop Shoulder Tee',
  'Concrete Jungle Typography Heavy Tee',
  'Kinetic Motion Graphic Oversized Tee',
  'Raw Edge Heavyweight Boxy Tee',
  'Neo-Industrial Minimal Drop Tee',
  'Shadow Core Heavyweight Oversized Tee',
  'Subversive Arts Heavy Cotton Tee',
  'Distortion Vector Graphic Tee',
  'Metropolis Heavyweight Street Tee',
  'Subterranean Echo Oversized Tee',
  'Aesthetic Void High-Density Tee',
  'Infinite Canvas Drop Shoulder Tee',
  'Zero Gravity Heavy Boxy Tee',
  'Apex Predator Streetwear Oversized Tee'
];

const GRAPHIC_TITLES = [
  'Aetherial Spectrum Backprint Graphic Tee',
  'Cyber Shinjuku High-Density Graphic Tee',
  'Ethereal Mind Typography Heavyweight Tee',
  'Vanguard Division Heavy Graphic Drop',
  'Hyperdrive Distortion Oversized Tee',
  'Solar Flare Screenprint Boxy Tee',
  'Digital Horizon Graphic Street Tee',
  'Obsidian Relic Heavyweight Graphic Tee',
  'Sonic Pulse Oversized Streetwear Tee',
  'Phantom State Typography Tee',
  'Vortex Dimension Graphic Tee',
  'Neural Matrix 240 GSM Streetwear Tee',
  'Quantum Shift Screenprint Heavy Tee',
  'Retro Futura High-Density Tee',
  'Midnight Odyssey Graphic Oversized Tee'
];

const ACID_TITLES = [
  'Acid Washed Charcoal Heavy Oversized Tee',
  'Vintage Sun-Faded Olive Boxy Drop Tee',
  'Mineral Washed Dune Heavy Cotton Tee',
  'Distressed Slate Artisanal Wash Tee',
  'Stone Washed Rust Heavyweight Drop Tee',
  'Pigment Dyed Espresso Boxy Tee',
  'Salt Washed Indigo Heavyweight Tee',
  'Desert Ash Mineral Washed Oversized Tee',
  'Aged Graphite Distressed Streetwear Tee',
  'Terra Cotta Vintage Washed Heavy Tee'
];

const MINIMAL_TITLES = [
  'Essential Minimalist 240 GSM Tee',
  'Architectural Pure Cut Heavy Tee',
  'Blank Canvas Drop Shoulder Tee',
  'Clean Geometry Heavyweight Cotton Tee',
  'Subtle Luxury Bio-Washed Plain Tee',
  'Zero-Branding Heavy Boxy Tee',
  'Refined Silhouette Drop Shoulder Tee',
  'Atelier Heavyweight Combed Cotton Tee',
  'Core Foundation Oversized Blank Tee',
  'Pure Drape 240 GSM Combed Cotton Tee'
];

const HOODIE_TITLES = [
  '380 GSM Heavy French Terry Pullover Hoodie',
  'Architectural Boxy Cut Streetwear Hoodie',
  'Dropped Shoulder Heavyweight Zip Hoodie',
  'Thermal Lined Oversized Street Hoodie',
  'Minimalist High-Density Fleece Hoodie',
  'Brutalist Raw Edge Heavyweight Hoodie',
  'Vintage Washed French Terry Hoodie',
  'Double-Hooded Heavyweight Street Hoodie'
];

const CARGO_TITLES = [
  'Tactical Relaxed Utility Cargo Pant',
  'Wide-Leg Streetwear Heavy Twill Pant',
  'Modular Pocket Relaxed Skate Cargo',
  'Obsidian Heavyweight Cotton Jogger',
  'Double Knee Reinforced Street Pant',
  'Pleated Relaxed Silhouette Chino Cargo',
  'Adjustable Hem Heavy Twill Cargo',
  'Military Spec Heavy Cotton Utility Pant'
];

const products = [];
let idCounter = 1;

function generateCategoryProducts(categoryName, categorySlug, baseTitles, count, prefix, gsm, fit, sleeve, basePrice, baseSalePrice) {
  for (let i = 0; i < count; i++) {
    const titleBase = baseTitles[i % baseTitles.length];
    const variantIndex = Math.floor(i / baseTitles.length) + 1;
    const variantSuffix = variantIndex > 1 ? ` Edition ${variantIndex}` : '';
    const name = `${titleBase}${variantSuffix}`;
    const sku = `AX-${prefix}-${String(idCounter).padStart(3, '0')}`;
    
    // Pick 2-3 colors
    const colorStart = (i * 2) % COLORS_POOL.length;
    const selectedColors = [
      COLORS_POOL[colorStart],
      COLORS_POOL[(colorStart + 1) % COLORS_POOL.length],
      COLORS_POOL[(colorStart + 3) % COLORS_POOL.length]
    ];
    
    // Pick images
    const imgIndex1 = (i * 3) % STREETWEAR_IMAGES.length;
    const imgIndex2 = (i * 3 + 1) % STREETWEAR_IMAGES.length;
    const imgIndex3 = (i * 3 + 2) % STREETWEAR_IMAGES.length;
    const images = [
      STREETWEAR_IMAGES[imgIndex1],
      STREETWEAR_IMAGES[imgIndex2],
      STREETWEAR_IMAGES[imgIndex3]
    ];

    const priceVariation = (i % 5) * 100;
    const price = basePrice + priceVariation;
    const salePrice = baseSalePrice + priceVariation;

    const rating = +(4.6 + ((i % 4) * 0.1)).toFixed(1);
    const reviewsCount = 18 + ((i * 7) % 190);
    const stock = 10 + ((i * 13) % 45);

    products.push({
      id: idCounter,
      sku,
      name,
      category: categoryName,
      categorySlug,
      fit,
      sleeve,
      gsm,
      price,
      salePrice,
      colors: selectedColors,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      stock,
      rating,
      reviewsCount,
      isNew: i % 4 === 0,
      isBestSeller: i % 5 === 1,
      images,
      shortDescription: `Engineered from signature ${gsm} combed cotton with a structured drop-shoulder drape and durable non-curling collar.`,
      description: `The ${name} is crafted for individuals who appreciate architectural structure and superior drape. Woven from 100% long-staple combed cotton at ${gsm}, it offers the ideal heft without feeling suffocating. Features double-needle reinforced chain stitching at the shoulders, custom ribbed collar that retains its shape wash after wash, and pre-shrunk bio-wash finishing for supreme softness.`,
      details: [
        `Fabric: 100% Super Combed Cotton (${gsm})`,
        'Finish: Bio-washed, silicone softened, pre-shrunk',
        'Fit: Drop-shoulder silhouette with relaxed chest',
        'Collar: 1.25" Lycra ribbed non-sag crew neck',
        'Stitching: Double-needle reinforced seams',
        'Care: Machine wash cold inside out, dry in shade'
      ],
      tags: ['streetwear', gsm.toLowerCase().replace(' ', ''), fit.toLowerCase(), 'axdoro', 'heavyweight']
    });

    idCounter++;
  }
}

// 1. Oversized T-Shirts (50 items)
generateCategoryProducts(
  'Oversized T-Shirts',
  'oversized-tees',
  OVERSIZED_TITLES,
  50,
  'OS',
  '240 GSM',
  'Oversized',
  'Half Sleeve',
  1499,
  999
);

// 2. Graphic Drops (45 items)
generateCategoryProducts(
  'Graphic Streetwear',
  'graphic-drops',
  GRAPHIC_TITLES,
  45,
  'GR',
  '240 GSM',
  'Boxy',
  'Half Sleeve',
  1699,
  1199
);

// 3. Acid Wash & Vintage (35 items)
generateCategoryProducts(
  'Acid Wash & Vintage',
  'acid-wash',
  ACID_TITLES,
  35,
  'AW',
  '240 GSM',
  'Oversized',
  'Half Sleeve',
  1799,
  1299
);

// 4. Minimal Basics (30 items)
generateCategoryProducts(
  'Minimal Basics (240 GSM)',
  'minimal-basics',
  MINIMAL_TITLES,
  30,
  'MB',
  '240 GSM',
  'Relaxed',
  'Half Sleeve',
  1399,
  899
);

// 5. Hoodies (25 items)
generateCategoryProducts(
  'Heavyweight Hoodies',
  'hoodies',
  HOODIE_TITLES,
  25,
  'HD',
  '380 GSM',
  'Oversized',
  'Full Sleeve',
  2799,
  2199
);

// 6. Cargos & Bottoms (25 items)
generateCategoryProducts(
  'Cargos & Utility Pants',
  'cargos-bottoms',
  CARGO_TITLES,
  25,
  'CG',
  '280 GSM',
  'Relaxed',
  'Full Length',
  2499,
  1899
);

const outContent = `// AXDORO Master Streetwear Product Catalogue (210 Products)
// Auto-generated catalogue with variants, SKUs, GSM, and attributes
export const PRODUCTS = ${JSON.stringify(products, null, 2)};
`;

const targetPath = path.resolve(__dirname, '../src/data/productsData.js');
fs.writeFileSync(targetPath, outContent, 'utf-8');
console.log(`Successfully generated ${products.length} products to ${targetPath}`);
