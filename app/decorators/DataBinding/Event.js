import {
  isArray,
  isFunction,
  isString,
} from 'lodash';

const categoriesTransformer = (event) => {
  try {
    return {
      categories: event.categories.data.map((cat) => cat.name),
    };
  } catch (e) {
    // console.log(e);
    return null;
  }
};

const transformers = {
  categories: categoriesTransformer,
};

export default class Event {
  constructor(data) {
    this.data = data;
  }

  transform(param) {
    if (isArray(param)) {
      param.map((p) => this.tryTransform(p));
    } else {
      this.tryTransform(param);
    }
    return this.data;
  }

  tryTransform(key) {
    if (isString(key) && isFunction(transformers[key])) {
      Object.assign(this.data, transformers[key](this.data));
    }
  }
}
