const forceRemote = false;

const remoteUri = 'https://mysterious-citadel-44315.herokuapp.com/api';
const localUri = 'http://localhost:8000/api';

export const BASE_URI = forceRemote ? remoteUri : ( // eslint-disable-line no-nested-ternary
  process.env.NODE_ENV === 'production' ? remoteUri : localUri
);

export const DATE_FORMAT = 'YYYY-MM-DD';
