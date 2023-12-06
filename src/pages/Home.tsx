import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import { SearchPage } from './product/SearchPage';

export default function Home() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SearchPage />
    </Box>
  );
}
