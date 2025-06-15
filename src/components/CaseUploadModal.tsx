
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Plus, ArrowRight } from "lucide-react";
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
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[95vh] overflow-hidden p-0 relative">
        {/* フローティングボタン - 上部に配置 */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button 
            onClick={handlePublish}
            disabled={isLoading || !formData.title || formData.beforeImages.length === 0}
            size="sm"
            className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            公開
          </Button>
          <Button 
            onClick={handleSaveDraft}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="rounded-full border-2 border-gray-400 hover:border-gray-600 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            下書き
          </Button>
        </div>

        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold text-center">新規事例作成</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* カテゴリ選択 */}
          <div>
            <Select onValueChange={(value) => handleInputChange('category', value)} value={formData.category}>
              <SelectTrigger className="w-full h-12 text-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                <SelectValue placeholder="プルダウン：カテゴリー" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="キッチン">キッチン</SelectItem>
                <SelectItem value="浴室">浴室</SelectItem>
                <SelectItem value="居室">居室</SelectItem>
                <SelectItem value="外壁">外壁</SelectItem>
                <SelectItem value="その他">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 施工前・施工後写真エリア */}
          <div className="grid grid-cols-2 gap-4">
            {/* 施工前 */}
            <div className="space-y-2">
              <div 
                className={`relative aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 hover:scale-105 ${
                  formData.beforeImages.length > 0 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 bg-gray-50 hover:border-blue-300'
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
                      <span className="text-white font-bold">{formData.beforeImages.length}枚</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Camera className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">施工前</span>
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
              {/* プラスボタン - 写真が1枚以上ある時のみ表示 */}
              {formData.beforeImages.length > 0 && (
                <div 
                  className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center mx-auto cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => document.getElementById('beforeImages')?.click()}
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>

            {/* 施工後 */}
            <div className="space-y-2">
              <div 
                className={`relative aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 hover:scale-105 ${
                  formData.afterImages.length > 0 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 bg-gray-50 hover:border-green-300'
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
                      <span className="text-white font-bold">{formData.afterImages.length}枚</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Camera className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">施工後</span>
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
              {/* プラスボタン - 写真が1枚以上ある時のみ表示 */}
              {formData.afterImages.length > 0 && (
                <div 
                  className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center mx-auto cursor-pointer hover:border-green-500 transition-colors"
                  onClick={() => document.getElementById('afterImages')?.click()}
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          </div>

          {/* 工事依頼書 */}
          <div 
            className={`relative h-16 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 hover:scale-105 ${
              formData.workOrder 
                ? 'border-purple-400 bg-purple-50' 
                : 'border-gray-300 bg-gray-50 hover:border-purple-300'
            }`}
            onClick={() => document.getElementById('workOrder')?.click()}
          >
            <div className="flex items-center justify-center h-full">
              <Camera className="w-6 h-6 text-gray-400 mr-3" />
              <span className="text-gray-600 font-medium">
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

          {/* タイトル */}
          <div>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="テキストフィールド：タイトル"
              className="w-full h-12 text-center border-2 border-gray-300 rounded-xl bg-gray-50"
              disabled={isLoading}
            />
          </div>

          {/* 本文 */}
          <div>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="テキストフィールド：本文"
              rows={4}
              className="w-full border-2 border-gray-300 rounded-xl bg-gray-50 resize-none text-center pt-4"
              disabled={isLoading}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseUploadModal;
