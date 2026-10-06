const logger = {
  info: (msg, meta) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, meta !== undefined ? meta : '');
  },
  warn: (msg, meta) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, meta !== undefined ? meta : '');
  },
  error: (msg, meta) => {
    // Ensure we never print sensitive secrets/keys if accidentally passed in error objects
    const sanitizedMeta = meta instanceof Error 
      ? { message: meta.message, stack: meta.stack } 
      : meta;
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, sanitizedMeta !== undefined ? sanitizedMeta : '');
  }
};

module.exports = logger;
