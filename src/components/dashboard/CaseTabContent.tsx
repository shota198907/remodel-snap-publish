
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
    <div className="space-y-4">
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.id}
          caseItem={caseItem}
          onEdit={onEdit}
          onPublish={onPublish}
          showPublishButton={showPublishButton}
        />
      ))}
    </div>
  );
};

export default CaseTabContent;
