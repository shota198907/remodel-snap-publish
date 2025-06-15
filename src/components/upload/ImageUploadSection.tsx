
import { Camera, Plus } from "lucide-react";

interface ImageUploadSectionProps {
  beforeImages: File[];
  afterImages: File[];
  onFileUpload: (field: string, files: FileList | null) => void;
  isLoading: boolean;
}

const ImageUploadSection = ({ 
  beforeImages, 
  afterImages, 
  onFileUpload, 
  isLoading 
}: ImageUploadSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Before Images */}
      <div className="space-y-2">
        <div 
          className={`relative aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
            beforeImages.length > 0 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-25'
          }`}
          onClick={() => document.getElementById('beforeImages')?.click()}
        >
          {beforeImages.length > 0 ? (
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <img 
                src={URL.createObjectURL(beforeImages[0])} 
                alt="施工前" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{beforeImages.length}枚</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Camera className="w-8 h-8 text-gray-400 mb-1" />
              <span className="text-gray-600 font-medium text-sm">施工前</span>
            </div>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            capture="environment"
            onChange={(e) => onFileUpload('beforeImages', e.target.files)}
            className="hidden"
            id="beforeImages"
            disabled={isLoading}
          />
        </div>
        {beforeImages.length > 0 && (
          <div 
            className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center mx-auto cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => document.getElementById('beforeImages')?.click()}
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </div>
        )}
      </div>

      {/* After Images */}
      <div className="space-y-2">
        <div 
          className={`relative aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
            afterImages.length > 0 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-300 bg-gray-50 hover:border-green-300 hover:bg-green-25'
          }`}
          onClick={() => document.getElementById('afterImages')?.click()}
        >
          {afterImages.length > 0 ? (
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <img 
                src={URL.createObjectURL(afterImages[0])} 
                alt="施工後" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{afterImages.length}枚</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Camera className="w-8 h-8 text-gray-400 mb-1" />
              <span className="text-gray-600 font-medium text-sm">施工後</span>
            </div>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            capture="environment"
            onChange={(e) => onFileUpload('afterImages', e.target.files)}
            className="hidden"
            id="afterImages"
            disabled={isLoading}
          />
        </div>
        {afterImages.length > 0 && (
          <div 
            className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center mx-auto cursor-pointer hover:border-green-500 transition-colors"
            onClick={() => document.getElementById('afterImages')?.click()}
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadSection;
