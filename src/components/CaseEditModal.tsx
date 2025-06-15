
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Case } from "@/types/case";

interface CaseEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  case: Case | null;
  onSave: (updatedCase: Case) => void;
}

const CaseEditModal = ({ isOpen, onClose, case: caseData, onSave }: CaseEditModalProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [beforeImages, setBeforeImages] = useState<File[]>([]);
  const [afterImages, setAfterImages] = useState<File[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (caseData) {
      setTitle(caseData.title);
      setCategory(caseData.category);
      setDescription(caseData.description);
      // 既存の画像はファイルオブジェクトではないのでリセット
      setBeforeImages([]);
      setAfterImages([]);
    }
  }, [caseData]);

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    if (field === 'beforeImages') {
      setBeforeImages(fileArray);
    } else if (field === 'afterImages') {
      setAfterImages(fileArray);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseData) return;

    const updatedCase: Case = {
      ...caseData,
      title,
      category,
      description,
      // 新しい画像がアップロードされた場合、デモ用URLを更新
      beforeImage: beforeImages.length > 0 ? "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" : caseData.beforeImage,
      afterImage: afterImages.length > 0 ? "https://images.unsplash.com/photo-1556909144-f5220ba4815c?w=600&h=400&fit=crop" : caseData.afterImage,
    };

    onSave(updatedCase);
    toast({
      title: "事例を更新しました",
      description: "変更内容が保存されました",
    });
    onClose();
  };

  if (!caseData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>事例を編集</span>
          </DialogTitle>
          <DialogDescription>
            事例の情報を編集できます
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">事例タイトル *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="事例のタイトルを入力"
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="category">カテゴリ *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="キッチン">キッチン</SelectItem>
                <SelectItem value="浴室">浴室</SelectItem>
                <SelectItem value="居室">居室</SelectItem>
                <SelectItem value="外壁">外壁</SelectItem>
                <SelectItem value="その他">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">事例説明 *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="事例の詳細な説明を入力"
              className="min-h-[120px] mt-1"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>施工前写真</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">施工前の写真</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('beforeImages', e.target.files)}
                  className="hidden"
                  id="beforeImages"
                />
                <Button asChild variant="outline" size="sm" type="button">
                  <label htmlFor="beforeImages" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    写真を選択
                  </label>
                </Button>
                {beforeImages.length > 0 && (
                  <p className="text-sm text-blue-600 mt-2">
                    {beforeImages.length}枚の新しい画像が選択されています
                  </p>
                )}
                {beforeImages.length === 0 && caseData.beforeImage && (
                  <p className="text-sm text-gray-500 mt-2">
                    現在の画像を使用
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>施工後写真</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">施工後の写真</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('afterImages', e.target.files)}
                  className="hidden"
                  id="afterImages"
                />
                <Button asChild variant="outline" size="sm" type="button">
                  <label htmlFor="afterImages" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    写真を選択
                  </label>
                </Button>
                {afterImages.length > 0 && (
                  <p className="text-sm text-orange-600 mt-2">
                    {afterImages.length}枚の新しい画像が選択されています
                  </p>
                )}
                {afterImages.length === 0 && caseData.afterImage && (
                  <p className="text-sm text-gray-500 mt-2">
                    現在の画像を使用
                  </p>
                )}
                {afterImages.length === 0 && !caseData.afterImage && (
                  <p className="text-sm text-gray-400 mt-2">
                    アフター写真未登録
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              キャンセル
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CaseEditModal;
