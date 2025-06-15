
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CompanyRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const CompanyRegistrationModal = ({ isOpen, onClose, onLoginClick }: CompanyRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    website: '',
    businessType: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // バリデーション
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "エラー",
        description: "パスワードが一致しません",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // 登録処理のシミュレーション
    setTimeout(() => {
      toast({
        title: "登録完了",
        description: `${formData.companyName} の登録が完了しました`,
      });
      onClose();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">企業アカウント新規登録</DialogTitle>
          <DialogDescription className="text-center">
            リフォーム事例を投稿するための企業アカウントを作成します
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">会社名 *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="株式会社リフォーム"
                required
              />
            </div>
            <div>
              <Label htmlFor="contactName">担当者名 *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                placeholder="山田太郎"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">メールアドレス *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="info@company.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password">パスワード *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="8文字以上"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">パスワード確認 *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="パスワードを再入力"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="03-1234-5678"
              />
            </div>
            <div>
              <Label htmlFor="businessType">事業種別</Label>
              <Select onValueChange={(value) => handleInputChange('businessType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">総合リフォーム</SelectItem>
                  <SelectItem value="kitchen">キッチン専門</SelectItem>
                  <SelectItem value="bathroom">浴室専門</SelectItem>
                  <SelectItem value="exterior">外装専門</SelectItem>
                  <SelectItem value="interior">内装専門</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">所在地</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="東京都渋谷区..."
            />
          </div>

          <div>
            <Label htmlFor="website">ウェブサイト</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://www.company.com"
            />
          </div>

          <div>
            <Label htmlFor="description">会社概要</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="会社の特徴やサービス内容をご記入ください"
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-reform-orange-500 hover:bg-reform-orange-600" 
            disabled={isLoading}
          >
            {isLoading ? "登録中..." : "アカウントを作成"}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            既にアカウントをお持ちの方は{" "}
            <button
              onClick={onLoginClick}
              className="text-reform-blue-500 hover:underline font-medium"
            >
              ログイン
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyRegistrationModal;
