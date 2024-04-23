import { ImageListItem, ImageListItemBar, ButtonGroup, Button } from '@mui/material';
import { ImageListItemType } from '../../../../types/types';

export interface ImageListPropsType {
  imageData: ImageListItemType;
  isEditable: boolean;
  handleEditButtonClick: () => void;
  handleDeleteButtonClick: () => void;
  handleOpenModal: () => void;
}

function ImageItem({
  imageData,
  isEditable,
  handleDeleteButtonClick,
  handleEditButtonClick,
  handleOpenModal,
}: ImageListPropsType) {
  return (
    <ImageListItem
      sx={{
        padding: 1,
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      }}
      key={imageData.imageUrl}
    >
      <img
        onClick={handleOpenModal}
        srcSet={imageData.imageUrl}
        alt="gallery image"
        loading="lazy"
        style={{ cursor: 'pointer' }}
      />
      <ImageListItemBar title={`by: ${imageData.userName}`} position="below"></ImageListItemBar>
      {isEditable && (
        <ButtonGroup
          sx={{ alignSelf: 'center' }}
          variant="contained"
          aria-label="format button group"
        >
          <Button onClick={handleEditButtonClick}>edit</Button>
          <Button onClick={handleDeleteButtonClick}>delete</Button>
        </ButtonGroup>
      )}
    </ImageListItem>
  );
}

export default ImageItem;
