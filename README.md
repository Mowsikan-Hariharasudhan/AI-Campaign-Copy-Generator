# CampaignAI — AI Campaign Copy Generator

> **AI-powered ecommerce campaign copy, ready for every channel.**  
> Built as an interview assignment prototype for Kalaiworks (AI Full-Stack Engineer role).

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Express-5-lightgrey.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI%20API-orange.svg)](https://openrouter.ai/)

---

## 1. Overview

**CampaignAI** is a mini SaaS-style marketing assistant that takes structured product and campaign parameters and generates multi-channel marketing copy tailored for ecommerce and Direct-to-Consumer (D2C) brands.

With a single click, it synthesizes high-converting copy across **Email**, **WhatsApp**, and **SMS**, adhering to channel constraints, brand tone, and ground-truth product facts.

---

## 2. The Problem

Writing multi-channel marketing campaigns is fragmented, time-consuming, and error-prone:
- Marketing teams spend hours rewriting the same product facts for differing character limits across channels.
- Generalist AI prompts often hallucinate unsupported product features, fabricate fake customer reviews, or generate generic marketing fluff.
- Copywriters lack a quick, centralized tool that provides instant channel variations with one-click copying and granular regeneration.

---

## 3. The Solution

**CampaignAI** solves this through a dedicated prompt engineering pipeline and structured schema validation:
- **Zero Hallucination Guardrails**: The system prompt strictly prohibits inventing features, reviews, ratings, or artificial scarcity.
- **Strict Structured JSON Output**: Output is enforced and validated on the backend before ever touching the client UI.
- **Granular Channel Optimization**: Generates 5 Email Subject Lines, 3 Email Previews, 1 Full Promotional Email, 1 WhatsApp Message, and 1 SMS message tailored to specific character limits and layout conventions.
- **Surgical Section Regeneration**: Users can regenerate an individual channel (e.g. just the WhatsApp message or just subject lines) without restarting or re-generating the entire campaign.
- **Stateless & Secure**: API keys remain strictly on the backend. No database overhead or authentication bloat is required.

---

## 4. Features

### Core Features (P0)
- **Input Parameters Form**: Product Name, Product Description, Offer/Discount, Target Audience, Campaign Objective, and Tone of Voice.
- **Channel Outputs**:
  - **5 Email Subject Lines**: Punchy, high open-rate variations under 60 characters.
  - **3 Email Preview Texts**: Preheader hooks (35–70 characters) complementing subject lines.
  - **1 Promotional Email**: Complete email with hook, value proposition, offer spotlight, and CTA.
  - **1 WhatsApp Message**: Compact, conversational, mobile-first message (60–120 words).
  - **1 SMS Message**: Direct, ultra-concise message (under 160 characters) with character/segment counter.
- **One-Click Copy**: Instant clipboard copy with visual feedback ("Copied") on every single block.
- **Pre-flight & Post-flight Validation**: Strict client and server input validation with safe JSON extraction and schema verification.
- **Safe Error Recovery**: Clear, user-friendly error banners for missing inputs, API rate limits, or network timeouts.

### Bonus Features (P1 & P2)
- **Individual Section Regeneration**: Surgical regeneration of any section via `POST /api/campaign/regenerate`.
- **6 Distinct Tones**: *Professional*, *Energetic*, *Playful*, *Premium*, *Urgent*, and *Friendly*.
- **1-Click Sample Data Loader**: Populates the form with the assignment sample data (*AirStride Running Shoes*).
- **Export as Markdown**: Download complete campaign copy formatted in `.md` with a single click.
- **Refined Corporate Brutalist UI**: Clean, structural aesthetic built with responsive grid, accessible contrasts, and crisp micro-interactions.

---

## 5. Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React icons.
- **Backend**: Node.js, Express 5, Helmet (HTTP security headers), CORS, dotenv.
- **AI Integration**: OpenRouter Chat Completions API (`openrouter/free` model by default, configurable).
- **Deployment**: Vercel (Frontend), Render / Railway (Backend).

---

## 6. Architecture

```text
+--------------------------------------------------------------+
|                        Browser Client                        |
|   React 19 + Tailwind CSS + Lucide Icons + Form State        |
+--------------------------------------------------------------+
                               |
                   POST /api/campaign/generate
                   POST /api/campaign/regenerate
                               |
                               v
+--------------------------------------------------------------+
|                     Express.js Backend                       |
|  - Input Validation (validators/campaign.validator.js)       |
|  - Prompt Builder (prompts/campaign.prompt.js)               |
|  - Secret Management (OPENROUTER_API_KEY kept on server)     |
+--------------------------------------------------------------+
                               |
               POST https://openrouter.ai/api/v1
                               |
                               v
+--------------------------------------------------------------+
|                     OpenRouter AI API                        |
|  Model: openrouter/free (or meta-llama, mistral, claude)     |
+--------------------------------------------------------------+
                               |
                        Raw AI Response
                               |
                               v
+--------------------------------------------------------------+
|                 Response Processing Pipeline                 |
|  - extractJSON() (safe Markdown fence & brace extraction)    |
|  - validateCampaignOutput() (strict schema contract)         |
|  - Error Handler Middleware (clean human error masking)      |
+--------------------------------------------------------------+
                               |
                    Structured JSON Response
                               |
                               v
+--------------------------------------------------------------+
|                     Results Workspace                        |
|  Cards: Email Subjects | Previews | Email | WhatsApp | SMS   |
|  Actions: One-click Copy | Regenerate | Export Markdown      |
+--------------------------------------------------------------+
```

---

## 7. AI Approach & Prompt Engineering

1. **System Prompt**: Enforces the persona of an expert ecommerce and D2C copywriter. Explicitly enforces grounding constraints to prevent hallucinated specs, fabricated reviews, or unrealistic scarcity claims.
2. **Channel-Specific Directives**: Clear token and character targets (e.g. `< 160` characters for SMS, `< 60` for subject lines).
3. **Structured JSON Output**: The model is instructed to output strictly raw JSON matching the required schema.
4. **Resilient Extraction**: `parseAIResponse.js` strips markdown fences and safely detects JSON boundaries if preamble commentary exists.
5. **Regeneration Flow**: When a single section is regenerated, the prompt passes the existing copy as reference to avoid repetition and instructs the model to produce a fresh creative angle while preserving ground-truth facts.

---

## 8. Setup & Installation

### Prerequisites
- **Node.js**: v18+ (tested on Node v22.19)
- **npm**: v9+

### Step 1: Clone Repository
```bash
git clone <YOUR_REPO_URL>
cd AI_Campaign_Generator
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `server/.env`:
```bash
cp .env.example server/.env
```

Open `server/.env` and insert your OpenRouter API key:
```env
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxx
OPENROUTER_MODEL=openrouter/free
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
PORT=5000
```
> **Security Note**: Never commit `server/.env`. It is included in `.gitignore`.

### Step 3: Install Dependencies
Install server dependencies:
```bash
cd server
npm install
```

Install client dependencies:
```bash
cd ../client
npm install
```

---

## 9. Running Locally

### Option A: Running Backend and Frontend Simultaneously

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
# Health check available at http://localhost:5000/health
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## 10. Running Automated Tests

Run backend unit tests for payload validation, tone rules, and JSON extraction:
```bash
cd server
npm test
```

Expected output:
```text
--- Running Server Unit Tests ---
✓ Test 1: Valid campaign input validation passed.
✓ Test 2: Missing fields validation caught all errors accurately.
✓ Test 3: Invalid tone check succeeded.
✓ Test 4: Extracted and parsed markdown-wrapped AI JSON output.
✓ Test 5: Regeneration request validation passed.
All backend unit tests passed successfully!
```

---

## 11. API Specification

### 1. `GET /health`
Returns service status and active AI model.

### 2. `POST /api/campaign/generate`
Generates the complete multi-channel campaign.

**Request Body:**
```json
{
  "productName": "AirStride Running Shoes",
  "productDescription": "Lightweight running shoes designed for everyday runners. Features breathable mesh, cushioned sole, and anti-slip grip.",
  "offer": "20% Off + Free Shipping",
  "targetAudience": "Men and women aged 20-40 looking for comfortable running and walking shoes",
  "campaignObjective": "Drive purchases during the weekend sale",
  "tone": "Energetic"
}
```

**Response Body (Success):**
```json
{
  "success": true,
  "data": {
    "emailSubjects": [
      "Lace Up & Save: 20% Off AirStride This Weekend!",
      "Ready to Run? Get 20% Off + Free Shipping Now",
      "Upgrade Your Daily Run for 20% Less",
      "AirStride Flash Sale: Step Into Comfort & Save",
      "Weekend Special: 20% Off Every Pair of AirStride"
    ],
    "emailPreviews": [
      "Lightweight, breathable comfort is now 20% off with free shipping.",
      "Cushioned soles, zero drag. Grab your pair before the weekend ends.",
      "Don't miss 20% off everyday running comfort plus free delivery."
    ],
    "promotionalEmail": {
      "subject": "Feel the Difference: 20% Off AirStride Shoes This Weekend",
      "body": "Hi runner,\n\nReady to transform your daily miles? AirStride Running Shoes are engineered for all-day cushioning and breathable airflow...\n\nClaim Your 20% Off & Free Shipping [Link]"
    },
    "whatsappMessage": "Hey there! Ready to upgrade your runs? 🏃 Get 20% OFF + Free Shipping on AirStride Running Shoes this weekend only. Shop now: [Link]",
    "smsMessage": "Weekend Deal: 20% OFF AirStride Running Shoes + Free Shipping! Shop now: [Link]"
  }
}
```

### 3. `POST /api/campaign/regenerate`
Regenerates an individual section without modifying the rest of the campaign.

**Request Body:**
```json
{
  "section": "whatsappMessage",
  "campaign": { ... },
  "currentOutput": "Previous message..."
}
```

---

## 12. Design Decisions & Interview Defensibility

| Decision | Rationale |
| :--- | :--- |
| **Why React + Vite?** | Instant feedback loops, lightweight footprint, and component reusability without framework bloat. |
| **Why Express.js Backend?** | Protects the OpenRouter API key, prevents CORS issues with external providers, and centralizes validation and logging. |
| **Why OpenRouter?** | Direct access to cutting-edge open and proprietary LLMs via a standardized OpenAI-compatible completions format. |
| **Why No Database?** | Stateless architecture ensures fast deployment, minimal maintenance overhead, zero security exposure for persistent customer data, and aligned with assignment constraints. |
| **Why Structured JSON Output?** | Guarantees deterministic frontend rendering and eliminates parsing brittleness common with freeform markdown text. |
| **Why Corporate Brutalism UI?** | High readability, structured layout, clean borders, and clear hierarchy that feels like a production B2B SaaS tool rather than an overdesigned AI gimmick. |

---

## 13. Deployment Guide

### Deploy Backend to Render
1. Push this repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com).
3. Set the Root Directory to `server`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add Environment Variables:
   - `OPENROUTER_API_KEY`: `<Your Secret Key>`
   - `OPENROUTER_MODEL`: `openrouter/free`
   - `OPENROUTER_BASE_URL`: `https://openrouter.ai/api/v1`
   - `CLIENT_ORIGIN`: `<Your Vercel App URL>`

### Deploy Frontend to Vercel
1. Create a new project on [Vercel](https://vercel.com).
2. Set Root Directory to `client`.
3. Framework Preset: `Vite`.
4. Configure rewrite in `vercel.json` to proxy `/api/*` to your deployed Render backend URL.

---

## 14. Demo Video

- **Demo Video URL**: `[Insert Demo Video Link Here]`
- **Walkthrough Duration**: ~90 seconds demonstrating UI overview, sample data population, generation flow, one-click copying, section regeneration, and markdown export.

---

## 15. License

MIT License. Developed for Kalaiworks Assignment.
