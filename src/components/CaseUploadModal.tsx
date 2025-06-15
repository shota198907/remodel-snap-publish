
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, FileText, Wand2, Calendar } from "lucide-react";
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
    scheduledDate: '',
    reminderTime: '09:00',
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
      // OCRで自動的にタイトルと内容を生成
      simulateOCRWithAI(files[0]);
    } else {
      const fileArray = Array.from(files);
      handleInputChange(field, fileArray);
    }
  };

  // OCR + AI自動生成を一度に実行
  const simulateOCRWithAI = (file: File) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const generatedContent = {
        title: `${formData.category || 'リフォーム'}工事：機能性とデザイン性を両立した施工事例`,
        description: `${formData.category || 'リフォーム'}工事を実施いたしました。既存設備の撤去から新規設備の設置まで一新し、お客様のライフスタイルに合わせた機能的な設計を実現。清掃性と使いやすさを重視した高品質な仕上がりとなりました。最新の設備と確かな技術で、長期的な満足をお約束いたします。`
      };
      
      setFormData(prev => ({
        ...prev,
        title: generatedContent.title,
        description: generatedContent.description
      }));
      setIsLoading(false);
      
      toast({
        title: "OCR + AI自動生成完了",
        description: "工事依頼書から事例タイトルと内容を生成しました",
      });
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (formData.publishNow && formData.afterImages.length > 0) {
        toast({
          title: "事例を公開しました",
          description: "SNSへの投稿も完了しました",
        });
      } else {
        toast({
          title: "下書き保存完了",
          description: formData.scheduledDate 
            ? `${formData.scheduledDate} ${formData.reminderTime}にリマインダーを設定しました`
            : "下書きとして保存しました",
        });
      }
      
      onClose();
      setStep(1);
      setFormData({
        category: '',
        beforeImages: [],
        afterImages: [],
        workOrder: null,
        title: '',
        description: '',
        scheduledDate: '',
        reminderTime: '09:00',
        publishNow: false
      });
      setIsLoading(false);
    }, 1500);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="category">工事カテゴリ *</Label>
        <Select onValueChange={(value) => handleInputChange('category', value)}>
          <SelectTrigger className="mt-1 h-12">
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
        <Label>施工前写真 *</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-3 font-medium">施工前の写真をアップロード</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload('beforeImages', e.target.files)}
            className="hidden"
            id="beforeImages"
          />
          <Button asChild variant="outline" size="lg" className="h-12 px-8">
            <label htmlFor="beforeImages" className="cursor-pointer">
              <Upload className="w-5 h-5 mr-2" />
              写真を選択
            </label>
          </Button>
          {formData.beforeImages.length > 0 && (
            <p className="text-blue-600 mt-3 font-medium">
              {formData.beforeImages.length}枚の画像が選択されています
            </p>
          )}
        </div>
      </div>

      <Button 
        onClick={() => setStep(2)} 
        className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
        disabled={!formData.category || formData.beforeImages.length === 0}
      >
        次へ
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-600" />
            工事依頼書から自動生成
          </CardTitle>
          <CardDescription>
            工事依頼書をアップロードすると、OCRでタイトルと内容を自動生成します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
            <FileText className="w-10 h-10 text-orange-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-3">工事依頼書をアップロード（任意）</p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload('workOrder', e.target.files)}
              className="hidden"
              id="workOrder"
            />
            <Button asChild variant="outline" size="lg" disabled={isLoading}>
              <label htmlFor="workOrder" className="cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                {isLoading ? "AI生成中..." : "ファイルを選択"}
              </label>
            </Button>
            {formData.workOrder && (
              <p className="text-orange-600 mt-3 font-medium">
                {formData.workOrder.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="title">事例タイトル *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="リフォーム事例のタイトル"
          required
          className="mt-1 h-12"
        />
      </div>

      <div>
        <Label htmlFor="description">事例説明 *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="リフォームの詳細な説明"
          rows={6}
          required
          className="mt-1"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          onClick={() => setStep(1)}
          className="flex-1 h-12"
        >
          戻る
        </Button>
        <Button 
          onClick={() => setStep(3)} 
          className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
          disabled={!formData.title || !formData.description}
        >
          次へ
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label>施工後写真（任意）</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors">
          <Camera className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-3">施工後の写真をアップロード</p>
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
              <Upload className="w-5 h-5 mr-2" />
              写真を選択
            </label>
          </Button>
          {formData.afterImages.length > 0 && (
            <p className="text-green-600 mt-3 font-medium">
              {formData.afterImages.length}枚の画像が選択されています
            </p>
          )}
        </div>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            リマインダー設定（任意）
          </CardTitle>
          <CardDescription>
            施工完了予定日にアフター写真撮影をお知らせ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scheduledDate">完了予定日</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="reminderTime">通知時刻</Label>
              <Input
                id="reminderTime"
                type="time"
                value={formData.reminderTime}
                onChange={(e) => handleInputChange('reminderTime', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.publishNow}
                onChange={(e) => handleInputChange('publishNow', e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="font-medium">すぐに公開する（アフター写真必須）</span>
            </label>
            {formData.publishNow && formData.afterImages.length === 0 && (
              <p className="text-red-600 text-sm">
                ※ すぐに公開する場合はアフター写真が必要です
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          onClick={() => setStep(2)}
          className="flex-1 h-12"
        >
          戻る
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || (formData.publishNow && formData.afterImages.length === 0)}
          className="flex-1 h-12 bg-green-600 hover:bg-green-700"
        >
          {isLoading ? "保存中..." : formData.publishNow ? "公開する" : "下書き保存"}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>新規事例作成</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            ステップ {step} / 3
          </DialogDescription>
        </DialogHeader>

        {/* プログレスバー */}
        <div className="flex items-center space-x-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
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
