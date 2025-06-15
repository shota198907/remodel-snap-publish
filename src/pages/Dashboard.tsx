
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
        <div className="grid grid-cols-2 h-32">
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
              <Badge className="text-xs bg-reform-orange-500">
                {caseItem.afterImage ? '施工後' : '未撮影'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          <Badge className="bg-reform-blue-500 text-xs">
            {caseItem.category}
          </Badge>
          {getStatusBadge(caseItem.status)}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">
          {caseItem.title}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-sm">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            工期: {caseItem.workPeriod}
          </span>
          <span>{caseItem.location}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
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
          <div className="flex space-x-2">
            {caseItem.status === 'draft' && caseItem.afterImage && (
              <Button 
                size="sm" 
                onClick={() => handlePublish(caseItem.id)}
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                <Share2 className="w-3 h-3 mr-1" />
                公開
              </Button>
            )}
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => handleEdit(caseItem)}
            >
              <Edit className="w-3 h-3 mr-1" />
              編集
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleDelete(caseItem.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-reform-blue-50 to-reform-orange-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-reform-blue-500 to-reform-orange-500 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">マイページ</h1>
                <p className="text-xs text-gray-500">東京リフォーム株式会社</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline"
                onClick={() => window.open('/public-cases', '_blank')}
                className="hidden sm:inline-flex"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                事例公開ページ
              </Button>
              <Button 
                onClick={() => setIsUploadOpen(true)}
                className="bg-reform-orange-500 hover:bg-reform-orange-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                新規事例
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        {/* 統計情報 */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">公開済み事例</p>
                  <p className="text-2xl font-bold text-green-600">{publishedCases.length}</p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">下書き</p>
                  <p className="text-2xl font-bold text-gray-600">{draftCases.length}</p>
                </div>
                <Edit className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">アラーム設定済み</p>
                  <p className="text-2xl font-bold text-blue-600">{scheduledCases.length}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">今月の問い合わせ</p>
                  <p className="text-2xl font-bold text-reform-orange-600">12</p>
                </div>
                <User className="w-8 h-8 text-reform-orange-500" />
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
              className="pl-10"
            />
          </div>
        </div>

        {/* 事例管理タブ */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">すべて ({filteredCases.length})</TabsTrigger>
            <TabsTrigger value="published">公開済み ({publishedCases.length})</TabsTrigger>
            <TabsTrigger value="draft">下書き ({draftCases.length})</TabsTrigger>
            <TabsTrigger value="scheduled">アラーム設定済み ({scheduledCases.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map(caseItem => renderCaseCard(caseItem))}
            </div>
          </TabsContent>
          
          <TabsContent value="published" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedCases.map(caseItem => renderCaseCard(caseItem))}
            </div>
          </TabsContent>
          
          <TabsContent value="draft" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {draftCases.map(caseItem => renderCaseCard(caseItem))}
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
