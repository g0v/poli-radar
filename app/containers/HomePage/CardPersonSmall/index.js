import React, { PropTypes } from 'react';

import Avatar from 'material-ui/Avatar';

import PersonInfo from './PersonInfo';
import PersonInfoWrapper from './PersonInfoWrapper';
import PersonName from './PersonName';
import Wrapper from './Wrapper';

function CardPersonSmall({ onClick, person }) {
  return (
    <Wrapper onClick={() => onClick(person)}>
      <Avatar
        size={64}
        src={person.image}
        style={{ cursor: 'pointer' }}
      />
      <PersonInfoWrapper>
        <PersonName>{person.name}</PersonName>
        {person.committees && person.committees.map((committee, index) =>
          <PersonInfo key={`committee-${index}`}>{committee.period} | {committee.label}</PersonInfo>
        )}
        <PersonInfo>{person.region}</PersonInfo>
      </PersonInfoWrapper>
    </Wrapper>
  );
}

CardPersonSmall.propTypes = {
  onClick: PropTypes.func,
  person: PropTypes.object,
};

export default CardPersonSmall;
