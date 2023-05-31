const FILE_SIZE = {
  IMAGE: 2000000, // Bytes
  VIDEO: 2000000, // Bytes
};

const PRODUCT_DATATABLE_LIMIT = 5;

const FILE_FORMATS = {
  IMAGE: [".png", ".webp", ".jpeg", ".jpg"],
  VIDEO: [".mp4", ".mov"],
};

const MAX_LENGTH = {
  PRODUCT_NAME: 200,
  PRODUCT_DESC: 100000,
  PRODUCT_SHORT_DESC: 1000,
  PRODUCT_SKU: 30,
};

const MAX_PRICE = 1000000;
const MAX_QUANTITY = 500000;

const NUMERIC_FILTERS_MODE = [
  { label: "equals", value: "equals" },
  { label: "not equals", value: "not equals" },
  { label: "Greater than", value: "gt" },
  { label: "Greater than or equal", value: "gte" },
  { label: "Less than or equal", value: "lte" },
  { label: "Less than or equal", value: "lt" },
];

const STRING_FILTERS_MODE = [
  { label: "equals", value: "equals" },
  { label: "not equals", value: "not equals" },
];

const ORDERS_STATUS = {
  NOT_PROCESSED: "Not processed",
  PROCESSING: "Processing",
  DELIVERED: "Delivered",
  SHIPPED: "Shipped",
  CANCELLED: "Cancelled",
};

const BG_COLORS = [
  "#0B2447",
  "#D5B4B4",
  "#66347F",
  "#19376D",
  "#576CBC",
  "#0EA293",
  "#CE5959",
  "#89375F",
  "#FF8400",
  "#159895",
];

const CURRENCIES = [
  { name: "MAD", code: "MAD" },
  { name: "USD", code: "$" },
  { name: "EUR", code: "€" },
];

const LANGUAGES = [
  { name: "English", code: "en" },
  { name: "Arab", code: "ar" },
  { name: "French", code: "fr" },
  { name: "Spanish", code: "sp" },
];

const PRODUCT_SIZES = [
  { name: "S", code: "small" },
  { name: "M", code: "medium" },
  { name: "L", code: "large" },
  { name: "XL", code: "extra large" },
  { name: "XXL", code: "2 extra large" },
  { name: "XXXL", code: "3 extra large" },
];

const PRODUCT_MATERIAL = [
  { name: "Cotton", code: "cotton" },
  { name: "Polyester", code: "polyester" },
  { name: "Silk", code: "silk" },
  { name: "Wool", code: "wool" },
  { name: "Linen", code: "linen" },
  { name: "Denim", code: "denim" },
  { name: "Rayon", code: "rayon" },
  { name: "Nylon", code: "nylon" },
  { name: "Spandex", code: "spandex" },
  { name: "Leather", code: "leather" },
  { name: "Velvet", code: "velvet" },
  { name: "Satin", code: "satin" },
  { name: "Cashmere", code: "cashmere" },
  { name: "Acrylic", code: "acrylic" },
  { name: "Viscose", code: "viscose" },
  { name: "Chiffon", code: "chiffon" },
  { name: "Tulle", code: "tulle" },
  { name: "Organza", code: "organza" },
  { name: "Lace", code: "lace" },
  { name: "Suede", code: "suede" },
];

export {
  FILE_SIZE,
  FILE_FORMATS,
  MAX_LENGTH,
  MAX_PRICE,
  MAX_QUANTITY,
  PRODUCT_DATATABLE_LIMIT,
  NUMERIC_FILTERS_MODE,
  STRING_FILTERS_MODE,
  ORDERS_STATUS,
  BG_COLORS,
  CURRENCIES,
  LANGUAGES,
  PRODUCT_SIZES,
  PRODUCT_MATERIAL,
};
