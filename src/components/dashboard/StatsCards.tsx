
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  publishedCount: number;
  draftCount: number;
  scheduledCount: number;
  monthlyCount: number;
}

const StatsCards = ({ publishedCount, draftCount, scheduledCount, monthlyCount }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-blue-100 text-xs mb-1">公開済み</p>
            <p className="text-2xl font-bold">{publishedCount}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-orange-100 text-xs mb-1">下書き</p>
            <p className="text-2xl font-bold">{draftCount}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-purple-100 text-xs mb-1">予約投稿</p>
            <p className="text-2xl font-bold">{scheduledCount}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-green-100 text-xs mb-1">今月追加</p>
            <p className="text-2xl font-bold">{monthlyCount}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
