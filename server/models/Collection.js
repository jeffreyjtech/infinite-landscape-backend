'use strict';

const errorWithStatus = require('../error/ErrorWithStatus');

class Collection {
  constructor(sequelize, name, schema) {
    this.model = sequelize.define(name, schema);
  }

  async create(json) {
    const instance = await this.model.create(json);
    return instance;
  }

  async read(id) {
    const instance = await this.model.findOne({ where: { id } });
    if (instance === null) {
      throw errorWithStatus(`Resource with id ${id} not found`, 404);
    }
    return instance;
  }

  async readAll() {
    const instances = await this.model.findAll();
    return instances;
  }

  async readAllWhere(column, value) {
    const instances = await this.model.findAll({ where: { [column]: value } });
    return instances;
  }

  // update method, takes in an json object and an id, returns the update instance
  async update(json, id) {
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
