import React, { PropTypes } from 'react';
import { Row, Column } from 'hedron';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import FbIcon from 'assets/icons/FbIcon';
import BackgroundImage from 'components/BackgroundImage';
import FullWidthButton from 'components/FullWidthButton';
import PositionAbsolute from 'components/Positions/Absolute';
import PositionRelative from 'components/Positions/Relative';

function PersonImageSection({ person }) {
  return (
    <PositionRelative>
      <BackgroundImage src={person.image} fullHeight />
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
  );
}

PersonImageSection.propTypes = {
  person: PropTypes.object,
};

export default PersonImageSection;
