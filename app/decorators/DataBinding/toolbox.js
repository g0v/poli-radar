// import { get, map } from 'lodash';

export const personTransformer = (person) =>
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
    ...person,
  });
