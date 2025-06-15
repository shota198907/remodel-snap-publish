
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [workPeriod, setWorkPeriod] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (caseData) {
      setTitle(caseData.title);
      setCategory(caseData.category);
      setLocation(caseData.location);
      setDescription(caseData.description);
      setWorkPeriod(caseData.workPeriod);
    }
  }, [caseData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseData) return;

    const updatedCase: Case = {
      ...caseData,
      title,
      category,
      location,
      description,
      workPeriod,
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
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>事例を編集</DialogTitle>
          <DialogDescription>
            事例の情報を編集できます
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">事例タイトル</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="事例のタイトルを入力"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">カテゴリ</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
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
            <Label htmlFor="location">施工場所</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="例: 東京都世田谷区"
              required
            />
          </div>

          <div>
            <Label htmlFor="workPeriod">工期</Label>
            <Input
              id="workPeriod"
              value={workPeriod}
              onChange={(e) => setWorkPeriod(e.target.value)}
              placeholder="例: 5日間"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">事例説明</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="事例の詳細な説明を入力"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit" className="bg-reform-blue-500 hover:bg-reform-blue-600">
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CaseEditModal;
