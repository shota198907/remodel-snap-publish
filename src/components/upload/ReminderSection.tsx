
import { AlarmClock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ReminderSectionProps {
  scheduledDate: string;
  reminderTime: string;
  onInputChange: (field: string, value: string) => void;
  isLoading: boolean;
}

const ReminderSection = ({ 
  scheduledDate, 
  reminderTime, 
  onInputChange, 
  isLoading 
}: ReminderSectionProps) => {
  return (
    <div className="space-y-3 p-3 border-2 border-dashed border-orange-300 bg-orange-50 rounded-xl">
      <div className="flex items-center space-x-2">
        <AlarmClock className="w-5 h-5 text-orange-600" />
        <span className="text-orange-800 font-medium text-sm">撮影リマインダー設定</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-orange-700 mb-1 font-medium">予定日</label>
          <Input
            type="date"
            value={scheduledDate}
            onChange={(e) => onInputChange('scheduledDate', e.target.value)}
            className="w-full h-9 text-xs border border-orange-300 rounded-lg bg-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-xs text-orange-700 mb-1 font-medium">時間</label>
          <Input
            type="time"
            value={reminderTime}
            onChange={(e) => onInputChange('reminderTime', e.target.value)}
            className="w-full h-9 text-xs border border-orange-300 rounded-lg bg-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ReminderSection;
