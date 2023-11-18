import logger from '../config/logger';

class SuperDao {
  private readonly model: any;

  constructor(model: any) {
    this.model = model;
  }

  async findAll() {
    return this.model
      .findAll()
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        logger.error(error);
        console.log(error);
      });
  }

  async findById(id: any) {
    return this.model
      .findOne({ where: { id } })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        logger.error(error);
        console.log(error);
      });
  }

  async findOneByWhere(where: any, attributes = null, order = ['id', 'desc']) {
    if (attributes == null) {
      return this.model
        .findOne({
          where,
          order: [order],
        })
        .then((result: any) => {
          return result;
        })
        .catch((error: any) => {
          logger.error(error);
          console.log(error);
        });
    }
    return this.model
      .findOne({
        where,
        attributes,
        order: [order],
      })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        logger.error(error);
        console.log(error);
      });
  }

  async updateWhere(data: any, where: any) {
    return this.model
      .update(data, { where })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        logger.error(error);
        console.log(error);
      });
  }

  async updateById(data: any, id: any) {
    return this.model
      .update(data, { where: { id } })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        logger.error(error);
        console.log(error);
      });
  }

  async create(data: any) {
    try {
      const newData = new this.model(data);
      return newData
        .save()
        .then((result: any) => {
          return result;
        })
        .catch((error: any) => {
          logger.error(error);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async findByWhere(where: any, attributes = undefined, order = ['id', 'asc'], limit = null, offset = null) {
    if (!attributes) {
      return this.model.findAll({
        where,
        order: [order],
        limit,
        offset,
      });
    }

    return this.model.findAll({
      where,
      attributes,
      order: [order],
      limit,
      offset,
    });
  }

  async deleteByWhere(where: any) {
    return this.model.destroy({ where });
  }

  async bulkCreate(data: any) {
    return this.model
      .bulkCreate(data)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        logger.error(error);
        console.log(error.message);
      });
  }

  async getCountByWhere(where: any) {
    return this.model
      .count({ where })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        logger.error(error);
        console.log(error);
      });
  }

  async incrementCountInFieldByWhere(fieldName: string, where: any, incrementValue = 1) {
    const instance = await this.model.findOne({ where });
    if (!instance) {
      return false;
    }
    // eslint-disable-next-line no-return-await
    return await instance.increment(fieldName, { by: incrementValue });
  }

  async decrementCountInFieldByWhere(fieldName: string, where: any, decrementValue = 1) {
    const instance = await this.model.findOne({ where });
    if (!instance) {
      return false;
    }
    // eslint-disable-next-line no-return-await
    return await instance.decrement(fieldName, { by: decrementValue });
  }

  async updateOrCreate(values: any, condition: any) {
    return this.model.findOne({ where: condition }).then((obj: any) => {
      // update
      if (obj) {
        return obj.update(values);
      }
      // insert
      return this.model.create(values);
    });
  }

  async checkExist(condition: any) {
    return this.model.count({ where: condition }).then((count: number) => {
      if (count !== 0) {
        return true;
      }
      return false;
    });
  }

  async getDataTableData(where: any, limit: string, offset: string, order = [['id', 'DESC']]) {
    return this.model
      .findAndCountAll({
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        where,
        order,
      })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        logger.error(error);
        console.log(error);
        return [];
      });
  }
}

export default SuperDao;
