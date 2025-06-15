import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import CaseUploadModal from "@/components/CaseUploadModal";
import CaseEditModal from "@/components/CaseEditModal";
import CompanyProfileModal from "@/components/CompanyProfileModal";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import CaseTabContent from "@/components/dashboard/CaseTabContent";
import { Case } from "@/types/case";

const Dashboard = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [companyProfileModalOpen, setCompanyProfileModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [activeTab, setActiveTab] = useState('published');
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

  const publishedCases = sampleCases.filter(caseItem => caseItem.status === 'published');
  const draftCases = sampleCases.filter(caseItem => caseItem.status === 'draft');
  const scheduledCases = sampleCases.filter(caseItem => caseItem.status === 'scheduled');

  const handleEditCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setEditModalOpen(true);
  };

  const handlePublishDraft = (caseItem: Case) => {
    toast({
      title: "事例を公開しました",
      description: `${caseItem.title}がポートフォリオに追加されました`,
    });
  };

  const getCurrentCases = () => {
    switch (activeTab) {
      case 'published':
        return publishedCases;
      case 'drafts':
        return draftCases;
      case 'scheduled':
        return scheduledCases;
      default:
        return publishedCases;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'published':
        return '公開済み事例';
      case 'drafts':
        return '下書き事例';
      case 'scheduled':
        return '予約投稿事例';
      default:
        return '事例一覧';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        onNewCase={() => setUploadModalOpen(true)}
        onCompanyProfile={() => setCompanyProfileModalOpen(true)}
      />

      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <StatsCards
          publishedCount={publishedCases.length}
          draftCount={draftCases.length}
          scheduledCount={scheduledCases.length}
          monthlyCount={3}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{getTabTitle()}</h2>
            <div className="text-sm text-gray-500">
              {getCurrentCases().length}件
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {getCurrentCases().map((caseItem) => (
              <CaseTabContent
                key={caseItem.id}
                value={activeTab}
                cases={[caseItem]}
                onEdit={handleEditCase}
                onPublish={activeTab === 'drafts' ? handlePublishDraft : undefined}
                showPublishButton={activeTab === 'drafts'}
              />
            ))}
            
            {getCurrentCases().length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📝</div>
                <p className="text-gray-500 text-sm sm:text-base">
                  {activeTab === 'published' && '公開済みの事例がありません'}
                  {activeTab === 'drafts' && '下書きの事例がありません'}
                  {activeTab === 'scheduled' && '予約投稿の事例がありません'}
                </p>
              </div>
            )}
          </div>
        </div>
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
