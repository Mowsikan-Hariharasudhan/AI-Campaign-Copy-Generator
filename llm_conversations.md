# LLM Conversations & Development Logs

This project was built with the assistance of **Google Gemini Advanced (Antigravity Agent)** to rapidly design, prototype, debug, and polish the AI Campaign Copy Generator. 

## Tooling & LLMs Used
- **Primary AI Agent:** Google Gemini Advanced (via Antigravity IDE)
- **Code Generation / Pair Programming:** Gemini 1.5 Pro
- **Application LLM Engine (Backend):** OpenRouter API
- **Configured application models:** `openrouter/free`, with fallback attempts to `google/gemma-4-26b-a4b-it:free`, `google/gemma-4-31b-it:free`, and `liquid/lfm-2.5-2.6b:free` (as configured in `server/src/services/openrouter.service.js`)

---

## Key Conversations and Development Phases

### Phase 1: Initial Architecture & Setup
**Prompt / Objective:** Design an end-to-end full-stack AI application for an ecommerce campaign generator using React, Node.js, and OpenRouter. It must handle prompt chaining and JSON parsing.
**Outcome:** The agent initialized a Vite/React frontend and an Express/Node.js backend. We set up an OpenRouter integration with a strict `system` prompt that forces the LLM to return data in a specific JSON structure containing keys for `emailSubjects`, `emailPreviews`, `promotionalEmail`, `whatsappMessage`, and `smsMessage`.

### Phase 2: Building the UI & React Components
**Prompt / Objective:** Build a beautiful, modern UI using Tailwind CSS. Add presets, loaders, and distinct cards for each output channel (Email, SMS, WhatsApp). Use `lucide-react` for iconography.
**Outcome:** We designed the `CampaignForm` with scenario-based presets (e.g., "Holiday Flash Sale"). We built the `ResultsPanel` incorporating stunning component cards that look like the native applications (e.g., an SMS bubble, a WhatsApp mock chat layout).

### Phase 3: Debugging AI Output Constraints (The JSON Problem)
**Prompt / Objective:** The backend is throwing an error: `Could not parse JSON from AI response: Unexpected token 'U', "User Safety: safe" is not valid JSON`. The OpenRouter free models are prepending safety strings to the JSON.
**Outcome:** We worked together to build a robust `parseAIResponse.js` utility that uses Regular Expressions (`/\{[\s\S]*\}/`) to aggressively scan the LLM output string, strip out preambles (like "Here is your JSON:" or "User Safety: safe"), and safely parse the nested JSON object.

### Phase 4: Implementing Multi-Model Fallbacks
**Prompt / Objective:** The primary OpenRouter model sometimes times out or returns bad data. We need a fallback strategy.
**Outcome:** The service retries against the configured fallback models when a completion request fails or returns an insufficient safety-only response. Current fallback model IDs are listed above; model availability depends on OpenRouter.

### Phase 5: PDF Generation & Design Polish
**Prompt / Objective:** The exported PDF looks corrupted when the AI generates emojis. Some characters appear as `þ` and the text overflows off the page. Make it look like a stunning, beautifully designed brief.
**Outcome:** The export uses `html2pdf.js` and `html2canvas` to create a styled, paginated PDF from HTML. The resulting page content is rasterized rather than vector-searchable. Later layout fixes keep the overview aligned, avoid a split audience block, and start channel content on a fresh page.

### Phase 6: Finalizing Requirements
**Prompt / Objective:** Ensure all requirements from the assignment PDF are met, including the 1-click copy feature, granular regeneration, and documentation.
**Outcome:** We added a `CopyButton` and `RegenerateButton` to every result card. We ensured the architecture handles isolated regeneration by appending specific instructions to the base prompt. Finally, we wrote the README.md and this LLM conversation log.
