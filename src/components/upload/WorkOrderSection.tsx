
import { Camera } from "lucide-react";

interface WorkOrderSectionProps {
  workOrder: File | null;
  onFileUpload: (field: string, files: FileList | null) => void;
  isLoading: boolean;
}

const WorkOrderSection = ({ workOrder, onFileUpload, isLoading }: WorkOrderSectionProps) => {
  return (
    <div 
      className={`relative h-12 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
        workOrder 
          ? 'border-purple-400 bg-purple-50' 
          : 'border-gray-300 bg-gray-50 hover:border-purple-300 hover:bg-purple-25'
      }`}
      onClick={() => document.getElementById('workOrder')?.click()}
    >
      <div className="flex items-center justify-center h-full">
        <Camera className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-gray-600 font-medium text-sm">
          {workOrder ? '工事依頼書 ✓' : '工事依頼書'}
        </span>
      </div>
      <input
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => onFileUpload('workOrder', e.target.files)}
        className="hidden"
        id="workOrder"
        disabled={isLoading}
      />
    </div>
  );
};

export default WorkOrderSection;
