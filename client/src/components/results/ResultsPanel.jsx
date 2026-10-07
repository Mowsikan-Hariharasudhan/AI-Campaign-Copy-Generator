import React from 'react';
import { SubjectLineList } from './SubjectLineList';
import { PreviewTextList } from './PreviewTextList';
import { PromotionalEmailCard } from './PromotionalEmailCard';
import { WhatsAppCard } from './WhatsAppCard';
import { SMSCard } from './SMSCard';
import { Download, FileText, PlusCircle, CheckCircle2 } from 'lucide-react';
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
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Top Banner with Actions */}
      <div className="result-toolbar flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-neutral-200/90 rounded-lg shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-md bg-[#e4f2e7] border border-[#d2e2d4] flex items-center justify-center text-[#27634d] shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-[#183a35] truncate max-w-full">
                {campaignData.productName}
              </span>
              <span className="text-[10px] font-bold px-2 py-1 rounded-sm bg-[#fff0e9] text-[#b54e39] border border-[#f5d4c8] uppercase tracking-wider">
                {campaignData.tone}
              </span>
            </div>
            <p className="text-[11px] text-[#718178] mt-0.5 hidden sm:block">
              Campaign copy overview
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* PDF Export (Bonus Feature) */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#b54e39] bg-[#fff0e9] hover:bg-[#ffe4d9] rounded-md border border-[#f2d0c3] transition-all cursor-pointer active:scale-95"
            title="Download formatted PDF campaign summary"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          {/* Markdown Export (Bonus Feature) */}
          <button
            type="button"
            onClick={handleExportMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#315b48] bg-[#eaf3e9] hover:bg-[#dcebdd] rounded-md border border-[#d2e2d4] transition-all cursor-pointer active:scale-95"
            title="Download raw Markdown file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export MD</span>
          </button>

          {/* New Campaign Action */}
          <button
            type="button"
            onClick={onNewCampaign}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#183a35] bg-white hover:bg-[#f5faf4] rounded-md border border-[#cad9ce] transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#ed7357]" />
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
