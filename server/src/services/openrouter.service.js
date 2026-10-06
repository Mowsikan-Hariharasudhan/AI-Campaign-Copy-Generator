const logger = require('../utils/logger');

/**
 * OpenRouter Service
 * Dispatches completion requests to OpenRouter Chat API.
 * Includes automatic model fallback to ensure 100% reliable responses
 * even when free-tier routers route to safety-filtering or content-safety models.
 */
class OpenRouterService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.primaryModel = process.env.OPENROUTER_MODEL || 'openrouter/free';
    this.baseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

    // Reliable fallback models on OpenRouter free tier
    this.fallbackModels = [
      'google/gemma-4-26b-a4b-it:free',
      'google/gemma-4-31b-it:free',
      'liquid/lfm-2.5-2.6b:free'
    ];
  }

  async createChatCompletion({ systemPrompt, userPrompt, temperature = 0.7 }) {
    if (!this.apiKey || this.apiKey === 'your_openrouter_api_key_here' || this.apiKey === 'OPEN-ROUTER-API-KEY') {
      throw new Error(
        'OPENROUTER_API_KEY is not configured or is using placeholder. Please set a valid key in server/.env.'
      );
    }

    const modelsToTry = [this.primaryModel, ...this.fallbackModels.filter(m => m !== this.primaryModel)];
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        logger.info(`Attempting completion with model: ${model}`);
        const content = await this._sendRequest({
          model,
          systemPrompt,
          userPrompt,
          temperature
        });

        // If the model returned only a safety disclaimer with no JSON, skip to fallback model
        if (content.trim() === 'User Safety: safe' || (content.length < 30 && !content.includes('{'))) {
          logger.warn(`Model ${model} returned safety disclaimer or insufficient text: "${content.trim()}". Trying next model...`);
          continue;
        }

        return content;
      } catch (err) {
        logger.warn(`Model ${model} failed: ${err.message}. Trying next candidate model...`);
        lastError = err;
      }
    }

    throw lastError || new Error('All candidate OpenRouter models failed to return a valid response.');
  }

  async _sendRequest({ model, systemPrompt, userPrompt, temperature }) {
    const endpoint = `${this.baseUrl}/chat/completions`;
    const payload = {
      model,
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

        if (response.status === 401) {
          throw new Error('Authentication failed with OpenRouter. Please verify your OPENROUTER_API_KEY.');
        } else if (response.status === 429) {
          throw new Error('OpenRouter rate limit reached or model quota exceeded. Please retry in a few moments.');
        } else {
          throw new Error(`OpenRouter API error (${response.status}): ${errorBody || 'Service error'}`);
        }
      }

      const data = await response.json();
      const choice = data?.choices?.[0];
      const content = choice?.message?.content;

      if (!content || typeof content !== 'string') {
        throw new Error('OpenRouter returned an empty message content.');
      }

      return content;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error(`Request to OpenRouter for model ${model} timed out after 45s.`);
      }
      throw err;
    }
  }
}

module.exports = new OpenRouterService();
