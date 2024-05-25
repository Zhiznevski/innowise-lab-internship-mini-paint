import { Box, Modal as ModalWindow } from '@mui/material';
import { ReactElement } from 'react';

interface ModalPropsType {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: 500,
};

function Modal({ isOpen, onClose, children }: ModalPropsType) {
  return (
    <ModalWindow
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>{children}</Box>
    </ModalWindow>
  );
}
export default Modal;
