import { LinearProgress, useMediaQuery } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import { User } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setEditImageData } from '../store/editImageSlice';
import { useNavigate } from 'react-router-dom';
import { EDITOR_ROUTE } from '../../../constants/routes';
import ImageItem from './ImageItem';
import { useState } from 'react';
import useSearchByValue from '../hooks/useSearchByValue';
import { toast } from 'react-toastify';
import Modal from '../../../ui/Modal/Modal';
import { deleteDocument } from '../api/deleteImageById';

interface ImageGalleryPropsType {
  user: User | null | undefined;
}

export function ImageGallery({ user }: ImageGalleryPropsType) {
  const searchValue = useAppSelector((state) => state.searchValue.searchValue);
  const [searchResults, isLoading, error] = useSearchByValue('images', searchValue);
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

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <>
      <ImageList sx={{ padding: 1 }} cols={getColsCount()} gap={10}>
        {searchResults.map((item) => (
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
        <Modal isOpen={open} onClose={handleClose}>
          <img src={modalImageUrl} style={{ width: '100%' }} alt="modal-image"></img>
        </Modal>
      )}
    </>
  );
}
