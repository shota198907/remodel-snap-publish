
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Plus, ArrowRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Case } from "@/types/case";

interface CaseEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  case: Case | null;
  onSave: (updatedCase: Case) => void;
}

const CaseEditModal = ({ isOpen, onClose, case: caseData, onSave }: CaseEditModalProps) => {
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

  useEffect(() => {
    if (caseData) {
      setFormData({
        category: caseData.category,
        beforeImages: [],
        afterImages: [],
        workOrder: null,
        title: caseData.title,
        description: caseData.description,
      });
    }
  }, [caseData]);

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
    } else {
      const fileArray = Array.from(files);
      handleInputChange(field, [...formData[field as keyof typeof formData] as File[], ...fileArray]);
    }
  };

  const removeImage = (field: string, index: number) => {
    const currentImages = formData[field as keyof typeof formData] as File[];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    handleInputChange(field, updatedImages);
  };

  const handleSave = () => {
    if (!caseData) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const updatedCase: Case = {
        ...caseData,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        beforeImage: formData.beforeImages.length > 0 
          ? URL.createObjectURL(formData.beforeImages[0]) 
          : caseData.beforeImage,
        afterImage: formData.afterImages.length > 0 
          ? URL.createObjectURL(formData.afterImages[0]) 
          : caseData.afterImage,
      };

      onSave(updatedCase);
      toast({
        title: "事例を更新しました",
        description: "変更内容が保存されました",
      });
      
      onClose();
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

  if (!caseData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold text-center">事例を編集</DialogTitle>
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

          {/* 施工前写真エリア */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">施工前写真</h3>
              <p className="text-sm text-gray-600">リフォーム前の状態を撮影してください</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {formData.beforeImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-blue-200 bg-blue-50 group">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`施工前 ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage('beforeImages', index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {/* 新しい写真追加ボタン */}
              <div 
                className="aspect-square rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-100 transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById('beforeImages')?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mb-2">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-blue-600 font-medium">写真追加</span>
              </div>
              
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
          </div>

          {/* 施工後写真エリア */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">施工後写真</h3>
              <p className="text-sm text-gray-600">完成した状態を撮影してください</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {formData.afterImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-green-200 bg-green-50 group">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`施工後 ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage('afterImages', index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {/* 新しい写真追加ボタン */}
              <div 
                className="aspect-square rounded-2xl border-2 border-dashed border-green-300 bg-green-50 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-100 transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById('afterImages')?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center mb-2">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-green-600 font-medium">写真追加</span>
              </div>
              
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

          {/* アクションボタン */}
          <div className="border-2 border-dashed border-gray-400 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={onClose}
                disabled={isLoading}
                variant="outline"
                className="h-12 rounded-full border-2 border-gray-400 hover:border-gray-600 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                キャンセル
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isLoading || !formData.title}
                className="h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                保存
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseEditModal;
