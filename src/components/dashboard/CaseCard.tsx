
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
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-32 sm:h-auto">
          <div className="grid grid-cols-2 h-full">
            <img src={caseItem.beforeImage} alt="施工前" className="w-full h-full object-cover" />
            {caseItem.afterImage ? (
              <img src={caseItem.afterImage} alt="施工後" className="w-full h-full object-cover" />
            ) : (
              <div className="bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs text-center px-1">{statusInfo.afterImageFallback}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 mb-3 sm:mb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-2 mb-1 sm:mb-0">{caseItem.title}</h3>
                <Badge className={caseItem.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {caseItem.category}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{caseItem.description}</p>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                <span className="flex items-center">
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusInfo.dateLabel}: {statusInfo.date}
                </span>
                {statusInfo.statusText && (
                  <Badge variant="outline" className="text-xs w-fit">{statusInfo.statusText}</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
              {showPublishButton && onPublish && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPublish(caseItem)}
                  className="text-green-600 border-green-600 hover:bg-green-50 text-xs px-2 py-1 h-8"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  公開
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(caseItem)}
                className="text-xs px-2 py-1 h-8"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-8">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CaseCard;
