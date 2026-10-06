/**
 * Campaign Prompt Engineering
 * Separates system directives, domain constraints, formatting rules, and user campaign facts.
 */

const SYSTEM_PROMPT = `You are an expert ecommerce and direct-to-consumer (D2C) marketing copywriter.

Your task is to generate high-converting, realistic marketing copy strictly grounded in the campaign parameters provided by the user.

GROUNDING & QUALITY RULES:
1. Stay strictly grounded in the provided product name, description, and offer.
2. DO NOT invent unmentioned product features, specs, materials, or fake scientific claims.
3. DO NOT fabricate reviews, ratings, user quotes, customer numbers, or fake urgency/scarcity (e.g. "Only 2 left!" unless specified).
4. DO NOT make unsubstantiated superlative claims ("#1 in the world", "best ever") unless provided in the inputs.
5. Highlight the offer prominently and naturally in every channel.
6. Adapt writing style accurately to the requested TONE OF VOICE without repeating the tone name as a gimmick.
7. Include clear, channel-appropriate calls-to-action (CTA).
8. Never state or hint that you are an AI assistant.
9. Return ONLY a valid JSON object matching the requested schema. No conversational preambles, no markdown code fence blocks.`;

/**
 * Builds the prompt for generating the full campaign
 */
function buildCampaignPrompt(campaign) {
  const { productName, productDescription, offer, targetAudience, campaignObjective, tone } = campaign;

  const userPrompt = `### CAMPAIGN INPUTS
- PRODUCT NAME: ${productName}
- PRODUCT DESCRIPTION: ${productDescription}
- OFFER / DISCOUNT: ${offer}
- TARGET AUDIENCE: ${targetAudience}
- CAMPAIGN OBJECTIVE: ${campaignObjective}
- TONE OF VOICE: ${tone}

### CHANNEL REQUIREMENTS
1. EMAIL SUBJECT LINES: Exactly 5 punchy, high-open-rate subject lines. Under 60 characters each. Relevant, intriguing, highlighting benefit or offer.
2. EMAIL PREVIEW TEXTS: Exactly 3 engaging preheaders (35-70 characters) that complement email subject lines.
3. PROMOTIONAL EMAIL: 
   - A compelling subject line.
   - A structured email body containing: an opening hook, value proposition grounded in the product details, natural spotlight on the offer (${offer}), audience-relevant context, and a clear, high-intent Call To Action (CTA).
4. WHATSAPP MESSAGE: Compact, conversational, mobile-first message (60-120 words). Friendly formatting with strategic spacing or emojis if fitting the tone. Ends with clear action/link CTA.
5. SMS MESSAGE: Ultra-concise, high-impact message (under 160 characters / 30 words). Directly highlights product, ${offer}, and CTA.

### OUTPUT JSON SCHEMA
You must respond ONLY with a raw JSON object with this exact shape:
{
  "emailSubjects": [
    "Subject 1",
    "Subject 2",
    "Subject 3",
    "Subject 4",
    "Subject 5"
  ],
  "emailPreviews": [
    "Preview 1",
    "Preview 2",
    "Preview 3"
  ],
  "promotionalEmail": {
    "subject": "Email Subject",
    "body": "Hi there,\\n\\n[Email Body text with paragraphs]\\n\\n[CTA Button / Link]\\n\\nBest,\\nThe Team"
  },
  "whatsappMessage": "Text for WhatsApp campaign...",
  "smsMessage": "Text for SMS campaign..."
}`;

  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt
  };
}

/**
 * Builds the prompt for regenerating an individual channel section
 */
function buildRegeneratePrompt(section, campaign, currentOutput) {
  const { productName, productDescription, offer, targetAudience, campaignObjective, tone } = campaign;

  let sectionRequirement = '';
  let expectedFormat = '';

  switch (section) {
    case 'emailSubjects':
      sectionRequirement = 'Generate 5 NEW, alternative, high-performing email subject lines. Offer fresh hooks and angles distinct from the previous version.';
      expectedFormat = '{\n  "emailSubjects": ["New Subject 1", "New Subject 2", "New Subject 3", "New Subject 4", "New Subject 5"]\n}';
      break;
    case 'emailPreviews':
      sectionRequirement = 'Generate 3 NEW, alternative preview preheader texts (35-70 characters).';
      expectedFormat = '{\n  "emailPreviews": ["New Preview 1", "New Preview 2", "New Preview 3"]\n}';
      break;
    case 'promotionalEmail':
      sectionRequirement = 'Generate a NEW complete promotional email (subject and body) with a distinct creative angle, opening hook, and CTA, while honoring all product details and the offer.';
      expectedFormat = '{\n  "promotionalEmail": {\n    "subject": "New Subject",\n    "body": "New full body..."\n  }\n}';
      break;
    case 'whatsappMessage':
      sectionRequirement = 'Generate a FRESH WhatsApp promotional message (60-120 words) with an engaging mobile layout and high-intent CTA.';
      expectedFormat = '{\n  "whatsappMessage": "New conversational WhatsApp message..."\n}';
      break;
    case 'smsMessage':
      sectionRequirement = 'Generate a FRESH SMS message (under 160 characters) with direct punchy offer and CTA.';
      expectedFormat = '{\n  "smsMessage": "New direct SMS..."\n}';
      break;
    default:
      throw new Error(`Unsupported section: ${section}`);
  }

  const userPrompt = `### CAMPAIGN INPUTS
- PRODUCT NAME: ${productName}
- PRODUCT DESCRIPTION: ${productDescription}
- OFFER / DISCOUNT: ${offer}
- TARGET AUDIENCE: ${targetAudience}
- CAMPAIGN OBJECTIVE: ${campaignObjective}
- TONE OF VOICE: ${tone}

### REGENERATION TASK
Target Section: ${section}
Requirement: ${sectionRequirement}

PREVIOUS OUTPUT TO REPLACE:
${typeof currentOutput === 'object' ? JSON.stringify(currentOutput) : currentOutput || '(None provided)'}

Make the new version creatively distinct, fresh, and engaging while strictly respecting the ground truth product facts and tone.

### OUTPUT JSON SCHEMA
Respond ONLY with raw JSON matching this format:
${expectedFormat}`;

  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt
  };
}

module.exports = {
  SYSTEM_PROMPT,
  buildCampaignPrompt,
  buildRegeneratePrompt
};
