'use strict';

const jedlik = require('@peak-ai/jedlik');
const tableName = require('../constants/table-name');

const Model = jedlik.Model({
  table: tableName,
  schema: {
    tenant: { required: true },
    name: {},
  },
});

class peak-mohit extends Model {
  constructor(entity) {
    super();
    this.tenant = entity.tenant;
    this.name = entity.name;
  }
}

module.exports = peak-mohit;
