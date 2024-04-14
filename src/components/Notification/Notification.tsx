import { Alert, Snackbar } from '@mui/material';
import { ReactNode } from 'react';
interface NotificationPropType {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
}
function Notification({ onClose, isOpen, children }: NotificationPropType) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isOpen}
      onClose={onClose}
      autoHideDuration={5000}
      message="Note archived"
    >
      <Alert onClose={onClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
