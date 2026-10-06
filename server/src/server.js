require('dotenv').config();
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`CampaignAI Backend Server running on port ${PORT}`);
  logger.info(`Health check endpoint: http://localhost:${PORT}/health`);
  logger.info(`Using OpenRouter Model: ${process.env.OPENROUTER_MODEL || 'openrouter/free'}`);
});
