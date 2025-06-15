
import { TabsContent } from "@/components/ui/tabs";
import CaseCard from "./CaseCard";
import { Case } from "@/types/case";

interface CaseTabContentProps {
  value: string;
  cases: Case[];
  onEdit: (caseItem: Case) => void;
  onPublish?: (caseItem: Case) => void;
  showPublishButton?: boolean;
}

const CaseTabContent = ({ value, cases, onEdit, onPublish, showPublishButton = false }: CaseTabContentProps) => {
  return (
    <TabsContent value={value} className="space-y-4">
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.id}
          caseItem={caseItem}
          onEdit={onEdit}
          onPublish={onPublish}
          showPublishButton={showPublishButton}
        />
      ))}
    </TabsContent>
  );
};

export default CaseTabContent;
