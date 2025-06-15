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
        description: "後からいつでも編集を再開できます",
      });
      
      onClose();
      resetForm();
      setIsLoading(false);
    }, 1000);
  };

  const isReadyToPublish = !!(formData.category && formData.beforeImages.length > 0 && formData.title && formData.afterImages.length > 0);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (formData.publishNow && isReadyToPublish) {
        toast({
          title: "事例を公開しました",
          description: "施工事例がポートフォリオに追加されました",
        });
      } else {
        toast({
          title: "下書き保存完了",
          description: "内容を確認し、公開の準備ができたら再度編集してください",
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">新規事例作成</DialogTitle>
          <DialogDescription className="text-center">
            1つの画面で施工事例の情報を入力し、保存・公開できます。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[65vh] overflow-y-auto p-4">
          {/* ----- 基本情報 ----- */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">基本情報</h3>
            <div>
              <Label htmlFor="category" className="font-semibold">工事カテゴリ <span className="text-red-500">*</span></Label>
              <Select onValueChange={(value) => handleInputChange('category', value)} value={formData.category}>
                <SelectTrigger className="mt-2 h-12">
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

            <div>
              <Label className="font-semibold mb-2 block">施工前写真 <span className="text-red-500">*</span></Label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload('beforeImages', e.target.files)} className="hidden" id="beforeImages" />
                <label htmlFor="beforeImages" className="cursor-pointer flex flex-col items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-gray-700 mb-3">クリックして写真を選択</span>
                  <Button asChild variant="outline" size="sm"><span><Upload className="w-4 h-4 mr-2" />ファイル選択</span></Button>
                </label>
                {formData.beforeImages.length > 0 && (
                  <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-sm">{formData.beforeImages.length}枚選択済み</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ----- 事例詳細 ----- */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">事例詳細</h3>
             <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="text-center">
                  <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-orange-700 mb-3">工事依頼書からタイトルと説明をAIで自動生成できます</p>
                  <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileUpload('workOrder', e.target.files)} className="hidden" id="workOrder" />
                  <Button asChild variant="outline" size="sm" disabled={isLoading}>
                    <label htmlFor="workOrder" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      {isLoading ? "AI生成中..." : "ファイル選択"}
                    </label>
                  </Button>
                  {formData.workOrder && (
                    <p className="text-orange-700 mt-2 text-sm">{formData.workOrder.name}</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <div>
              <Label htmlFor="title" className="font-semibold">事例タイトル <span className="text-red-500">*</span></Label>
              <Input id="title" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="例：最新キッチンで家事ラクラク" className="mt-2 h-12" />
            </div>
            <div>
              <Label htmlFor="description" className="font-semibold">事例説明</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="施工のポイント、使用した素材、お客様の声などを記入" rows={5} className="mt-2" />
            </div>
          </div>
          
          {/* ----- 施工後と公開設定 ----- */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">施工後と公開設定</h3>
            <div>
              <Label className="font-semibold mb-2 block">施工後写真 {formData.publishNow && <span className="text-red-500">*</span>}</Label>
              <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors">
                <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload('afterImages', e.target.files)} className="hidden" id="afterImages" />
                <label htmlFor="afterImages" className="cursor-pointer flex flex-col items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-gray-700 mb-3">クリックして写真を選択</span>
                  <Button asChild variant="outline" size="sm"><span><Upload className="w-4 h-4 mr-2" />ファイル選択</span></Button>
                </label>
                {formData.afterImages.length > 0 && (
                  <div className="mt-3 p-2 bg-green-50 rounded-lg">
                    <p className="text-green-800 text-sm">{formData.afterImages.length}枚選択済み</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
              <input type="checkbox" checked={formData.publishNow} onChange={(e) => handleInputChange('publishNow', e.target.checked)} className="w-5 h-5" id="publishNow" />
              <label htmlFor="publishNow" className="font-medium">
                今すぐポートフォリオに公開する
              </label>
            </div>
            {!isReadyToPublish && formData.publishNow && (
                <p className="text-sm text-red-600">公開するには、必須項目（*）をすべて入力し、施工後写真をアップロードしてください。</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t mt-4">
          <Button 
            onClick={handleSaveDraft}
            disabled={isLoading}
            variant="secondary"
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            下書き保存
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || (formData.publishNow && !isReadyToPublish)}
            className="flex-1"
          >
            {isLoading ? "保存中..." : (formData.publishNow ? "公開する" : "保存して完了")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseUploadModal;
