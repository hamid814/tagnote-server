const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // finding resources
  query = model.find();

  query = query.sort('-date');

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // add population
  if (populate) {
    populate.forEach((populate) => {
      query = query.populate(populate);
    });
  }

  // executing query
  const results = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  if (endIndex > total) {
    pagination.prev = {
      page: Math.ceil(total / limit),
      limit,
    };
  }

  if (startIndex === 0) {
    delete pagination.prev;
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
