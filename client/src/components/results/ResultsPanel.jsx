import React from 'react';
import { SubjectLineList } from './SubjectLineList';
import { PreviewTextList } from './PreviewTextList';
import { PromotionalEmailCard } from './PromotionalEmailCard';
import { WhatsAppCard } from './WhatsAppCard';
import { SMSCard } from './SMSCard';
import { Download, FileText, PlusCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { downloadMarkdown, downloadPDF } from '../../utils/exportUtils';

export function ResultsPanel({
  campaignData,
  generatedOutput,
  onRegenerateSection,
  regeneratingSection,
  onNewCampaign
}) {
  if (!generatedOutput) return null;

  const handleExportMarkdown = () => {
    const md = `# Campaign Copy: ${campaignData.productName}

**Generated Date:** ${new Date().toLocaleDateString()}
**Tone:** ${campaignData.tone}
**Offer:** ${campaignData.offer}
**Target Audience:** ${campaignData.targetAudience}
**Objective:** ${campaignData.campaignObjective}

---

## 1. Email Subject Lines
${generatedOutput.emailSubjects.map((s, i) => `${i + 1}. ${s}`).join('\n')}

---

## 2. Email Preview Texts
${generatedOutput.emailPreviews.map((p, i) => `${i + 1}. ${p}`).join('\n')}

---

## 3. Promotional Email
**Subject:** ${generatedOutput.promotionalEmail.subject}

${generatedOutput.promotionalEmail.body}

---

## 4. WhatsApp Campaign Message
${generatedOutput.whatsappMessage}

---

## 5. SMS Message
${generatedOutput.smsMessage}
`;

    const filename = `${campaignData.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-campaign.md`;
    downloadMarkdown(filename, md);
  };

  const handleExportPDF = () => {
    downloadPDF(campaignData, generatedOutput);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Banner with Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-neutral-200/90 rounded-xl shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-neutral-900">
                {campaignData.productName}
              </span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                {campaignData.tone}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 hidden sm:block">
              5 channels generated & ready for deployment
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* PDF Export (Bonus Feature) */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50/70 hover:bg-rose-100/80 rounded-lg border border-rose-200/70 transition-all cursor-pointer active:scale-95"
            title="Download formatted PDF campaign summary"
          >
            <FileText className="w-3.5 h-3.5 text-rose-600" />
            <span>Export PDF</span>
          </button>

          {/* Markdown Export (Bonus Feature) */}
          <button
            type="button"
            onClick={handleExportMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg border border-neutral-250 transition-all cursor-pointer active:scale-95"
            title="Download raw Markdown file"
          >
            <Download className="w-3.5 h-3.5 text-neutral-600" />
            <span>Export MD</span>
          </button>

          {/* New Campaign Action */}
          <button
            type="button"
            onClick={onNewCampaign}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-50 rounded-lg border border-neutral-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-neutral-700" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* 1. Email Subjects */}
      <SubjectLineList
        subjects={generatedOutput.emailSubjects}
        onRegenerate={onRegenerateSection}
        isRegenerating={regeneratingSection === 'emailSubjects'}
      />

      {/* 2. Email Previews */}
      <PreviewTextList
        previews={generatedOutput.emailPreviews}
        onRegenerate={onRegenerateSection}
        isRegenerating={regeneratingSection === 'emailPreviews'}
      />

      {/* 3. Promotional Email */}
      <PromotionalEmailCard
        email={generatedOutput.promotionalEmail}
        onRegenerate={onRegenerateSection}
        isRegenerating={regeneratingSection === 'promotionalEmail'}
      />

      {/* 4. WhatsApp Message */}
      <WhatsAppCard
        message={generatedOutput.whatsappMessage}
        onRegenerate={onRegenerateSection}
        isRegenerating={regeneratingSection === 'whatsappMessage'}
      />

      {/* 5. SMS Message */}
      <SMSCard
        message={generatedOutput.smsMessage}
        onRegenerate={onRegenerateSection}
        isRegenerating={regeneratingSection === 'smsMessage'}
      />
    </div>
  );
}
