
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Clock, Calendar, User, MessageCircle, Image, Plus, Edit } from "lucide-react";

const Dashboard = () => {
  const [draftCases] = useState([
    {
      id: 1,
      title: "キッチンリフォーム：築30年マンション改修",
      category: "キッチン",
      status: "下書き",
      reminderDate: "2024-01-20",
      reminderTime: "09:00",
      beforeImages: 3,
      afterImages: 0,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "浴室バリアフリー改修工事",
      category: "浴室",
      status: "リマインダー設定済み",
      reminderDate: "2024-01-18",
      reminderTime: "10:00",
      beforeImages: 2,
      afterImages: 0,
      createdAt: "2024-01-12"
    }
  ]);

  const [publishedCases] = useState([
    {
      id: 3,
      title: "和室から洋室への大変身：モダンリビング空間",
      category: "居室",
      status: "公開済み",
      beforeImages: 2,
      afterImages: 3,
      views: 245,
      likes: 12,
      createdAt: "2024-01-10"
    }
  ]);

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
                <h1 className="text-xl font-bold text-gray-900">ダッシュボード</h1>
                <p className="text-xs text-gray-500">東京リフォーム株式会社</p>
              </div>
            </div>
            <Button className="bg-reform-orange-500 hover:bg-reform-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              新規投稿
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総投稿数</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">下書き</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">リマインダー設定済み</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総閲覧数</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">お問い合わせ</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">今月の問い合わせ数</p>
            </CardContent>
          </Card>
        </div>

        {/* タブコンテンツ */}
        <Tabs defaultValue="drafts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="drafts">下書き・進行中</TabsTrigger>
            <TabsTrigger value="published">公開済み</TabsTrigger>
          </TabsList>

          <TabsContent value="drafts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">下書き・進行中の事例</h3>
              <Badge variant="secondary">{draftCases.length}件</Badge>
            </div>
            
            <div className="grid gap-4">
              {draftCases.map((caseItem) => (
                <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-2">
                          <Badge className="bg-reform-blue-500">{caseItem.category}</Badge>
                          <span className="text-sm">作成日: {caseItem.createdAt}</span>
                        </CardDescription>
                      </div>
                      <Badge variant={caseItem.status === "下書き" ? "secondary" : "default"}>
                        {caseItem.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Image className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">施工前: {caseItem.beforeImages}枚</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">施工後: {caseItem.afterImages}枚</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-reform-orange-500" />
                        <span className="text-sm">リマインダー: {caseItem.reminderDate} {caseItem.reminderTime}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        編集
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        <Camera className="w-4 h-4 mr-2" />
                        アフター写真追加
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">公開済み事例</h3>
              <Badge variant="secondary">{publishedCases.length}件</Badge>
            </div>
            
            <div className="grid gap-4">
              {publishedCases.map((caseItem) => (
                <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-2">
                          <Badge className="bg-reform-blue-500">{caseItem.category}</Badge>
                          <span className="text-sm">公開日: {caseItem.createdAt}</span>
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-500">公開済み</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Image className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">施工前: {caseItem.beforeImages}枚</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">施工後: {caseItem.afterImages}枚</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-reform-blue-500" />
                        <span className="text-sm">閲覧: {caseItem.views}回</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-reform-orange-500" />
                        <span className="text-sm">いいね: {caseItem.likes}件</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        詳細表示
                      </Button>
                      <Button variant="outline" size="sm">
                        SNS再投稿
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
