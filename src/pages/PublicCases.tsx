
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Camera, Calendar, User, Search, MapPin, Clock, Star, Award, TrendingUp } from "lucide-react";
import { Case } from "@/types/case";

const PublicCases = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 公開済み事例のサンプルデータ
  const publishedCases: Case[] = [
    {
      id: 1,
      title: "キッチン全面リフォーム：機能性とデザイン性を両立",
      company: "東京リフォーム株式会社",
      location: "東京都世田谷区",
      category: "キッチン",
      beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=600&h=400&fit=crop",
      description: "築30年のマンションキッチンを最新設備で一新。収納力アップと清掃性を重視した設計。人工大理石のカウンタートップと最新のIHクッキングヒーターを導入し、機能性と美しさを両立させました。お客様のライフスタイルに合わせた収納計画で、作業効率が大幅に向上しています。",
      workPeriod: "5日間",
      status: "published",
      createdAt: "2024-01-15",
      publishedAt: "2024-01-20"
    },
    {
      id: 2,
      title: "和室から洋室への大変身：モダンリビング空間",
      company: "関西建築工房",
      location: "大阪府大阪市",
      category: "居室",
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      description: "伝統的な和室を現代的な洋室に変更。フローリング・クロス・照明すべて新調。開放感のある空間設計で、家族団らんの場を演出しました。自然光を最大限活用した明るい住空間に生まれ変わりました。",
      workPeriod: "7日間",
      status: "published",
      createdAt: "2024-01-10",
      publishedAt: "2024-01-15"
    },
    {
      id: 3,
      title: "バリアフリー浴室リフォーム：安全性と快適性を追求",
      company: "九州住宅改修センター",
      location: "福岡県福岡市",
      category: "浴室",
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop",
      description: "高齢者対応のバリアフリー浴室。手すり・段差解消・滑り止め加工を施工。安全性を最優先に、毎日の入浴が楽しみになる空間を実現しました。温度調節機能付きシャワーで快適なバスタイムをお過ごしいただけます。",
      workPeriod: "4日間",
      status: "published",
      createdAt: "2024-01-08",
      publishedAt: "2024-01-12"
    },
    {
      id: 4,
      title: "外壁塗装で住まいを一新：耐久性とデザイン性を向上",
      company: "東京リフォーム株式会社",
      location: "東京都杉並区",
      category: "外壁",
      beforeImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5cc0?w=600&h=400&fit=crop",
      description: "経年劣化した外壁を高耐久塗料で塗装。色合いも一新し、住まいの印象を大きく変えました。防水性能も大幅に向上させています。15年保証の安心施工で、長期的な美観維持を実現いたします。",
      workPeriod: "10日間",
      status: "published",
      createdAt: "2024-01-05",
      publishedAt: "2024-01-18"
    },
    {
      id: 5,
      title: "トイレ空間の完全リニューアル：清潔感あふれる快適空間",
      company: "関西建築工房",
      location: "京都府京都市",
      category: "浴室",
      beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1584622781564-1d987fc7c6d3?w=600&h=400&fit=crop",
      description: "古いトイレを最新設備でリニューアル。タンクレス便器とウォシュレット機能で、清潔で快適な空間に生まれ変わりました。収納も充実し、日用品をすっきりと整理できます。",
      workPeriod: "2日間",
      status: "published",
      createdAt: "2024-01-12",
      publishedAt: "2024-01-16"
    },
    {
      id: 6,
      title: "玄関エントランスの印象アップリフォーム",
      company: "九州住宅改修センター",
      location: "福岡県北九州市",
      category: "その他",
      beforeImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&h=400&fit=crop",
      description: "玄関タイルの張り替えと照明の更新により、来客時の第一印象を大幅に向上。防滑性の高いタイルで安全性も確保しました。LED照明で明るく迎える玄関空間を実現いたします。",
      workPeriod: "3日間",
      status: "published",
      createdAt: "2024-01-03",
      publishedAt: "2024-01-08"
    }
  ];

  const filteredCases = publishedCases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["すべて", "キッチン", "浴室", "居室", "外壁", "その他"];
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const categoryFilteredCases = selectedCategory === "すべて" 
    ? filteredCases 
    : filteredCases.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              リフォーム事例
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                ポートフォリオ
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              プロの技術で理想の住まいを実現<br className="hidden sm:block" />
              実際の施工事例をご覧ください
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-300" />
                <span>確かな施工実績</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>お客様満足度98%</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-yellow-300" />
                <span>リピート率85%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ナビゲーションバー */}
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">ReformCases</h2>
                <p className="text-xs text-gray-500">施工事例ポータル</p>
              </div>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              ホームに戻る
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* 統計情報カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">公開事例数</p>
                  <p className="text-3xl font-bold">{publishedCases.length}</p>
                  <p className="text-blue-100 text-xs mt-1">件の実績</p>
                </div>
                <Camera className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">施工業者数</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-purple-100 text-xs mt-1">社のパートナー</p>
                </div>
                <User className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">累計工期</p>
                  <p className="text-3xl font-bold">31</p>
                  <p className="text-orange-100 text-xs mt-1">日間の実績</p>
                </div>
                <Clock className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 検索とフィルター */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="事例を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg border-gray-200 focus:border-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 事例一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryFilteredCases.map((caseItem) => (
            <Card key={caseItem.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg">
              <div className="relative">
                <div className="grid grid-cols-2 h-56">
                  <div className="relative overflow-hidden">
                    <img 
                      src={caseItem.beforeImage} 
                      alt="施工前" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs font-semibold bg-white/90 text-gray-700">施工前</Badge>
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <img 
                      src={caseItem.afterImage!} 
                      alt="施工後" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <Badge className="text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 border-0">施工後</Badge>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 font-semibold">
                    {caseItem.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {caseItem.title}
                </CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center font-medium">
                    <User className="w-4 h-4 mr-1" />
                    {caseItem.company}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {caseItem.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <span className="flex items-center font-medium">
                    <Calendar className="w-3 h-3 mr-1" />
                    工期: {caseItem.workPeriod}
                  </span>
                  <span className="flex items-center font-medium">
                    <MapPin className="w-3 h-3 mr-1" />
                    {caseItem.location}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {categoryFilteredCases.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">事例が見つかりませんでした</h3>
            <p className="text-gray-500">検索条件を変更してお試しください。</p>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">ReformCases</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                リフォーム事例を通じて、お客様の理想の住まいづくりをサポートします。
                確かな技術と豊富な実績で、安心のリフォームをご提供いたします。
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  お客様満足度98%
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">サービス</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>キッチンリフォーム</li>
                <li>バスルームリフォーム</li>
                <li>居室リフォーム</li>
                <li>外壁塗装</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">お問い合わせ</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>📞 0120-XXX-XXX</p>
                <p>📧 info@reformcases.com</p>
                <p>🕒 平日 9:00-18:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 ReformCases. All rights reserved. | リフォーム事例ポータル</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicCases;
