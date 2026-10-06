const ALLOWED_TONES = [
  'Professional',
  'Energetic',
  'Playful',
  'Premium',
  'Urgent',
  'Friendly'
];

const ALLOWED_SECTIONS = [
  'emailSubjects',
  'emailPreviews',
  'promotionalEmail',
  'whatsappMessage',
  'smsMessage'
];

/**
 * Validates campaign generation input payload
 */
function validateCampaignInput(body) {
  const errors = [];
  const { productName, productDescription, offer, targetAudience, campaignObjective, tone } = body || {};

  if (!productName || typeof productName !== 'string' || !productName.trim()) {
    errors.push('Product name is required and cannot be empty.');
  }

  if (!productDescription || typeof productDescription !== 'string' || !productDescription.trim()) {
    errors.push('Product description is required and cannot be empty.');
  }

  if (!offer || typeof offer !== 'string' || !offer.trim()) {
    errors.push('Offer / discount details are required and cannot be empty.');
  }

  if (!targetAudience || typeof targetAudience !== 'string' || !targetAudience.trim()) {
    errors.push('Target audience is required and cannot be empty.');
  }

  if (!campaignObjective || typeof campaignObjective !== 'string' || !campaignObjective.trim()) {
    errors.push('Campaign objective is required and cannot be empty.');
  }

  if (!tone || typeof tone !== 'string' || !tone.trim()) {
    errors.push('Tone of voice is required.');
  } else if (!ALLOWED_TONES.includes(tone.trim())) {
    // If not strictly matching one of the canonical 6, verify case-insensitively or flag
    const match = ALLOWED_TONES.find(t => t.toLowerCase() === tone.trim().toLowerCase());
    if (!match) {
      errors.push(`Tone must be one of: ${ALLOWED_TONES.join(', ')}.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      productName: productName?.trim(),
      productDescription: productDescription?.trim(),
      offer: offer?.trim(),
      targetAudience: targetAudience?.trim(),
      campaignObjective: campaignObjective?.trim(),
      tone: tone?.trim()
    }
  };
}

/**
 * Validates regeneration request payload
 */
function validateRegenerateInput(body) {
  const errors = [];
  const { section, campaign, currentOutput } = body || {};

  if (!section || !ALLOWED_SECTIONS.includes(section)) {
    errors.push(`Invalid section. Must be one of: ${ALLOWED_SECTIONS.join(', ')}.`);
  }

  const campaignValidation = validateCampaignInput(campaign);
  if (!campaignValidation.isValid) {
    errors.push(...campaignValidation.errors);
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      section,
      campaign: campaignValidation.sanitized,
      currentOutput: typeof currentOutput === 'string' ? currentOutput.trim() : currentOutput
    }
  };
}

module.exports = {
  ALLOWED_TONES,
  ALLOWED_SECTIONS,
  validateCampaignInput,
  validateRegenerateInput
};
