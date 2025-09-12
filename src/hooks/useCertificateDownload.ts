import { useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

interface CertificateData {
  userName: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  difficulty: string;
}

export const useCertificateDownload = () => {
  const downloadCertificate = useCallback(async (
    certificateRef: React.RefObject<HTMLDivElement>,
    data: CertificateData,
    format: 'pdf' | 'png' = 'pdf'
  ) => {
    if (!certificateRef.current) {
      toast.error('Certificate not ready for download');
      return;
    }

    try {
      toast.loading('Generating certificate...');
      
      // Create canvas from the certificate element
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      if (format === 'png') {
        // Download as PNG
        const link = document.createElement('a');
        link.download = `${data.quizTitle.replace(/\s+/g, '-')}-certificate.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Certificate downloaded as PNG!');
      } else {
        // Download as PDF
        const imgData = canvas.toDataURL('image/png', 1.0); // High quality
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
          compress: false // Better quality
        });

        // A4 landscape dimensions: 297mm x 210mm
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        // Calculate scaling to fit while maintaining aspect ratio
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95; // 95% to add margins
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;

        // Center the image
        const x = (pdfWidth - width) / 2;
        const y = (pdfHeight - height) / 2;

        // Add the image with high quality
        pdf.addImage(imgData, 'PNG', x, y, width, height, undefined, 'FAST');
        
        // Add metadata
        pdf.setProperties({
          title: `${data.quizTitle} - Certificate of Achievement`,
          subject: `Certificate for ${data.userName}`,
          author: 'Sirat Al-Mustaqim Academy',
          keywords: 'certificate, quran, islamic, education, achievement',
          creator: 'Sirat Al-Mustaqim Online Academy'
        });
        
        const fileName = `Sirat-Al-Mustaqim-${data.quizTitle.replace(/\s+/g, '-')}-Certificate.pdf`;
        pdf.save(fileName);
        toast.success('Professional certificate downloaded as PDF!');
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast.error('Failed to generate certificate. Please try again.');
    } finally {
      toast.dismiss();
    }
  }, []);

  return { downloadCertificate };
};