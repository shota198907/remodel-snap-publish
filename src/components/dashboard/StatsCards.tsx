
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Clock, Plus } from "lucide-react";

interface StatsCardsProps {
  publishedCount: number;
  draftCount: number;
  scheduledCount: number;
  monthlyCount: number;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const StatsCards = ({ 
  publishedCount, 
  draftCount, 
  scheduledCount, 
  monthlyCount,
  activeTab,
  onTabChange
}: StatsCardsProps) => {
  const stats = [
    {
      id: 'published',
      label: '公開済み',
      count: publishedCount,
      icon: Eye,
      gradient: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-100',
      isClickable: true
    },
    {
      id: 'drafts',
      label: '下書き',
      count: draftCount,
      icon: FileText,
      gradient: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-100',
      isClickable: true
    },
    {
      id: 'scheduled',
      label: '予約投稿',
      count: scheduledCount,
      icon: Clock,
      gradient: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-100',
      isClickable: true
    },
    {
      id: 'monthly',
      label: '今月追加',
      count: monthlyCount,
      icon: Plus,
      gradient: 'from-green-500 to-green-600',
      textColor: 'text-green-100',
      isClickable: false
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isActive = activeTab === stat.id;
        
        return (
          <Card 
            key={stat.id}
            className={`
              bg-gradient-to-r ${stat.gradient} text-white relative overflow-hidden
              ${stat.isClickable ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''}
              ${isActive ? 'ring-2 ring-white ring-opacity-50' : ''}
            `}
            onClick={stat.isClickable && onTabChange ? () => onTabChange(stat.id) : undefined}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className="w-4 h-4 opacity-80" />
                    {isActive && (
                      <Badge variant="secondary" className="text-xs bg-white bg-opacity-20">
                        選択中
                      </Badge>
                    )}
                  </div>
                  <p className={`${stat.textColor} text-xs sm:text-sm mb-1`}>{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold">{stat.count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
