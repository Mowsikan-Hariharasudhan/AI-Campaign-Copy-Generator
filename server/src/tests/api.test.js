const assert = require('assert');
const { validateCampaignInput, validateRegenerateInput } = require('../validators/campaign.validator');
const { extractJSON, validateCampaignOutput } = require('../utils/parseAIResponse');

console.log('--- Running Server Unit Tests ---');

// Test 1: Validation with valid input
{
  const validPayload = {
    productName: 'AirStride Running Shoes',
    productDescription: 'Lightweight running shoes designed for everyday runners.',
    offer: '20% Off + Free Shipping',
    targetAudience: 'Men and women aged 20-40',
    campaignObjective: 'Drive weekend sale purchases',
    tone: 'Energetic'
  };
  const res = validateCampaignInput(validPayload);
  assert.strictEqual(res.isValid, true, 'Valid payload should pass');
  assert.strictEqual(res.errors.length, 0);
  console.log('✓ Test 1: Valid campaign input validation passed.');
}

// Test 2: Missing fields validation
{
  const invalidPayload = {
    productName: '',
    offer: '20% Off'
  };
  const res = validateCampaignInput(invalidPayload);
  assert.strictEqual(res.isValid, false, 'Invalid payload should fail');
  assert.ok(res.errors.length >= 4, 'Should catch multiple missing fields');
  console.log('✓ Test 2: Missing fields validation caught all errors accurately.');
}

// Test 3: Invalid Tone validation
{
  const badTonePayload = {
    productName: 'AirStride',
    productDescription: 'Shoes',
    offer: '20% Off',
    targetAudience: 'Runners',
    campaignObjective: 'Sales',
    tone: 'WildlyAggressive'
  };
  const res = validateCampaignInput(badTonePayload);
  assert.strictEqual(res.isValid, false);
  assert.ok(res.errors[0].includes('Tone must be one of'));
  console.log('✓ Test 3: Invalid tone check succeeded.');
}

// Test 4: JSON Extraction from Markdown Codeblock
{
  const markdownWrapped = '```json\n{\n  "emailSubjects": ["S1", "S2", "S3", "S4", "S5"],\n  "emailPreviews": ["P1", "P2", "P3"],\n  "promotionalEmail": { "subject": "Sub", "body": "Body" },\n  "whatsappMessage": "WA msg",\n  "smsMessage": "SMS msg"\n}\n```';
  const extracted = extractJSON(markdownWrapped);
  assert.strictEqual(extracted.emailSubjects.length, 5);
  const validated = validateCampaignOutput(extracted);
  assert.strictEqual(validated.whatsappMessage, 'WA msg');
  console.log('✓ Test 4: Extracted and parsed markdown-wrapped AI JSON output.');
}

// Test 5: Regenerate Validation
{
  const validRegen = {
    section: 'whatsappMessage',
    campaign: {
      productName: 'AirStride',
      productDescription: 'Shoes',
      offer: '20% Off',
      targetAudience: 'Runners',
      campaignObjective: 'Sales',
      tone: 'Friendly'
    },
    currentOutput: 'Old WA msg'
  };
  const res = validateRegenerateInput(validRegen);
  assert.strictEqual(res.isValid, true);
  console.log('✓ Test 5: Regeneration request validation passed.');
}

console.log('All backend unit tests passed successfully!\n');
