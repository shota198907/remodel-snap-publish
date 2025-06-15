
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Camera, Upload, FileText, Sparkles, ChevronDown, Save, Eye, Heart, Zap } from "lucide-react";
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
  const [publishAccordionOpen, setPublishAccordionOpen] = useState(false);
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
        title: "✨ AI自動生成完了！",
        description: "工事依頼書から魅力的な事例タイトルと内容を生成しました",
      });
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (formData.publishNow && formData.afterImages.length > 0) {
        toast({
          title: "🎉 事例を公開しました！",
          description: "素晴らしい施工事例がポートフォリオに追加されました",
        });
      } else {
        toast({
          title: "💾 下書き保存完了！",
          description: formData.scheduledDate 
            ? `${formData.scheduledDate} ${formData.reminderTime}にリマインダーを設定しました`
            : "アフター写真の準備ができたら公開できます",
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
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Camera className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">始めましょう！</h3>
        <p className="text-gray-600">カテゴリーと施工前の写真をアップロードしてください</p>
      </div>

      <div>
        <Label htmlFor="category" className="text-lg font-semibold text-gray-800">工事カテゴリ *</Label>
        <Select onValueChange={(value) => handleInputChange('category', value)}>
          <SelectTrigger className="mt-2 h-14 text-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
            <SelectValue placeholder="カテゴリを選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="キッチン">🍳 キッチン</SelectItem>
            <SelectItem value="浴室">🛁 浴室</SelectItem>
            <SelectItem value="居室">🏠 居室</SelectItem>
            <SelectItem value="外壁">🏗️ 外壁</SelectItem>
            <SelectItem value="その他">⚡ その他</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-lg font-semibold text-gray-800 mb-3 block">施工前写真 *</Label>
        <div className="relative border-3 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-700 mb-3 font-semibold text-lg">施工前の写真をアップロード</p>
            <p className="text-gray-500 text-sm mb-4">複数枚選択可能 • JPG, PNG対応</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload('beforeImages', e.target.files)}
              className="hidden"
              id="beforeImages"
            />
            <Button asChild variant="default" size="lg" className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
              <label htmlFor="beforeImages" className="cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                写真を選択
              </label>
            </Button>
            {formData.beforeImages.length > 0 && (
              <div className="mt-4 p-3 bg-blue-100 rounded-xl">
                <p className="text-blue-800 font-semibold flex items-center justify-center">
                  <Heart className="w-4 h-4 mr-2" />
                  {formData.beforeImages.length}枚の写真を選択中
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button 
        onClick={() => setStep(2)} 
        className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        disabled={!formData.category || formData.beforeImages.length === 0}
      >
        <Zap className="w-5 h-5 mr-2" />
        次のステップへ
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">AIで楽々作成！</h3>
        <p className="text-gray-600">工事依頼書をアップロードするか、手動で入力してください</p>
      </div>

      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-orange-700">
            <FileText className="w-5 h-5 mr-2" />
            AIスマート生成（推奨）
          </CardTitle>
          <CardDescription className="text-orange-600">
            工事依頼書をアップロードすると、AIが自動でタイトルと説明を生成します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-orange-300 rounded-xl p-6 text-center hover:border-orange-500 hover:bg-orange-100 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-700 mb-3 font-medium">工事依頼書をアップロード</p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload('workOrder', e.target.files)}
              className="hidden"
              id="workOrder"
            />
            <Button asChild variant="outline" size="lg" disabled={isLoading} className="border-2 border-orange-300 hover:bg-orange-100">
              <label htmlFor="workOrder" className="cursor-pointer">
                <Upload className="w-5 h-5 mr-2" />
                {isLoading ? "✨ AI生成中..." : "ファイルを選択"}
              </label>
            </Button>
            {formData.workOrder && (
              <p className="text-orange-700 mt-3 font-medium">
                📄 {formData.workOrder.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-lg font-semibold text-gray-800">事例タイトル *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="魅力的な事例タイトルを入力"
            required
            className="mt-2 h-12 text-lg border-2 border-gray-200 focus:border-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-lg font-semibold text-gray-800">事例説明 *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="施工の詳細や工夫した点を記入してください"
            rows={5}
            required
            className="mt-2 text-lg border-2 border-gray-200 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(1)}
          className="flex-1 h-12 border-2"
        >
          戻る
        </Button>
        <Button 
          onClick={() => setStep(3)} 
          className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={!formData.title || !formData.description}
        >
          <Zap className="w-5 h-5 mr-2" />
          最終ステップへ
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Eye className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">もうすぐ完成！</h3>
        <p className="text-gray-600">アフター写真と公開設定を選択してください</p>
      </div>

      <div>
        <Label className="text-lg font-semibold text-gray-800 mb-3 block">施工後写真（任意）</Label>
        <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:border-green-500 hover:bg-green-50 transition-all duration-300 group">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-700 mb-3 font-medium">施工後の写真をアップロード</p>
          <p className="text-gray-500 text-sm mb-4">工事完了後に追加することも可能です</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload('afterImages', e.target.files)}
            className="hidden"
            id="afterImages"
          />
          <Button asChild variant="outline" size="lg" className="border-2 border-green-300 hover:bg-green-100">
            <label htmlFor="afterImages" className="cursor-pointer">
              <Upload className="w-5 h-5 mr-2" />
              写真を選択
            </label>
          </Button>
          {formData.afterImages.length > 0 && (
            <div className="mt-4 p-3 bg-green-100 rounded-xl">
              <p className="text-green-800 font-semibold flex items-center justify-center">
                <Heart className="w-4 h-4 mr-2" />
                {formData.afterImages.length}枚の写真を選択中
              </p>
            </div>
          )}
        </div>
      </div>

      <Collapsible open={publishAccordionOpen} onOpenChange={setPublishAccordionOpen}>
        <CollapsibleTrigger asChild>
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">すぐに公開する</h3>
                    <p className="text-sm text-gray-600">アフター写真がある場合のみ</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${publishAccordionOpen ? 'rotate-180' : ''}`} />
              </div>
            </CardContent>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <Card className="border border-gray-200">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.publishNow}
                  onChange={(e) => handleInputChange('publishNow', e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-blue-500"
                  id="publishNow"
                />
                <label htmlFor="publishNow" className="font-medium text-gray-800">
                  今すぐポートフォリオに公開
                </label>
              </div>
              {formData.publishNow && formData.afterImages.length === 0 && (
                <div className="p-3 bg-orange-100 rounded-lg">
                  <p className="text-orange-700 text-sm font-medium">
                    ⚠️ 公開にはアフター写真が必要です
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduledDate" className="text-sm font-medium">完了予定日</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                    className="mt-1 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="reminderTime" className="text-sm font-medium">通知時刻</Label>
                  <Input
                    id="reminderTime"
                    type="time"
                    value={formData.reminderTime}
                    onChange={(e) => handleInputChange('reminderTime', e.target.value)}
                    className="mt-1 h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(2)}
          className="flex-1 h-12 border-2"
        >
          戻る
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || (formData.publishNow && formData.afterImages.length === 0)}
          className="flex-1 h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg"
        >
          {isLoading ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              保存中...
            </>
          ) : formData.publishNow ? (
            <>
              <Eye className="w-5 h-5 mr-2" />
              公開する
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              下書き保存
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span>新規事例作成</span>
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            ステップ {step} / 3
          </DialogDescription>
        </DialogHeader>

        {/* プログレスバー */}
        <div className="flex items-center space-x-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= step ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`flex-1 h-2 mx-3 rounded-full ${
                  i < step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
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
