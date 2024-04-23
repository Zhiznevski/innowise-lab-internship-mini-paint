import { useMediaQuery } from '@mui/material';

export const useCanvasSize = () => {
  const isMobile = useMediaQuery('(max-width:570px)');
  const isTablet = useMediaQuery('(max-width:780px)');

  if (isMobile) {
    return {
      width: 300,
      height: 450,
    };
  }
  if (isTablet) {
    return {
      width: 450,
      height: 600,
    };
  }

  return {
    width: 600,
    height: 750,
  };
};
