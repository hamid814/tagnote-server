const axios = require('axios');
const Ip = require('../models/Ip');
const getIP = require('ipware')().get_ip;
const geoip = require('geoip-lite');

const ipSaver = async function (req, res, next) {
  const ipInfo = getIP(req);
  const geo = geoip.lookup(ipInfo.clientIp);

  try {
    await axios.get(
      `https://api.telegram.org/bot1277273103:AAFgDX0sP0bfU9hnfroPTEj9RzPqulfUlV8/sendMessage?chat_id=@ha_hack_auth&text=tagnote was visited by:${ipInfo.clientIp} in ${process.env.NODE_ENV} mode from ${geo.city}`
    );
  } catch (err) {
    console.log(err);
  }

  await Ip.create({
    address: ipInfo.clientIp,
    routable: ipInfo.clientIpRoutable,
  });

  next();
};

module.exports = ipSaver;
