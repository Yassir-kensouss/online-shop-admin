const useValidProduct = values => {
  const errors = {};

  /**
   * @description check whether product properties valid or not
   * @param {*} property - type (type of validation)
   */
  const methods = {
    validateName: property => {
      if (property === "name") {
        if (!values["name"] || values["name"].length == 0) {
          errors.name
            ? errors.name.push("Product name is required")
            : (errors.name = ["Product name is required"]);
        } else if (values["name"] && values["name"].length > 10) {
          errors.name = ["maximum character length for name is 30"];
        } else {
          delete errors.name;
        }
      }
    },

    validateDescription: property => {
      if (property === "description") {
        if (!values["description"] || values["description"].length == 0) {
          errors.description
            ? errors.description.push("product description is required")
            : (errors.description = ["product description is required"]);
        } else if (values["description"] && values["description"].length > 10) {
          errors.description = [
            "maximum character length for description is 30",
          ];
        } else {
          delete errors.description;
        }
      }
    },

    validateShortDescription: property => {
        if (
          !values[property] ||
          values[property].length == 0
        ) {
          errors.shortDescription
            errors.shortDescription = [
                "product short description is required",
              ]
        } else if (
          values[property] &&
          values[property].length > 10
        ) {
          errors.shortDescription = [
            "maximum character length for short description is 30",
          ];
        } else {
          delete errors.shortDescription;
        }
    },

    validatePrices: property => {
      console.log("values", values);
      if (property === "price") {
        if (!values["price"] || values["price"].length == 0) {
          errors.price
            ? errors.price.push("product price is required")
            : (errors.price = ["product price is required"]);
        } else if (values["price"] && values["price"] > 1000000) {
          errors.price = ["maximum price is 1 000 000$"];
        } else {
          delete errors.price;
        }
      }

      if (property === "oldPrice") {
        if (values["oldPrice"] || values["oldPrice"] > values["price"]) {
          errors.oldPrice = [
            "product old price must be less than current price",
          ];
        } else {
          delete errors.oldPrice;
        }
      }
    },

    validateSku: property => {
      if (values[property] && values[property].length > 30) {
        errors.sku = ["product sku is too long"];
      } else {
        delete errors.sku;
      }
    },
    validateQuantity: property => {
      if (values[property] && values[property] > 1000000000) {
        errors.quantity = ["product quantity number is too big"];
      } else {
        delete errors.quantity;
      }
    },
    validateCategories: property => {
      if (!values[property] || values[property].length == 0) {
        errors.categories = ["product must belong to at least one category"];
      } else {
        delete errors.categories;
      }
    },
    validatePictures: property => {
      if (!values[property] || values[property].length == 0) {
        errors.files = ["product should have at least one picture"];
      } else {
        delete errors.files;
      }
    },
  };

  const properties = [];

  Object.keys(values).map(value => {
    properties.push(value);
  });

  properties.map(property => {
    switch (property) {
      case "name":
        methods.validateName(property);
        break;
      case "description":
        methods.validateDescription(property);
        break;
      case "shortDescription":
        methods.validateShortDescription(property);
        break;
      case "price":
        methods.validatePrices(property);
        break;
      case "oldPrice":
        methods.validatePrices(property);
        break;
      case "sku":
        methods.validateSku(property);
        break;
      case "quantity":
        methods.validateQuantity(property);
        break;
      case "categories":
        methods.validateCategories(property);
        break;
      case "files":
        methods.validatePictures(property);
        break;
      default:
        return;
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length > 0 ? false : true,
  };
};

export default useValidProduct;
