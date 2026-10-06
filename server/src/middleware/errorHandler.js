const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error('Unhandled request error:', err);

  const status = err.status || err.statusCode || 500;
  
  // Safe human-readable messages without leaking internal trace details or env secrets
  let userMessage = 'An unexpected error occurred while processing your request. Please try again.';

  if (err.message && (
    err.message.includes('OpenRouter') ||
    err.message.includes('OPENROUTER_API_KEY') ||
    err.message.includes('timed out') ||
    err.message.includes('quota') ||
    err.message.includes('API key') ||
    err.message.includes('JSON') ||
    err.message.includes('rate limit')
  )) {
    userMessage = err.message;
  }

  res.status(status).json({
    success: false,
    error: {
      message: userMessage
    }
  });
}

module.exports = errorHandler;
