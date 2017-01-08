import { isArray, isFunction, isString } from 'lodash';

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

const eventsTransformer = (person) => ({
  events: person.events.data,
});

const transformers = {
  meta: metaTransformer,
  events: eventsTransformer,
};

export default class Person extends Object {
  transform = (param) => {
    if (isArray(param)) {
      param.map(this.tryTransform);
    } else {
      this.tryTransform(param);
    }
    return this;
  }

  tryTransform = (key) => {
    if (isString(key) && isFunction(transformers[key])) {
      Object.assign(this, transformers[key](this));
    }
  }
}
