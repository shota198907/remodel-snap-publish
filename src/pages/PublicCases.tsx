
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Camera, Search, MapPin, Phone, Mail, Globe, Award, Star, Users, CheckCircle, ArrowRight, Building, Heart, Eye } from "lucide-react";
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
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
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
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop",
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
      beforeImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5cc0?w=600&h=400&fit=crop",
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

  const categories = ["すべて", "キッチン", "浴室", "居室", "外壁", "その他"];
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const categoryFilteredCases = selectedCategory === "すべて" 
    ? filteredCases 
    : filteredCases.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <Building className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              株式会社リフォームプロ
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              創業30年の信頼と実績。お客様の理想の住まいづくりをサポートします
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <h3 className="font-semibold text-sm mb-1">創業30年の実績</h3>
                <p className="text-blue-100 text-xs">長年培った技術と信頼</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <h3 className="font-semibold text-sm mb-1">満足度98%</h3>
                <p className="text-blue-100 text-xs">お客様第一の施工品質</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-sm mb-1">アフター保証</h3>
                <p className="text-blue-100 text-xs">工事後も安心のサポート</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <MapPin className="w-3 h-3" />
                <span>東京都渋谷区</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <Phone className="w-3 h-3" />
                <span>03-1234-5678</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <Mail className="w-3 h-3" />
                <span>info@reform-pro.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <Users className="w-3 h-3" />
                <span>従業員数25名</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ナビゲーション */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-slate-700 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm">施工事例ポートフォリオ</h2>
                <p className="text-xs text-gray-500">株式会社リフォームプロ</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">お問い合わせ</span>
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Globe className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">公式サイト</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* 統計情報 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Camera className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <p className="text-xl font-bold">{publishedCases.length}</p>
              <p className="text-blue-100 text-xs">施工事例</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 mx-auto mb-2 text-green-200" />
              <p className="text-xl font-bold">98%</p>
              <p className="text-green-100 text-xs">お客様満足度</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-200" />
              <p className="text-xl font-bold">30</p>
              <p className="text-purple-100 text-xs">年の実績</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-orange-200" />
              <p className="text-xl font-bold">25</p>
              <p className="text-orange-100 text-xs">名のプロ職人</p>
            </CardContent>
          </Card>
        </div>

        {/* 検索とフィルター */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="施工事例を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm bg-white"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className={`rounded-full px-4 py-2 ${
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 事例一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryFilteredCases.map((caseItem) => (
            <Card key={caseItem.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg bg-white rounded-xl">
              <div className="relative">
                <div className="grid grid-cols-2 h-48">
                  <div className="relative overflow-hidden">
                    <img 
                      src={caseItem.beforeImage} 
                      alt="施工前" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="text-xs font-semibold bg-gray-800/80 text-white border-0">
                        BEFORE
                      </Badge>
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <img 
                      src={caseItem.afterImage!} 
                      alt="施工後" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-green-500 border-0">
                        AFTER
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-slate-700 to-blue-700 text-white border-0 font-semibold px-2 py-1 text-xs">
                    {caseItem.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-5">
                <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {caseItem.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3 leading-relaxed">
                  {caseItem.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center font-medium">
                    <MapPin className="w-3 h-3 mr-1" />
                    {caseItem.location}
                  </span>
                  <span className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      245
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      18
                    </span>
                  </span>
                </div>
                
                <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all rounded-lg">
                  詳細を見る
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {categoryFilteredCases.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">該当する事例が見つかりませんでした</h3>
            <p className="text-gray-500 mb-4">検索条件を変更してお試しください</p>
            <Button onClick={() => {setSearchTerm(''); setSelectedCategory('すべて');}}>
              すべての事例を表示
            </Button>
          </div>
        )}
      </main>

      {/* CTA セクション */}
      <section className="bg-gradient-to-r from-blue-600 to-slate-700 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            理想のリフォームを始めませんか？
          </h2>
          <p className="text-lg mb-6 text-blue-100 max-w-2xl mx-auto">
            30年の実績と確かな技術で、あなたの住まいを理想の空間に変えます
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3">
              <Phone className="w-5 h-5 mr-2" />
              今すぐお電話
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3">
              <Mail className="w-5 h-5 mr-2" />
              メールで相談
            </Button>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-slate-600 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-bold">株式会社リフォームプロ</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                創業30年の信頼と実績。お客様の理想の住まいづくりをサポートします
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">サービス一覧</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>キッチンリフォーム</li>
                <li>バスルームリフォーム</li>
                <li>居室リフォーム</li>
                <li>外壁塗装・修繕</li>
                <li>バリアフリー工事</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">お問い合わせ</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-blue-400" />
                  <span>03-1234-5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  <span>info@reform-pro.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                  <span>東京都渋谷区神宮前1-1-1</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>© 2024 株式会社リフォームプロ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicCases;
