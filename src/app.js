const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');

function createApp() {
  const app = express();

  // Security headers
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    })
  );

  // Logging
  app.use(morgan('dev'));

  // Body parsing
  app.use(express.json({ limit: '1mb' }));

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 200,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // Routes
  app.use('/api/auth', authRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ ok: true });
  });

  // 404
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-line
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message || 'Internal server error' });
  });

  return app;
}

module.exports = { createApp };

