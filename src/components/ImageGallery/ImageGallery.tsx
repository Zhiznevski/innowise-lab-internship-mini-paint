import { Box, LinearProgress, Modal, useMediaQuery } from '@mui/material';
import ImageList from '@mui/material/ImageList';

import { User } from 'firebase/auth';
import { useAppDispatch } from '../../store/store';
import { setEditImageData } from '../../store/editImageSlice';
import { useNavigate } from 'react-router-dom';
import { EDITOR_ROUTE } from '../../utils/constants/routes';
import { deleteDocument } from '../../services/firebase/Documets.service';
import ImageItem from './ImageItem/ImageItem';
import { useState } from 'react';

interface ImageGalleryPropsType {
  imageData: ImageListItemType[];
  isLoading: boolean;
  user: User | null | undefined;
}

export interface ImageListItemType {
  itemId: string;
  imageUrl: string;
  userEmail: string;
  userName: string;
  createdAt: Date;
  storagePath: string;
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
};

function ImageGallery({ imageData, isLoading, user }: ImageGalleryPropsType) {
  const [open, setOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const isMobile = useMediaQuery('(max-width:480px)');
  const isTablet = useMediaQuery('(max-width:780px)');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getColsCount = () => {
    if (isMobile) {
      return 1;
    }
    if (isTablet) {
      return 2;
    }
    return 4;
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <ImageList sx={{ padding: 1 }} cols={getColsCount()} gap={10}>
        {imageData.map((item) => (
          <ImageItem
            key={item.itemId}
            imageData={item}
            isEditable={user?.email === item.userEmail}
            handleEditButtonClick={() => {
              dispatch(setEditImageData(item));
              navigate(EDITOR_ROUTE);
            }}
            handleDeleteButtonClick={async () => {
              await deleteDocument(item.itemId, item.storagePath);
            }}
            handleOpenModal={() => {
              setModalImageUrl(item.imageUrl);
              handleOpen();
            }}
          />
        ))}
      </ImageList>
      {modalImageUrl && !isMobile && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <img src={modalImageUrl} style={{ width: '100%' }} alt="modal-image"></img>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default ImageGallery;
