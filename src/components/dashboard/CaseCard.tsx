
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Edit, Trash2, AlarmClock } from "lucide-react";
import { Case } from "@/types/case";

interface CaseCardProps {
  caseItem: Case;
  onEdit: (caseItem: Case) => void;
  onPublish?: (caseItem: Case) => void;
  showPublishButton?: boolean;
}

const CaseCard = ({ caseItem, onEdit, onPublish, showPublishButton = false }: CaseCardProps) => {
  const getStatusInfo = () => {
    switch (caseItem.status) {
      case 'published':
        return {
          dateLabel: '公開',
          date: caseItem.publishedAt,
          icon: Eye,
          statusText: '公開中',
          afterImageFallback: null
        };
      case 'draft':
        return {
          dateLabel: '作成',
          date: caseItem.createdAt,
          icon: Calendar,
          statusText: '下書き',
          afterImageFallback: 'アフター未登録'
        };
      case 'scheduled':
        return {
          dateLabel: '予定',
          date: caseItem.scheduledDate,
          icon: AlarmClock,
          statusText: '予約中',
          afterImageFallback: '予約投稿'
        };
      default:
        return {
          dateLabel: '作成',
          date: caseItem.createdAt,
          icon: Calendar,
          statusText: '',
          afterImageFallback: null
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        <div className="md:w-48 h-32 md:h-auto">
          <div className="grid grid-cols-2 h-full">
            <img src={caseItem.beforeImage} alt="施工前" className="w-full h-full object-cover" />
            {caseItem.afterImage ? (
              <img src={caseItem.afterImage} alt="施工後" className="w-full h-full object-cover" />
            ) : (
              <div className="bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs">{statusInfo.afterImageFallback}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{caseItem.title}</h3>
                <Badge className={caseItem.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {caseItem.category}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{caseItem.description}</p>
              <div className="flex items-center text-xs text-gray-500 space-x-4">
                <span className="flex items-center">
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusInfo.dateLabel}: {statusInfo.date}
                </span>
                {statusInfo.statusText && (
                  <Badge variant="outline" className="text-xs">{statusInfo.statusText}</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {showPublishButton && onPublish && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPublish(caseItem)}
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(caseItem)}
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
  );
};

export default CaseCard;
