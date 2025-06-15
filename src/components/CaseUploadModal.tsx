
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, FileText, Save, Sparkles } from "lucide-react";
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
    publishNow: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
      handleInputChange(field, fileArray);
      
      // Success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
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

  const handleSaveDraft = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "下書き保存完了",
        description: "後からアフター写真と詳細を追加できます",
      });
      
      onClose();
      resetForm();
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (formData.publishNow && formData.afterImages.length > 0) {
        toast({
          title: "事例を公開しました",
          description: "施工事例がポートフォリオに追加されました",
        });
      } else {
        toast({
          title: "下書き保存完了",
          description: "アフター写真の準備ができたら公開できます",
        });
      }
      
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
      publishNow: false
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg font-bold text-center">新規事例作成</DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600">
            施工事例を作成して、ポートフォリオに追加しましょう
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 overflow-y-auto max-h-[calc(95vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 左カラム: 基本情報 */}
            <div className="space-y-4">
              <div className="animate-fade-in">
                <Label htmlFor="category" className="text-sm font-medium mb-2 block">工事カテゴリ</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="h-10 transition-all duration-200 hover:border-primary">
                    <SelectValue placeholder="選択してください" />
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

              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <Label className="text-sm font-medium mb-2 block">AI自動生成</Label>
                <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                  <CardContent className="p-3">
                    <div className="text-center">
                      <div className="mb-2 flex justify-center">
                        {isLoading ? (
                          <Sparkles className="w-6 h-6 text-blue-600 animate-spin" />
                        ) : (
                          <FileText className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <p className="text-xs text-blue-700 mb-2">工事依頼書をアップロード</p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload('workOrder', e.target.files)}
                        className="hidden"
                        id="workOrder"
                      />
                      <Button asChild variant="outline" size="sm" disabled={isLoading} className="transition-all duration-200 hover:scale-105">
                        <label htmlFor="workOrder" className="cursor-pointer">
                          <Upload className="w-3 h-3 mr-1" />
                          {isLoading ? "AI生成中..." : "ファイル選択"}
                        </label>
                      </Button>
                      {formData.workOrder && (
                        <p className="text-blue-700 mt-2 text-xs truncate animate-fade-in">{formData.workOrder.name}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Label htmlFor="title" className="text-sm font-medium mb-2 block">事例タイトル</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="事例タイトルを入力"
                  className="h-10 transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Label htmlFor="description" className="text-sm font-medium mb-2 block">事例説明</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="施工の詳細を記入"
                  rows={3}
                  className="resize-none transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
            </div>

            {/* 中央カラム: 施工前写真 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Label className="text-sm font-medium mb-2 block">施工前写真</Label>
              <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg ${
                formData.beforeImages.length > 0 ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400'
              } ${showSuccess ? 'animate-pulse' : ''}`}>
                <div className="mb-3">
                  <Camera className={`w-8 h-8 mx-auto transition-all duration-300 ${
                    formData.beforeImages.length > 0 ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <p className="text-sm text-gray-600 mb-3">施工前の写真をアップロード</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('beforeImages', e.target.files)}
                  className="hidden"
                  id="beforeImages"
                />
                <Button asChild variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
                  <label htmlFor="beforeImages" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-1" />
                    写真選択
                  </label>
                </Button>
                {formData.beforeImages.length > 0 && (
                  <div className="mt-3 p-2 bg-green-100 rounded text-sm text-green-800 animate-fade-in">
                    {formData.beforeImages.length}枚選択済み
                  </div>
                )}
              </div>
            </div>

            {/* 右カラム: 施工後写真 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Label className="text-sm font-medium mb-2 block">施工後写真</Label>
              <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg ${
                formData.afterImages.length > 0 ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400'
              } ${showSuccess ? 'animate-pulse' : ''}`}>
                <div className="mb-3">
                  <Camera className={`w-8 h-8 mx-auto transition-all duration-300 ${
                    formData.afterImages.length > 0 ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <p className="text-sm text-gray-600 mb-3">施工後の写真をアップロード</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('afterImages', e.target.files)}
                  className="hidden"
                  id="afterImages"
                />
                <Button asChild variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
                  <label htmlFor="afterImages" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-1" />
                    写真選択
                  </label>
                </Button>
                {formData.afterImages.length > 0 && (
                  <div className="mt-3 p-2 bg-green-100 rounded text-sm text-green-800 animate-fade-in">
                    {formData.afterImages.length}枚選択済み
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 公開設定 */}
          <div className="mt-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100">
              <input
                type="checkbox"
                checked={formData.publishNow}
                onChange={(e) => handleInputChange('publishNow', e.target.checked)}
                className="w-4 h-4 transition-transform duration-200 hover:scale-110"
                id="publishNow"
              />
              <label htmlFor="publishNow" className="text-sm font-medium">
                今すぐポートフォリオに公開する
              </label>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Button 
              onClick={handleSaveDraft}
              disabled={isLoading || !formData.category || formData.beforeImages.length === 0}
              variant="outline"
              className="flex-1 h-11 transition-all duration-200 hover:scale-105"
            >
              <Save className="w-4 h-4 mr-2" />
              下書き保存
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading || !formData.title || (formData.publishNow && formData.afterImages.length === 0)}
              className="flex-1 h-11 transition-all duration-200 hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  処理中...
                </>
              ) : (
                formData.publishNow ? "公開する" : "保存"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseUploadModal;
