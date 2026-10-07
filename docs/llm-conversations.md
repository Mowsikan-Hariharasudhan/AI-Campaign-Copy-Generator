# LLM Development Conversations & Prompt Engineering Log

This document records the prompt engineering iterations and architecture conversations conducted during the development of **CampaignAI**.

---

## LLM Used
- **Provider**: OpenRouter
- **Default Model**: `openrouter/free`
- **Configured fallback models**: `google/gemma-4-26b-a4b-it:free`, `google/gemma-4-31b-it:free`, `liquid/lfm-2.5-2.6b:free` (model availability depends on OpenRouter)
- **Interface**: REST API `/chat/completions`

---

## Conversation 1: System Prompt Design & Grounding Constraints

### Purpose
Establish a domain persona that prevents common generative copywriting pathologies (hallucinating fabricated reviews, making up fake technical specs, or adding unrealistic guarantees).

### Prompt
```text
You are an expert ecommerce and direct-to-consumer (D2C) marketing copywriter.

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
9. Return ONLY a valid JSON object matching the requested schema. No conversational preambles, no markdown code fence blocks.
```

### Outcome
The model adhered to ground-truth product facts while creatively reshaping benefits for each marketing channel without generating hallucinated claims.

---

## Conversation 2: Multi-Channel Output Schema Enforcement

### Purpose
Ensure deterministic structured JSON output across all five required channels with exact quantity constraints.

### Prompt
```text
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
    "body": "Hi there,\n\n[Email Body text with paragraphs]\n\n[CTA Button / Link]\n\nBest,\nThe Team"
  },
  "whatsappMessage": "Text for WhatsApp campaign...",
  "smsMessage": "Text for SMS campaign..."
}
```

### Outcome
Enables reliable backend parsing via `extractJSON()` and validation via `validateCampaignOutput()`, allowing the frontend to render structured cards without parsing ambiguities.

---

## Conversation 3: Channel-Specific Constraints & Tone Adaptation

### Purpose
Calibrate tone nuances (Professional, Energetic, Playful, Premium, Urgent, Friendly) and enforce channel-specific character limits.

### Prompt
```text
### CHANNEL REQUIREMENTS
1. EMAIL SUBJECT LINES: Exactly 5 punchy, high-open-rate subject lines. Under 60 characters each. Relevant, intriguing, highlighting benefit or offer.
2. EMAIL PREVIEW TEXTS: Exactly 3 engaging preheaders (35-70 characters) that complement email subject lines.
3. PROMOTIONAL EMAIL: 
   - A compelling subject line.
   - A structured email body containing: an opening hook, value proposition grounded in the product details, natural spotlight on the offer (${offer}), audience-relevant context, and a clear, high-intent Call To Action (CTA).
4. WHATSAPP MESSAGE: Compact, conversational, mobile-first message (60-120 words). Friendly formatting with strategic spacing or emojis if fitting the tone. Ends with clear action/link CTA.
5. SMS MESSAGE: Ultra-concise, high-impact message (under 160 characters / 30 words). Directly highlights product, ${offer}, and CTA.
```

### Outcome
Generated SMS messages stay within standard cellular PDU boundaries (160 characters), WhatsApp copy adopts mobile formatting, and subject lines remain below inbox truncation limits.

---

## Conversation 4: Surgical Section Regeneration Prompt

### Purpose
Regenerate a single channel (e.g. SMS or WhatsApp) without incurring full re-generation costs or generating identical duplicates.

### Prompt
```text
### REGENERATION TASK
Target Section: ${section}
Requirement: ${sectionRequirement}

PREVIOUS OUTPUT TO REPLACE:
${currentOutput}

Make the new version creatively distinct, fresh, and engaging while strictly respecting the ground truth product facts and tone.

### OUTPUT JSON SCHEMA
Respond ONLY with raw JSON matching this format:
${expectedFormat}
```

### Outcome
Passing `currentOutput` as negative reference context ensured the model generated an entirely novel angle while keeping all product and discount parameters constant.

---

## Conversation 5: Resilient Error Recovery & JSON Extraction

### Purpose
Handle model idiosyncrasies where smaller or free models wrap JSON in markdown tags or include conversational commentary.

### Strategy Implemented
In `server/src/utils/parseAIResponse.js`:
1. Strips markdown fences (` ```json ` ... ` ``` `).
2. Uses outer brace detection (`firstBrace` to `lastBrace`) to isolate candidate JSON if conversational text surrounds it.
3. Validates required array lengths and object keys.
4. Returns descriptive error messages rather than unhandled server crashes.
