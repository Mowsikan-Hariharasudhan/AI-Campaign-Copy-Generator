const campaignService = require('../services/campaign.service');
const { validateCampaignInput, validateRegenerateInput } = require('../validators/campaign.validator');
const logger = require('../utils/logger');

/**
 * Controller handling campaign creation and regeneration requests
 */
const campaignController = {
  /**
   * POST /api/campaign/generate
   */
  async generate(req, res, next) {
    try {
      const validation = validateCampaignInput(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed.',
            details: validation.errors
          }
        });
      }

      const campaignData = validation.sanitized;
      const result = await campaignService.generateCampaign(campaignData);

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/campaign/regenerate
   */
  async regenerate(req, res, next) {
    try {
      const validation = validateRegenerateInput(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed for regeneration request.',
            details: validation.errors
          }
        });
      }

      const { section, campaign, currentOutput } = validation.sanitized;
      const result = await campaignService.regenerateSection(section, campaign, currentOutput);

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = campaignController;
