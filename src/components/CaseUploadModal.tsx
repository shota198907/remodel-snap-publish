
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ImageUploadSection from './upload/ImageUploadSection';
import WorkOrderSection from './upload/WorkOrderSection';
import ReminderSection from './upload/ReminderSection';
import FormFields from './upload/FormFields';
import ActionButtons from './upload/ActionButtons';

interface CaseUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CaseUploadModal = ({ isOpen, onClose }: CaseUploadModalProps) => {
  const [formData, setFormData] = useState({
    category: '',
    beforeImages: [] as File[],
    afterImages: [] as File[],
    workOrder: null as File | null,
    title: '',
    description: '',
    scheduledDate: '',
    reminderTime: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (!files) return;
    
    if (field === 'workOrder') {
      handleInputChange(field, files[0]);
      simulateOCRWithAI(files[0]);
    } else {
      const fileArray = Array.from(files);
      handleInputChange(field, [...formData[field as keyof typeof formData] as File[], ...fileArray]);
    }
  };

  const simulateOCRWithAI = (file: File) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const generatedContent = {
        title: `${formData.category || 'リフォーム'}工事：機能性とデザイン性を両立した施工事例`,
        description: `${formData.category || 'リフォーム'}工事を実施いたしました。既存設備の撤去から新規設備の設置まで一新し、お客様のライフスタイルに合わせた機能的な設計を実現。清掃性と使いやすさを重視した高品質な仕上がりとなりました。`
      };
      
      setFormData(prev => ({
        ...prev,
        title: generatedContent.title,
        description: generatedContent.description
      }));
      setIsLoading(false);
      
      toast({
        title: "AI自動生成完了",
        description: "工事依頼書から事例タイトルと内容を生成しました",
      });
    }, 1500);
  };

  const handlePublish = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "事例を公開しました",
        description: "施工事例がポートフォリオに追加されました",
      });
      
      onClose();
      resetForm();
      setIsLoading(false);
    }, 1000);
  };

  const handleSaveDraft = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "下書き保存完了",
        description: "後から編集できます",
      });
      
      onClose();
      resetForm();
      setIsLoading(false);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      category: '',
      beforeImages: [],
      afterImages: [],
      workOrder: null,
      title: '',
      description: '',
      scheduledDate: '',
      reminderTime: '',
    });
  };

  const canPublish = formData.title && formData.beforeImages.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100
        }}
      >
        <div className="w-full max-w-md h-[90vh] max-h-[600px] bg-white rounded-lg shadow-xl overflow-hidden relative">
          <ActionButtons
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
            isLoading={isLoading}
            canPublish={canPublish}
          />

          {/* Header */}
          <DialogHeader className="p-3 pb-2 border-b bg-white relative z-10">
            <DialogTitle className="text-lg font-bold text-center pr-16">新規事例作成</DialogTitle>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto h-full">
            <div className="p-3 space-y-4">
              {/* Category Selection */}
              <div>
                <Select onValueChange={(value) => handleInputChange('category', value)} value={formData.category}>
                  <SelectTrigger className="w-full h-12 text-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 focus:border-blue-400 focus:bg-blue-50">
                    <SelectValue placeholder="カテゴリーを選択" />
                  </SelectTrigger>
                  <SelectContent className="z-[110]">
                    <SelectItem value="キッチン">キッチン</SelectItem>
                    <SelectItem value="浴室">浴室</SelectItem>
                    <SelectItem value="居室">居室</SelectItem>
                    <SelectItem value="外壁">外壁</SelectItem>
                    <SelectItem value="その他">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ImageUploadSection
                beforeImages={formData.beforeImages}
                afterImages={formData.afterImages}
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />

              <WorkOrderSection
                workOrder={formData.workOrder}
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />

              <ReminderSection
                scheduledDate={formData.scheduledDate}
                reminderTime={formData.reminderTime}
                onInputChange={handleInputChange}
                isLoading={isLoading}
              />

              <FormFields
                title={formData.title}
                description={formData.description}
                onInputChange={handleInputChange}
                isLoading={isLoading}
              />

              {/* Bottom padding for scroll */}
              <div className="h-4"></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseUploadModal;
