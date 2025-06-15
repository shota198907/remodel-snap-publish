
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, FileText, Save, Sparkles, Image, Plus, CheckCircle } from "lucide-react";
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
      handleInputChange(field, [...formData[field as keyof typeof formData] as File[], ...fileArray]);
      
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

  const removeImage = (field: string, index: number) => {
    const currentImages = formData[field as keyof typeof formData] as File[];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    handleInputChange(field, updatedImages);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-center">新規事例作成</DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600">
            まずは施工前の写真をアップロードしましょう
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* メインアップロードエリア - 施工前写真 */}
          <div className="text-center">
            <div className={`relative mx-auto w-48 h-48 rounded-3xl border-4 border-dashed transition-all duration-300 hover:scale-105 cursor-pointer ${
              formData.beforeImages.length > 0 
                ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50' 
                : 'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-400'
            } ${showSuccess ? 'animate-pulse scale-105' : ''}`}
            onClick={() => document.getElementById('beforeImages')?.click()}>
              
              {formData.beforeImages.length > 0 ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img 
                    src={URL.createObjectURL(formData.beforeImages[0])} 
                    alt="施工前" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="text-white text-center">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{formData.beforeImages.length}枚</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById('beforeImages')?.click();
                    }}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-blue-700 font-medium mb-2">施工前写真</p>
                  <p className="text-blue-600 text-sm">タップして追加</p>
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
          </div>

          {/* 次のアクション選択エリア */}
          {formData.beforeImages.length > 0 && (
            <div className="animate-fade-in">
              <p className="text-center text-gray-700 font-medium mb-4">次に何をしますか？</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 工事依頼書アップロード */}
                <Card className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="font-medium text-purple-700 mb-2">工事依頼書</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('workOrder', e.target.files)}
                      className="hidden"
                      id="workOrder"
                    />
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      disabled={isLoading}
                      className="text-purple-600 border-purple-300 hover:bg-purple-50"
                    >
                      <label htmlFor="workOrder" className="cursor-pointer">
                        {isLoading ? "AI生成中..." : "AI自動生成"}
                      </label>
                    </Button>
                    {formData.workOrder && (
                      <p className="text-purple-700 mt-2 text-xs animate-fade-in">✓ 添付済み</p>
                    )}
                  </CardContent>
                </Card>

                {/* 施工後写真アップロード */}
                <Card className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-dashed border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Image className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-medium text-green-700 mb-2">施工後写真</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => handleFileUpload('afterImages', e.target.files)}
                      className="hidden"
                      id="afterImages"
                    />
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                      className="text-green-600 border-green-300 hover:bg-green-50"
                    >
                      <label htmlFor="afterImages" className="cursor-pointer">
                        追加する
                      </label>
                    </Button>
                    {formData.afterImages.length > 0 && (
                      <p className="text-green-700 mt-2 text-xs animate-fade-in">✓ {formData.afterImages.length}枚</p>
                    )}
                  </CardContent>
                </Card>

                {/* 下書き保存 */}
                <Card className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-dashed border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Save className="w-6 h-6 text-orange-600" />
                    </div>
                    <p className="font-medium text-orange-700 mb-2">下書き保存</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSaveDraft}
                      disabled={isLoading}
                      className="text-orange-600 border-orange-300 hover:bg-orange-50"
                    >
                      {isLoading ? "保存中..." : "保存する"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* 詳細情報入力エリア */}
          {(formData.workOrder || formData.afterImages.length > 0) && (
            <div className="animate-fade-in space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium mb-2 block">工事カテゴリ</Label>
                  <Select onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="h-10">
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

                <div>
                  <Label htmlFor="title" className="text-sm font-medium mb-2 block">事例タイトル</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="事例タイトルを入力"
                    className="h-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium mb-2 block">事例説明</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="施工の詳細を記入"
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* 公開設定 */}
              {formData.afterImages.length > 0 && (
                <div className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.publishNow}
                    onChange={(e) => handleInputChange('publishNow', e.target.checked)}
                    className="w-4 h-4"
                    id="publishNow"
                  />
                  <label htmlFor="publishNow" className="text-sm font-medium">
                    今すぐポートフォリオに公開する
                  </label>
                </div>
              )}

              {/* 最終アクションボタン */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleSaveDraft}
                  disabled={isLoading}
                  variant="outline"
                  className="flex-1 h-11"
                >
                  <Save className="w-4 h-4 mr-2" />
                  下書き保存
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.title || (formData.publishNow && formData.afterImages.length === 0)}
                  className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseUploadModal;
