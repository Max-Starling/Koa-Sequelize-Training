module.exports = (
  message = 'Unexpected error occured',
  status = 400,
) => ({ message, status });