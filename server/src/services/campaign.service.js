const openrouterService = require('./openrouter.service');
const { buildCampaignPrompt, buildRegeneratePrompt } = require('../prompts/campaign.prompt');
const { extractJSON, validateCampaignOutput, validateSectionOutput } = require('../utils/parseAIResponse');
const logger = require('../utils/logger');

class CampaignService {
  /**
   * Generates full multi-channel campaign copy
   */
  async generateCampaign(campaignData) {
    const { systemPrompt, userPrompt } = buildCampaignPrompt(campaignData);
    
    logger.info(`Generating campaign for product: "${campaignData.productName}" with tone: "${campaignData.tone}"`);
    
    const rawAiResponse = await openrouterService.createChatCompletion({
      systemPrompt,
      userPrompt,
      temperature: 0.7
    });

    const parsed = extractJSON(rawAiResponse);
    const validatedCampaign = validateCampaignOutput(parsed);

    logger.info('Campaign generated and schema successfully validated.');
    return validatedCampaign;
  }

  /**
   * Regenerates a single specific channel section
   */
  async regenerateSection(section, campaignData, currentOutput) {
    const { systemPrompt, userPrompt } = buildRegeneratePrompt(section, campaignData, currentOutput);

    logger.info(`Regenerating section: "${section}" for product: "${campaignData.productName}"`);

    const rawAiResponse = await openrouterService.createChatCompletion({
      systemPrompt,
      userPrompt,
      temperature: 0.85 // slightly higher temperature to encourage fresh creativity
    });

    const parsed = extractJSON(rawAiResponse);
    const validatedSection = validateSectionOutput(parsed, section);

    logger.info(`Section "${section}" regenerated successfully.`);
    return {
      section,
      content: validatedSection
    };
  }
}

module.exports = new CampaignService();
