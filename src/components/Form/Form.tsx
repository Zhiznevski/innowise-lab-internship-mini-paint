import { Button, Card, CardContent, Link, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface FormType {
  formInfo: {
    title: string;
    Subtitle: string;
    navigateRoute: string;
    navigateLinkText: string;
    submitText: string;
  };
  children: ReactNode;
}

function Form({ formInfo, children }: FormType) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ marginBottom: 2 }} variant="h5">
          {formInfo.title}
        </Typography>
        <Typography sx={{ marginBottom: 3 }} variant="body2">
          {formInfo.Subtitle}
          <Link sx={{ marginLeft: 1 }} component={RouterLink} to={formInfo.navigateRoute}>
            {formInfo.navigateLinkText}
          </Link>
        </Typography>
        {children}
        <Button type="submit" sx={{ marginTop: 3 }} fullWidth variant="contained" size="large">
          {formInfo.submitText}
        </Button>
      </CardContent>
    </Card>
  );
}
export default Form;
