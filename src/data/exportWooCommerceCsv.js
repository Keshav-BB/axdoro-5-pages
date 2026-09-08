/**
 * Generates a WooCommerce-compatible product CSV string from the 210-product AXDORO catalogue
 * and triggers a client-side download.
 */
export function exportProductsToWooCommerceCsv(products) {
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

  const rows = products.map((p) => {
    const sizeValues = p.sizes.join(', ');
    const colorValues = p.colors.map(c => c.name).join(', ');
    const imageUrls = p.images.join(', ');

    return [
      p.id,
      'variable',
      p.sku,
      p.name,
      '1', // Published
      p.isBestSeller ? '1' : '0',
      'visible',
      p.shortDescription,
      p.description,
      '', // Date sale start
      '', // Date sale end
      'taxable',
      'standard',
      p.stock > 0 ? '1' : '0',
      p.stock,
      '0', // Backorders
      '0', // Sold individually
      '0.35', // Weight ~350g for 240 GSM tee
      '30',
      '25',
      '3',
      '1', // Allow reviews
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
      // Attribute 1: Size
      'Size',
      sizeValues,
      '1',
      '1',
      // Attribute 2: Color
      'Color',
      colorValues,
      '1',
      '1',
      // Attribute 3: GSM
      'GSM',
      p.gsm,
      '1',
      '1'
    ].map(escapeCsv).join(',');
  });

  const csvContent = [headers.map(escapeCsv).join(','), ...rows].join('\r\n');

  // Trigger browser download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `axdoro_woocommerce_200_products_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
