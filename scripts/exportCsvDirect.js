import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS } from '../src/data/productsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const headers = [
  'ID',
  'Type',
  'SKU',
  'Name',
  'Published',
  'Is featured?',
  'Visibility in catalog',
  'Short description',
  'Description',
  'Date sale price starts',
  'Date sale price ends',
  'Tax status',
  'Tax class',
  'In stock?',
  'Stock',
  'Backorders allowed?',
  'Sold individually?',
  'Weight (kg)',
  'Length (cm)',
  'Width (cm)',
  'Height (cm)',
  'Allow customer reviews?',
  'Purchase note',
  'Sale price',
  'Regular price',
  'Categories',
  'Tags',
  'Shipping class',
  'Images',
  'Download limit',
  'Download expiry days',
  'Parent',
  'Grouped products',
  'Upsells',
  'Cross-sells',
  'External URL',
  'Button text',
  'Position',
  'Attribute 1 name',
  'Attribute 1 value(s)',
  'Attribute 1 visible',
  'Attribute 1 global',
  'Attribute 2 name',
  'Attribute 2 value(s)',
  'Attribute 2 visible',
  'Attribute 2 global',
  'Attribute 3 name',
  'Attribute 3 value(s)',
  'Attribute 3 visible',
  'Attribute 3 global'
];

const escapeCsv = (str) => {
  if (str === null || str === undefined) return '""';
  const escaped = String(str).replace(/"/g, '""');
  return `"${escaped}"`;
};

const rows = PRODUCTS.map((p) => {
  const sizeValues = p.sizes.join(', ');
  const colorValues = p.colors.map((c) => c.name).join(', ');
  const imageUrls = p.images.join(', ');

  return [
    p.id,
    'variable',
    p.sku,
    p.name,
    '1',
    p.isBestSeller ? '1' : '0',
    'visible',
    p.shortDescription,
    p.description,
    '',
    '',
    'taxable',
    'standard',
    p.stock > 0 ? '1' : '0',
    p.stock,
    '0',
    '0',
    '0.35',
    '30',
    '25',
    '3',
    '1',
    '',
    p.salePrice,
    p.price,
    p.category,
    p.tags.join(', '),
    '',
    imageUrls,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '0',
    'Size',
    sizeValues,
    '1',
    '1',
    'Color',
    colorValues,
    '1',
    '1',
    'GSM',
    p.gsm,
    '1',
    '1'
  ].map(escapeCsv).join(',');
});

const csvContent = [headers.map(escapeCsv).join(','), ...rows].join('\r\n');
const outPath = path.resolve(__dirname, '../axdoro_woocommerce_200_products.csv');
fs.writeFileSync(outPath, csvContent, 'utf-8');
console.log(`Successfully generated WooCommerce Master CSV with ${PRODUCTS.length} products to: ${outPath}`);
