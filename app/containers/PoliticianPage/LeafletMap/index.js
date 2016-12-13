import React, { PropTypes } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { feature } from 'topojson';

import { Map, CircleMarker, GeoJson } from 'react-leaflet';

import {
  grey200,
  grey900,
  teal500,
} from 'material-ui/styles/colors';

import WithLoading from 'containers/WithLoading';
import twCounty2010 from './twCounty2010.topo.json';

const { features } = feature(twCounty2010, twCounty2010.objects.layer1);
const geoData = {
  type: 'FeatureCollection',
  features,
};

const styles = {
  geoJson: {
    fillColor: 'none',
    weight: 1,
    color: grey900,
  },
  map: {
    height: 650,
    background: grey200,
  },
};

export class LeafletMap extends React.Component {
  handleMouseover = (event, evt) => {
    // this.props.onHighLight(evt.id);
    L.popup({ closeButton: false })
      .setLatLng(event.latlng)
      .setContent(`<div>
                <h4>${evt.name}</h4>
                <p>時間：${evt.date}</p>
                <p>地址：${evt.location.address}</p>
                <p>事件類型：${evt.categories.map((cat) => cat.name)}</p>
              </div>`)
      .openOn(event.target._map); // eslint-disable-line no-underscore-dangle
  }

  render() {
    const position = [23.737371, 120.8980168];
    const markers = this.props.data.map((evt) => {
      if (evt.location) {
        return (
          <CircleMarker
            key={`marker-${evt.id}`}
            center={[evt.location.lat, evt.location.lng]}
            fillColor={teal500}
            color={teal500}
            onMouseover={(e) => this.handleMouseover(e, evt)}
          />
        );
      }
    });
    return (
      <Map
        style={styles.map}
        center={position}
        zoom={8}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <GeoJson
          data={geoData}
          style={styles.geoJson}
        />
      </Map>
    );
  }
}

LeafletMap.propTypes = {
  data: PropTypes.array,
};

export default WithLoading(LeafletMap);
