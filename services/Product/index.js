const { Product } = require("../../models/");

class ProductService {
  /**
   * Description. This method inserts a row into the product table given the options
   * @param {{ title: string, description: string, price: number, imageUrl: string }} options This is the data that is inserted into the Product table
   * @returns {boolean} true if operation is successful, throws an error otherwise
   */
  async create(options) {
    // need to verify options
    return await Product.create(options)
      .then((res) => {
        if (Object.keys(res.dataValues)) return true;
      })
      .catch((e) => {
        console.error(
          `failed to save product with options: ${options} -> ${e}`
        );
        return false;
      });
  }

  /**
   * Description. This method retrieves all the products in the products table
   * @param {{}} clause  This is an object defining the where clause to be used when querying database
   * @returns {[]} returns an array of products satisfying clause.
   */
  async fetchAll(clause) {
    return await Product.findAll(clause).catch((e) => {
      console.error(`failed to  eall products -> ${e}`);
      throw Error("failed to retrieve the products. Try again");
    });
  }

  /**
   * Description. This method finds a product with the id specified
   * @param {number} id This is the id of the product that you want to fetch
   * @returns {{ title: string, description: string, price: number, imageUrl: string }} returns a product object
   */
  async findById(id) {
    return await Product.findById(id).catch((e) => {
      console.error(`failed to retrieve product with id ${id} -> ${e}`);
      throw Error("failed to retrieve the product. Try again");
    });
  }

  /**
   * Description. This method updates a row which satifies a clause with the updated product
   * @param {{ title: string, description: string, price: number, imageUrl: string }} updatedProduct  An updated product object to be saved
   * @param {*} clause an object containing keys which will be used for the update query
   * @returns {boolean} returns true if the method is successful
   */
  async update(updatedProduct, clause) {
    return await Product.update(updatedProduct, clause)
      .then((res) => {
        console.log(res[0]);
        return res[0] ? true : false;
      })
      .catch((e) => {
        console.error(
          `failed to update product with clause: ${clause} -> ${e}`
        );
        throw Error("failed to update product. try again.");
      });
  }

  /**
   * Description. This method deletes rows which satisfy a the given clause
   * @param {*} clause clause an object containing keys which will be used for the update query
   */
  async deleteWhere(clause) {
    return await Product.destroy(clause)
      .then((res) => {
        return res ? true : false;
      })
      .catch((e) => {
        console.error(
          `failed to remove product with clause: ${clause} -> ${e}`
        );
        throw Error("failed to delete product. try again.");
      });
  }
}

module.exports = new ProductService();
