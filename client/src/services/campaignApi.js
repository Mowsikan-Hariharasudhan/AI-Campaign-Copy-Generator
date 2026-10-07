const DEFAULT_API_URL = 'https://ai-campaign-copy-generator-2.onrender.com';
const rawApiUrl = import.meta.env.VITE_API_URL || DEFAULT_API_URL;
const API_BASE = `${rawApiUrl.replace(/\/$/, '')}/api/campaign`;

export async function generateCampaignApi(campaignData) {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(campaignData)
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    const errorMsg = data?.error?.message || 'Failed to generate campaign copy.';
    const details = data?.error?.details ? ` (${data.error.details.join(', ')})` : '';
    throw new Error(errorMsg + details);
  }

  return data.data;
}

export async function regenerateSectionApi(section, campaign, currentOutput) {
  const response = await fetch(`${API_BASE}/regenerate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      section,
      campaign,
      currentOutput
    })
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    const errorMsg = data?.error?.message || `Failed to regenerate ${section}.`;
    throw new Error(errorMsg);
  }

  return data.data;
}
