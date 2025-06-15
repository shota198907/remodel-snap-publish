
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldsProps {
  title: string;
  description: string;
  onInputChange: (field: string, value: string) => void;
  isLoading: boolean;
}

const FormFields = ({ title, description, onInputChange, isLoading }: FormFieldsProps) => {
  return (
    <>
      {/* Title Input */}
      <div>
        <Input
          value={title}
          onChange={(e) => onInputChange('title', e.target.value)}
          placeholder="事例タイトルを入力"
          className="w-full h-12 text-center border-2 border-gray-300 rounded-xl bg-gray-50 focus:border-blue-400 focus:bg-blue-50 placeholder:text-gray-500"
          disabled={isLoading}
        />
      </div>

      {/* Description Textarea */}
      <div>
        <Textarea
          value={description}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="施工内容の詳細を入力"
          rows={4}
          className="w-full border-2 border-gray-300 rounded-xl bg-gray-50 resize-none text-center pt-4 focus:border-blue-400 focus:bg-blue-50 placeholder:text-gray-500"
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default FormFields;
