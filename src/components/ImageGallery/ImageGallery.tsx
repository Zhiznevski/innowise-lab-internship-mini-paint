import { LinearProgress } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

interface ImageGalleryPropsType {
  imageData: ImageListItemType[];
  isLoading: boolean;
}

export interface ImageListItemType {
  imageUrl: string;
  userEmail: string;
  userName: string;
  createdAt: Date;
}

function ImageGallery({ imageData, isLoading }: ImageGalleryPropsType) {
  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <ImageList sx={{ padding: 1 }} cols={4} gap={10}>
        {imageData.map((item) => (
          <ImageListItem
            sx={{
              boxShadow:
                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            }}
            key={item.imageUrl}
          >
            <img srcSet={item.imageUrl} alt="gallery image" loading="lazy" />
            <ImageListItemBar title={`by: ${item.userName}`} position="below" />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default ImageGallery;
