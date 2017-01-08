import {
  isArray,
  isFunction,
  isString,
} from 'lodash';

const metaTransformer = (person) =>
  person.memberships.data.reduce((res, membership) => {
    const { post, label } = membership;
    if (post) {
      const { classification } = post;
      if (classification) {
        if (classification.name === '選區') res.region = post.label; // eslint-disable-line no-param-reassign
        if (classification.name === '委員會') {
          res.committees.push({
            label: post.label,
            period: membership.label,
          });
        }
      }
    }
    if (label === '黨員' && membership.organization) {
      res.party = membership.organization.name; // eslint-disable-line no-param-reassign
    }
    return res;
  }, {
    committees: [],
  });

const eventsTransformer = (person) => {
  try {
    return {
      events: person.events.data.map((evt) => ({
        ...evt,
        categories: evt.categories.data.map((cat) => cat.name),
      })),
    };
  } catch (e) {
    // console.log(e);
    return null;
  }
};

const transformers = {
  meta: metaTransformer,
  events: eventsTransformer,
};

export default class Person {
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
