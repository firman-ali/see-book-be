const CryptoJS = require('crypto-js');

const TokenManager = {
  generateSigantureToken: (body) => {
    const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
    const stringtosign = `POST:${process.env.VA_NUMBER}:${bodyEncrypt}:${process.env.API_KEY}`;
    const signature = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(stringtosign, process.env.API_KEY),
    );
    return signature;
  },
};

module.exports = TokenManager;
