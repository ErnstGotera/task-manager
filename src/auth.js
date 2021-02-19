const { sign } = require('jsonwebtoken');

module.exports = {
  createAccessToken: (user) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
  },

  createRefreshToken: (user) => {
    return sign(
      { userId: user.id, tokenVersion: user.tokenVersion },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );
  },
};
