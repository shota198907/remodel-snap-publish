
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Clock, Calendar, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaseUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CaseUploadModal = ({ isOpen, onClose }: CaseUploadModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    workPeriod: '',
    beforeImages: [] as File[],
    afterImages: [] as File[],
    workOrder: null as File | null,
    title: '',
    description: '',
    scheduledDate: '',
    reminderTime: '09:00'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [aiGeneratedContent, setAiGeneratedContent] = useState({
    title: '',
    description: ''
  });
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
    } else {
      const fileArray = Array.from(files);
      handleInputChange(field, fileArray);
    }
  };

  const simulateAIGeneration = () => {
    setIsLoading(true);
    // AI生成のシミュレーション
    setTimeout(() => {
      const sampleContent = {
        title: `${formData.category}リフォーム：${formData.location}での施工事例`,
        description: `${formData.location}にて${formData.category}のリフォーム工事を実施いたしました。工期${formData.workPeriod}で、お客様のご要望に沿った高品質な仕上がりを実現いたしました。`
      };
      setAiGeneratedContent(sampleContent);
      setFormData(prev => ({
        ...prev,
        title: sampleContent.title,
        description: sampleContent.description
      }));
      setIsLoading(false);
      toast({
        title: "AI生成完了",
        description: "工事依頼書から事例内容を自動生成しました",
      });
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // 下書き保存とリマインダー設定のシミュレーション
    setTimeout(() => {
      toast({
        title: "下書き保存完了",
        description: `${formData.scheduledDate} ${formData.reminderTime}にリマインダーを設定しました`,
      });
      
      // プッシュ通知の許可を求める（実際の実装では）
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            toast({
              title: "通知設定完了",
              description: "アフター写真撮影のリマインダーを設定しました",
            });
          }
        });
      }
      
      onClose();
      setStep(1);
      setIsLoading(false);
    }, 1500);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">工事カテゴリ *</Label>
          <Select onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="キッチン">キッチン</SelectItem>
              <SelectItem value="浴室">浴室</SelectItem>
              <SelectItem value="トイレ">トイレ</SelectItem>
              <SelectItem value="居室">居室</SelectItem>
              <SelectItem value="外装">外装</SelectItem>
              <SelectItem value="その他">その他</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">施工場所</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="東京都世田谷区"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="workPeriod">工期</Label>
        <Input
          id="workPeriod"
          value={formData.workPeriod}
          onChange={(e) => handleInputChange('workPeriod', e.target.value)}
          placeholder="3日間"
        />
      </div>

      <div>
        <Label>施工前写真 *</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-reform-blue-400 transition-colors">
          <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">施工前の写真をアップロード</p>
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
              <Upload className="w-4 h-4 mr-2" />
              ファイルを選択
            </label>
          </Button>
          {formData.beforeImages.length > 0 && (
            <p className="text-sm text-reform-blue-600 mt-2">
              {formData.beforeImages.length}枚の画像が選択されています
            </p>
          )}
        </div>
      </div>

      <div>
        <Label>工事依頼書（任意）</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-reform-orange-400 transition-colors">
          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">工事依頼書をアップロード（AI自動生成用）</p>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileUpload('workOrder', e.target.files)}
            className="hidden"
            id="workOrder"
          />
          <Button asChild variant="outline" size="sm">
            <label htmlFor="workOrder" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              ファイルを選択
            </label>
          </Button>
          {formData.workOrder && (
            <p className="text-sm text-reform-orange-600 mt-2">
              {formData.workOrder.name}
            </p>
          )}
        </div>
      </div>

      <Button 
        onClick={() => setStep(2)} 
        className="w-full bg-reform-blue-500 hover:bg-reform-blue-600"
        disabled={!formData.category || formData.beforeImages.length === 0}
      >
        次へ：内容生成
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {formData.workOrder && (
        <Card className="border-reform-orange-200 bg-reform-orange-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-reform-orange-600" />
              AI自動生成
            </CardTitle>
            <CardDescription>
              工事依頼書からタイトルと内容を自動生成します
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={simulateAIGeneration}
              disabled={isLoading}
              className="bg-reform-orange-500 hover:bg-reform-orange-600"
            >
              {isLoading ? "AI生成中..." : "内容を自動生成"}
            </Button>
          </CardContent>
        </Card>
      )}

      <div>
        <Label htmlFor="title">事例タイトル *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="リフォーム事例のタイトル"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">事例説明 *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="リフォームの詳細な説明"
          rows={5}
          required
        />
      </div>

      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(1)}
          className="flex-1"
        >
          戻る
        </Button>
        <Button 
          onClick={() => setStep(3)} 
          className="flex-1 bg-reform-blue-500 hover:bg-reform-blue-600"
          disabled={!formData.title || !formData.description}
        >
          次へ：リマインダー設定
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card className="border-reform-blue-200 bg-reform-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Clock className="w-5 h-5 mr-2 text-reform-blue-600" />
            アフター写真リマインダー
          </CardTitle>
          <CardDescription>
            施工完了予定日にプッシュ通知でお知らせします
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="scheduledDate">施工完了予定日 *</Label>
            <Input
              id="scheduledDate"
              type="date"
              value={formData.scheduledDate}
              onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="reminderTime">通知時刻</Label>
            <Input
              id="reminderTime"
              type="time"
              value={formData.reminderTime}
              onChange={(e) => handleInputChange('reminderTime', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">下書き保存内容</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>カテゴリ:</strong> {formData.category}</p>
          <p><strong>タイトル:</strong> {formData.title}</p>
          <p><strong>施工前写真:</strong> {formData.beforeImages.length}枚</p>
          <p><strong>リマインダー:</strong> {formData.scheduledDate} {formData.reminderTime}</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(2)}
          className="flex-1"
        >
          戻る
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || !formData.scheduledDate}
          className="flex-1 bg-reform-orange-500 hover:bg-reform-orange-600"
        >
          {isLoading ? "保存中..." : "下書き保存"}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>事例投稿</span>
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
                i <= step ? 'bg-reform-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  i < step ? 'bg-reform-blue-500' : 'bg-gray-200'
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
