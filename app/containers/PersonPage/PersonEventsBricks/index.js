import React, { PropTypes } from 'react';
import {
  map,
  isArray,
} from 'lodash';

import { eventColors } from 'styles/colors';

import H4 from 'components/H4';

import Brick from './Brick';

const sumByCategories = (events) => events.reduce((res, evt) => {
  if (isArray(evt.categories)) {
    evt.categories.forEach((cat) => {
      const catName = cat.parent.name;
      res[catName] = (res[catName] + 1) || 1; // eslint-disable-line no-param-reassign
    });
  }
  return res;
}, {});

const rednerBricks = (count, color) => (
  <div>
    {Array(count).fill(1).map((_, index) => (
      <Brick key={`brick-${index}`} color={color} />
    ))}
  </div>
);

const renderBrickComponent = (value, label) => (
  <div key={`brick-${label}`}>
    <p>{label} ({value})</p>
    {rednerBricks(value, eventColors.get(label))}
  </div>
);

function PersonEventsRatio({ person }) {
  return (
    <div>
      <H4>累積行程總數（{person.events.length}）</H4>
      {map(sumByCategories(person.events), renderBrickComponent)}
    </div>
  );
}

PersonEventsRatio.propTypes = {
  person: PropTypes.object,
};

export default PersonEventsRatio;
