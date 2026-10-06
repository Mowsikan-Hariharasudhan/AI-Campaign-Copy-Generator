const logger = require('../utils/logger');

/**
 * OpenRouter Service
 * Dispatches completion requests to OpenRouter Chat API.
 * Never leaks the API key in client responses or error logs.
 */
class OpenRouterService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.model = process.env.OPENROUTER_MODEL || 'openrouter/free';
    this.baseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
  }

  async createChatCompletion({ systemPrompt, userPrompt, temperature = 0.7 }) {
    if (!this.apiKey || this.apiKey === 'your_openrouter_api_key_here') {
      throw new Error(
        'OPENROUTER_API_KEY is not configured or is using placeholder. Please set a valid key in server/.env.'
      );
    }

    const endpoint = `${this.baseUrl}/chat/completions`;
    const payload = {
      model: this.model,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature,
      include_reasoning: false
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'HTTP-Referer': process.env.APP_URL || 'http://localhost:5173',
      'X-Title': 'AI Campaign Copy Generator'
    };

    logger.info(`Sending completion request to OpenRouter using model: ${this.model}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s safety timeout

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorBody = '';
        try {
          const errJson = await response.json();
          errorBody = errJson?.error?.message || JSON.stringify(errJson);
        } catch {
          errorBody = await response.text();
        }

        logger.error(`OpenRouter API responded with status ${response.status}`, { status: response.status });

        if (response.status === 401) {
          throw new Error('Authentication failed with OpenRouter. Please verify your OPENROUTER_API_KEY.');
        } else if (response.status === 429) {
          throw new Error('OpenRouter rate limit reached or model quota exceeded. Please retry in a few moments.');
        } else if (response.status === 503 || response.status === 502) {
          throw new Error('OpenRouter model provider is temporarily unavailable. Please retry in a moment.');
        } else {
          throw new Error(`OpenRouter API error (${response.status}): ${errorBody || 'Service error'}`);
        }
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('OpenRouter returned an empty response choice.');
      }

      return content;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('Request to OpenRouter timed out after 45 seconds.');
      }
      throw err;
    }
  }
}

module.exports = new OpenRouterService();
