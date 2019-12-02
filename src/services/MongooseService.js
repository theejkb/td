const mongoose = require('mongoose');

class MongooseService {
  constructor(model) {
    this.model = mongoose.model(model);
  }

  async findOneBy(condition, hiddenPropertiesToSelect = []) {
    try {
      return await this.model
        .findOne(condition)
        .select(hiddenPropertiesToSelect.map((property) => `+${property}`));
    } catch (e) {
      return false;
    }
  }

  async findManyBy(condition) {
    try {
      return await this.model.find(condition);
    } catch (e) {
      return [];
    }
  }

  async create(properties) {
    const newObject = new this.model(properties);

    try {
      await newObject.validate();
      return await newObject.save();
    } catch (e) {
      return false;
    }
  }

  async delete(condition) {
    try {
      const deleteObject = await this.model.deleteOne(condition);
      return deleteObject.deletedCount > 1;
    } catch (e) {
      return false;
    }
  }

  async updateOne(condition, propertiesToSet) {
    try {
      const update = await this.model.updateOne(condition, {
        $set: propertiesToSet,
        $inc: { __v: 1 },
      });
      return update.nModified > 0;
    } catch (e) {
      return false;
    }
  }

  async updateMany(condition, propertiesToSet) {
    try {
      const update = await this.model.updateMany(condition, {
        $set: propertiesToSet,
        $inc: { __v: 1 },
      });
      return update.nModified > 0;
    } catch (e) {
      return false;
    }
  }
}

module.exports = MongooseService;
