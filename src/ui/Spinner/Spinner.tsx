import { CircularProgress, LinearProgress } from '@mui/material';

interface SpinnerPropsType {
  variant?: 'circle' | 'linear';
}

function Spinner({ variant = 'circle' }: SpinnerPropsType) {
  if (variant === 'circle') {
    return <LinearProgress />;
  }
  return <CircularProgress />;
}

export default Spinner;
