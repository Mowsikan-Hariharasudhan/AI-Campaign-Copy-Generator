import { jsPDF } from 'jspdf';
/**
 * Downloads markdown text as a .md file
 */
export function downloadMarkdown(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
/**
 * Strips unsupported emoji characters safely for native vector PDF text,
 * avoiding corrupt encoding glyphs like "Ø=Ü_" while keeping text 100% searchable,
 * selectable, and copyable.
 */
function cleanTextForPdf(str) {
  if (!str) return '';
  return String(str)
    // Replace common emojis with readable equivalents or clean spacing
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Misc symbols & pictographs
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport & map
    .replace(/[\u{1F700}-\u{1F77F}]/gu, '') // Alchemical
    .replace(/[\u{1F780}-\u{1F7FF}]/gu, '') // Geometric shapes
    .replace(/[\u{1F800}-\u{1F8FF}]/gu, '') // Supplemental arrows
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental symbols & pictographs
    .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') // Chess symbols
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // Symbols and pictographs extended-a
    .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Misc symbols
    .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
    .replace(/\s+/g, ' ')
    .trim();
}
/**
 * Generates an executive, beautifully paginated, 100% vector-searchable,
 * copy-pasteable PDF. Never cuts through text lines or boxes.
 */
export async function downloadPDF(campaignData, generatedOutput) {
  // Dynamically import to avoid SSR issues if we ever use Next.js, and since it's client-side only
  const html2pdf = (await import('html2pdf.js')).default;
  // Keep the source within the viewport so html2canvas can render it.
  const container = document.createElement('div');
  container.id = 'campaign-pdf-export';
  container.style.position = 'relative';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = '800px'; // Fixed width for consistent A4 scaling
  container.style.backgroundColor = '#ffffff';
  container.style.opacity = '0';
  container.style.pointerEvents = 'none';
  // We'll use Tailwind classes for styling the HTML
  // We need to inject inline styles where Tailwind might not cascade into the iframe/worker html2pdf uses, 
  // but html2pdf clones the node, so computed styles/Tailwind classes present in the document usually work.
  // To be safe and self-contained, we can use a mix of classes and inline styles.
  container.innerHTML = `
    <div style="font-family: 'Inter', Arial, sans-serif; padding: 32px; color: #0f172a; background-color: #fff;">
      <!-- HEADER -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 22px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; flex: 0 0 40px; border-radius: 8px; background: #183a35; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 14px rgba(24, 58, 53, 0.18);">
            <span style="position: relative; display: block; width: 26px; height: 26px; color: #d7ee78; font-family: Arial, sans-serif; line-height: 1;">
              <span style="position: absolute; left: 0; top: 0; font-size: 25px;">&#10023;</span>
              <span style="position: absolute; right: 0; bottom: 0; font-size: 10px;">&#10022;</span>
            </span>
          </div>
          <div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #183a35; letter-spacing: 0;">CampaignAI</h1>
            <p style="margin: 2px 0 0; font-size: 11px; color: #60766c; font-weight: 600;">Creative workspace for ecommerce</p>
          </div>
        </div>
        <div style="text-align: right;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">Generated on</p>
          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #334155;">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>
      <!-- HERO BANNER -->
      <div style="background: linear-gradient(to right, #0f172a, #1e293b); border-radius: 14px; padding: 24px; color: white; margin-bottom: 24px; box-shadow: 0 8px 20px -5px rgba(0,0,0,0.12); page-break-inside: avoid; break-inside: avoid;">
        <div style="display: inline-block; background-color: rgba(59, 130, 246, 0.2); color: #93c5fd; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; margin-bottom: 12px; border: 1px solid rgba(59, 130, 246, 0.3);">
          Product Spotlight
        </div>
        <h2 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 800; line-height: 1.2;">${campaignData.productName}</h2>
        <p style="margin: 0; font-size: 16px; color: #cbd5e1; max-width: 600px; line-height: 1.5;">${campaignData.campaignObjective || 'Drive conversions and maximize engagement.'}</p>
      </div>
      <!-- CAMPAIGN OVERVIEW -->
      <div style="margin-bottom: 24px; page-break-inside: avoid; break-inside: avoid;">
        <div style="display: flex; align-items: stretch; gap: 16px; margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid;">
        <div style="flex: 1 1 0; min-width: 0; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Offer / Discount</p>
          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #2563eb; line-height: 1.45;">${campaignData.offer || 'N/A'}</p>
        </div>
        <div style="flex: 1 1 0; min-width: 0; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Tone of Voice</p>
          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #0f172a; line-height: 1.45;">${campaignData.tone || 'Professional'}</p>
        </div>
        </div>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; page-break-inside: avoid; break-inside: avoid;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Target Audience</p>
          <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.5;">${campaignData.targetAudience || 'General'}</p>
        </div>
      </div>
      <!-- CONTENT SECTIONS -->
      <!-- 1. Subject Lines -->
      <div style="page-break-before: always; break-before: page; page-break-inside: avoid; break-inside: avoid; margin-bottom: 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">1. Email Subject Lines</h3>
          <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;">5 VARIATIONS</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${generatedOutput.emailSubjects.map((sub, i) => `
            <div style="display: flex; align-items: flex-start; gap: 16px; background-color: #fff; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); page-break-inside: avoid; break-inside: avoid;">
              <div style="background-color: #f1f5f9; color: #64748b; font-weight: 700; font-size: 12px; padding: 4px 8px; border-radius: 6px;">0${i+1}</div>
              <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1e293b; line-height: 1.4;">${sub}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <!-- 2. Preview Texts -->
      <div style="page-break-inside: avoid; margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">2. Email Preheaders</h3>
          <span style="background-color: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;">PREVIEW TEXT</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${generatedOutput.emailPreviews.map((prev, i) => `
            <div style="display: flex; align-items: flex-start; gap: 16px; background-color: #fff; border: 1px solid #e2e8f0; border-left: 4px solid #94a3b8; border-radius: 8px; padding: 16px;">
              <div style="background-color: #f8fafc; color: #94a3b8; font-weight: 700; font-size: 12px; padding: 4px 8px; border-radius: 6px;">0${i+1}</div>
              <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.4;">${prev}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <!-- 3. Promotional Email -->
      <div style="page-break-inside: avoid; margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">3. Full Promotional Email</h3>
          <span style="background-color: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;">CORE CHANNEL</span>
        </div>
        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 16px 20px;">
            <div style="display: flex; gap: 12px; align-items: center;">
              <span style="font-size: 12px; font-weight: 700; color: #64748b;">SUBJECT:</span>
              <span style="font-size: 15px; font-weight: 600; color: #0f172a;">${generatedOutput.promotionalEmail.subject}</span>
            </div>
          </div>
          <div style="background-color: #ffffff; padding: 30px; font-size: 15px; color: #334155; line-height: 1.7; white-space: pre-wrap;">${generatedOutput.promotionalEmail.body}</div>
        </div>
      </div>
      <!-- 4. WhatsApp Message -->
      <div style="page-break-inside: avoid; margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">4. WhatsApp Message</h3>
          <span style="background-color: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;">MOBILE CHAT</span>
        </div>
        <!-- WhatsApp Mockup -->
        <div style="background-color: #efeae2; padding: 30px; border-radius: 16px; max-width: 600px; margin: 0 auto; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
          <div style="background-color: #ffffff; border-radius: 12px 12px 12px 0; padding: 16px 20px; font-size: 15px; color: #111b21; line-height: 1.6; white-space: pre-wrap; box-shadow: 0 1px 2px rgba(0,0,0,0.1); display: inline-block;">${generatedOutput.whatsappMessage}</div>
        </div>
      </div>
      <!-- 5. SMS Message -->
      <div style="page-break-inside: avoid; margin-bottom: 40px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">5. SMS Message</h3>
          <span style="background-color: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;">TEXT ALERTS</span>
        </div>
        <!-- iMessage Mockup -->
        <div style="background-color: #f3f4f6; padding: 30px; border-radius: 16px; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #3b82f6; color: white; border-radius: 18px 18px 4px 18px; padding: 16px 20px; font-size: 15px; line-height: 1.5; white-space: pre-wrap; box-shadow: 0 1px 2px rgba(0,0,0,0.1); margin-left: auto; width: fit-content; max-width: 100%;">${generatedOutput.smsMessage}</div>
        </div>
      </div>
      <!-- FOOTER -->
      <div style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #94a3b8; font-weight: 500;">Confidential · Created by AI Campaign Copy Generator</p>
      </div>
    </div>
  `;
  document.body.appendChild(container);
	const pdfFilename = `${campaignData.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-campaign-brief.pdf`;
  const opt = {
    margin:       [0, 0, 0, 0], // Margins handled by padding in HTML
    filename:     pdfFilename,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true, 
      scrollY: 0,
      windowWidth: 800,
      onclone: (clonedDocument) => {
        clonedDocument.querySelectorAll('#campaign-pdf-export').forEach((clonedContainer) => {
          clonedContainer.style.opacity = '1';
          clonedContainer.style.position = 'relative';
        });
      }
    },
    jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['css', 'legacy'] }
  };
  try {
    await html2pdf().set(opt).from(container).save();
  } catch (error) {
    console.error("PDF Generation failed", error);
  } finally {
    document.body.removeChild(container);
  }
}