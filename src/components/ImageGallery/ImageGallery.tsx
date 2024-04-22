import { LinearProgress, useMediaQuery } from '@mui/material';
import ImageList from '@mui/material/ImageList';

import { User } from 'firebase/auth';
import { useAppDispatch } from '../../store/store';
import { setEditImageData } from '../../store/editImageSlice';
import { useNavigate } from 'react-router-dom';
import { EDITOR_ROUTE } from '../../utils/constants/routes';
import { deleteDocument } from '../../services/firebase/Documets.servise';
import ImageItem from './ImageItem/ImageItem';

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
}

function ImageGallery({ imageData, isLoading, user }: ImageGalleryPropsType) {
  const isMobile = useMediaQuery('(max-width:480px)');
  const isTablet = useMediaQuery('(max-width:780px)');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
            await deleteDocument(item.itemId);
          }}
        />
      ))}
    </ImageList>
  );
}

export default ImageGallery;
