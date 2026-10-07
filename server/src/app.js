const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const campaignRoutes = require('./routes/campaign.routes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration (allow Vite frontend dev and configurable origin)
const defaultOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];
const configuredOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map(origin => origin.trim()).filter(Boolean)
  : [];
const allowedOrigins = process.env.CLIENT_ORIGIN === '*' ? '*' : [...new Set([...configuredOrigins, ...defaultOrigins])];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'AI Campaign Copy Generator API',
    model: process.env.OPENROUTER_MODEL || 'openrouter/free',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/campaign', campaignRoutes);

// Fallbacks
app.use(notFound);
app.use(errorHandler);

module.exports = app;
