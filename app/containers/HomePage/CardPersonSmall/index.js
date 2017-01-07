import React, { PropTypes } from 'react';

import Avatar from 'material-ui/Avatar';

// import AvatarWrapper from './AvatarWrapper';
import PersonInfo from './PersonInfo';
import PersonName from './PersonName';
import PersonInfoWrapper from './PersonInfoWrapper';
import Wrapper from './Wrapper';

function CardEvent(props) {
  const {
    onClick,
    person,
  } = props;

  const handleClick = () => onClick(person);

  console.log(person);

  return (
    <Wrapper onClick={handleClick}>
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

CardEvent.propTypes = {
  onClick: PropTypes.func,
  person: PropTypes.object,
};

export default CardEvent;
