import { Card, CardContent, Link, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface FormType {
  formInfo: {
    title: string;
    Subtitle: string;
    navigateRoute: string;
    navigateLinkText: string;
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
      </CardContent>
    </Card>
  );
}
export default Form;
