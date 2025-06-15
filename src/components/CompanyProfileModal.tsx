
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Building, MapPin, Phone, Mail, Globe, Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompanyProfileModal = ({ isOpen, onClose }: CompanyProfileModalProps) => {
  const [companyData, setCompanyData] = useState({
    name: '株式会社リフォームプロ',
    description: '創業30年の信頼と実績。お客様の理想の住まいづくりをサポートします。確かな技術力と豊富な経験で、満足度の高いリフォームをご提供いたします。',
    address: '東京都渋谷区神宮前1-1-1',
    phone: '03-1234-5678',
    email: 'info@reform-pro.com',
    website: 'https://reform-pro.com',
    logo: null as File | null,
    establishedYear: '1993',
    employees: '25',
    certifications: '建設業許可番号：東京都知事許可（般-XX）第XXXXX号'
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setCompanyData(prev => ({
      ...prev,
      logo: files[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "会社情報を更新しました",
      description: "公開ページに反映されます",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>会社情報設定</span>
          </DialogTitle>
          <DialogDescription>
            事例公開ページに表示される会社情報を設定できます
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <Label>会社ロゴ</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">会社ロゴをアップロード</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLogoUpload(e.target.files)}
                      className="hidden"
                      id="logo"
                    />
                    <Button asChild variant="outline" size="sm" type="button">
                      <label htmlFor="logo" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        画像を選択
                      </label>
                    </Button>
                    {companyData.logo && (
                      <p className="text-sm text-blue-600 mt-2">
                        {companyData.logo.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">会社名 *</Label>
                  <Input
                    id="name"
                    value={companyData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">会社紹介</Label>
                  <Textarea
                    id="description"
                    value={companyData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="mt-1 min-h-[100px]"
                    placeholder="会社の特徴や強みを記入"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address" className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                所在地
              </Label>
              <Input
                id="address"
                value={companyData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                電話番号
              </Label>
              <Input
                id="phone"
                value={companyData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                メールアドレス
              </Label>
              <Input
                id="email"
                type="email"
                value={companyData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="website" className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                ウェブサイト
              </Label>
              <Input
                id="website"
                value={companyData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="mt-1"
                placeholder="https://"
              />
            </div>

            <div>
              <Label htmlFor="establishedYear">設立年</Label>
              <Input
                id="establishedYear"
                value={companyData.establishedYear}
                onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="employees">従業員数</Label>
              <Input
                id="employees"
                value={companyData.employees}
                onChange={(e) => handleInputChange('employees', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="certifications">資格・許可</Label>
            <Textarea
              id="certifications"
              value={companyData.certifications}
              onChange={(e) => handleInputChange('certifications', e.target.value)}
              className="mt-1"
              placeholder="建設業許可番号や資格情報"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              キャンセル
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyProfileModal;
