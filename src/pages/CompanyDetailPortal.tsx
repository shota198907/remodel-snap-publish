
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, MapPin, Phone, Mail, Star, Camera, Award, Users, Clock } from "lucide-react";

const CompanyDetailPortal = () => {
  const { id } = useParams();

  // Sample company data (in real app, this would be fetched based on ID)
  const companyDetail = {
    id: 1,
    name: "株式会社山田工務店",
    rating: 4.8,
    reviewCount: 127,
    description: "創業50年の信頼と実績。お客様の理想の住まいづくりをサポートします。地域密着型のサービスで、アフターフォローまで責任を持って対応いたします。",
    fullDescription: "昭和49年の創業以来、地域のお客様に愛され続けてきた工務店です。住宅の新築からリフォーム、修繕まで幅広く対応しており、特にキッチンやバスルームなどの水回りリフォームには自信があります。熟練の職人による丁寧な施工と、お客様一人ひとりのライフスタイルに合わせた提案力が自慢です。",
    specialties: ["総合リフォーム", "キッチン", "バスルーム", "外装工事"],
    location: "東京都渋谷区",
    address: "東京都渋谷区渋谷1-1-1 山田ビル3F",
    caseCount: 45,
    phone: "03-1234-5678",
    email: "info@yamada-koumuten.co.jp",
    website: "https://yamada-koumuten.co.jp",
    businessHours: "平日 9:00-18:00 / 土曜 9:00-17:00",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=400&fit=crop",
    certifications: ["建設業許可", "リフォーム瑕疵保険加入", "住宅ローン減税対応"],
    establishedYear: "1974年",
    employeeCount: "15名",
    recentCases: [
      {
        id: 1,
        title: "キッチンリフォーム - モダンスタイル",
        category: "キッチン",
        image: "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=300&h=200&fit=crop",
        completedDate: "2024-01-15"
      },
      {
        id: 2,
        title: "バスルーム全面改装",
        category: "バスルーム", 
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&h=200&fit=crop",
        completedDate: "2024-01-08"
      },
      {
        id: 3,
        title: "リビング間取り変更",
        category: "リビング",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        completedDate: "2023-12-20"
      }
    ]
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
              <h1 className="text-xl font-bold text-gray-900">施工会社詳細</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="h-48 md:h-64 relative">
              <img src={companyDetail.image} alt={companyDetail.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{companyDetail.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-current text-yellow-400" />
                    <span className="font-medium">{companyDetail.rating}</span>
                    <span className="text-white/80">({companyDetail.reviewCount}件)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Camera className="w-4 h-4" />
                    <span>{companyDetail.caseCount}件の施工事例</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Company Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">会社について</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {companyDetail.fullDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {companyDetail.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-sm">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">最近の施工事例</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companyDetail.recentCases.map((caseItem) => (
                      <Link key={caseItem.id} to={`/portal/case/${caseItem.id}`}>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                          <div className="h-32 relative">
                            <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-blue-600 text-white border-0 text-xs">
                                {caseItem.category}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-3">
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">
                              {caseItem.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              完成: {caseItem.completedDate}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">基本情報</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">所在地</p>
                        <p className="font-medium">{companyDetail.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">電話番号</p>
                        <p className="font-medium">{companyDetail.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">メール</p>
                        <p className="font-medium text-sm">{companyDetail.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">営業時間</p>
                        <p className="font-medium text-sm">{companyDetail.businessHours}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">会社データ</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">創業年</span>
                      <span className="font-medium">{companyDetail.establishedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">従業員数</span>
                      <span className="font-medium">{companyDetail.employeeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">施工実績</span>
                      <span className="font-medium">{companyDetail.caseCount}件</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    認定・資格
                  </h3>
                  <div className="space-y-2">
                    {companyDetail.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                リフォームのご相談はお気軽に
              </h3>
              <p className="text-gray-600 mb-6">
                経験豊富なスタッフがお客様のご要望をお伺いします
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Phone className="w-5 h-5 mr-2" />
                  {companyDetail.phone}
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

export default CompanyDetailPortal;
