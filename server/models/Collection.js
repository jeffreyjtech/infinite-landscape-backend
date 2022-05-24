'use strict';

class Collection {
  constructor(sequelize, name, schema) {
    this.model = sequelize.define(name, schema);
  }

  async create(json) {
    const instance = await this.model.create(json);
    return instance;
  }

  async read(id = null) {
    const instance = (await id)
      ? this.model.findOne({ where: { id } })
      : this.model.findAll();
    return instance;
  }

  // update method, takes in an id, returns the update instance
  async update(id, json) {
    await this.model.update(json, { where: { id } });
    const instance = await this.read(id);
    return instance;
  }

  // delete method, takes in an id, returns the removed instance
  async delete(id) {
    const removedRecord = await this.read(id);
    await this.model.destroy({ where: { id } });
    return removedRecord;
  }
}

module.exports = Collection;
