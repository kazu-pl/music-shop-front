import Button from "components/Button/Button";
import ActionModal from "components/modals/ActionModal/ActionModal";
import { useState } from "react";

export interface DeleteGuitarModalProps {
  onActionBtnClick: () => void;
}

const DeleteGuitarModal = ({ onActionBtnClick }: DeleteGuitarModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={() => setIsModalOpen(true)}
      >
        Usuń gitare
      </Button>
      <ActionModal
        color="error"
        headlineText="Usuwanie gitary"
        open={isModalOpen}
        closeBtnText="Anuluj"
        actionBtnText="Usuń"
        onClose={() => setIsModalOpen(false)}
        onActionBtnClick={onActionBtnClick}
      >
        Czy jesteś pewien, że chcesz usunąć ta gitarę? Tej operacj nie można
        cofnąć.
      </ActionModal>
    </div>
  );
};

export default DeleteGuitarModal;
