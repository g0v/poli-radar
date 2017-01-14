import React, { PropTypes } from 'react';
import { Row, Column } from 'hedron';
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import FbIcon from 'assets/icons/FbIcon';

import BackgroundImage from 'components/BackgroundImage';
import FullWidthButton from 'components/FullWidthButton';
import PositionAbsolute from 'components/Positions/Absolute';
import PositionRelative from 'components/Positions/Relative';
import { partyColors } from 'styles/colors';

import PartyChip from './PartyChip';
import PersonName from './PersonName';
import Positions from './Positions';
import PositionTitle from './PositionTitle';
import Wrapper from './Wrapper';

const renderCommittee = (committee, index) => (
  <PositionTitle key={`committee-${index}`}>{committee.period} | {committee.label}</PositionTitle>
);

function CardPerson(props) {
  const {
    person,
  } = props;

  // console.log(person);

  return (
    <Wrapper>
      <Card>
        <Row>
          <Column fluid xs={2}>
            <PositionRelative>
              <BackgroundImage src={person.image} />
              <PositionAbsolute bottom="0">
                <Row>
                  <Column fluid xs={6}>
                    <FullWidthButton
                      backgroundColor="#e0253c"
                      icon={<ActionFavorite />}
                      label="追蹤"
                      labelColor="white"
                    />
                  </Column>
                  <Column fluid xs={6}>
                    <FullWidthButton
                      backgroundColor="#3b5998"
                      icon={<FbIcon />}
                      label="分享"
                      labelColor="white"
                    />
                  </Column>
                </Row>
              </PositionAbsolute>
            </PositionRelative>
          </Column>
          <Column fluid xs={8}>
            <CardTitle>
              <PersonName>{person.name}</PersonName>
              <PartyChip backgroundColor={partyColors.get(person.party)}>{person.party}</PartyChip>
              <Positions>
                <PositionTitle>{person.region}</PositionTitle>
              </Positions>
              {person.committees.map(renderCommittee)}
            </CardTitle>
            <CardText>
              立委簡介，不完特觀沒兒雙苦本性權的獎辦清買力綠？星人底在生大麼知營標位愛。展聽麼卻了，重個間是，未演年照會語時物公不。朋從子關， 展聽麼卻了，重個間是，未演年照會語時物公不。朋從子關。
            </CardText>
          </Column>
          <Column fluid xs={2}></Column>
        </Row>
      </Card>
    </Wrapper>
  );
}

CardPerson.propTypes = {
  person: PropTypes.object,
};

export default CardPerson;
