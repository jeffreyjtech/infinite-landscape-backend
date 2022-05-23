'use strict';

class Collection {
  constructor(sequelize, name, schema) {
    this.model = sequelize.define(name, schema);
  }

  async create(json) {
    return await this.model.create(json);
  }

  async read(id = null) {
    return (await id) ? this.model.findOne({ where: { id } }) : this.model.findAll();
  }

  // update method, takes in an id, returns the update instance
  async update(id, json) {
    await this.model.update(json, { where: id });
    return await this.read(id);
  }

  // delete method, takes in an id, returns the removed instance
  async delete(id) {
    const removedRecord = await this.read(id);
    await this.model.destroy({ where: id });
    return removedRecord;
  }
}

module.exports = Collection;
