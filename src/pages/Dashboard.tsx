
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Clock, Calendar, User, Edit, Eye, Share2, Trash2, Plus, Search, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CaseUploadModal from '@/components/CaseUploadModal';
import CaseEditModal from '@/components/CaseEditModal';
import { Case } from '@/types/case';

const Dashboard = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // サンプル事例データ（デモ画像付き）
  const [cases, setCases] = useState<Case[]>([
    {
      id: 1,
      title: "キッチン全面リフォーム：機能性とデザイン性を両立",
      company: "東京リフォーム株式会社",
      location: "東京都世田谷区",
      category: "キッチン",
      beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=400&h=300&fit=crop",
      description: "築30年のマンションキッチンを最新設備で一新。収納力アップと清掃性を重視した設計。",
      workPeriod: "5日間",
      status: "published",
      createdAt: "2024-01-15",
      publishedAt: "2024-01-20"
    },
    {
      id: 2,
      title: "和室から洋室への大変身：モダンリビング空間",
      company: "東京リフォーム株式会社",
      location: "大阪府大阪市",
      category: "居室",
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      afterImage: null,
      description: "伝統的な和室を現代的な洋室に変更。フローリング・クロス・照明すべて新調予定。",
      workPeriod: "7日間",
      status: "scheduled",
      createdAt: "2024-01-10",
      scheduledDate: "2024-01-25",
      reminderTime: "09:00"
    },
    {
      id: 3,
      title: "バリアフリー浴室リフォーム：安全性と快適性を追求",
      company: "東京リフォーム株式会社",
      location: "福岡県福岡市",
      category: "浴室",
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop",
      description: "高齢者対応のバリアフリー浴室。手すり・段差解消・滑り止め加工を施工完了。内容確認中。",
      workPeriod: "4日間",
      status: "draft",
      createdAt: "2024-01-08"
    }
  ]);

  const filteredCases = cases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePublish = (id: number) => {
    setCases(prev => prev.map(c => 
      c.id === id 
        ? { ...c, status: 'published' as const, publishedAt: new Date().toISOString().split('T')[0] }
        : c
    ));
    toast({
      title: "事例を公開しました",
      description: "SNSへの投稿も完了しました",
    });
  };

  const handleDelete = (id: number) => {
    setCases(prev => prev.filter(c => c.id !== id));
    toast({
      title: "事例を削除しました",
      description: "削除した事例は復元できません",
    });
  };

  const handleEdit = (caseItem: Case) => {
    setEditingCase(caseItem);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (updatedCase: Case) => {
    setCases(prev => prev.map(c => c.id === updatedCase.id ? updatedCase : c));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">公開済み</Badge>;
      case 'draft':
        return <Badge variant="secondary">下書き</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500">アラーム設定済み</Badge>;
      default:
        return null;
    }
  };

  const publishedCases = filteredCases.filter(c => c.status === 'published');
  const draftCases = filteredCases.filter(c => c.status === 'draft');
  const scheduledCases = filteredCases.filter(c => c.status === 'scheduled');

  const renderCaseCard = (caseItem: Case, showActions = true) => (
    <Card key={caseItem.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="grid grid-cols-2 h-40 sm:h-32">
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
            {caseItem.afterImage ? (
              <img 
                src={caseItem.afterImage} 
                alt="施工後" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div className="absolute top-2 left-2">
              <Badge className="text-xs bg-orange-500">
                {caseItem.afterImage ? '施工後' : '未撮影'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          <Badge className="bg-blue-600 text-xs">
            {caseItem.category}
          </Badge>
          {getStatusBadge(caseItem.status)}
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg line-clamp-2 leading-tight">
          {caseItem.title}
        </CardTitle>
        <CardDescription className="text-sm">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            作成: {caseItem.createdAt}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {caseItem.description}
        </p>
        {caseItem.status === 'scheduled' && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-600 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              リマインダー: {caseItem.scheduledDate} {caseItem.reminderTime}
            </p>
          </div>
        )}
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-2">
            {caseItem.status === 'draft' && caseItem.afterImage && (
              <Button 
                size="sm" 
                onClick={() => handlePublish(caseItem.id)}
                className="w-full sm:flex-1 bg-green-500 hover:bg-green-600 h-9"
              >
                <Share2 className="w-3 h-3 mr-1" />
                公開する
              </Button>
            )}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 h-9"
                onClick={() => handleEdit(caseItem)}
              >
                <Edit className="w-3 h-3 mr-1" />
                編集
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleDelete(caseItem.id)}
                className="text-red-500 hover:text-red-600 h-9 px-3"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">マイページ</h1>
                <p className="text-xs text-gray-500">東京リフォーム株式会社</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline"
                onClick={() => window.open('/public-cases', '_blank')}
                className="hidden sm:inline-flex h-9"
                size="sm"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                事例公開ページ
              </Button>
              <Button 
                onClick={() => setIsUploadOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white h-9"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                新規作成
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-6">
        {/* 統計情報 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-center">
                <Eye className="w-6 h-6 mx-auto mb-1 text-green-100" />
                <p className="text-2xl font-bold">{publishedCases.length}</p>
                <p className="text-xs text-green-100">公開済み</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-500 to-gray-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-center">
                <Edit className="w-6 h-6 mx-auto mb-1 text-gray-100" />
                <p className="text-2xl font-bold">{draftCases.length}</p>
                <p className="text-xs text-gray-100">下書き</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto mb-1 text-blue-100" />
                <p className="text-2xl font-bold">{scheduledCases.length}</p>
                <p className="text-xs text-blue-100">アラーム設定</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="text-center">
                <User className="w-6 h-6 mx-auto mb-1 text-orange-100" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-orange-100">今月問合せ</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 検索 */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="事例を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        {/* 事例管理タブ */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              すべて <span className="ml-1">({filteredCases.length})</span>
            </TabsTrigger>
            <TabsTrigger value="published" className="text-xs sm:text-sm">
              公開済み <span className="ml-1 hidden sm:inline">({publishedCases.length})</span>
            </TabsTrigger>
            <TabsTrigger value="draft" className="text-xs sm:text-sm">
              下書き <span className="ml-1 hidden sm:inline">({draftCases.length})</span>
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="text-xs sm:text-sm">
              アラーム <span className="ml-1 hidden sm:inline">({scheduledCases.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCases.map(caseItem => renderCaseCard(caseItem))}
            </div>
          </TabsContent>
          
          <TabsContent value="published">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {publishedCases.map(caseItem => renderCaseCard(caseItem))}
            </div>
          </TabsContent>
          
          <TabsContent value="draft">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {draftCases.map(caseItem => renderCaseCard(caseItem))}
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledCases.map(caseItem => renderCaseCard(caseItem))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">事例が見つかりませんでした。</p>
          </div>
        )}
      </main>

      {/* モーダル */}
      <CaseUploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)}
      />
      <CaseEditModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)}
        case={editingCase}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Dashboard;
