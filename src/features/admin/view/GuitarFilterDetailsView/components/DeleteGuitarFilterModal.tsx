import Button from "components/Button/Button";
import ActionModal from "components/modals/ActionModal/ActionModal";
import { useState } from "react";

export interface DeleteGuitarFilterModalProps {
  onActionBtnClick: () => void;
}

const DeleteGuitarFilterModal = ({
  onActionBtnClick,
}: DeleteGuitarFilterModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={() => setIsModalOpen(true)}
      >
        Usuń filter
      </Button>
      <ActionModal
        color="error"
        headlineText="Usuwanie filtru"
        open={isModalOpen}
        closeBtnText="Anuluj"
        actionBtnText="Usuń"
        onClose={() => setIsModalOpen(false)}
        onActionBtnClick={onActionBtnClick}
      >
        Czy jesteś pewien, że chcesz usunąć ten filter? Tej operacj nie można
        cofnąć.
      </ActionModal>
    </div>
  );
};

export default DeleteGuitarFilterModal;
