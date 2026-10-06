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
 * Generates a stunning, luxury agency-grade PDF campaign brief.
 * Includes bespoke vector icons, gradient banners, metric badges, 
 * channel mockup frames, and executive typography.
 */
export async function downloadPDF(campaignData, generatedOutput) {
  const container = document.createElement('div');
  container.id = 'luxury-pdf-brief';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '840px'; // Premium desktop A4 width
  container.style.backgroundColor = '#0F172A'; // Deep obsidian canvas backdrop
  container.style.padding = '36px';
  container.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  container.style.color = '#0F172A';
  container.style.boxSizing = 'border-box';

  const dateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  container.innerHTML = `
    <!-- Main White Document Canvas -->
    <div style="background: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid #E2E8F0;">
      
      <!-- Premium Hero Header -->
      <div style="background: linear-gradient(135deg, #090D16 0%, #1E293B 50%, #0F172A 100%); padding: 36px 40px; color: #FFFFFF; position: relative;">
        <!-- Glowing accent orb in top right -->
        <div style="position: absolute; right: 24px; top: 20px; width: 140px; height: 140px; background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%); border-radius: 50%; pointer-events: none;"></div>

        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900; color: #FFFFFF; box-shadow: 0 10px 15px -3px rgba(37,99,235,0.4);">
              CA
            </div>
            <div>
              <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.3px; display: flex; align-items: center; gap: 8px;">
                <span>CampaignAI</span>
                <span style="font-size: 9px; font-weight: 700; background: rgba(59,130,246,0.25); border: 1px solid rgba(147,197,253,0.3); color: #93C5FD; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px;">Studio Pro</span>
              </div>
              <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">Multi-Channel Marketing Copy & Distribution Blueprint</div>
            </div>
          </div>

          <div style="text-align: right;">
            <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.08); padding: 5px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); font-family: monospace; font-size: 11px; color: #CBD5E1;">
              <span style="display: inline-block; width: 6px; height: 6px; background: #10B981; border-radius: 50%;"></span>
              <span>${dateFormatted}</span>
            </div>
          </div>
        </div>

        <!-- Product Spotlight -->
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 18px 24px; backdrop-filter: blur(10px);">
          <div style="font-size: 10px; font-weight: 700; color: #60A5FA; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">CAMPAIGN PRODUCT</div>
          <div style="font-size: 24px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px; margin-bottom: 6px;">
            ${escapeHtml(campaignData.productName)}
          </div>
          <div style="font-size: 12px; line-height: 1.5; color: #CBD5E1; max-width: 680px;">
            ${escapeHtml(campaignData.productDescription)}
          </div>
        </div>
      </div>

      <!-- Content Body -->
      <div style="padding: 36px 40px; background: #FAFAFA;">

        <!-- 4-Pillar Strategy Dashboard -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 32px;">
          <!-- Offer Card -->
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="font-size: 14px;">🏷️</span>
              <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase;">Offer</span>
            </div>
            <div style="font-size: 13px; font-weight: 800; color: #2563EB;">${escapeHtml(campaignData.offer)}</div>
          </div>

          <!-- Tone Card -->
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="font-size: 14px;">🎭</span>
              <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase;">Tone</span>
            </div>
            <div style="font-size: 13px; font-weight: 800; color: #0F172A;">${escapeHtml(campaignData.tone)}</div>
          </div>

          <!-- Audience Card -->
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="font-size: 14px;">🎯</span>
              <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase;">Audience</span>
            </div>
            <div style="font-size: 11px; font-weight: 600; color: #334155; line-height: 1.3;">${escapeHtml(campaignData.targetAudience)}</div>
          </div>

          <!-- Objective Card -->
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
              <span style="font-size: 14px;">🚀</span>
              <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase;">Objective</span>
            </div>
            <div style="font-size: 11px; font-weight: 600; color: #334155; line-height: 1.3;">${escapeHtml(campaignData.campaignObjective)}</div>
          </div>
        </div>

        <!-- Section 1: Email Subjects -->
        <div style="margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 26px; height: 26px; background: #EFF6FF; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 13px;">
                ✉️
              </div>
              <span style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">1. Email Subject Lines (5 Tested Angles)</span>
            </div>
            <span style="font-size: 10px; font-weight: 700; background: #DBEAFE; color: #1E40AF; padding: 3px 8px; border-radius: 6px;">5 VARIATIONS</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${generatedOutput.emailSubjects.map((s, i) => `
              <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid #E2E8F0; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 11px 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-family: monospace; font-size: 11px; font-weight: 700; color: #94A3B8;">#0${i + 1}</span>
                  <span style="font-size: 13px; font-weight: 600; color: #1E293B;">${escapeHtml(s)}</span>
                </div>
                <span style="font-size: 10px; font-family: monospace; color: #64748B; background: #F1F5F9; padding: 2px 6px; border-radius: 4px;">${s.length} chars</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 2: Email Previews -->
        <div style="margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 26px; height: 26px; background: #F8FAFC; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 13px;">
                👁️
              </div>
              <span style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">2. Email Preview Texts (Preheaders)</span>
            </div>
            <span style="font-size: 10px; font-weight: 700; background: #F1F5F9; color: #475569; padding: 3px 8px; border-radius: 6px;">35–70 CHARACTERS</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${generatedOutput.emailPreviews.map((p, i) => `
              <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid #E2E8F0; border-left: 4px solid #64748B; border-radius: 8px; padding: 11px 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-family: monospace; font-size: 11px; font-weight: 700; color: #94A3B8;">#0${i + 1}</span>
                  <span style="font-size: 12px; color: #334155;">${escapeHtml(p)}</span>
                </div>
                <span style="font-size: 10px; font-family: monospace; color: #64748B; background: #F1F5F9; padding: 2px 6px; border-radius: 4px;">${p.length} chars</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 3: Promotional Email -->
        <div style="margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 26px; height: 26px; background: #EFF6FF; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 13px;">
                📬
              </div>
              <span style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">3. Full Promotional Email Copy</span>
            </div>
            <span style="font-size: 10px; font-weight: 700; background: #DBEAFE; color: #1E40AF; padding: 3px 8px; border-radius: 6px;">CORE COPY</span>
          </div>

          <!-- Email Client Mockup -->
          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0; padding: 12px 18px; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase;">Subject:</span>
              <span style="font-size: 13px; font-weight: 700; color: #1E293B;">${escapeHtml(generatedOutput.promotionalEmail.subject)}</span>
            </div>
            <div style="padding: 20px 22px; font-size: 12px; line-height: 1.7; color: #334155; white-space: pre-wrap;">${escapeHtml(generatedOutput.promotionalEmail.body)}</div>
          </div>
        </div>

        <!-- 2-Column Grid for WhatsApp & SMS -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 30px;">
          
          <!-- Section 4: WhatsApp Message -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 15px;">💬</span>
                <span style="font-size: 12px; font-weight: 800; color: #0F172A; text-transform: uppercase;">4. WhatsApp Broadcast</span>
              </div>
              <span style="font-size: 9px; font-weight: 700; background: #D1FAE5; color: #065F46; padding: 2px 6px; border-radius: 4px;">MOBILE</span>
            </div>

            <!-- WhatsApp Chat Mockup Frame -->
            <div style="background: #EFEAE2; border: 1px solid #CBD5E1; border-radius: 12px; padding: 16px; min-height: 160px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="background: #FFFFFF; border-radius: 10px; padding: 12px 14px; font-size: 12px; line-height: 1.55; color: #1E293B; white-space: pre-wrap; box-shadow: 0 2px 4px rgba(0,0,0,0.06); border-top-left-radius: 2px;">
${escapeHtml(generatedOutput.whatsappMessage)}
              </div>
              <div style="text-align: right; margin-top: 8px; font-size: 10px; color: #64748B; font-family: monospace;">
                Delivered · Read ✓✓
              </div>
            </div>
          </div>

          <!-- Section 5: SMS Message -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 15px;">📱</span>
                <span style="font-size: 12px; font-weight: 800; color: #0F172A; text-transform: uppercase;">5. SMS Flash Campaign</span>
              </div>
              <span style="font-size: 9px; font-weight: 700; background: #F1F5F9; color: #475569; padding: 2px 6px; border-radius: 4px;">${generatedOutput.smsMessage.length} CHARS</span>
            </div>

            <!-- SMS iPhone/Android Bubble Mockup -->
            <div style="background: #F1F5F9; border: 1px solid #CBD5E1; border-radius: 12px; padding: 16px; min-height: 160px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="background: #2563EB; color: #FFFFFF; border-radius: 14px; border-bottom-left-radius: 2px; padding: 12px 14px; font-size: 12px; line-height: 1.5; font-weight: 500; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">
${escapeHtml(generatedOutput.smsMessage)}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 10px; color: #64748B; font-family: monospace;">
                <span>SMS Carrier Gateway</span>
                <span>${generatedOutput.smsMessage.length > 160 ? '2 Segments' : '1 Segment'}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- Luxury Footer -->
      <div style="background: #090D16; color: #FFFFFF; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 18px; height: 18px; background: #2563EB; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800;">CA</div>
          <span style="font-weight: 600; letter-spacing: 0.5px;">CAMPAIGNAI STUDIO BRIEF</span>
          <span style="color: #64748B;">•</span>
          <span style="color: #94A3B8;">Confidential Marketing Asset</span>
        </div>
        <div style="color: #94A3B8; font-family: monospace;">
          High-Conversion AI Engine · Production Prototype
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2, // Ultra-sharp 2x resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#0F172A'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.96);
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

    const pdfFilename = `${campaignData.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-campaign-brief.pdf`;
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
