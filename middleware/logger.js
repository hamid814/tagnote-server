const logger = (req, res, next) => {
  // console.log(req.url)
  if(req.url === '/favicon.ico') {
    console.log('here'.red)
  }
  next()
};

module.exports = logger