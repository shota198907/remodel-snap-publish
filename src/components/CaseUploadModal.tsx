
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Plus, AlarmClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md h-[90vh] max-h-[600px] overflow-hidden p-0 relative">
        {/* Action Buttons - Fixed at top */}
        <div className="absolute top-2 right-2 z-20 flex gap-1">
          <Button 
            onClick={handlePublish}
            disabled={isLoading || !formData.title || formData.beforeImages.length === 0}
            size="sm"
            className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-lg text-xs px-3 py-1 h-8"
          >
            公開
          </Button>
          <Button 
            onClick={handleSaveDraft}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="rounded-full border-2 border-gray-400 hover:border-gray-600 font-bold shadow-lg text-xs px-3 py-1 h-8"
          >
            下書き
          </Button>
        </div>

        {/* Header */}
        <DialogHeader className="p-3 pb-2 border-b bg-white relative z-10">
          <DialogTitle className="text-lg font-bold text-center pr-16">新規事例作成</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 space-y-4">
            {/* Category Selection */}
            <div>
              <Select onValueChange={(value) => handleInputChange('category', value)} value={formData.category}>
                <SelectTrigger className="w-full h-12 text-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 focus:border-blue-400 focus:bg-blue-50">
                  <SelectValue placeholder="カテゴリーを選択" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="キッチン">キッチン</SelectItem>
                  <SelectItem value="浴室">浴室</SelectItem>
                  <SelectItem value="居室">居室</SelectItem>
                  <SelectItem value="外壁">外壁</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Before/After Images Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Before Images */}
              <div className="space-y-2">
                <div 
                  className={`relative aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                    formData.beforeImages.length > 0 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-25'
                  }`}
                  onClick={() => document.getElementById('beforeImages')?.click()}
                >
                  {formData.beforeImages.length > 0 ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img 
                        src={URL.createObjectURL(formData.beforeImages[0])} 
                        alt="施工前" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{formData.beforeImages.length}枚</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Camera className="w-8 h-8 text-gray-400 mb-1" />
                      <span className="text-gray-600 font-medium text-sm">施工前</span>
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handleFileUpload('beforeImages', e.target.files)}
                    className="hidden"
                    id="beforeImages"
                  />
                </div>
                {formData.beforeImages.length > 0 && (
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center mx-auto cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => document.getElementById('beforeImages')?.click()}
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>

              {/* After Images */}
              <div className="space-y-2">
                <div 
                  className={`relative aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                    formData.afterImages.length > 0 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-green-300 hover:bg-green-25'
                  }`}
                  onClick={() => document.getElementById('afterImages')?.click()}
                >
                  {formData.afterImages.length > 0 ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img 
                        src={URL.createObjectURL(formData.afterImages[0])} 
                        alt="施工後" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{formData.afterImages.length}枚</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Camera className="w-8 h-8 text-gray-400 mb-1" />
                      <span className="text-gray-600 font-medium text-sm">施工後</span>
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handleFileUpload('afterImages', e.target.files)}
                    className="hidden"
                    id="afterImages"
                  />
                </div>
                {formData.afterImages.length > 0 && (
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center mx-auto cursor-pointer hover:border-green-500 transition-colors"
                    onClick={() => document.getElementById('afterImages')?.click()}
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            </div>

            {/* Work Order Upload */}
            <div 
              className={`relative h-12 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                formData.workOrder 
                  ? 'border-purple-400 bg-purple-50' 
                  : 'border-gray-300 bg-gray-50 hover:border-purple-300 hover:bg-purple-25'
              }`}
              onClick={() => document.getElementById('workOrder')?.click()}
            >
              <div className="flex items-center justify-center h-full">
                <Camera className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600 font-medium text-sm">
                  {formData.workOrder ? '工事依頼書 ✓' : '工事依頼書'}
                </span>
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload('workOrder', e.target.files)}
                className="hidden"
                id="workOrder"
              />
            </div>

            {/* Alarm Setting Section */}
            <div className="space-y-3 p-3 border-2 border-dashed border-orange-300 bg-orange-50 rounded-xl">
              <div className="flex items-center space-x-2">
                <AlarmClock className="w-5 h-5 text-orange-600" />
                <span className="text-orange-800 font-medium text-sm">撮影リマインダー設定</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-orange-700 mb-1 font-medium">予定日</label>
                  <Input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                    className="w-full h-9 text-xs border border-orange-300 rounded-lg bg-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-xs text-orange-700 mb-1 font-medium">時間</label>
                  <Input
                    type="time"
                    value={formData.reminderTime}
                    onChange={(e) => handleInputChange('reminderTime', e.target.value)}
                    className="w-full h-9 text-xs border border-orange-300 rounded-lg bg-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="事例タイトルを入力"
                className="w-full h-12 text-center border-2 border-gray-300 rounded-xl bg-gray-50 focus:border-blue-400 focus:bg-blue-50 placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>

            {/* Description Textarea */}
            <div>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="施工内容の詳細を入力"
                rows={4}
                className="w-full border-2 border-gray-300 rounded-xl bg-gray-50 resize-none text-center pt-4 focus:border-blue-400 focus:bg-blue-50 placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>

            {/* Bottom padding for scroll */}
            <div className="h-4"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseUploadModal;
