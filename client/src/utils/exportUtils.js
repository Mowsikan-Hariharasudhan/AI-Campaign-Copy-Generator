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
 * Generates and downloads a clean, styled PDF document for the marketing campaign
 */
export function downloadPDF(campaignData, generatedOutput) {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Title Banner
  doc.setFillColor(17, 24, 39); // Neutral 900
  doc.rect(margin, y, contentWidth, 54, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('CampaignAI — Marketing Copy Brief', margin + 16, y + 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(209, 213, 219);
  doc.text(`Generated on ${new Date().toLocaleDateString()} | Tone: ${campaignData.tone}`, margin + 16, y + 44);

  y += 70;

  // Campaign Meta Box
  doc.setFillColor(248, 250, 252); // Neutral 50
  doc.setDrawColor(226, 232, 240); // Neutral 200
  doc.rect(margin, y, contentWidth, 80, 'FD');

  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);

  doc.setFont('helvetica', 'bold');
  doc.text('Product:', margin + 12, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.text(campaignData.productName || '', margin + 65, y + 20);

  doc.setFont('helvetica', 'bold');
  doc.text('Offer:', margin + 12, y + 36);
  doc.setFont('helvetica', 'normal');
  doc.text(campaignData.offer || '', margin + 65, y + 36);

  doc.setFont('helvetica', 'bold');
  doc.text('Audience:', margin + 12, y + 52);
  doc.setFont('helvetica', 'normal');
  const splitAudience = doc.splitTextToSize(campaignData.targetAudience || '', contentWidth - 85);
  doc.text(splitAudience[0] || '', margin + 65, y + 52);

  doc.setFont('helvetica', 'bold');
  doc.text('Objective:', margin + 12, y + 68);
  doc.setFont('helvetica', 'normal');
  const splitObj = doc.splitTextToSize(campaignData.campaignObjective || '', contentWidth - 85);
  doc.text(splitObj[0] || '', margin + 65, y + 68);

  y += 100;

  function checkPageBreak(neededHeight) {
    if (y + neededHeight > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function addSectionHeader(title) {
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(17, 24, 39);
    doc.text(title, margin, y);
    doc.setDrawColor(203, 213, 225);
    doc.line(margin, y + 4, margin + contentWidth, y + 4);
    y += 20;
  }

  // 1. Email Subjects
  addSectionHeader('1. Email Subject Lines');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  generatedOutput.emailSubjects.forEach((sub, i) => {
    checkPageBreak(20);
    doc.text(`${i + 1}.  ${sub}`, margin + 8, y);
    y += 16;
  });
  y += 10;

  // 2. Email Previews
  addSectionHeader('2. Email Preview Texts (Preheaders)');
  generatedOutput.emailPreviews.forEach((prev, i) => {
    checkPageBreak(20);
    doc.text(`${i + 1}.  ${prev}`, margin + 8, y);
    y += 16;
  });
  y += 10;

  // 3. Promotional Email
  addSectionHeader('3. Promotional Email');
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.text(`Subject: ${generatedOutput.promotionalEmail.subject}`, margin + 8, y);
  y += 18;

  doc.setFont('helvetica', 'normal');
  const splitEmailBody = doc.splitTextToSize(generatedOutput.promotionalEmail.body, contentWidth - 16);
  splitEmailBody.forEach(line => {
    checkPageBreak(15);
    doc.text(line, margin + 8, y);
    y += 14;
  });
  y += 15;

  // 4. WhatsApp Message
  addSectionHeader('4. WhatsApp Campaign Message');
  const splitWA = doc.splitTextToSize(generatedOutput.whatsappMessage, contentWidth - 16);
  splitWA.forEach(line => {
    checkPageBreak(15);
    doc.text(line, margin + 8, y);
    y += 14;
  });
  y += 15;

  // 5. SMS Message
  addSectionHeader('5. SMS Campaign Message');
  const splitSMS = doc.splitTextToSize(generatedOutput.smsMessage, contentWidth - 16);
  splitSMS.forEach(line => {
    checkPageBreak(15);
    doc.text(line, margin + 8, y);
    y += 14;
  });

  const pdfFilename = `${campaignData.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-campaign.pdf`;
  doc.save(pdfFilename);
}
