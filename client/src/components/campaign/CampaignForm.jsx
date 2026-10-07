import React, { useState } from 'react';
import { TextField } from '../form/TextField';
import { TextArea } from '../form/TextArea';
import { ToneSelector } from '../form/ToneSelector';
import { GenerateButton } from '../form/GenerateButton';
import { Sparkles, RotateCcw, ChevronDown, Check } from 'lucide-react';
import { CAMPAIGN_PRESETS } from '../../constants/tones';

export function CampaignForm({
  formData,
  errors,
  onChange,
  onToneSelect,
  onSubmit,
  onLoadPreset,
  onReset,
  isLoading
}) {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  return (
    <form onSubmit={onSubmit} className="campaign-form bg-white border border-neutral-200/90 rounded-xl p-6 shadow-xs flex flex-col gap-5 transition-all">
      <div className="campaign-form-heading flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="section-title text-base sm:text-lg font-bold text-[#183a35] tracking-tight">Campaign brief</h2>
            <span className="text-[9px] font-bold px-1.5 py-1 rounded-sm bg-[#e4f2e7] text-[#315b48] uppercase tracking-wider">
              Start here
            </span>
          </div>
          <p className="text-xs text-[#718178] mt-1">The details behind every message.</p>
        </div>

        <div className="flex items-center gap-2 relative">
          {/* Preset Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#315b48] bg-[#eaf3e9] hover:bg-[#dcebdd] active:bg-[#d3e5d4] rounded-md border border-[#d2e2d4] transition-all cursor-pointer disabled:opacity-50"
              title="Select sample campaign preset"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c74d38]" />
              <span>Presets</span>
              <ChevronDown className={`w-3 h-3 text-[#60766c] transition-transform ${showPresetsMenu ? 'rotate-180' : ''}`} />
            </button>

            {showPresetsMenu && (
              <div
                className="absolute right-0 mt-1.5 w-64 bg-white border border-[#d8e3d9] rounded-md shadow-lg z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setShowPresetsMenu(false)}
              >
                <div className="px-3 py-1 text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                  Sample Scenarios
                </div>
                {CAMPAIGN_PRESETS.map((preset) => {
                  const isCurrent = formData.productName === preset.data.productName;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        onLoadPreset(preset.data);
                        setShowPresetsMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-50 flex items-start justify-between gap-2 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="font-semibold text-neutral-900 flex items-center gap-1">
                          {preset.name}
                        </div>
                        <div className="text-[11px] text-neutral-500">{preset.tag}</div>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#718178] hover:text-[#183a35] hover:bg-[#f2f6f0] rounded-md transition-colors cursor-pointer disabled:opacity-50"
            title="Reset form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
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
        placeholder="e.g. Men and women aged 20–40 looking for comfortable running and walking shoes"
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
