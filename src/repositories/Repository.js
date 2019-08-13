'use strict';

/**
 * Extend this repository with your own
 */
class Repository {
  async findAll(tenant) {
    const items = await this.entitiy.query({ tenant })
    return items.map(item => item.toObject());
  }
}

module.exports = Repository;
