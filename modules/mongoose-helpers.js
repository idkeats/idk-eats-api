import mongoose from 'mongoose';

const find = async (model, conditions, next) => {
  try {
    const result = await model.find(conditions.query)
      .populate(conditions.populate ? conditions.populate : '')
      .select(conditions.select ? conditions.select : '')
      .limit(conditions.limit ? conditions.limit : '');
    return result;
  } catch (err) {
    next(err);
  }
}

const findOne = async (model, conditions, next) => {
  try {
    const result = await model.findOne(conditions.query)
      .populate(conditions.populate ? conditions.populate : '')
      .select(conditions.select ? conditions.select : '');
    return result;
  } catch (err) {
    next(err);
  }
}

const save = async (model, next) => {
  try {
    const result = await model.save();
    return result;
  } catch (err) {
    next(err);
  }
}

const remove = async (model, conditions, next) => {
  try {
    const result = await model.remove(conditions.query);
    return result;
  } catch (err) {
    next(err);
  }
}

module.exports = {
  find,
  findOne,
  save,
  remove
}