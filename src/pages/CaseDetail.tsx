
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Clock, Calendar, User, MessageCircle, ArrowLeft } from "lucide-react";

const CaseDetail = () => {
  const { id } = useParams();
  
  // サンプルデータ（実際はAPIから取得）
  const caseData = {
    id: 1,
    title: "キッチン全面リフォーム：機能性とデザイン性を両立",
    company: "東京リフォーム株式会社",
    location: "東京都世田谷区",
    category: "キッチン",
    beforeImages: ["/placeholder.svg", "/placeholder.svg"],
    afterImages: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "築30年のマンションキッチンを最新設備で一新。収納力アップと清掃性を重視した設計。お客様のライフスタイルに合わせて、アイランドキッチンを導入し、家族のコミュニケーションが生まれる空間を実現しました。",
    workPeriod: "5日間",
    budget: "150万円〜200万円",
    materials: ["システムキッチン", "人工大理石カウンター", "IHクッキングヒーター", "食器洗い乾燥機"],
    createdAt: "2024-01-15",
    views: 245,
    likes: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-reform-blue-50 to-reform-orange-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-reform-blue-500 to-reform-orange-500 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">事例詳細</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* タイトル・基本情報 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{caseData.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <Badge className="bg-reform-blue-500">{caseData.category}</Badge>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {caseData.company}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {caseData.createdAt}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{caseData.views} 閲覧</span>
                      <span>{caseData.likes} いいね</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* 施工前後の写真 */}
            <Card>
              <CardHeader>
                <CardTitle>施工前後の写真</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 施工前 */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Badge variant="secondary" className="mr-2">施工前</Badge>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {caseData.beforeImages.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`施工前 ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 施工後 */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Badge className="mr-2 bg-reform-orange-500">施工後</Badge>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {caseData.afterImages.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`施工後 ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 工事内容・説明 */}
            <Card>
              <CardHeader>
                <CardTitle>工事内容</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{caseData.description}</p>
              </CardContent>
            </Card>

            {/* 使用材料 */}
            <Card>
              <CardHeader>
                <CardTitle>主な使用材料・設備</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {caseData.materials.map((material, index) => (
                    <Badge key={index} variant="outline">
                      {material}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 工事概要 */}
            <Card>
              <CardHeader>
                <CardTitle>工事概要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-medium text-sm text-gray-600">施工場所</h5>
                  <p>{caseData.location}</p>
                </div>
                <div>
                  <h5 className="font-medium text-sm text-gray-600">工期</h5>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-reform-blue-500" />
                    {caseData.workPeriod}
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm text-gray-600">予算目安</h5>
                  <p className="text-reform-orange-600 font-medium">{caseData.budget}</p>
                </div>
              </CardContent>
            </Card>

            {/* 施工会社情報 */}
            <Card>
              <CardHeader>
                <CardTitle>施工会社</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-medium">{caseData.company}</h5>
                  <p className="text-sm text-gray-600">キッチン・水回り専門</p>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-reform-blue-500 hover:bg-reform-blue-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    お問い合わせ
                  </Button>
                  <Button variant="outline" className="w-full">
                    会社ページを見る
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* アクション */}
            <Card>
              <CardHeader>
                <CardTitle>この事例を共有</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  X（Twitter）でシェア
                </Button>
                <Button variant="outline" className="w-full">
                  LINEで送る
                </Button>
                <Button variant="outline" className="w-full">
                  URLをコピー
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseDetail;
