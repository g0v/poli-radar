import React, { PropTypes } from 'react';

import { map } from 'lodash';

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

  return (
    <Wrapper onClick={handleClick}>
      <Avatar
        size={64}
        src={person.image}
        style={{ cursor: 'pointer' }}
      />
      <PersonInfoWrapper>
        <PersonName>{person.name}</PersonName>
        {map(person.postitions.committee, (info, key) =>
          <PersonInfo key={key}>{info}</PersonInfo>
        )}
        <PersonInfo>{person.postitions.region}</PersonInfo>
      </PersonInfoWrapper>
    </Wrapper>
  );
}

CardEvent.propTypes = {
  onClick: PropTypes.func,
  person: PropTypes.object,
};

export default CardEvent;
