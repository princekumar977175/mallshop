import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ================= MEN (1-8) =================
  {
    id: 'mall-m-01',
    name: 'Relaxed Fit French Linen Shirt',
    brand: 'URBAN FORM',
    category: 'men',
    subcategory: 'Shirts',
    price: 1899,
    mrp: 3499,
    discount: 46,
    rating: 4.6,
    reviewsCount: 1420,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Oatmeal Beige', hex: '#d9cdb8' },
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Navy Blue', hex: '#1e293b' }
    ],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Crafted from 100% Normandy flax linen, this relaxed-fit casual shirt offers unmatched breathability, drape, and effortless summer elegance. Designed with mother-of-pearl buttons and a soft Cuban collar.',
    material: '100% European Linen',
    specifications: {
      Fit: 'Relaxed Casual Fit',
      Collar: 'Resort Camp Collar',
      Sleeve: 'Full Sleeves with Barrel Cuffs',
      Origin: 'Sustainably woven in India'
    },
    careInstructions: ['Machine wash gentle 30°C', 'Do not tumble dry', 'Warm iron while damp'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: 'mall-m-02',
    name: 'Heavyweight Supima Cotton Tee',
    brand: 'ATELIER K',
    category: 'men',
    subcategory: 'T-Shirts',
    price: 999,
    mrp: 1899,
    discount: 47,
    rating: 4.7,
    reviewsCount: 2890,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Washed Black', hex: '#1c1c1c' },
      { name: 'Vintage Olive', hex: '#485344' },
      { name: 'Bone White', hex: '#f4f1ea' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A 240 GSM dense Supima cotton crewneck crafted for daily refinement. Resists shrinkage, retains its deep luster wash after wash, and has a ribbed non-sag collar.',
    material: '100% Long-Staple Supima Cotton',
    specifications: {
      Fit: 'Structured Boxy Fit',
      GSM: '240 GSM Heavyweight',
      Neckline: '1-inch Ribbed Crewneck',
      Pattern: 'Solid Minimalist'
    },
    careInstructions: ['Cold machine wash', 'Wash inside out', 'Flat dry in shade'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: true
  },
  {
    id: 'mall-m-03',
    name: 'Tailored Wool-Blend Unstructured Blazer',
    brand: 'STUDIO NOIR',
    category: 'men',
    subcategory: 'Jackets',
    price: 4999,
    mrp: 8999,
    discount: 44,
    rating: 4.8,
    reviewsCount: 640,
    sizes: ['38R', '40R', '42R', '44R'],
    colors: [
      { name: 'Charcoal Herringbone', hex: '#374151' },
      { name: 'Midnight Navy', hex: '#0f172a' }
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Italian-inspired unstructured tailoring without rigid shoulder pads. Made from high-grade tropical wool blend with partial viscose lining for effortless airport-to-boardroom transit.',
    material: '65% Fine Wool, 30% Polyester, 5% Elastane',
    specifications: {
      Closure: 'Two-Button Single Breasted',
      Lapel: 'Notch Lapel with AMF Stitching',
      Vents: 'Dual Rear Vents',
      Pockets: 'Patch Pockets + Interior Passport Pocket'
    },
    careInstructions: ['Dry clean only', 'Store on contoured wooden hanger'],
    inStock: true,
    fastDelivery: false,
    isTrending: false,
    isNewArrival: true,
    isOffer: true
  },
  {
    id: 'mall-m-04',
    name: 'Pleated Straight Leg Cotton Trousers',
    brand: 'VERVE ESSENTIALS',
    category: 'men',
    subcategory: 'Trousers',
    price: 2199,
    mrp: 3799,
    discount: 42,
    rating: 4.5,
    reviewsCount: 810,
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Khaki Stone', hex: '#d2b48c' },
      { name: 'Deep Sage', hex: '#4f5b52' },
      { name: 'Pitch Black', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Modern relaxed double-pleated trousers featuring side-adjuster tabs and a clean break at the ankle. Pairs seamlessly with smart loafers or clean trainers.',
    material: '98% Combed Cotton Twill, 2% Spandex',
    specifications: {
      Waist: 'Mid-Rise with Side Buckle Adjusters',
      Pleats: 'Double Forward Pleats',
      Pockets: 'Slant Front, Welt Rear Pockets'
    },
    careInstructions: ['Machine wash 30°C', 'Warm iron'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false
  },
  {
    id: 'mall-m-05',
    name: 'Selvedge Raw Indigo Denim Jacket',
    brand: 'NORDIC THREADS',
    category: 'men',
    subcategory: 'Jackets',
    price: 3499,
    mrp: 5999,
    discount: 41,
    rating: 4.9,
    reviewsCount: 1120,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Raw Indigo', hex: '#1f2e4d' }
    ],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80'
    ],
    description: '14oz shuttle-loomed Japanese selvedge denim jacket featuring brass shank buttons, red selvedge id on the inner placket, and durable double-needle felled seams.',
    material: '100% Selvedge Indigo Cotton (14 oz)',
    specifications: {
      Fit: 'Classic Trucker Regular Fit',
      Hardware: 'Antiqued Brass Shanks',
      Details: 'Dual Chest Flap Pockets, Interior Map Pocket'
    },
    careInstructions: ['Wash sparingly in cold water', 'Hang dry'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: true
  },
  {
    id: 'mall-m-06',
    name: 'Merino Wool Knit Polo Sweater',
    brand: 'ATELIER K',
    category: 'men',
    subcategory: 'Shirts',
    price: 2799,
    mrp: 4499,
    discount: 38,
    rating: 4.7,
    reviewsCount: 530,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Espresso Brown', hex: '#3d2b1f' },
      { name: 'Oatmeal Heather', hex: '#c5bba9' }
    ],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Ultra-fine 19.5 micron Australian Merino wool knit polo. Soft against skin with naturally thermoregulating properties for versatile day-to-night layering.',
    material: '100% Extra-Fine Merino Wool',
    specifications: {
      Gauge: '14-Gauge Fine Knit',
      Collar: '3-Button Placket with Horn Buttons',
      Hem: 'Ribbed Cuffs & Waistband'
    },
    careInstructions: ['Hand wash cold or wool cycle', 'Dry flat on towel'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: 'mall-m-07',
    name: 'Water-Repellent Technical Trench Coat',
    brand: 'STUDIO NOIR',
    category: 'men',
    subcategory: 'Jackets',
    price: 5499,
    mrp: 9999,
    discount: 45,
    rating: 4.8,
    reviewsCount: 380,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Classic Khaki', hex: '#b39f7a' },
      { name: 'Stealth Black', hex: '#18181b' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Minimalist clean-cut trench engineered with a DWR water-resistant micro-twill exterior and taped seams. Includes a detachable storm collar and throat latch.',
    material: 'Technical Nylon Twill with Hydrophobic Membrane',
    specifications: {
      Length: 'Mid-thigh (39 inches)',
      Fastening: 'Concealed Storm Placket',
      Pockets: 'Magnetic Handwarmer Pockets'
    },
    careInstructions: ['Spot clean with damp cloth', 'Gentle cold wash'],
    inStock: true,
    fastDelivery: false,
    isTrending: true,
    isNewArrival: true
  },
  {
    id: 'mall-m-08',
    name: 'Straight Leg Raw Edge Denim Jeans',
    brand: 'URBAN FORM',
    category: 'men',
    subcategory: 'Trousers',
    price: 2499,
    mrp: 4299,
    discount: 42,
    rating: 4.6,
    reviewsCount: 1650,
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Washed Indigo', hex: '#2b3e58' },
      { name: 'Faded Black', hex: '#2c2d30' }
    ],
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80'
    ],
    description: '100% rigid organic cotton jeans with a timeless 90s straight leg fit. Finished with copper rivets and vintage wash whiskering.',
    material: '100% Organic Cotton',
    specifications: {
      Fit: 'Classic Straight Leg',
      Rise: 'Mid to High Rise',
      Fly: 'Button Fly'
    },
    careInstructions: ['Turn inside out before washing', 'Cold wash'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false
  },

  // ================= WOMEN (9-16) =================
  {
    id: 'mall-w-01',
    name: 'Tiered Pleated Floral Silk-Blend Midi Dress',
    brand: 'MAISON DE LUXE',
    category: 'women',
    subcategory: 'Dresses',
    price: 3899,
    mrp: 6999,
    discount: 44,
    rating: 4.8,
    reviewsCount: 1940,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blush Rose Print', hex: '#e8b4b8' },
      { name: 'Noir Emerald', hex: '#1c3d31' }
    ],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An ethereal pleated midi dress made with a lightweight mulberry silk blend. Features romantic balloon sleeves, an elasticated smocked bodice, and graceful movement.',
    material: '35% Mulberry Silk, 65% Lenzing Ecovero Viscose',
    specifications: {
      Length: 'Midi (47 inches)',
      Neckline: 'V-Neck with delicate rouleau ties',
      Lining: '100% breathable organic cotton lining'
    },
    careInstructions: ['Gentle hand wash cold', 'Dry flat', 'Steam iron on silk setting'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: true,
    isOffer: true
  },
  {
    id: 'mall-w-02',
    name: 'Oversized Double-Breasted Tailored Wool Coat',
    brand: 'STUDIO NOIR',
    category: 'women',
    subcategory: 'Jackets',
    price: 6499,
    mrp: 11999,
    discount: 46,
    rating: 4.9,
    reviewsCount: 780,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Camel Tan', hex: '#be8a56' },
      { name: 'Onyx Black', hex: '#141414' },
      { name: 'Cream Ivory', hex: '#f7f4ee' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Iconic structured longline coat tailored from heavy double-faced wool. Features sweeping peak lapels, tortoise horn buttons, and deep flap pockets.',
    material: '80% Recycled Virgin Wool, 20% Cashmere',
    specifications: {
      Fit: 'Modern Oversized Silhouette',
      Length: 'Calf-length (48 inches)',
      Lining: 'Cupro silky satin lining'
    },
    careInstructions: ['Professional dry clean only'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: true
  },
  {
    id: 'mall-w-03',
    name: 'High-Waisted Wide Leg Tailored Trousers',
    brand: 'VERVE ESSENTIALS',
    category: 'women',
    subcategory: 'Trousers',
    price: 2299,
    mrp: 3999,
    discount: 43,
    rating: 4.7,
    reviewsCount: 1530,
    sizes: ['26', '28', '30', '32', '34'],
    colors: [
      { name: 'Chalk White', hex: '#faf9f6' },
      { name: 'Slate Charcoal', hex: '#334155' },
      { name: 'Espresso', hex: '#3a2e2b' }
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Flattering high-rise trousers with sharp pressed creases, knife pleating, and an ultra-wide fluid leg that pools elegantly over pointed heels or chunky loafers.',
    material: '72% Polyester, 24% Rayon, 4% Spandex',
    specifications: {
      Rise: 'Ultra High Rise (12 inches)',
      Closure: 'Concealed hook and bar with zip fly',
      Cut: 'Wide Leg Floor Skimming'
    },
    careInstructions: ['Machine wash 30°C delicate', 'Line dry in shade'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: 'mall-w-04',
    name: 'Pure Mulberry Silk Camisole Top',
    brand: 'MAISON DE LUXE',
    category: 'women',
    subcategory: 'Shirts',
    price: 1899,
    mrp: 3299,
    discount: 42,
    rating: 4.8,
    reviewsCount: 920,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Gold', hex: '#e4d3b6' },
      { name: 'Midnight Black', hex: '#111827' },
      { name: 'Pearl White', hex: '#ffffff' }
    ],
    images: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80'
    ],
    description: '100% 22-Momme Grade-6A Mulberry silk camisole cut on the bias for a liquid-like drape. Featuring delicate adjustable straps and a flattering cowl neckline.',
    material: '100% Grade-6A Pure Mulberry Silk (22 Momme)',
    specifications: {
      Neckline: 'Subtle Cowl Neck',
      Straps: 'Adjustable Spaghetti Straps',
      Seams: 'French Seams Throughout'
    },
    careInstructions: ['Hand wash cold with silk detergent', 'Do not wring'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: true
  },
  {
    id: 'mall-w-05',
    name: 'Ribbed Cashmere-Touch Knit Cardigan',
    brand: 'ATELIER K',
    category: 'women',
    subcategory: 'Jackets',
    price: 2599,
    mrp: 4499,
    discount: 42,
    rating: 4.6,
    reviewsCount: 1140,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Soft Sage', hex: '#9caf88' },
      { name: 'Buttercream', hex: '#f6eedb' },
      { name: 'Charcoal', hex: '#2e3033' }
    ],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Ultra-soft chunky ribbed knit cardigan with sculptural tortoiseshell buttons and drop shoulders. Perfect for transitional seasonal layering.',
    material: '50% Viscose, 28% Polyester, 22% Polyamide (Cashmere Finish)',
    specifications: {
      Fit: 'Relaxed Slouchy Fit',
      Buttons: 'Natural Horn Tortoiseshell Buttons',
      Knit: '7-Gauge Chunky Fishermans Rib'
    },
    careInstructions: ['Machine wash wool cycle', 'Reshape while wet'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false
  },
  {
    id: 'mall-w-06',
    name: 'Sculpted Linen Wrap Midi Skirt',
    brand: 'VERVE ESSENTIALS',
    category: 'women',
    subcategory: 'Dresses',
    price: 1999,
    mrp: 3499,
    discount: 43,
    rating: 4.5,
    reviewsCount: 610,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Terracotta', hex: '#cb6d51' },
      { name: 'Sand Dune', hex: '#d8cbb8' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Flattering asymmetrical true-wrap skirt constructed from washed European flax linen. Features side tie fastening and a soft curved tulip hem.',
    material: '100% Pure Flax Linen',
    specifications: {
      Closure: 'Interior Button + Exterior Self Tie',
      Length: '33 inches (Below knee)',
      Lining: 'Unlined for natural breathability'
    },
    careInstructions: ['Machine wash gentle 30°C', 'Warm iron'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: false
  },
  {
    id: 'mall-w-07',
    name: 'Structured Cotton Poplin Boyfriend Shirt',
    brand: 'URBAN FORM',
    category: 'women',
    subcategory: 'Shirts',
    price: 1699,
    mrp: 2999,
    discount: 43,
    rating: 4.7,
    reviewsCount: 2100,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Sky Blue Stripe', hex: '#99badd' },
      { name: 'Crisp White', hex: '#ffffff' }
    ],
    images: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Crisp 100-count organic cotton poplin shirt inspired by classic menswear tailoring with an intentionally relaxed modern silhouette.',
    material: '100% Organic GOTS Certified Cotton Poplin',
    specifications: {
      Fit: 'Oversized Boyfriend Cut',
      Collar: 'Pointed Spread Collar',
      Cuffs: 'Extended Dual-Button Cuffs'
    },
    careInstructions: ['Machine wash cold', 'Iron crisp on cotton setting'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: 'mall-w-08',
    name: 'High-Rise Vintage Slim Denim Jeans',
    brand: 'NORDIC THREADS',
    category: 'women',
    subcategory: 'Trousers',
    price: 2499,
    mrp: 4199,
    discount: 40,
    rating: 4.8,
    reviewsCount: 1840,
    sizes: ['26', '28', '30', '32'],
    colors: [
      { name: 'Vintage Light Blue', hex: '#779ecb' },
      { name: 'True Black', hex: '#111111' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Authentic 90s vintage wash jeans with 1% comfort stretch to hug the natural waist and lift. Ankle grazing length with raw frayed hems.',
    material: '99% Organic Cotton, 1% Roica Elastane',
    specifications: {
      Rise: 'High Rise (11.5 inches)',
      Inseam: '28 inches (Ankle Length)',
      Fly: 'Classic Zip Fly with Embossed Button'
    },
    careInstructions: ['Wash cold inside out', 'Do not tumble dry'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: true
  },

  // ================= FOOTWEAR (17-24) =================
  {
    id: 'mall-f-01',
    name: 'Handcrafted Italian Calf Leather Chelsea Boots',
    brand: 'SOLE LAB',
    category: 'footwear',
    subcategory: 'Boots',
    price: 4999,
    mrp: 8999,
    discount: 44,
    rating: 4.9,
    reviewsCount: 1250,
    sizes: ['7', '8', '9', '10', '11'],
    colors: [
      { name: 'Cognac Brown', hex: '#964b00' },
      { name: 'Midnight Jet', hex: '#111827' }
    ],
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Artisan Chelsea boots built from full-grain Italian vegetable-tanned calfskin leather. Fitted with Goodyear welted rubber commando outsoles and ergonomic memory foam insoles.',
    material: 'Full-Grain Italian Calfskin Leather',
    specifications: {
      Construction: 'Goodyear Welted (Resolable)',
      Sole: 'Custom Rubber Commando Lug',
      Lining: 'Calf Leather Glove Lining'
    },
    careInstructions: ['Condition with neutral beeswax leather balm', 'Insert cedar shoe trees'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: true,
    isOffer: true
  },
  {
    id: 'mall-f-02',
    name: 'Minimalist Monochromatic Leather Low Sneakers',
    brand: 'URBAN FORM',
    category: 'footwear',
    subcategory: 'Sneakers',
    price: 2999,
    mrp: 5499,
    discount: 45,
    rating: 4.7,
    reviewsCount: 3100,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: [
      { name: 'Triple White', hex: '#ffffff' },
      { name: 'All Black', hex: '#1c1c1c' },
      { name: 'Off-White / Taupe', hex: '#e8e5dc' }
    ],
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Clean Scandinavian low-top sneaker featuring hand-stitched Margom rubber cupsole, waxed organic cotton laces, and gold foil serial number stamping on the heel counter.',
    material: 'Nappa Calf Leather Upper, 100% Natural Rubber Sole',
    specifications: {
      Sole: 'Stitched Margom Cupsole',
      Insole: 'Ortholite Arch Support Footbed',
      Hardware: 'Matte Eyelets'
    },
    careInstructions: ['Wipe clean with damp cloth', 'Use sneaker protector spray'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false
  },
  {
    id: 'mall-f-03',
    name: 'Pointed Toe Block Heel Mule Loafers',
    brand: 'MAISON DE LUXE',
    category: 'footwear',
    subcategory: 'Loafers',
    price: 2699,
    mrp: 4799,
    discount: 44,
    rating: 4.8,
    reviewsCount: 790,
    sizes: ['5', '6', '7', '8', '9'],
    colors: [
      { name: 'Patent Burgundy', hex: '#581825' },
      { name: 'Cream Leather', hex: '#f7f3e8' },
      { name: 'Black Onyx', hex: '#0f0f0f' }
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Modern statement mule loafers featuring an elongated chiselled toe, 2-inch structural block heel, and brushed brass horsebit hardware across the vamp.',
    material: 'Smooth Burnished Leather',
    specifications: {
      HeelHeight: '2 inches (5 cm)',
      ToeStyle: 'Architectural Pointed Almond',
      Hardware: 'Brushed Brass Buckle'
    },
    careInstructions: ['Wipe with microfiber cloth', 'Keep away from water'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: true
  },
  {
    id: 'mall-f-04',
    name: 'Dual-Strap Suede Anatomical Slide Sandals',
    brand: 'SOLE LAB',
    category: 'footwear',
    subcategory: 'Sandals',
    price: 1999,
    mrp: 3499,
    discount: 43,
    rating: 4.6,
    reviewsCount: 1820,
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: [
      { name: 'Mocha Suede', hex: '#59443b' },
      { name: 'Sand Taupe', hex: '#b8a99a' }
    ],
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Anatomically molded cork-latex footbed sandals upholstered in velvety cow suede. Features adjustable metal pin buckles and flexible shock-absorbing EVA soles.',
    material: 'Natural Cow Suede Upper, Sustainable Cork-Latex Footbed',
    specifications: {
      Footbed: 'Orthopedic Deep Heel Cup & Arch Contours',
      Sole: 'Non-Slip EVA Wave Tread',
      Buckles: 'Nickel-free Antique Finish'
    },
    careInstructions: ['Brush with brass suede brush', 'Avoid submerging in water'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: 'mall-f-05',
    name: 'Breathable Knit Carbon-Plate Running Trainers',
    brand: 'SOLE LAB',
    category: 'footwear',
    subcategory: 'Sneakers',
    price: 3699,
    mrp: 6499,
    discount: 43,
    rating: 4.8,
    reviewsCount: 1470,
    sizes: ['7', '8', '9', '10', '11'],
    colors: [
      { name: 'Glacier Grey / Orange', hex: '#bcc5cf' },
      { name: 'Phantom Black', hex: '#191919' }
    ],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Featherlight performance runner with nitrogen-infused supercritical foam cushioning and responsive carbon propulsion plate. Engineered for all-day bounce.',
    material: 'Seamless Jacquard Flyknit Upper, Supercritical PEBA Midsole',
    specifications: {
      Weight: '215g (Size 9)',
      Drop: '8mm Heel-to-Toe Drop',
      Plate: 'Full-Length 3D Carbon Fiber Plate'
    },
    careInstructions: ['Hand wash with mild detergent', 'Air dry only'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: true
  },
  {
    id: 'mall-f-06',
    name: 'Classic Penny Loafers in Box Calf Leather',
    brand: 'METRO CRAFT',
    category: 'footwear',
    subcategory: 'Loafers',
    price: 4299,
    mrp: 7499,
    discount: 43,
    rating: 4.7,
    reviewsCount: 880,
    sizes: ['7', '8', '9', '10', '11'],
    colors: [
      { name: 'Oxblood Cordovan', hex: '#4a1525' },
      { name: 'Polished Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Hand-sewn moc toe penny loafers with traditional saddle cutout and channeled leather sole with embedded rubber tap for long-lasting urban grip.',
    material: 'High-Polish Box Calfskin Leather',
    specifications: {
      Sole: 'Oak-Bark Tanned Leather Sole with Rubber Inset',
      Construction: 'Blake Stitched',
      Heel: 'Stacked Leather Heel'
    },
    careInstructions: ['Polish with cream wax shoe polish'],
    inStock: true,
    fastDelivery: false,
    isTrending: false,
    isNewArrival: false
  },

  // ================= ACCESSORIES (25-32) =================
  {
    id: 'mall-a-01',
    name: 'Full Grain Pebble Leather Weekender Duffle',
    brand: 'METRO CRAFT',
    category: 'accessories',
    subcategory: 'Bags',
    price: 5299,
    mrp: 9999,
    discount: 47,
    rating: 4.9,
    reviewsCount: 1100,
    sizes: ['45 Litres'],
    colors: [
      { name: 'Dark Oak Brown', hex: '#4a2f1b' },
      { name: 'Midnight Charcoal', hex: '#1e2022' }
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'TSA airline carry-on compliant weekender crafted from water-resistant pebble leather. Includes separate ventilated shoe compartment, 16-inch laptop pocket, and solid brass YKK zippers.',
    material: 'Full-Grain Pebble Leather & Heavy Duck Canvas Lining',
    specifications: {
      Dimensions: '21" L x 11.5" W x 12" H',
      Capacity: '45L Capacity',
      Strap: 'Detachable Padded Leather Shoulder Strap'
    },
    careInstructions: ['Condition with specialized leather cream'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: true,
    isOffer: true
  },
  {
    id: 'mall-a-02',
    name: 'Minimalist Automatic Ceramic Watch',
    brand: 'ATELIER K',
    category: 'accessories',
    subcategory: 'Watches',
    price: 7999,
    mrp: 14999,
    discount: 47,
    rating: 4.9,
    reviewsCount: 630,
    sizes: ['40mm'],
    colors: [
      { name: 'Matte Obsidian Black', hex: '#141414' },
      { name: 'Silver White', hex: '#e2e8f0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Modern horology featuring a 24-jewel Japanese automatic movement with 41-hour power reserve. Encased in scratch-proof ceramic with sapphire crystal face and exhibition caseback.',
    material: 'Scratch-Proof High-Tech Ceramic & Sapphire Crystal',
    specifications: {
      CaseDiameter: '40mm (8.9mm thickness)',
      Movement: 'Seiko NH35 Automatic Self-Winding',
      WaterResistance: '5 ATM / 50 Meters'
    },
    careInstructions: ['Wipe crystal with microfiber cloth', 'Avoid magnetic fields'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: true
  },
  {
    id: 'mall-a-03',
    name: 'Polarized Handcrafted Acetate Sunglasses',
    brand: 'URBAN FORM',
    category: 'accessories',
    subcategory: 'Eyewear',
    price: 1999,
    mrp: 3499,
    discount: 43,
    rating: 4.7,
    reviewsCount: 2210,
    sizes: ['Universal Fit'],
    colors: [
      { name: 'Havana Tortoise', hex: '#7a4b27' },
      { name: 'Jet Gloss Black', hex: '#0f0f0f' }
    ],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Timeless square silhouette hand-carved from Italian Mazzucchelli cellulose acetate. Features UV400 Category 3 polarized lenses with anti-reflective back coating.',
    material: 'Mazzucchelli Cellulose Acetate & 7-Barrel Steel Hinges',
    specifications: {
      UVProtection: '100% UVA/UVB Category 3 Polarized',
      Measurements: '50-21-145 mm',
      Includes: 'Hardshell Leather Case & Microfiber Cloth'
    },
    careInstructions: ['Clean with lukewarm water and lens cloth'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: 'mall-a-04',
    name: 'Structured Minimalist Saddle Crossbody Bag',
    brand: 'MAISON DE LUXE',
    category: 'accessories',
    subcategory: 'Bags',
    price: 3499,
    mrp: 5999,
    discount: 42,
    rating: 4.8,
    reviewsCount: 1480,
    sizes: ['Medium'],
    colors: [
      { name: 'Caramel Tan', hex: '#b27a4b' },
      { name: 'Forest Green', hex: '#264e36' },
      { name: 'Jet Noir', hex: '#161616' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Architectural saddle bag with magnetic flap closure and gold-toned engraved MALL hardware. Roomy interior with accordion compartments for phone, wallet, and essentials.',
    material: 'Smooth Vegan Bio-Leather (Cactus & Polyurethane)',
    specifications: {
      Dimensions: '9.2" W x 7.5" H x 3.1" D',
      StrapDrop: 'Adjustable 18" - 23"',
      Closure: 'Hidden Magnetic Snap'
    },
    careInstructions: ['Wipe clean with moist sponge'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false
  },
  {
    id: 'mall-a-05',
    name: 'Reversible Italian Top-Grain Leather Belt',
    brand: 'VERVE ESSENTIALS',
    category: 'accessories',
    subcategory: 'Belts',
    price: 1499,
    mrp: 2799,
    discount: 46,
    rating: 4.6,
    reviewsCount: 2890,
    sizes: ['32', '34', '36', '38', '40'],
    colors: [
      { name: 'Black / Tan Reversible', hex: '#1f1f1f' }
    ],
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Two versatile styles in one. Twist the satin nickel buckle to effortlessly switch between formal black and casual warm cognac brown leather.',
    material: '100% Top-Grain Vegetable Tanned Leather',
    specifications: {
      Width: '35mm (1.37 inches)',
      Buckle: '360° Rotational Brushed Satin Nickel',
      Origin: 'Crafted in Tuscany, Italy'
    },
    careInstructions: ['Wipe with dry cloth'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: false
  },

  // ================= BEAUTY (33-38) =================
  {
    id: 'mall-b-01',
    name: 'Santal & Smoked Amber Eau De Parfum (100ml)',
    brand: 'AURA BOTANICALS',
    category: 'beauty',
    subcategory: 'Fragrances',
    price: 3299,
    mrp: 5499,
    discount: 40,
    rating: 4.9,
    reviewsCount: 2150,
    sizes: ['50ml', '100ml'],
    colors: [
      { name: 'Amber Gold Glass', hex: '#c59b27' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An intoxicating gender-neutral fragrance pairing creamy Australian sandalwood, smoky cardamom, and aged Haitian vetiver with a soft dry amber base note.',
    material: 'Organic Alcohol, French Perfume Oils (24% Extrait Concentration)',
    specifications: {
      Longevity: '8-10 Hours on Skin',
      TopNotes: 'Cardamom, Violet Leaf, Papyrus',
      HeartNotes: 'Sandalwood, Iris, Cedarwood',
      BaseNotes: 'Amber, Leather accord, Clean Musk'
    },
    careInstructions: ['Store away from direct sunlight and heat'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: true,
    isOffer: true
  },
  {
    id: 'mall-b-02',
    name: 'Cold-Pressed Botanical Renewal Face Elixir (30ml)',
    brand: 'AURA BOTANICALS',
    category: 'beauty',
    subcategory: 'Skincare',
    price: 1899,
    mrp: 3199,
    discount: 41,
    rating: 4.8,
    reviewsCount: 1680,
    sizes: ['30ml', '50ml'],
    colors: [
      { name: 'Golden Amber Bottle', hex: '#b97a29' }
    ],
    images: [
      'https://images.unsplash.com/photo-1608248597359-26937e89e900?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Award-winning nutrient oil infused with 16 cold-pressed botanicals including Rosehip, Marula, Bakuchiol (gentle retinol alternative), and Seabuckthorn for glowing elasticity.',
    material: '100% Pure Plant-Derived Bio-Lipids, Vegan & Cruelty-Free',
    specifications: {
      SkinType: 'All Skin Types (Non-comedogenic)',
      KeyActive: '1% Bakuchiol + CoQ10',
      Texture: 'Fast-Absorbing Silky Dry Oil'
    },
    careInstructions: ['Dispense 3-4 drops and warm in palms before pressing onto skin'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false
  },
  {
    id: 'mall-b-03',
    name: 'Velvet Matte Hydrating Lip Elixir Set',
    brand: 'AURA BOTANICALS',
    category: 'beauty',
    subcategory: 'Makeup',
    price: 1499,
    mrp: 2499,
    discount: 40,
    rating: 4.7,
    reviewsCount: 940,
    sizes: ['Set of 3 (3 x 4.2g)'],
    colors: [
      { name: 'Nude Terracotta', hex: '#b56d53' },
      { name: 'Berry Noir', hex: '#63253b' },
      { name: 'Dusty Rose', hex: '#b8777a' }
    ],
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Non-drying velvet matte lipstick trio infused with Hyaluronic filling spheres and Shea Butter. Delivers up to 12 hours of weightless, feather-proof luxury color.',
    material: 'Hyaluronic Acid, Shea Butter, Vitamin E',
    specifications: {
      Finish: 'Blurred Velvet Matte',
      WearTime: '12-Hour Non-Drying Wear',
      Formulation: 'Clean, Paraben-Free, Fragrance-Free'
    },
    careInstructions: ['Keep cap securely closed after use'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: true
  },
  {
    id: 'mall-b-04',
    name: 'Bergamot & Neroli Aromatic Body Cleanser (500ml)',
    brand: 'AURA BOTANICALS',
    category: 'beauty',
    subcategory: 'Bath & Body',
    price: 1199,
    mrp: 1999,
    discount: 40,
    rating: 4.8,
    reviewsCount: 1320,
    sizes: ['500ml'],
    colors: [
      { name: 'Amber Pump Dispenser', hex: '#6e4726' }
    ],
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Rich low-foaming gel cleanser with clarifying Italian bergamot rind, orange blossom neroli, and softening aloe vera. Elevates every shower into a spa experience.',
    material: 'Sulfate-Free Plant Cleansers & Essential Oils',
    specifications: {
      Bottle: '100% Post-Consumer Recycled PET',
      pH: 'Balanced 5.5 Skin pH',
      Origin: 'Made with organic herbs in Provence'
    },
    careInstructions: ['Lather over damp skin and rinse thoroughly'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: false
  },

  // ================= KIDS (39-44) =================
  {
    id: 'mall-k-01',
    name: 'Organic Cotton Breton Stripe Long Sleeve Tee',
    brand: 'NORDIC THREADS',
    category: 'kids',
    subcategory: 'T-Shirts',
    price: 799,
    mrp: 1499,
    discount: 47,
    rating: 4.8,
    reviewsCount: 890,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: [
      { name: 'Navy & Cream Stripe', hex: '#1c2e4a' },
      { name: 'Ochre & White Stripe', hex: '#c5922c' }
    ],
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Super-soft 100% GOTS certified organic combed cotton tee. Built with flat-lock anti-chafing seams and expandable neckline snaps on younger sizes.',
    material: '100% Organic Ring-Spun Cotton',
    specifications: {
      Certification: 'GOTS Organic Certified',
      Neckline: 'Ribbed crewneck with soft inner tape',
      Tag: 'Tagless printed neck label'
    },
    careInstructions: ['Machine wash warm 40°C', 'Tumble dry low'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false,
    isOffer: true
  },
  {
    id: 'mall-k-02',
    name: 'Sherpa-Lined Corduroy Trucker Jacket',
    brand: 'URBAN FORM',
    category: 'kids',
    subcategory: 'Jackets',
    price: 1999,
    mrp: 3499,
    discount: 43,
    rating: 4.9,
    reviewsCount: 520,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Warm Camel Corduroy', hex: '#b8864b' },
      { name: 'Forest Green', hex: '#264b38' }
    ],
    images: [
      'https://images.unsplash.com/photo-1543854589-ab90eb2cf584?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Charming vintage-inspired wide-wale corduroy jacket lined with plush recycled faux-sherpa fleece. Features kid-friendly easy-snap button closures.',
    material: '100% Cotton Corduroy, 100% Recycled Poly Sherpa Lining',
    specifications: {
      Closure: 'Child-Safe Antiqued Metal Snap Buttons',
      Pockets: 'Two Chest Flap Pockets, Two Hand Pockets',
      Insulation: 'High-loft sherpa fleece body'
    },
    careInstructions: ['Machine wash cold delicate', 'Line dry'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: true
  },
  {
    id: 'mall-k-03',
    name: 'Comfort Stretch Chino Joggers',
    brand: 'NORDIC THREADS',
    category: 'kids',
    subcategory: 'Trousers',
    price: 999,
    mrp: 1799,
    discount: 44,
    rating: 4.7,
    reviewsCount: 1100,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Olive Army', hex: '#4b5320' },
      { name: 'Dark Navy', hex: '#16243b' },
      { name: 'Caramel Khaki', hex: '#b08b59' }
    ],
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Durable stretch cotton twill pants with reinforced double knees for playground adventures, an elastic waistband with functional drawcord, and snug ribbed cuffs.',
    material: '97% Cotton, 3% Spandex',
    specifications: {
      Waist: 'Ribbed Elastic with Braided Drawcord',
      Knees: 'Reinforced Articulated Stitching',
      Pockets: 'Deep Front Slash Pockets'
    },
    careInstructions: ['Machine wash warm', 'Tumble dry medium'],
    inStock: true,
    fastDelivery: true,
    isTrending: true,
    isNewArrival: false
  },
  {
    id: 'mall-k-04',
    name: 'Embroidered Organic Cotton Tiered Sundress',
    brand: 'MAISON DE LUXE',
    category: 'kids',
    subcategory: 'Dresses',
    price: 1499,
    mrp: 2699,
    discount: 44,
    rating: 4.8,
    reviewsCount: 680,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Daisy White with Yellow Floral', hex: '#fdfbf7' },
      { name: 'Pastel Lavender', hex: '#d1c4e9' }
    ],
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Delightful tiered sundress with hand-embroidered daisy motifs across the scalloped yoke. Breathable double gauze organic cotton ensures summer play comfort.',
    material: '100% GOTS Certified Double Gauze Cotton',
    specifications: {
      Closure: 'Mother of Pearl Buttons at Back',
      Lining: 'Soft Voile Lining',
      Details: 'Scalloped Hemline'
    },
    careInstructions: ['Machine wash gentle cold', 'Line dry in shade'],
    inStock: true,
    fastDelivery: true,
    isTrending: false,
    isNewArrival: true,
    isOffer: true
  }
];

export const CATEGORIES_CONFIG = [
  {
    slug: 'men',
    name: 'MEN',
    title: "Men's Collection",
    tagline: 'Refined modern tailoring, elevated basics & relaxed outerwear',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    itemCount: '1,420+ styles'
  },
  {
    slug: 'women',
    name: 'WOMEN',
    title: "Women's Collection",
    tagline: 'Timeless silhouettes, silk essentials & contemporary dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
    itemCount: '2,180+ styles'
  },
  {
    slug: 'footwear',
    name: 'FOOTWEAR',
    title: 'Footwear Studio',
    tagline: 'Italian leather boots, minimal sneakers & artisan loafers',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80',
    itemCount: '640+ styles'
  },
  {
    slug: 'accessories',
    name: 'ACCESSORIES',
    title: 'Fine Accessories',
    tagline: 'Full-grain leather duffles, ceramic horology & eyewear',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    itemCount: '480+ styles'
  },
  {
    slug: 'beauty',
    name: 'BEAUTY',
    title: 'Beauty & Fragrance',
    tagline: 'Fine French perfumery, botanical skincare & clean essentials',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
    itemCount: '320+ items'
  },
  {
    slug: 'kids',
    name: 'KIDS',
    title: 'Kids & Juniors',
    tagline: 'Organic soft cottons, durable playwear & miniature classics',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80',
    itemCount: '390+ styles'
  }
];

export const BRANDS_LIST = [
  { name: 'URBAN FORM', origin: 'Stockholm', tag: 'Minimal Essentials' },
  { name: 'STUDIO NOIR', origin: 'Milan', tag: 'Modern Tailoring' },
  { name: 'ATELIER K', origin: 'Tokyo', tag: 'Architectural Knits' },
  { name: 'VERVE ESSENTIALS', origin: 'Copenhagen', tag: 'Clean Silhouettes' },
  { name: 'NORDIC THREADS', origin: 'Oslo', tag: 'Raw Denim & Cottons' },
  { name: 'SOLE LAB', origin: 'Porto', tag: 'Artisan Footwear' },
  { name: 'MAISON DE LUXE', origin: 'Paris', tag: 'Silks & Occasion' },
  { name: 'AURA BOTANICALS', origin: 'Grasse', tag: 'Parfums & Skin' },
  { name: 'METRO CRAFT', origin: 'London', tag: 'Leather Goods' }
];
