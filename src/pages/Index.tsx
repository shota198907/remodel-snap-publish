
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Clock, Calendar, User, MessageCircle, Image, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import LoginModal from '@/components/LoginModal';
import CompanyRegistrationModal from '@/components/CompanyRegistrationModal';
import CaseUploadModal from '@/components/CaseUploadModal';

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // サンプル事例データ
  const sampleCases = [
    {
      id: 1,
      title: "キッチン全面リフォーム：機能性とデザイン性を両立",
      company: "東京リフォーム株式会社",
      location: "東京都世田谷区",
      category: "キッチン",
      beforeImage: "/placeholder.svg",
      afterImage: "/placeholder.svg",
      description: "築30年のマンションキッチンを最新設備で一新。収納力アップと清掃性を重視した設計。",
      workPeriod: "5日間",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "和室から洋室への大変身：モダンリビング空間",
      company: "関西建築工房",
      location: "大阪府大阪市",
      category: "居室",
      beforeImage: "/placeholder.svg",
      afterImage: "/placeholder.svg",
      description: "伝統的な和室を現代的な洋室に変更。フローリング・クロス・照明すべて新調。",
      workPeriod: "7日間",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      title: "バリアフリー浴室リフォーム：安全性と快適性を追求",
      company: "九州住宅改修センター",
      location: "福岡県福岡市",
      category: "浴室",
      beforeImage: "/placeholder.svg",
      afterImage: "/placeholder.svg",
      description: "高齢者対応のバリアフリー浴室。手すり・段差解消・滑り止め加工を施工。",
      workPeriod: "4日間",
      createdAt: "2024-01-08"
    }
  ];

  const filteredCases = sampleCases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegisterClick = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleLoginClick = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-reform-blue-50 to-reform-orange-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-reform-blue-500 to-reform-orange-500 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ReformCases</h1>
                <p className="text-xs text-gray-500">リフォーム事例ポータル</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsLoginOpen(true)}
                className="hidden sm:inline-flex"
              >
                ログイン
              </Button>
              <Button 
                onClick={() => setIsRegisterOpen(true)}
                className="bg-reform-blue-500 hover:bg-reform-blue-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                新規登録
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        {/* ヒーローセクション */}
        <section className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              現場写真から
              <span className="bg-gradient-to-r from-reform-blue-500 to-reform-orange-500 bg-clip-text text-transparent">
                AI自動生成
              </span>
              <br />
              リフォーム事例をかんたん公開
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              写真を撮るだけで、AIが事例タイトルと内容を自動生成。<br />
              プッシュ通知でアフター写真撮影忘れを防止。ワンクリックでSNS投稿も完了。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                onClick={() => setIsUploadOpen(true)}
                className="bg-reform-orange-500 hover:bg-reform-orange-600 text-white px-8 py-3 text-lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                事例を投稿する
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setIsRegisterOpen(true)}
                className="px-8 py-3 text-lg"
              >
                無料で始める
              </Button>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">システムの特徴</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-reform-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-reform-blue-600" />
                </div>
                <CardTitle className="text-lg">AI自動生成</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  現場写真と工事依頼書をアップロードするだけで、AIが事例タイトルと内容を自動生成
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-reform-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-reform-orange-600" />
                </div>
                <CardTitle className="text-lg">プッシュ通知</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  施工完了予定日にプッシュ通知でアフター写真撮影をリマインド
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-reform-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-reform-blue-600" />
                </div>
                <CardTitle className="text-lg">SNS連携</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  事例公開と同時にX（Twitter）、Instagramへワンクリック投稿
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 事例検索・一覧セクション */}
        <section>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <h3 className="text-2xl font-bold mb-4 sm:mb-0">最新のリフォーム事例</h3>
            <div className="w-full sm:w-auto">
              <Input
                placeholder="事例を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseItem) => (
              <Card key={caseItem.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <div className="grid grid-cols-2 h-48">
                    <div className="relative overflow-hidden">
                      <img 
                        src={caseItem.beforeImage} 
                        alt="施工前" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs">施工前</Badge>
                      </div>
                    </div>
                    <div className="relative overflow-hidden">
                      <img 
                        src={caseItem.afterImage} 
                        alt="施工後" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="text-xs bg-reform-orange-500">施工後</Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-reform-blue-500">
                    {caseItem.category}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-reform-blue-600 transition-colors">
                    {caseItem.title}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {caseItem.company}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {caseItem.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      工期: {caseItem.workPeriod}
                    </span>
                    <span>{caseItem.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">検索条件に一致する事例が見つかりませんでした。</p>
            </div>
          )}
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-reform-blue-500 to-reform-orange-500 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">ReformCases</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 ReformCases. All rights reserved. | リフォーム事例ポータル
          </p>
        </div>
      </footer>

      {/* モーダル */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onRegisterClick={handleRegisterClick}
        onLoginSuccess={handleLoginSuccess}
      />
      <CompanyRegistrationModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onLoginClick={handleLoginClick}
        onRegisterSuccess={handleLoginSuccess}
      />
      <CaseUploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
};

export default Index;
