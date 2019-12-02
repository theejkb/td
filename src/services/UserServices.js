const bcrypt = require('bcrypt');
const MongooseService = require('./MongooseService');

class UserService extends MongooseService {
  constructor() {
    super('User');
  }

  /**
   * @param userData{ mail, lastName, firstName, password }
   * @returns {Promise<User|boolean>}
   */
  async create(userData) {
    userData.password = await this.hashPassword(userData.password);
    const {password, ...user} = (await super.create(userData)).toJSON({ versionKey: false });

    return user;
  }

  async updateOne(condition, propertiesToSet) {
    propertiesToSet.password = await this.hashPassword(
      propertiesToSet.password,
    );
    return super.updateOne(condition, propertiesToSet);
  }

  getRandomElementInArray(array) {
    return array[this.getRandomIndexInArray(array)];
  }

  getRandomIndexInArray({ length }) {
    return Math.floor(Math.random() * length);
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 15);
  }
}
module.exports = new UserService();
