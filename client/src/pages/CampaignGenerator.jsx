import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { CampaignForm } from '../components/campaign/CampaignForm';
import { ResultsPanel } from '../components/results/ResultsPanel';
import { EmptyState } from '../components/results/EmptyState';
import { LoadingState } from '../components/results/LoadingState';
import { ErrorState } from '../components/results/ErrorState';
import { useCampaignGenerator } from '../hooks/useCampaignGenerator';

export function CampaignGenerator() {
  const {
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
  } = useCampaignGenerator();

  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form (5 cols on lg) */}
        <div className="lg:col-span-5 w-full">
          <div className="sticky top-24">
            <CampaignForm
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              onToneSelect={handleToneSelect}
              onSubmit={handleGenerate}
              onLoadPreset={handleLoadPreset}
              onReset={handleReset}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Right Column: Output / Workspace (7 cols on lg) */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4 min-h-[450px]">
          {/* Error Banner if any */}
          {apiError && (
            <ErrorState error={apiError} onRetry={handleGenerate} />
          )}

          {/* Conditional Work Area */}
          {isLoading ? (
            <LoadingState productName={formData.productName} />
          ) : generatedOutput ? (
            <ResultsPanel
              campaignData={formData}
              generatedOutput={generatedOutput}
              onRegenerateSection={handleRegenerateSection}
              regeneratingSection={regeneratingSection}
              onNewCampaign={handleReset}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </AppShell>
  );
}
