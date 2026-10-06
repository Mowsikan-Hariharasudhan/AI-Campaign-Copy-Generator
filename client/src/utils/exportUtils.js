import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
 * Generates an executive-grade, beautifully styled PDF campaign brief
 * using html2canvas and jsPDF to guarantee 100% native emoji rendering,
 * crisp typography, modern card layouts, and zero character encoding artifacts.
 */
export async function downloadPDF(campaignData, generatedOutput) {
  // Create an offscreen render container
  const container = document.createElement('div');
  container.id = 'pdf-render-brief';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // standard A4 @ 96DPI width
  container.style.backgroundColor = '#FFFFFF';
  container.style.padding = '40px';
  container.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  container.style.color = '#0F172A';
  container.style.boxSizing = 'border-box';

  container.innerHTML = `
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: #FFFFFF; border-radius: 12px; padding: 24px 28px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 12px; margin-bottom: 12px;">
        <div style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px;">
          <span>CampaignAI</span>
          <span style="font-size: 10px; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px; font-family: monospace; font-weight: 600;">STUDIO BRIEF</span>
        </div>
        <div style="font-size: 11px; opacity: 0.85; font-family: monospace;">
          ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      </div>
      <div style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">
        ${escapeHtml(campaignData.productName)}
      </div>
      <div style="font-size: 12px; opacity: 0.85;">
        Multi-Channel Marketing Copy & Distribution Plan
      </div>
    </div>

    <!-- Metadata Grid -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
      <div>
        <div style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Offer / Discount</div>
        <div style="font-size: 13px; font-weight: 700; color: #0284C7; margin-top: 2px;">${escapeHtml(campaignData.offer)}</div>
      </div>
      <div>
        <div style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Tone of Voice</div>
        <div style="font-size: 13px; font-weight: 600; color: #0F172A; margin-top: 2px;">${escapeHtml(campaignData.tone)}</div>
      </div>
      <div>
        <div style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Target Audience</div>
        <div style="font-size: 12px; color: #334155; margin-top: 2px;">${escapeHtml(campaignData.targetAudience)}</div>
      </div>
      <div>
        <div style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Campaign Objective</div>
        <div style="font-size: 12px; color: #334155; margin-top: 2px;">${escapeHtml(campaignData.campaignObjective)}</div>
      </div>
    </div>

    <!-- Section 1: Email Subjects -->
    <div style="margin-bottom: 22px;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 10px;">
        <div style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">1. Email Subject Lines (5 Variations)</div>
        <span style="font-size: 10px; font-weight: 600; color: #64748B; background: #F1F5F9; padding: 2px 6px; border-radius: 4px;">High Open-Rate</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        ${generatedOutput.emailSubjects.map((s, i) => `
          <div style="display: flex; align-items: flex-start; gap: 8px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 8px 12px; font-size: 12px; font-weight: 500; color: #1E293B;">
            <span style="font-family: monospace; font-size: 11px; color: #94A3B8; margin-top: 1px;">0${i + 1}</span>
            <span>${escapeHtml(s)}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Section 2: Email Previews -->
    <div style="margin-bottom: 22px;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 10px;">
        <div style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">2. Email Preview Texts (Preheaders)</div>
        <span style="font-size: 10px; font-weight: 600; color: #64748B; background: #F1F5F9; padding: 2px 6px; border-radius: 4px;">35–70 Chars</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        ${generatedOutput.emailPreviews.map((p, i) => `
          <div style="display: flex; align-items: flex-start; gap: 8px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 8px 12px; font-size: 12px; color: #334155;">
            <span style="font-family: monospace; font-size: 11px; color: #94A3B8; margin-top: 1px;">0${i + 1}</span>
            <span>${escapeHtml(p)}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Section 3: Promotional Email -->
    <div style="margin-bottom: 22px;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 10px;">
        <div style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">3. Full Promotional Email</div>
        <span style="font-size: 10px; font-weight: 600; color: #2563EB; background: #EFF6FF; padding: 2px 6px; border-radius: 4px;">Primary Channel</span>
      </div>
      <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; padding: 14px 16px;">
        <div style="font-size: 12px; font-weight: 700; color: #0F172A; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px; margin-bottom: 10px;">
          Subject: <span style="font-weight: 600; color: #2563EB;">${escapeHtml(generatedOutput.promotionalEmail.subject)}</span>
        </div>
        <div style="font-size: 12px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${escapeHtml(generatedOutput.promotionalEmail.body)}</div>
      </div>
    </div>

    <!-- Section 4: WhatsApp Message -->
    <div style="margin-bottom: 22px;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 10px;">
        <div style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">4. WhatsApp Campaign Message</div>
        <span style="font-size: 10px; font-weight: 600; color: #059669; background: #ECFDF5; padding: 2px 6px; border-radius: 4px;">Mobile Direct</span>
      </div>
      <div style="background: #EFEAE2; border: 1px solid #E2E8F0; border-radius: 10px; padding: 14px 16px;">
        <div style="background: #FFFFFF; border-radius: 8px; padding: 12px 14px; font-size: 12px; line-height: 1.5; color: #1E293B; white-space: pre-wrap; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
${escapeHtml(generatedOutput.whatsappMessage)}
        </div>
      </div>
    </div>

    <!-- Section 5: SMS Message -->
    <div style="margin-bottom: 20px;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 10px;">
        <div style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">5. SMS Message</div>
        <span style="font-size: 10px; font-weight: 600; color: #64748B; background: #F1F5F9; padding: 2px 6px; border-radius: 4px;">${generatedOutput.smsMessage.length} Characters</span>
      </div>
      <div style="background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px 14px;">
        <div style="background: #2563EB; color: #FFFFFF; border-radius: 12px; border-bottom-left-radius: 2px; padding: 10px 14px; font-size: 12px; line-height: 1.5; font-weight: 500;">
${escapeHtml(generatedOutput.smsMessage)}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #E2E8F0; padding-top: 12px; display: flex; justify-content: space-between; font-size: 10px; color: #94A3B8; font-family: monospace;">
      <span>Generated by CampaignAI Studio</span>
      <span>Stateless Architecture · Direct-to-Consumer Marketing Automation</span>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2, // Retinal high resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const imgWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const pdfFilename = `${campaignData.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-campaign.pdf`;
    pdf.save(pdfFilename);
  } finally {
    document.body.removeChild(container);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
