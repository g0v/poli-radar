import React, { PropTypes } from 'react';
import NVD3Chart from 'react-nvd3';
import { format } from 'd3';
import {
  forEach,
  isArray,
  isFunction,
} from 'lodash';
import 'nvd3/build/nv.d3.min.css';

// import { fade } from 'material-ui/utils/colorManipulator';

import { eventColors } from 'styles/colors';

import H4 from 'components/H4';

const nvd3ChartConfiguration = (chart, option, compKey) => {
  const comp = chart[compKey];
  forEach(option, (value, key) => {
    if (isFunction(comp[key])) {
      comp[key](value);
    } else {
      comp[key] = value; // eslint-disable-line no-param-reassign
    }
  });
};

const categoriesToPie = (events) => {
  const categories = events.reduce((res, evt) => {
    if (isArray(evt.categories)) {
      evt.categories.forEach((cat) => {
        const catName = cat.parent.name;
        res[catName] = (res[catName] + 1) || 1; // eslint-disable-line no-param-reassign
      });
    }
    return res;
  }, {});
  const labels = Object.keys(categories).sort((a, b) => categories[b] - categories[a]);
  return {
    configure: (chart) => {
      const options = {
        legend: {
          keyFormatter: (label) => label.replace('行程', ''),
          margin: { top: 10, bottom: -40 },
        },
      };
      forEach(options, (...args) => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
        nvd3ChartConfiguration(chart, ...args);
      });
    },
    color: (d) => eventColors.get(d.label),
    datum: labels.map((label) => ({
      label,
      value: categories[label],
    })),
    height: 350,
    labelType: 'percent',
    type: 'pieChart',
    valueFormat: (d) => `${format('1g')(d)}件`,
    x: 'label',
    y: 'value',
  };
};

function PersonEventsRatio(props) {
  const { person } = props;
  return (
    <div>
      <H4>立委行程比例</H4>
      <p>不完特觀沒兒雙苦本性權的獎辦清買力綠？星人底在生大麼知營標位愛。</p>
      <NVD3Chart {...categoriesToPie(person.events)} />
    </div>
  );
}

PersonEventsRatio.propTypes = {
  person: PropTypes.object,
};

export default PersonEventsRatio;
