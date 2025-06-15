
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, FileText, Save } from "lucide-react";
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
      <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-center">新規事例作成</DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600">
            施工事例を作成して、ポートフォリオに追加しましょう
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* メイングリッド */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左側: 基本情報と写真 */}
            <div className="space-y-6">
              {/* カテゴリ選択 */}
              <div>
                <Label htmlFor="category" className="text-sm font-semibold mb-2 block">工事カテゴリ</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="カテゴリを選択" />
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

              {/* 施工前写真 */}
              <div>
                <Label className="text-sm font-semibold mb-2 block">施工前写真</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-2">施工前の写真をアップロード</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload('beforeImages', e.target.files)}
                    className="hidden"
                    id="beforeImages"
                  />
                  <Button asChild variant="outline" size="sm">
                    <label htmlFor="beforeImages" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-1" />
                      写真選択
                    </label>
                  </Button>
                  {formData.beforeImages.length > 0 && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                      {formData.beforeImages.length}枚選択済み
                    </div>
                  )}
                </div>
              </div>

              {/* 施工後写真 */}
              <div>
                <Label className="text-sm font-semibold mb-2 block">施工後写真</Label>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-2">施工後の写真をアップロード</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload('afterImages', e.target.files)}
                    className="hidden"
                    id="afterImages"
                  />
                  <Button asChild variant="outline" size="sm">
                    <label htmlFor="afterImages" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-1" />
                      写真選択
                    </label>
                  </Button>
                  {formData.afterImages.length > 0 && (
                    <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-800">
                      {formData.afterImages.length}枚選択済み
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 右側: 詳細情報 */}
            <div className="space-y-6">
              {/* AI自動生成セクション */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-xs text-orange-700 mb-3">工事依頼書からAI自動生成</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('workOrder', e.target.files)}
                      className="hidden"
                      id="workOrder"
                    />
                    <Button asChild variant="outline" size="sm" disabled={isLoading}>
                      <label htmlFor="workOrder" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-1" />
                        {isLoading ? "AI生成中..." : "ファイル選択"}
                      </label>
                    </Button>
                    {formData.workOrder && (
                      <p className="text-orange-700 mt-2 text-xs truncate">{formData.workOrder.name}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 事例タイトル */}
              <div>
                <Label htmlFor="title" className="text-sm font-semibold mb-2 block">事例タイトル</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="事例タイトルを入力"
                  className="h-11"
                />
              </div>

              {/* 事例説明 */}
              <div>
                <Label htmlFor="description" className="text-sm font-semibold mb-2 block">事例説明</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="施工の詳細を記入"
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* 公開設定 */}
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
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t">
            <Button 
              onClick={handleSaveDraft}
              disabled={isLoading || !formData.category || formData.beforeImages.length === 0}
              variant="outline"
              className="flex-1 h-11"
            >
              <Save className="w-4 h-4 mr-2" />
              下書き保存
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading || !formData.title || (formData.publishNow && formData.afterImages.length === 0)}
              className="flex-1 h-11"
            >
              {isLoading ? "処理中..." : formData.publishNow ? "公開する" : "保存"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseUploadModal;
