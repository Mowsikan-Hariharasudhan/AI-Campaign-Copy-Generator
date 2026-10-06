/**
 * Robust JSON extraction and schema validation for AI generated responses
 */

function extractJSON(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('Empty or non-string response received from AI model.');
  }

  let clean = text.trim();

  // Strip Markdown code fences if present (```json ... ``` or ``` ...)
  if (clean.startsWith('```')) {
    clean = clean.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  }

  // Attempt standard parse first
  try {
    return JSON.parse(clean);
  } catch (err) {
    // If there is preamble or postscript commentary, locate outermost JSON braces
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const candidate = clean.substring(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(candidate);
      } catch (innerErr) {
        throw new Error(`Failed to parse extracted JSON candidate: ${innerErr.message}`);
      }
    }
    throw new Error(`Could not find valid JSON structure in AI output: ${err.message}`);
  }
}

/**
 * Validates and normalizes the full campaign schema:
 * {
 *   emailSubjects: [string x 5],
 *   emailPreviews: [string x 3],
 *   promotionalEmail: { subject: string, body: string },
 *   whatsappMessage: string,
 *   smsMessage: string
 * }
 */
function validateCampaignOutput(parsed) {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('AI output must be a valid JSON object.');
  }

  // 1. Email Subjects
  if (!Array.isArray(parsed.emailSubjects) || parsed.emailSubjects.length === 0) {
    throw new Error('AI output missing "emailSubjects" array.');
  }
  const cleanSubjects = parsed.emailSubjects
    .map(s => (typeof s === 'string' ? s.trim() : ''))
    .filter(Boolean);

  if (cleanSubjects.length < 3) {
    throw new Error('AI generated fewer than required email subject lines.');
  }

  // 2. Email Previews
  if (!Array.isArray(parsed.emailPreviews) || parsed.emailPreviews.length === 0) {
    throw new Error('AI output missing "emailPreviews" array.');
  }
  const cleanPreviews = parsed.emailPreviews
    .map(p => (typeof p === 'string' ? p.trim() : ''))
    .filter(Boolean);

  if (cleanPreviews.length < 2) {
    throw new Error('AI generated fewer than required email preview texts.');
  }

  // 3. Promotional Email
  if (!parsed.promotionalEmail || typeof parsed.promotionalEmail !== 'object') {
    throw new Error('AI output missing "promotionalEmail" object.');
  }
  const promoSubject = typeof parsed.promotionalEmail.subject === 'string' 
    ? parsed.promotionalEmail.subject.trim() 
    : '';
  const promoBody = typeof parsed.promotionalEmail.body === 'string' 
    ? parsed.promotionalEmail.body.trim() 
    : '';

  if (!promoSubject || !promoBody) {
    throw new Error('AI output "promotionalEmail" must contain both subject and body.');
  }

  // 4. WhatsApp Message
  if (typeof parsed.whatsappMessage !== 'string' || !parsed.whatsappMessage.trim()) {
    throw new Error('AI output missing "whatsappMessage" text.');
  }

  // 5. SMS Message
  if (typeof parsed.smsMessage !== 'string' || !parsed.smsMessage.trim()) {
    throw new Error('AI output missing "smsMessage" text.');
  }

  return {
    emailSubjects: cleanSubjects.slice(0, 5),
    emailPreviews: cleanPreviews.slice(0, 3),
    promotionalEmail: {
      subject: promoSubject,
      body: promoBody
    },
    whatsappMessage: parsed.whatsappMessage.trim(),
    smsMessage: parsed.smsMessage.trim()
  };
}

/**
 * Validates regenerated section response
 */
function validateSectionOutput(parsed, section) {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('AI output must be a valid JSON object.');
  }

  if (section === 'emailSubjects') {
    if (!Array.isArray(parsed.emailSubjects) || parsed.emailSubjects.length === 0) {
      throw new Error('Expected emailSubjects array in regenerated response.');
    }
    return parsed.emailSubjects.map(s => String(s).trim()).filter(Boolean).slice(0, 5);
  }

  if (section === 'emailPreviews') {
    if (!Array.isArray(parsed.emailPreviews) || parsed.emailPreviews.length === 0) {
      throw new Error('Expected emailPreviews array in regenerated response.');
    }
    return parsed.emailPreviews.map(p => String(p).trim()).filter(Boolean).slice(0, 3);
  }

  if (section === 'promotionalEmail') {
    const promo = parsed.promotionalEmail;
    if (!promo || typeof promo !== 'object' || !promo.subject || !promo.body) {
      throw new Error('Expected promotionalEmail object with subject and body.');
    }
    return {
      subject: String(promo.subject).trim(),
      body: String(promo.body).trim()
    };
  }

  if (section === 'whatsappMessage') {
    const msg = parsed.whatsappMessage;
    if (!msg || typeof msg !== 'string') {
      throw new Error('Expected whatsappMessage string.');
    }
    return msg.trim();
  }

  if (section === 'smsMessage') {
    const msg = parsed.smsMessage;
    if (!msg || typeof msg !== 'string') {
      throw new Error('Expected smsMessage string.');
    }
    return msg.trim();
  }

  throw new Error(`Unsupported section regeneration: ${section}`);
}

module.exports = {
  extractJSON,
  validateCampaignOutput,
  validateSectionOutput
};
