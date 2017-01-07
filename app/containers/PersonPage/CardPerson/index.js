import React, { PropTypes } from 'react';
import { Row, Column } from 'hedron';
import {
  Card,
  CardMedia,
  CardText,
  CardTitle,
} from 'material-ui/Card';
import Chip from 'material-ui/Chip';

import Wrapper from './Wrapper';

function CardPerson(props) {
  const {
    person,
  } = props;

  return (
    <Wrapper>
      <Card>
        <Row>
          <Column fluid xs={2}>
            <CardMedia>
              <img src={person.image} role="presentation" />
            </CardMedia>
          </Column>
          <Column fluid xs={8}>
            <CardTitle>
              {person.name}
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
