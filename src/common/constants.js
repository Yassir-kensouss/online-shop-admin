const FILE_SIZE = {
    IMAGE: 2000000, // Bytes
    VIDEO: 2000000 // Bytes
}

const FILE_FORMATS = {
    IMAGE: [".png", ".webp", ".jpeg", ".jpg"],
    VIDEO: [".mp4", ".mov"]
}

const MAX_LENGTH = {
    PRODUCT_NAME: 200,
    PRODUCT_DESC: 100000,
    PRODUCT_SHORT_DESC: 1000,
    PRODUCT_SKU: 30,
}

const MAX_PRICE = 1000000;
const MAX_QUANTITY = 500000;

export {
    FILE_SIZE,
    FILE_FORMATS,
    MAX_LENGTH,
    MAX_PRICE,
    MAX_QUANTITY
}