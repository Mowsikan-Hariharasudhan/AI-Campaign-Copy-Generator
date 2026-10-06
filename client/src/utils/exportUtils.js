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
    .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Misc symbols
    .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generates an executive, beautifully paginated, 100% vector-searchable,
 * copy-pasteable PDF. Never cuts through text lines or boxes.
 */
export function downloadPDF(campaignData, generatedOutput) {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  const bottomMargin = 45;

  let y = margin;
  let currentPage = 1;

  function renderPageHeader() {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text('CAMPAIGNAI STUDIO — MARKETING CAMPAIGN BRIEF', margin, 24);
    doc.text(`CONFIDENTIAL · PAGE ${currentPage}`, pageWidth - margin, 24, { align: 'right' });
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, 28, pageWidth - margin, 28);
  }

  function renderPageFooter() {
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 26, pageWidth - margin, pageHeight - 26);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Generated with CampaignAI · Direct-to-Consumer Marketing Automation', margin, pageHeight - 14);
    doc.text(`Tone: ${campaignData.tone}`, pageWidth - margin, pageHeight - 14, { align: 'right' });
  }

  function checkPageBreak(neededHeight) {
    if (y + neededHeight > pageHeight - bottomMargin) {
      renderPageFooter();
      doc.addPage();
      currentPage++;
      renderPageHeader();
      y = 45;
    }
  }

  // --- PAGE 1: HERO HEADER ---
  renderPageHeader();
  y = 45;

  // Dark obsidian executive hero card
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.roundedRect(margin, y, contentWidth, 90, 8, 8, 'F');

  // Accent Blue Badge
  doc.setFillColor(37, 99, 235); // Blue 600
  doc.roundedRect(margin + 16, y + 14, 28, 28, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('CA', margin + 22, y + 33);

  // Brand Titles
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('CampaignAI Studio', margin + 52, y + 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('Multi-Channel Marketing Copy & Distribution Blueprint', margin + 52, y + 39);

  // Product Spotlight Bar
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(96, 165, 250); // Light blue
  const prodTitle = doc.splitTextToSize(campaignData.productName || 'Campaign Copy', contentWidth - 32);
  doc.text(prodTitle[0], margin + 16, y + 68);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, pageWidth - margin - 16, y + 68, { align: 'right' });

  y += 105;

  // --- STRATEGY DASHBOARD CARDS (2x2 GRID) ---
  const boxWidth = (contentWidth - 10) / 2;
  const boxHeight = 44;

  // Box 1: Offer
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, boxWidth, boxHeight, 6, 6, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('OFFER / DISCOUNT', margin + 10, y + 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  doc.text(doc.splitTextToSize(campaignData.offer || 'N/A', boxWidth - 20)[0], margin + 10, y + 32);

  // Box 2: Tone
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin + boxWidth + 10, y, boxWidth, boxHeight, 6, 6, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('TONE OF VOICE', margin + boxWidth + 20, y + 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(campaignData.tone || 'Professional', margin + boxWidth + 20, y + 32);

  y += boxHeight + 8;

  // Box 3: Target Audience
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, boxWidth, boxHeight, 6, 6, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('TARGET AUDIENCE', margin + 10, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(doc.splitTextToSize(campaignData.targetAudience || 'General', boxWidth - 20)[0], margin + 10, y + 32);

  // Box 4: Campaign Objective
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin + boxWidth + 10, y, boxWidth, boxHeight, 6, 6, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('CAMPAIGN OBJECTIVE', margin + boxWidth + 20, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(doc.splitTextToSize(campaignData.campaignObjective || 'Conversions', boxWidth - 20)[0], margin + boxWidth + 20, y + 32);

  y += boxHeight + 16;

  // Helper function to print clean section titles
  function printSectionTitle(number, title, badge) {
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(`${number}. ${title.toUpperCase()}`, margin, y + 10);

    if (badge) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(37, 99, 235);
      doc.setFillColor(239, 246, 255);
      doc.setDrawColor(191, 219, 254);
      const badgeWidth = doc.getTextWidth(badge) + 12;
      doc.roundedRect(pageWidth - margin - badgeWidth, y, badgeWidth, 15, 4, 4, 'FD');
      doc.text(badge, pageWidth - margin - badgeWidth + 6, y + 10.5);
    }

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + 18, pageWidth - margin, y + 18);
    y += 28;
  }

  // --- SECTION 1: EMAIL SUBJECT LINES ---
  printSectionTitle('1', 'Email Subject Lines', '5 VARIATIONS');
  generatedOutput.emailSubjects.forEach((sub, idx) => {
    const cleanSub = cleanTextForPdf(sub);
    const lines = doc.splitTextToSize(cleanSub, contentWidth - 40);
    const itemHeight = Math.max(24, lines.length * 12 + 10);

    checkPageBreak(itemHeight + 4);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, itemHeight, 4, 4, 'FD');

    // Blue side accent
    doc.setFillColor(37, 99, 235);
    doc.rect(margin, y, 3, itemHeight, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`0${idx + 1}`, margin + 10, y + 15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(lines, margin + 30, y + 15);

    y += itemHeight + 5;
  });

  y += 10;

  // --- SECTION 2: EMAIL PREVIEWS ---
  printSectionTitle('2', 'Email Preview Texts (Preheaders)', '35-70 CHARACTERS');
  generatedOutput.emailPreviews.forEach((prev, idx) => {
    const cleanPrev = cleanTextForPdf(prev);
    const lines = doc.splitTextToSize(cleanPrev, contentWidth - 40);
    const itemHeight = Math.max(24, lines.length * 12 + 10);

    checkPageBreak(itemHeight + 4);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, itemHeight, 4, 4, 'FD');

    // Slate side accent
    doc.setFillColor(100, 116, 139);
    doc.rect(margin, y, 3, itemHeight, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`0${idx + 1}`, margin + 10, y + 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(lines, margin + 30, y + 15);

    y += itemHeight + 5;
  });

  y += 10;

  // --- SECTION 3: PROMOTIONAL EMAIL ---
  printSectionTitle('3', 'Full Promotional Email', 'CORE CHANNEL');

  // Promotional Email Subject Line
  checkPageBreak(30);
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 24, 4, 4, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('SUBJECT:', margin + 10, y + 15);
  doc.setTextColor(15, 23, 42);
  const emailSubClean = cleanTextForPdf(generatedOutput.promotionalEmail.subject);
  doc.text(doc.splitTextToSize(emailSubClean, contentWidth - 70)[0], margin + 60, y + 15);
  y += 30;

  // Email Body (rendered paragraph by paragraph to guarantee seamless page breaks)
  const paragraphs = generatedOutput.promotionalEmail.body.split('\n');
  paragraphs.forEach(para => {
    const trimmed = para.trim();
    if (!trimmed) {
      y += 8; // spacing between paragraphs
      return;
    }
    const cleanPara = cleanTextForPdf(trimmed);
    const paraLines = doc.splitTextToSize(cleanPara, contentWidth - 24);
    const paraHeight = paraLines.length * 13 + 4;

    checkPageBreak(paraHeight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);
    doc.text(paraLines, margin + 12, y + 10);
    y += paraHeight;
  });

  y += 15;

  // --- SECTION 4: WHATSAPP MESSAGE ---
  printSectionTitle('4', 'WhatsApp Campaign Message', 'MOBILE CHAT');
  const cleanWA = cleanTextForPdf(generatedOutput.whatsappMessage);
  const waLines = doc.splitTextToSize(cleanWA, contentWidth - 36);
  const waBoxHeight = waLines.length * 13 + 30;

  checkPageBreak(waBoxHeight + 8);

  // WhatsApp chat container styling
  doc.setFillColor(239, 234, 226); // WhatsApp background tone
  doc.setDrawColor(218, 224, 233);
  doc.roundedRect(margin, y, contentWidth, waBoxHeight, 8, 8, 'FD');

  // WhatsApp white bubble inside
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin + 12, y + 8, contentWidth - 24, waBoxHeight - 16, 6, 6, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(waLines, margin + 20, y + 22);

  y += waBoxHeight + 15;

  // --- SECTION 5: SMS MESSAGE ---
  printSectionTitle('5', 'SMS Campaign Message', `${generatedOutput.smsMessage.length} CHARACTERS`);
  const cleanSMS = cleanTextForPdf(generatedOutput.smsMessage);
  const smsLines = doc.splitTextToSize(cleanSMS, contentWidth - 36);
  const smsBoxHeight = smsLines.length * 13 + 30;

  checkPageBreak(smsBoxHeight + 8);

  // SMS outer container
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, smsBoxHeight, 8, 8, 'FD');

  // SMS Blue message bubble
  doc.setFillColor(37, 99, 235); // Blue 600
  doc.roundedRect(margin + 12, y + 8, contentWidth - 24, smsBoxHeight - 16, 8, 8, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(smsLines, margin + 20, y + 22);

  y += smsBoxHeight + 20;

  // Render final footer on last page
  renderPageFooter();

  // Save PDF
  const pdfFilename = `${campaignData.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-campaign-brief.pdf`;
  doc.save(pdfFilename);
}
