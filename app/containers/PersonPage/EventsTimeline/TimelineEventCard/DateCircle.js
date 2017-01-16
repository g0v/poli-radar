import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { format, parse } from 'date-fns';

import {
  circleMargin,
  circleSize,
  color,
  lineWidth,
} from '../style';

const offset = parseInt(circleMargin, 10) + (parseInt(circleSize, 10) / 2) + 1;

const Circle = styled.div`
  & {
    position: absolute;
    top: 0.75em;
    left: -${offset}em;
    width: ${circleSize};
    height: ${circleSize};
    background-color: ${color};
    border-radius: 50%;
    line-height: 0;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: ${offset}em;
    height: ${lineWidth};
    left: 0;
    top: 50%;
    background-color: ${color};
  }
`;

const DateText = styled.div`
  & {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.8em;
  }
`;

function DateCircle(props) {
  const { date } = props;
  const formatted = format(parse(date), 'MM/DD');
  return (
    <Circle>
      <DateText>{formatted}</DateText>
    </Circle>
  );
}

DateCircle.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DateCircle;
