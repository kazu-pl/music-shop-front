import Button from "components/Button/Button";
import ActionModal from "components/modals/ActionModal/ActionModal";
import { useState } from "react";

export interface DeleteAccountFormProps {
  onActionBtnClick: () => void;
}

const DeleteAccountForm = ({ onActionBtnClick }: DeleteAccountFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={() => setIsModalOpen(true)}
      >
        Usuń konto
      </Button>
      <ActionModal
        color="error"
        headlineText="Usuwanie konta"
        open={isModalOpen}
        closeBtnText="Anuluj"
        actionBtnText="Usuń"
        onClose={() => setIsModalOpen(false)}
        onActionBtnClick={onActionBtnClick}
      >
        Czy jesteś pewien, że chcesz usunąć swoje konto? Tej operacj nie można
        cofnąć.
      </ActionModal>
    </div>
  );
};

export default DeleteAccountForm;
