
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Camera, Calendar, User, Search, MapPin, Clock } from "lucide-react";
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
      beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=400&h=300&fit=crop",
      description: "築30年のマンションキッチンを最新設備で一新。収納力アップと清掃性を重視した設計。人工大理石のカウンタートップと最新のIHクッキングヒーターを導入し、機能性と美しさを両立させました。",
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
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      description: "伝統的な和室を現代的な洋室に変更。フローリング・クロス・照明すべて新調。開放感のある空間設計で、家族団らんの場を演出しました。",
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
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop",
      description: "高齢者対応のバリアフリー浴室。手すり・段差解消・滑り止め加工を施工。安全性を最優先に、毎日の入浴が楽しみになる空間を実現しました。",
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
      beforeImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5cc0?w=400&h=300&fit=crop",
      description: "経年劣化した外壁を高耐久塗料で塗装。色合いも一新し、住まいの印象を大きく変えました。防水性能も大幅に向上させています。",
      workPeriod: "10日間",
      status: "published",
      createdAt: "2024-01-05",
      publishedAt: "2024-01-18"
    }
  ];

  const filteredCases = publishedCases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                onClick={() => window.location.href = '/'}
                variant="outline"
              >
                ホームに戻る
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
              リフォーム事例
              <span className="bg-gradient-to-r from-reform-blue-500 to-reform-orange-500 bg-clip-text text-transparent">
                ポートフォリオ
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              実際のリフォーム事例をご覧いただけます。<br />
              お客様のご要望に合わせた施工実績を多数掲載しています。
            </p>
          </div>
        </section>

        {/* 統計情報 */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">公開事例数</p>
                  <p className="text-2xl font-bold text-reform-blue-600">{publishedCases.length}</p>
                </div>
                <Camera className="w-8 h-8 text-reform-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">施工業者数</p>
                  <p className="text-2xl font-bold text-reform-orange-600">3</p>
                </div>
                <User className="w-8 h-8 text-reform-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">累計工期</p>
                  <p className="text-2xl font-bold text-green-600">26日間</p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 検索 */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="事例を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* 事例一覧 */}
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
                      src={caseItem.afterImage!} 
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
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {caseItem.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    工期: {caseItem.workPeriod}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {caseItem.location}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">検索条件に一致する事例が見つかりませんでした。</p>
          </div>
        )}
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
    </div>
  );
};

export default PublicCases;
