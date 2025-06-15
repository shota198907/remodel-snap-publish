
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, MapPin, Calendar, Eye, Heart, Phone, Mail, Star } from "lucide-react";

const CaseDetailPortal = () => {
  const { id } = useParams();

  // Sample case data (in real app, this would be fetched based on ID)
  const caseDetail = {
    id: 1,
    title: "キッチンリフォーム - モダンスタイル",
    company: "株式会社山田工務店",
    location: "東京都渋谷区",
    category: "キッチン",
    beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=800&h=600&fit=crop",
    description: "システムキッチンを最新のモダンスタイルに一新。作業効率と収納力が大幅に向上しました。お客様のライフスタイルに合わせたオーダーメイドの収納システムを導入し、使い勝手を大幅に改善いたしました。",
    fullDescription: "築15年のマンションのキッチンを全面リフォーム。古いシステムキッチンを撤去し、最新のL字型システムキッチンを設置しました。カウンタートップには人造大理石を使用し、高級感のある仕上がりになりました。収納は引き出し式を多用し、奥の物まで取り出しやすい設計にしています。また、食器洗い乾燥機やIHクッキングヒーターなど最新設備も導入し、快適なキッチンライフを実現しました。",
    views: 245,
    likes: 18,
    completedDate: "2024-01-15",
    workPeriod: "7日間",
    cost: "150万円〜200万円",
    companyInfo: {
      name: "株式会社山田工務店",
      rating: 4.8,
      reviewCount: 127,
      phone: "03-1234-5678",
      email: "info@yamada-koumuten.co.jp",
      address: "東京都渋谷区渋谷1-1-1",
      specialties: ["総合リフォーム", "キッチン", "バスルーム"]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/portal">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>一覧に戻る</span>
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">施工事例詳細</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Info Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              {/* Images Section */}
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <img src={caseDetail.beforeImage} alt="施工前" className="w-full h-64 md:h-80 object-cover" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-gray-800/80 text-white border-0">
                      施工前
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <img src={caseDetail.afterImage} alt="施工後" className="w-full h-64 md:h-80 object-cover" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-green-600 border-0">
                      施工後
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-600 text-white border-0">
                        {caseDetail.category}
                      </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {caseDetail.title}
                    </h1>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {caseDetail.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 border-t pt-4">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{caseDetail.views} views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{caseDetail.likes} likes</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>完成: {caseDetail.completedDate}</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">施工情報</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">工事期間</span>
                    <span className="font-medium">{caseDetail.workPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">費用目安</span>
                    <span className="font-medium">{caseDetail.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">所在地</span>
                    <span className="font-medium">{caseDetail.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">完成日</span>
                    <span className="font-medium">{caseDetail.completedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">施工会社情報</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-blue-600 mb-2">{caseDetail.companyInfo.name}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {caseDetail.companyInfo.rating} ({caseDetail.companyInfo.reviewCount}件)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {caseDetail.companyInfo.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{caseDetail.companyInfo.address}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      電話
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="w-4 h-4 mr-1" />
                      メール
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                同様のリフォームをお考えですか？
              </h3>
              <p className="text-gray-600 mb-6">
                {caseDetail.companyInfo.name}に直接お問い合わせいただけます
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Phone className="w-5 h-5 mr-2" />
                  電話で問い合わせ
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  メールで問い合わせ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CaseDetailPortal;
