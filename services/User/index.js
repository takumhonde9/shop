const { User } = require("../../models");

class UserService {
  /**
   * Description. This method creates a user
   * @param {{name:string, username:string}} This is the data to be used for creating the user in the database
   */
  async create(options) {
    return await User.create(options)
      .then((res) => {
        if (Object.keys(res.dataValues)) return true;
      })
      .catch((e) => {
        console.error(`failed to save user with options: ${options} -> ${e}`);
        return false;
      });
  }

  /**
   * Description. This method retrieves all the users in the users table
   * @param {{}} clause  This is an object defining the where clause to be used when querying database
   * @returns {[]} returns an array of users satisfying clause.
   */
  async fetchAll(clause) {
    return await User.findAll(clause).catch((e) => {
      console.error(`failed to  eall users -> ${e}`);
      throw Error("failed to retrieve the users. Try again");
    });
  }

  /**
   * Description. This method finds a user with the id specified
   * @param {number} id This is the id of the user that you want to fetch
   * @returns {{ title: string, description: string, price: number, imageUrl: string }} returns a user object
   */
  async findById(id) {
    return await User.findById(id).catch((e) => {
      console.error(`failed to retrieve user with id ${id} -> ${e}`);
      throw Error("failed to retrieve the user. Try again");
    });
  }

  /**
   * Description. This method updates a row which satifies a clause with the updated user
   * @param {{ name: string, email: string}} updatedUser  An updated user object to be saved
   * @param {*} clause an object containing keys which will be used for the update query
   * @returns {boolean} returns true if the method is successful
   */
  async update(updatedUser, clause) {
    return await User.update(updatedUser, clause)
      .then((res) => {
        console.log(res[0]);
        return res[0] ? true : false;
      })
      .catch((e) => {
        console.error(`failed to update user with clause: ${clause} -> ${e}`);
        throw Error("failed to update user. try again.");
      });
  }

  /**
   * Description. This method deletes rows which satisfy a the given clause
   * @param {*} clause clause an object containing keys which will be used for the update query
   */
  async deleteWhere(clause) {
    return await User.destroy(clause)
      .then((res) => {
        return res ? true : false;
      })
      .catch((e) => {
        console.error(`failed to remove user with clause: ${clause} -> ${e}`);
        throw Error("failed to delete user. try again.");
      });
  }
}

module.exports = new UserService();
