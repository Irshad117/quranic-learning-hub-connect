import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, FileImage, FileText, User } from 'lucide-react';
import { Certificate } from './Certificate';
import { useCertificateDownload } from '@/hooks/useCertificateDownload';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  difficulty: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  quizTitle,
  score,
  totalQuestions,
  percentage,
  difficulty,
}) => {
  const [userName, setUserName] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);
  const { downloadCertificate } = useCertificateDownload();

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certificateData = {
    userName,
    quizTitle,
    score,
    totalQuestions,
    percentage,
    difficulty,
  };

  const handleDownload = (format: 'pdf' | 'png') => {
    if (!userName.trim()) {
      return;
    }
    downloadCertificate(certificateRef, certificateData, format);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Download Your Certificate</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="userName" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Enter your name for the certificate:</span>
            </Label>
            <Input
              id="userName"
              placeholder="Your full name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Certificate Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Certificate Preview:</h3>
            <div className="overflow-x-auto">
              <Certificate
                ref={certificateRef}
                userName={userName}
                quizTitle={quizTitle}
                score={score}
                totalQuestions={totalQuestions}
                percentage={percentage}
                difficulty={difficulty}
                completionDate={currentDate}
              />
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => handleDownload('pdf')}
              disabled={!userName.trim()}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <FileText className="h-4 w-4" />
              <span>Download as PDF</span>
            </Button>
            
            <Button
              onClick={() => handleDownload('png')}
              disabled={!userName.trim()}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <FileImage className="h-4 w-4" />
              <span>Download as Image</span>
            </Button>
          </div>

          {!userName.trim() && (
            <p className="text-sm text-muted-foreground">
              Please enter your name to enable certificate download.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};