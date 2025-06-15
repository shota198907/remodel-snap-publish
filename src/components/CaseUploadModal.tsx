
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, FileText, Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaseUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CaseUploadModal = ({ isOpen, onClose }: CaseUploadModalProps) => {
  const [step, setStep] = useState(1);
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
    setStep(1);
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

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">施工前の記録</h3>
        <p className="text-gray-600">カテゴリーと施工前写真をアップロード</p>
      </div>

      <div>
        <Label htmlFor="category" className="text-base font-semibold">工事カテゴリ</Label>
        <Select onValueChange={(value) => handleInputChange('category', value)}>
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
        <Label className="text-base font-semibold mb-3 block">施工前写真</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-700 mb-3">施工前の写真をアップロード</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload('beforeImages', e.target.files)}
            className="hidden"
            id="beforeImages"
          />
          <Button asChild variant="outline" size="lg">
            <label htmlFor="beforeImages" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              写真を選択
            </label>
          </Button>
          {formData.beforeImages.length > 0 && (
            <div className="mt-3 p-2 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">{formData.beforeImages.length}枚選択済み</p>
            </div>
          )}
        </div>
      </div>

      <Button 
        onClick={() => setStep(2)} 
        className="w-full h-12"
        disabled={!formData.category || formData.beforeImages.length === 0}
      >
        次へ
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">事例詳細</h3>
        <p className="text-gray-600">タイトルと説明を入力（後から編集可能）</p>
      </div>

      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="text-center">
            <FileText className="w-10 h-10 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-orange-700 mb-3">工事依頼書から自動生成</p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload('workOrder', e.target.files)}
              className="hidden"
              id="workOrder"
            />
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
        <Label htmlFor="title" className="text-base font-semibold">事例タイトル</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="事例タイトルを入力"
          className="mt-2 h-12"
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-base font-semibold">事例説明</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="施工の詳細を記入"
          rows={4}
          className="mt-2"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          戻る
        </Button>
        <Button 
          onClick={handleSaveDraft}
          disabled={isLoading}
          className="flex-1 bg-gray-600 hover:bg-gray-700"
        >
          <Save className="w-4 h-4 mr-2" />
          下書き保存
        </Button>
        <Button 
          onClick={() => setStep(3)} 
          className="flex-1"
          disabled={!formData.title}
        >
          完了へ
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">アフター写真と公開</h3>
        <p className="text-gray-600">施工後写真をアップロードして公開</p>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">施工後写真</Label>
        <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-700 mb-3">施工後の写真をアップロード</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload('afterImages', e.target.files)}
            className="hidden"
            id="afterImages"
          />
          <Button asChild variant="outline" size="lg">
            <label htmlFor="afterImages" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              写真を選択
            </label>
          </Button>
          {formData.afterImages.length > 0 && (
            <div className="mt-3 p-2 bg-green-50 rounded-lg">
              <p className="text-green-800 text-sm">{formData.afterImages.length}枚選択済み</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3 p-4 border rounded-lg">
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

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
          戻る
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || (formData.publishNow && formData.afterImages.length === 0)}
          className="flex-1"
        >
          {isLoading ? "保存中..." : formData.publishNow ? "公開する" : "保存"}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">新規事例作成</DialogTitle>
          <DialogDescription className="text-center">
            ステップ {step} / 3
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded ${
                  i < step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </DialogContent>
    </Dialog>
  );
};

export default CaseUploadModal;
