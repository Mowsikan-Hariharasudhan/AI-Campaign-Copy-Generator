import React from 'react';
import { TextField } from '../form/TextField';
import { TextArea } from '../form/TextArea';
import { ToneSelector } from '../form/ToneSelector';
import { GenerateButton } from '../form/GenerateButton';
import { Sparkles, RotateCcw } from 'lucide-react';
import { SAMPLE_DATA } from '../../constants/tones';

export function CampaignForm({
  formData,
  errors,
  onChange,
  onToneSelect,
  onSubmit,
  onLoadSample,
  onReset,
  isLoading
}) {
  return (
    <form onSubmit={onSubmit} className="bg-white border border-neutral-200 rounded-md p-6 shadow-xs flex flex-col gap-5">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div>
          <h2 className="text-base font-semibold text-neutral-900 tracking-tight">Campaign Parameters</h2>
          <p className="text-xs text-neutral-500 mt-0.5">Define your product and objective to generate multi-channel marketing copy.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors cursor-pointer disabled:opacity-50"
            title="Populate fields with running shoes sample data"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Load Sample</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-800 rounded transition-colors cursor-pointer disabled:opacity-50"
            title="Reset form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Field 1: Product Name */}
      <TextField
        id="productName"
        name="productName"
        label="Product Name"
        value={formData.productName}
        onChange={onChange}
        placeholder="e.g. AirStride Running Shoes"
        error={errors.productName}
        helperText="The branded or generic name of your product or line."
        disabled={isLoading}
      />

      {/* Field 2: Product Description */}
      <TextArea
        id="productDescription"
        name="productDescription"
        label="Product Description"
        value={formData.productDescription}
        onChange={onChange}
        placeholder="e.g. Lightweight running shoes designed for everyday runners. Features breathable mesh, cushioned sole, and anti-slip grip."
        rows={3}
        error={errors.productDescription}
        helperText="Key features, materials, and concrete functional benefits."
        disabled={isLoading}
      />

      {/* Field 3: Offer / Discount */}
      <TextField
        id="offer"
        name="offer"
        label="Offer / Discount"
        value={formData.offer}
        onChange={onChange}
        placeholder="e.g. 20% Off + Free Shipping"
        error={errors.offer}
        helperText="Discounts, bundles, promo codes, or limited shipping perks."
        disabled={isLoading}
      />

      {/* Field 4: Target Audience */}
      <TextField
        id="targetAudience"
        name="targetAudience"
        label="Target Audience"
        value={formData.targetAudience}
        onChange={onChange}
        placeholder="e.g. Men and women aged 20–40 looking for everyday running and walking shoes"
        error={errors.targetAudience}
        helperText="Demographics, lifestyle, customer intent, or pain points."
        disabled={isLoading}
      />

      {/* Field 5: Campaign Objective */}
      <TextField
        id="campaignObjective"
        name="campaignObjective"
        label="Campaign Objective"
        value={formData.campaignObjective}
        onChange={onChange}
        placeholder="e.g. Drive purchases during the weekend sale"
        error={errors.campaignObjective}
        helperText="Primary conversion goal (weekend flash sale, product launch, cart recovery)."
        disabled={isLoading}
      />

      {/* Field 6: Tone of Voice */}
      <ToneSelector
        selectedTone={formData.tone}
        onSelect={onToneSelect}
        error={errors.tone}
        disabled={isLoading}
      />

      <div className="pt-2">
        <GenerateButton isLoading={isLoading} />
      </div>
    </form>
  );
}
