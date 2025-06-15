
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onPublish: () => void;
  onSaveDraft: () => void;
  isLoading: boolean;
  canPublish: boolean;
}

const ActionButtons = ({ onPublish, onSaveDraft, isLoading, canPublish }: ActionButtonsProps) => {
  return (
    <div className="absolute top-2 right-2 z-20 flex gap-1">
      <Button 
        onClick={onPublish}
        disabled={isLoading || !canPublish}
        size="sm"
        className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-lg text-xs px-3 py-1 h-8"
      >
        公開
      </Button>
      <Button 
        onClick={onSaveDraft}
        disabled={isLoading}
        variant="outline"
        size="sm"
        className="rounded-full border-2 border-gray-400 hover:border-gray-600 font-bold shadow-lg text-xs px-3 py-1 h-8"
      >
        下書き
      </Button>
    </div>
  );
};

export default ActionButtons;
