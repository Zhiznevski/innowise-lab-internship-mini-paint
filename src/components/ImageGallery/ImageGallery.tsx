import { Button, ButtonGroup, LinearProgress, useMediaQuery } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { User } from 'firebase/auth';
import { useAppDispatch } from '../../store/store';
import { setEditImageData } from '../../store/editImageSlice';
import { useNavigate } from 'react-router-dom';
import { EDITOR_ROUTE } from '../../utils/constants/routes';
import { deleteDocument } from '../../services/firebase/Documets.servise';

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
    <>
      <ImageList sx={{ padding: 1 }} cols={getColsCount()} gap={10}>
        {imageData.map((item) => (
          <ImageListItem
            sx={{
              padding: 1,
              boxShadow:
                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            }}
            key={item.imageUrl}
          >
            <img srcSet={item.imageUrl} alt="gallery image" loading="lazy" />
            <ImageListItemBar title={`by: ${item.userName}`} position="below"></ImageListItemBar>
            {user?.email === item.userEmail && (
              <ButtonGroup
                sx={{ alignSelf: 'center' }}
                variant="contained"
                aria-label="format button group"
              >
                <Button
                  onClick={() => {
                    dispatch(setEditImageData(item));
                    navigate(EDITOR_ROUTE);
                  }}
                >
                  edit
                </Button>
                <Button
                  onClick={async () => {
                    await deleteDocument(item.itemId);
                  }}
                >
                  delete
                </Button>
              </ButtonGroup>
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default ImageGallery;
