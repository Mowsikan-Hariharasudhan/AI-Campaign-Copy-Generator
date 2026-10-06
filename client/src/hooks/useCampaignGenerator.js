import { useState, useCallback } from 'react';
import { generateCampaignApi, regenerateSectionApi } from '../services/campaignApi';
import { validateCampaignForm } from '../utils/validation';
import { SAMPLE_DATA } from '../constants/tones';
import { fireConfetti } from '../utils/confetti';

const INITIAL_FORM = {
  productName: '',
  productDescription: '',
  offer: '',
  targetAudience: '',
  campaignObjective: '',
  tone: 'Professional'
};

export function useCampaignGenerator() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState(null);
  const [generatedOutput, setGeneratedOutput] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleToneSelect = useCallback((tone) => {
    setFormData((prev) => ({ ...prev, tone }));
    setErrors((prev) => {
      if (!prev.tone) return prev;
      const next = { ...prev };
      delete next.tone;
      return next;
    });
  }, []);

  const handleLoadPreset = useCallback((presetData) => {
    setFormData({ ...presetData });
    setErrors({});
    setApiError(null);
  }, []);

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setGeneratedOutput(null);
    setApiError(null);
  }, []);

  const handleGenerate = useCallback(async (e) => {
    if (e) e.preventDefault();

    setApiError(null);

    const validation = validateCampaignForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);

    try {
      const data = await generateCampaignApi(formData);
      setGeneratedOutput(data);
      setErrors({});
      fireConfetti();
    } catch (err) {
      console.error('Error generating campaign:', err);
      setApiError(err.message || 'Failed to generate campaign. Please check your network and API key.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleRegenerateSection = useCallback(async (section) => {
    if (!generatedOutput || regeneratingSection) return;

    setRegeneratingSection(section);
    setApiError(null);

    try {
      let currentOutput = '';
      if (section === 'emailSubjects') currentOutput = generatedOutput.emailSubjects;
      else if (section === 'emailPreviews') currentOutput = generatedOutput.emailPreviews;
      else if (section === 'promotionalEmail') currentOutput = generatedOutput.promotionalEmail;
      else if (section === 'whatsappMessage') currentOutput = generatedOutput.whatsappMessage;
      else if (section === 'smsMessage') currentOutput = generatedOutput.smsMessage;

      const res = await regenerateSectionApi(section, formData, currentOutput);

      setGeneratedOutput((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [section]: res.content
        };
      });
    } catch (err) {
      console.error(`Error regenerating ${section}:`, err);
      setApiError(err.message || `Failed to regenerate section ${section}.`);
    } finally {
      setRegeneratingSection(null);
    }
  }, [formData, generatedOutput, regeneratingSection]);

  return {
    formData,
    errors,
    isLoading,
    regeneratingSection,
    generatedOutput,
    apiError,
    handleInputChange,
    handleToneSelect,
    handleLoadPreset,
    handleReset,
    handleGenerate,
    handleRegenerateSection
  };
}
