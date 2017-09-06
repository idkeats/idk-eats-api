import mongoose from 'mongoose';

const find = async (model, query, next) => {
  try {
    const result = await model.find(query);
    return result;
  } catch(err) {
    next(err);
  }
};

const findOne = async (model, query, next) => {
  try {
    const result = await model.findOne(query);
    return result;
  } catch(err) {
    next(err);
  }
}

const save = async (model, next) => {
  try {
    const result = await model.save();
    return result;
  } catch(err) {
    next(err);
  }
}

module.exports = {
  find,
  findOne,
  save
}