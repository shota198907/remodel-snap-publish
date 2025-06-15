
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Camera, Search, MapPin, Phone, Mail, Globe, Award, Star, Users, CheckCircle, ArrowRight, Building } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* ヒーローセクション - 会社紹介 */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* 会社ロゴ/名前 */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <Building className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              株式会社リフォームプロ
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              創業30年の信頼と実績。お客様の理想の住まいづくりをサポートします。
              確かな技術力と豊富な経験で、満足度の高いリフォームをご提供いたします。
            </p>

            {/* 会社の強み */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">創業30年の実績</h3>
                <p className="text-blue-100 text-sm">長年培った技術と信頼</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">満足度98%</h3>
                <p className="text-blue-100 text-sm">お客様第一の施工品質</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">アフター保証</h3>
                <p className="text-blue-100 text-sm">工事後も安心のサポート</p>
              </div>
            </div>

            {/* 会社情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <MapPin className="w-4 h-4" />
                <span>東京都渋谷区神宮前1-1-1</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <Phone className="w-4 h-4" />
                <span>03-1234-5678</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <Mail className="w-4 h-4" />
                <span>info@reform-pro.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <Users className="w-4 h-4" />
                <span>従業員数25名</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ナビゲーション */}
      <nav className="bg-white shadow-lg sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-slate-700 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">施工事例ポートフォリオ</h2>
                <p className="text-xs text-gray-500">株式会社リフォームプロ</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">お問い合わせ</span>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Globe className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">公式サイト</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {/* 統計情報 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Camera className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <p className="text-2xl font-bold">{publishedCases.length}</p>
              <p className="text-blue-100 text-sm">施工事例</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-3 text-green-200" />
              <p className="text-2xl font-bold">98%</p>
              <p className="text-green-100 text-sm">お客様満足度</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-3 text-purple-200" />
              <p className="text-2xl font-bold">30</p>
              <p className="text-purple-100 text-sm">年の実績</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-orange-200" />
              <p className="text-2xl font-bold">25</p>
              <p className="text-orange-100 text-sm">名のプロ職人</p>
            </CardContent>
          </Card>
        </div>

        {/* 検索とフィルター */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="施工事例を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 ${
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
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
            <Card key={caseItem.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg bg-white">
              <div className="relative">
                <div className="grid grid-cols-2 h-64">
                  <div className="relative overflow-hidden">
                    <img 
                      src={caseItem.beforeImage} 
                      alt="施工前" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="text-xs font-semibold bg-white/90 text-gray-700">
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
                    <div className="absolute bottom-3 left-3">
                      <Badge className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-green-500 border-0">
                        AFTER
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-slate-700 to-blue-700 text-white border-0 font-semibold px-3 py-1">
                    {caseItem.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {caseItem.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {caseItem.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <span className="font-medium">
                    工期: {caseItem.workPeriod}
                  </span>
                  <span className="flex items-center font-medium">
                    <MapPin className="w-3 h-3 mr-1" />
                    {caseItem.location}
                  </span>
                </div>
                <Button variant="outline" className="w-full mt-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  詳細を見る
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {categoryFilteredCases.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">該当する事例が見つかりませんでした</h3>
            <p className="text-gray-500 mb-6">検索条件を変更してお試しください。</p>
            <Button onClick={() => {setSearchTerm(''); setSelectedCategory('すべて');}}>
              すべての事例を表示
            </Button>
          </div>
        )}
      </main>

      {/* CTA セクション */}
      <section className="bg-gradient-to-r from-blue-600 to-slate-700 text-white py-20 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            理想のリフォームを始めませんか？
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            30年の実績と確かな技術で、あなたの住まいを理想の空間に変えます。
            無料相談・お見積もりは随時承っております。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              今すぐお電話
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              <Mail className="w-5 h-5 mr-2" />
              メールで相談
            </Button>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-slate-600 rounded-lg flex items-center justify-center">
                  <Building className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold">株式会社リフォームプロ</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                創業30年の信頼と実績。お客様の理想の住まいづくりをサポートします。
                確かな技術力と豊富な経験で、満足度の高いリフォームをご提供いたします。
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>建設業許可番号：東京都知事許可（般-XX）第XXXXX号</p>
                <p>設立：1993年 | 従業員数：25名</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">サービス一覧</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                  キッチンリフォーム
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                  バスルームリフォーム
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                  居室リフォーム
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                  外壁塗装・修繕
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                  バリアフリー工事
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">お問い合わせ</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">本社</p>
                    <p>東京都渋谷区神宮前1-1-1</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">お電話</p>
                    <p>03-1234-5678</p>
                    <p className="text-xs">平日 9:00-18:00</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">メール</p>
                    <p>info@reform-pro.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 株式会社リフォームプロ. All rights reserved. | プライバシーポリシー | 利用規約</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicCases;
