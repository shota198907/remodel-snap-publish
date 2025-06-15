import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Plus, Edit, Trash2, Calendar, Eye, Clock, Building, Globe, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CaseUploadModal from "@/components/CaseUploadModal";
import CaseEditModal from "@/components/CaseEditModal";
import CompanyProfileModal from "@/components/CompanyProfileModal";
import { Case } from "@/types/case";

const Dashboard = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [companyProfileModalOpen, setCompanyProfileModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const { toast } = useToast();

  // サンプルデータ
  const sampleCases: Case[] = [
    {
      id: 1,
      title: "キッチンリフォーム事例",
      company: "リフォーム株式会社",
      location: "東京都",
      category: "キッチン",
      beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=600&h=400&fit=crop",
      description: "最新のシステムキッチンを導入し、収納力とデザイン性を向上させました。",
      workPeriod: "1週間",
      status: "published",
      createdAt: "2024-01-01",
      publishedAt: "2024-01-05"
    },
    {
      id: 2,
      title: "リビングリフォーム事例",
      company: "リノベーション株式会社",
      location: "大阪府",
      category: "居室",
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      description: "リビングの壁紙を変更し、明るく開放的な空間を実現しました。",
      workPeriod: "3日間",
      status: "draft",
      createdAt: "2024-01-03",
      scheduledDate: "2024-02-10",
      reminderTime: "10:00"
    },
    {
      id: 3,
      title: "浴室リフォーム事例",
      company: "リフォーム株式会社",
      location: "東京都",
      category: "浴室",
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop",
      description: "最新のユニットバスを導入し、快適なバスタイムを実現しました。",
      workPeriod: "5日間",
      status: "scheduled",
      createdAt: "2024-01-05",
      scheduledDate: "2024-02-15",
      reminderTime: "09:00"
    }
  ];

  // ステータスごとの事例をフィルタリング
  const publishedCases = sampleCases.filter(caseItem => caseItem.status === 'published');
  const draftCases = sampleCases.filter(caseItem => caseItem.status === 'draft');
  const scheduledCases = sampleCases.filter(caseItem => caseItem.status === 'scheduled');

  const handleEditCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setEditModalOpen(true);
  };

  const handlePublishDraft = (caseItem: Case) => {
    // 公開処理のシミュレーション
    toast({
      title: "事例を公開しました",
      description: `${caseItem.title}がポートフォリオに追加されました`,
    });
  };

  // サンプルデータ
  const sampleCases: Case[] = [
    {
      id: 1,
      title: "キッチンリフォーム事例",
      company: "リフォーム株式会社",
      location: "東京都",
      category: "キッチン",
      beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=600&h=400&fit=crop",
      description: "最新のシステムキッチンを導入し、収納力とデザイン性を向上させました。",
      workPeriod: "1週間",
      status: "published",
      createdAt: "2024-01-01",
      publishedAt: "2024-01-05"
    },
    {
      id: 2,
      title: "リビングリフォーム事例",
      company: "リノベーション株式会社",
      location: "大阪府",
      category: "居室",
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      description: "リビングの壁紙を変更し、明るく開放的な空間を実現しました。",
      workPeriod: "3日間",
      status: "draft",
      createdAt: "2024-01-03",
      scheduledDate: "2024-02-10",
      reminderTime: "10:00"
    },
    {
      id: 3,
      title: "浴室リフォーム事例",
      company: "リフォーム株式会社",
      location: "東京都",
      category: "浴室",
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop",
      description: "最新のユニットバスを導入し、快適なバスタイムを実現しました。",
      workPeriod: "5日間",
      status: "scheduled",
      createdAt: "2024-01-05",
      scheduledDate: "2024-02-15",
      reminderTime: "09:00"
    }
  ];

  // ステータスごとの事例をフィルタリング
  const publishedCases = sampleCases.filter(caseItem => caseItem.status === 'published');
  const draftCases = sampleCases.filter(caseItem => caseItem.status === 'draft');
  const scheduledCases = sampleCases.filter(caseItem => caseItem.status === 'scheduled');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">マイページ</h1>
                <p className="text-sm text-gray-500">事例管理ダッシュボード</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setCompanyProfileModalOpen(true)}
                className="flex items-center space-x-2"
              >
                <Building className="w-4 h-4" />
                <span className="hidden sm:inline">会社情報</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/public-cases', '_blank')}
                className="flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">公開ページ</span>
              </Button>
              <Button 
                onClick={() => setUploadModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規作成</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* 統計カード */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-blue-100 text-xs mb-1">公開済み</p>
                <p className="text-2xl font-bold">{publishedCases.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-orange-100 text-xs mb-1">下書き</p>
                <p className="text-2xl font-bold">{draftCases.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-purple-100 text-xs mb-1">予約投稿</p>
                <p className="text-2xl font-bold">{scheduledCases.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-green-100 text-xs mb-1">今月追加</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="published" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="published">公開済み</TabsTrigger>
            <TabsTrigger value="drafts">下書き</TabsTrigger>
            <TabsTrigger value="scheduled">予約投稿</TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="space-y-4">
            {publishedCases.map((caseItem) => (
              <Card key={caseItem.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-48 h-32 md:h-auto">
                    <div className="grid grid-cols-2 h-full">
                      <img src={caseItem.beforeImage} alt="施工前" className="w-full h-full object-cover" />
                      <img src={caseItem.afterImage!} alt="施工後" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{caseItem.title}</h3>
                          <Badge className="bg-green-100 text-green-800">{caseItem.category}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{caseItem.description}</p>
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            公開: {caseItem.publishedAt}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            公開中
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCase(caseItem)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            {draftCases.map((caseItem) => (
              <Card key={caseItem.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-48 h-32 md:h-auto">
                    <div className="grid grid-cols-2 h-full">
                      <img src={caseItem.beforeImage} alt="施工前" className="w-full h-full object-cover" />
                      <div className="bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">アフター未登録</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{caseItem.title}</h3>
                          <Badge variant="secondary">{caseItem.category}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{caseItem.description}</p>
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            作成: {caseItem.createdAt}
                          </span>
                          <Badge variant="outline" className="text-xs">下書き</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePublishDraft(caseItem)}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCase(caseItem)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            {scheduledCases.map((caseItem) => (
              <Card key={caseItem.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-48 h-32 md:h-auto">
                    <div className="grid grid-cols-2 h-full">
                      <img src={caseItem.beforeImage} alt="施工前" className="w-full h-full object-cover" />
                      <div className="bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">予約投稿</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{caseItem.title}</h3>
                          <Badge variant="secondary">{caseItem.category}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{caseItem.description}</p>
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            予定: {caseItem.scheduledDate}
                          </span>
                          <Badge variant="outline" className="text-xs">予約中</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCase(caseItem)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <CaseUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />

      <CaseEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        case={selectedCase}
        onSave={(updatedCase) => {
          console.log('Case updated:', updatedCase);
          setEditModalOpen(false);
        }}
      />

      <CompanyProfileModal
        isOpen={companyProfileModalOpen}
        onClose={() => setCompanyProfileModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
