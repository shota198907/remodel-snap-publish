
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Building, Star, MapPin, Phone, Mail, Camera, Users, Award, ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const Portal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('すべて');

  // サンプルリフォーム事例データ
  const reformCases = [
    {
      id: 1,
      title: "キッチンリフォーム - モダンスタイル",
      company: "株式会社山田工務店",
      location: "東京都渋谷区",
      category: "キッチン",
      beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=600&h=400&fit=crop",
      description: "システムキッチンを最新のモダンスタイルに一新。作業効率と収納力が大幅に向上しました。",
      views: 245,
      likes: 18,
      completedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "L字型キッチンの設置",
      company: "田中リフォーム",
      location: "大阪府大阪市",
      category: "キッチン",
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      description: "限られたスペースを有効活用したL字型キッチンの設置事例です。収納力と作業効率を両立。",
      views: 156,
      likes: 12,
      completedDate: "2024-01-10"
    },
    {
      id: 3,
      title: "バスルーム全面改装",
      company: "株式会社山田工務店",
      location: "東京都渋谷区",
      category: "バスルーム",
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop",
      description: "古いユニットバスを最新式に、最新の設備を導入し、快適なバスタイムを実現しました。",
      views: 189,
      likes: 15,
      completedDate: "2024-01-08"
    }
  ];

  // サンプル施工会社データ
  const companies = [
    {
      id: 1,
      name: "株式会社山田工務店",
      rating: 4.8,
      reviewCount: 127,
      description: "創業50年の信頼と実績。お客様の理想の住まいづくりをサポートします。",
      specialties: ["総合リフォーム", "キッチン", "バスルーム"],
      location: "東京都渋谷区",
      caseCount: 45,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "田中リフォーム",
      rating: 4.6,
      reviewCount: 89,
      description: "キッチンリフォーム専門店。最新設備で快適なキッチンライフをご提案します。",
      specialties: ["キッチンリフォーム", "システムキッチン"],
      location: "大阪府大阪市",
      caseCount: 32,
      image: "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "佐藤建設",
      rating: 4.7,
      reviewCount: 156,
      description: "外装リフォームのプロフェッショナル。美しく長持ちする外壁・屋根工事を行います。",
      specialties: ["外装リフォーム", "外壁塗装", "屋根工事"],
      location: "愛知県名古屋市",
      caseCount: 67,
      image: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5cc0?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "鈴木住宅設備",
      rating: 4.5,
      reviewCount: 73,
      description: "水回りリフォームの専門家。快適で機能的な水回り空間を提供します。",
      specialties: ["バスルーム", "トイレ", "洗面所"],
      location: "神奈川県横浜市",
      caseCount: 28,
      image: "https://images.unsplash.com/photo-1584622781564-1d987fc7c6d3?w=400&h=300&fit=crop"
    }
  ];

  const categories = ["すべて", "キッチン", "バスルーム", "リビング", "外装", "内装"];

  const filteredCases = reformCases.filter(caseItem =>
    (selectedCategory === "すべて" || caseItem.category === selectedCategory) &&
    (caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     caseItem.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
     caseItem.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60"></div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              信頼できる施工会社を探す
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
              全国の優良リフォーム会社から、あなたにぴったりの会社を見つけましょう
            </p>
            
            {/* 検索バー */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  placeholder="会社名・地域で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 h-14 text-lg border-0 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg focus:ring-2 focus:ring-white/50"
                />
                <Button className="absolute right-2 top-2 h-10 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg">
                  検索
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="cases" className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-2 h-12 bg-white shadow-sm border">
              <TabsTrigger value="cases" className="flex items-center space-x-2 text-base">
                <Camera className="w-5 h-5" />
                <span>施工事例一覧</span>
              </TabsTrigger>
              <TabsTrigger value="companies" className="flex items-center space-x-2 text-base">
                <Building className="w-5 h-5" />
                <span>施工会社一覧</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-gray-600">
              <span className="font-medium">6件</span>の事例が見つかりました
            </div>
          </div>

          <TabsContent value="cases" className="space-y-6">
            {/* カテゴリフィルター */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  className={`rounded-full ${
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* 事例一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCases.map((caseItem) => (
                <Card key={caseItem.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md bg-white">
                  <div className="relative">
                    <div className="grid grid-cols-2 h-48">
                      <div className="relative">
                        <img src={caseItem.beforeImage} alt="施工前" className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="secondary" className="text-xs bg-gray-800/80 text-white border-0">
                            施工前
                          </Badge>
                        </div>
                      </div>
                      <div className="relative">
                        <img src={caseItem.afterImage} alt="施工後" className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 left-2">
                          <Badge className="text-xs bg-green-600 border-0">
                            施工後
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-600 text-white border-0 font-medium">
                        {caseItem.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {caseItem.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="flex items-center font-medium">
                        <Building className="w-4 h-4 mr-1" />
                        {caseItem.company}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {caseItem.location}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Camera className="w-3 h-3 mr-1" />
                          {caseItem.views}
                        </span>
                        <span className="flex items-center">
                          ♥ {caseItem.likes}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                        詳細を見る
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <div className="text-sm text-gray-600 mb-6">
              <span className="font-medium">4社</span>が見つかりました
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <Card key={company.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-md bg-white">
                  <div className="h-40 relative">
                    <img src={company.image} alt={company.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                        {company.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {company.rating} ({company.reviewCount}件)
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {company.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {company.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {company.location}
                      </span>
                      <span className="flex items-center">
                        <Camera className="w-4 h-4 mr-1" />
                        {company.caseCount}件の施工事例
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="w-4 h-4 mr-1" />
                        電話
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-1" />
                        メール
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        詳細を見る
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* ページネーション */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              前へ
            </Button>
            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              次へ
            </Button>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">リフォームポータル</h3>
              <p className="text-gray-400 text-sm">
                全国の優良リフォーム会社と施工事例をご紹介
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">サービス</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/portal" className="hover:text-white transition-colors">事例検索</Link></li>
                <li><Link to="/portal" className="hover:text-white transition-colors">会社検索</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">事例投稿</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">カテゴリ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>キッチン</li>
                <li>バスルーム</li>
                <li>リビング</li>
                <li>外装</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">お問い合わせ</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>support@reform-portal.com</p>
                <p>03-1234-5678</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 リフォームポータル. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portal;
