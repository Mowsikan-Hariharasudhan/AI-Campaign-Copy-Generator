import React from 'react';
import { SubjectLineList } from './SubjectLineList';
import { PreviewTextList } from './PreviewTextList';
import { PromotionalEmailCard } from './PromotionalEmailCard';
import { WhatsAppCard } from './WhatsAppCard';
import { SMSCard } from './SMSCard';
import { Download, PlusCircle, CheckCircle2 } from 'lucide-react';
import { downloadMarkdown } from '../../utils/clipboard';

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

  return (
    <div className="space-y-4">
      {/* Top Banner with Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white border border-neutral-200 rounded-md shadow-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs sm:text-sm font-semibold text-neutral-900">
            Campaign Ready ({campaignData.productName})
          </span>
          <span className="text-xs text-neutral-500 hidden sm:inline">
            · {campaignData.tone} Tone
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded border border-neutral-250 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-neutral-600" />
            <span>Export Markdown</span>
          </button>

          <button
            type="button"
            onClick={onNewCampaign}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-50 rounded border border-neutral-300 transition-colors cursor-pointer"
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
