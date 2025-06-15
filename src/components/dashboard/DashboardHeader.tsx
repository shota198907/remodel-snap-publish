
import { Button } from "@/components/ui/button";
import { Camera, Plus, Building, Globe, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  onNewCase: () => void;
  onCompanyProfile: () => void;
}

const DashboardHeader = ({ onNewCase, onCompanyProfile }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">マイページ</h1>
              <p className="text-sm text-gray-500">事例管理ダッシュボード</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              asChild
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Link to="/portal">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">ポータル</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={onCompanyProfile}
              className="flex items-center space-x-2"
            >
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">会社情報</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/public-cases', '_blank')}
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">公開ページ</span>
            </Button>
            <Button 
              onClick={onNewCase}
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>新規作成</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
