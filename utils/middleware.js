const ErrorHandler = (error, req, res, next) => {
  console.log(error.name);

  if (error.name === 'CastError') {
    return res.status(404).json({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res
      .status(400)
      .json({ error: Object.values(error.errors).map((item) => item.message) });
  }

  res.status(500).json({ error: 'Somthing went wrong!' });

  next();
};

module.exports = {
  ErrorHandler,
};
