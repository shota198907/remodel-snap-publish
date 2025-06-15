
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Clock, Calendar, Upload, Image as ImageIcon, Wand2, FileText } from "lucide-react";
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
    reminderTime: '09:00',
    publishNow: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState('');
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

  // OCRシミュレーション
  const simulateOCR = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const sampleOCRResult = `
工事依頼書

工事名称: キッチンリフォーム工事
工事場所: 東京都世田谷区〇〇1-2-3
工期: 5日間
工事内容:
- 既存キッチンの撤去
- 新規システムキッチン設置（パナソニック ラクシーナ）
- 給排水配管工事
- 電気配線工事（IHコンロ対応）
- 壁・天井クロス張替
- フローリング補修

特記事項:
- 高齢者対応として作業台高さを80cmに調整
- 収納力向上のため吊戸棚を新設
- 清掃性重視でステンレス天板を選択
      `;
      
      setOcrResult(sampleOCRResult);
      setIsLoading(false);
      
      toast({
        title: "OCR解析完了",
        description: "工事依頼書の内容を読み取りました",
      });
    }, 2000);
  };

  // AI生成シミュレーション
  const simulateAIGeneration = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const generatedContent = {
        title: `${formData.category}全面リフォーム：機能性とデザイン性を両立した${formData.location}の事例`,
        description: `${formData.location}にて${formData.category}のリフォーム工事を実施いたしました。工期${formData.workPeriod}で、既存設備の撤去から新規設備の設置まで一新。高齢者対応の作業台高さ調整や収納力向上など、お客様のライフスタイルに合わせた機能的な設計を実現。清掃性を重視したステンレス天板や、最新のIH対応電気配線など、長期的な使いやすさを考慮した高品質な仕上がりとなりました。`
      };
      
      setAiGeneratedContent(generatedContent);
      setFormData(prev => ({
        ...prev,
        title: generatedContent.title,
        description: generatedContent.description
      }));
      setIsLoading(false);
      
      toast({
        title: "AI自動生成完了",
        description: "OCR結果から事例タイトルと内容を生成しました",
      });
    }, 3000);
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
          placeholder="5日間"
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
        <Label>工事依頼書（OCR+AI自動生成用）</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-reform-orange-400 transition-colors">
          <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
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
        次へ：AI自動生成
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {formData.workOrder && (
        <Card className="border-reform-orange-200 bg-reform-orange-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2 text-reform-orange-600" />
              OCR + AI自動生成
            </CardTitle>
            <CardDescription>
              工事依頼書をOCRで読み取り、AIがタイトルと内容を自動生成します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!ocrResult && (
              <Button
                onClick={simulateOCR}
                disabled={isLoading}
                className="bg-reform-orange-500 hover:bg-reform-orange-600 w-full"
              >
                {isLoading ? "OCR解析中..." : "OCRで工事依頼書を読み取る"}
              </Button>
            )}
            
            {ocrResult && !aiGeneratedContent.title && (
              <div className="space-y-3">
                <div className="p-3 bg-white rounded border">
                  <h4 className="font-medium text-sm mb-2">OCR解析結果:</h4>
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap max-h-32 overflow-y-auto">
                    {ocrResult}
                  </pre>
                </div>
                <Button
                  onClick={simulateAIGeneration}
                  disabled={isLoading}
                  className="bg-reform-blue-500 hover:bg-reform-blue-600 w-full"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {isLoading ? "AI生成中..." : "AIでタイトル・内容を生成"}
                </Button>
              </div>
            )}

            {aiGeneratedContent.title && (
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center mb-2">
                  <Wand2 className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">AI生成完了</span>
                </div>
                <p className="text-xs text-green-700">
                  工事依頼書の内容からタイトルと説明文を自動生成しました
                </p>
              </div>
            )}
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
          rows={6}
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
          次へ：公開設定
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label>アフター写真</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-reform-blue-400 transition-colors">
          <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">施工後の写真をアップロード（任意）</p>
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
              <Upload className="w-4 h-4 mr-2" />
              ファイルを選択
            </label>
          </Button>
          {formData.afterImages.length > 0 && (
            <p className="text-sm text-reform-blue-600 mt-2">
              {formData.afterImages.length}枚の画像が選択されています
            </p>
          )}
        </div>
      </div>

      <Card className="border-reform-blue-200 bg-reform-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Clock className="w-5 h-5 mr-2 text-reform-blue-600" />
            リマインダー設定
          </CardTitle>
          <CardDescription>
            施工完了予定日にプッシュ通知でアフター写真撮影をお知らせ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="scheduledDate">施工完了予定日</Label>
            <Input
              id="scheduledDate"
              type="date"
              value={formData.scheduledDate}
              onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
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

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg">公開設定</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.publishNow}
                onChange={(e) => handleInputChange('publishNow', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">すぐに公開する（アフター写真必須）</span>
            </label>
            {formData.publishNow && formData.afterImages.length === 0 && (
              <p className="text-sm text-red-600">
                ※ すぐに公開する場合はアフター写真が必要です
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">保存内容</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>カテゴリ:</strong> {formData.category}</p>
          <p><strong>タイトル:</strong> {formData.title}</p>
          <p><strong>施工前写真:</strong> {formData.beforeImages.length}枚</p>
          <p><strong>施工後写真:</strong> {formData.afterImages.length}枚</p>
          {formData.scheduledDate && (
            <p><strong>リマインダー:</strong> {formData.scheduledDate} {formData.reminderTime}</p>
          )}
          <p><strong>公開:</strong> {formData.publishNow ? 'すぐに公開' : '下書き保存'}</p>
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
          disabled={isLoading || (formData.publishNow && formData.afterImages.length === 0)}
          className="flex-1 bg-reform-orange-500 hover:bg-reform-orange-600"
        >
          {isLoading ? "保存中..." : formData.publishNow ? "公開する" : "下書き保存"}
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
