const resStatus = {
  OK: {
    CODE: 200,
    MESSAGE: 'Successful',
    DEL_CARD_MESSAGE: 'Card deleted',
    LIKE_CARD_MESSAGE: 'Like set',
    DISLIKE_CARD_MESSAGE: 'Like unset',
  },
  CREATED: {
    CODE: 201,
    MESSAGE: 'Successful creaced user',
  },
  NOT_FOUND: {
    CODE: 404,
    USER_MESSAGE: 'User not found',
    PAGE_MESSAGE: 'Page not found',
  },
  INVALID_DATA: {
    CODE: 400,
    MESSAGE: 'Invalid data',
    CARD_MESSAGE: 'Card not found',
  },
  INTERNAL: {
    CODE: 500,
    MESSAGE: 'Internal server error',
  },
};

module.exports = resStatus;