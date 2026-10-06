export function validateCampaignForm(formData) {
  const errors = {};

  if (!formData.productName?.trim()) {
    errors.productName = 'Product name is required';
  }

  if (!formData.productDescription?.trim()) {
    errors.productDescription = 'Product description is required';
  } else if (formData.productDescription.trim().length < 10) {
    errors.productDescription = 'Please provide a bit more detail (min 10 characters)';
  }

  if (!formData.offer?.trim()) {
    errors.offer = 'Offer / discount details are required';
  }

  if (!formData.targetAudience?.trim()) {
    errors.targetAudience = 'Target audience is required';
  }

  if (!formData.campaignObjective?.trim()) {
    errors.campaignObjective = 'Campaign objective is required';
  }

  if (!formData.tone?.trim()) {
    errors.tone = 'Please select a tone of voice';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
