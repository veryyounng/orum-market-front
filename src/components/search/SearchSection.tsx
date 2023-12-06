import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { api } from '../../api/api';

export function SearchSection() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setSearchQuery(inputValue);
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }

    try {
      const response = await api.searchProducts(inputValue, 0, 999999);
      setSearchResult(response.data.item);
    } catch (error) {
      console.error('Failed to search products', error);
    }
  };

  return (
    <>
      <Box sx={{ my: 2 }}>
        <form onSubmit={handleSearch}>
          <FormControl variant="standard" fullWidth>
            <InputBase
              id="search-input"
              startAdornment={<SearchIcon sx={{ fontSize: '3rem' }} />}
              placeholder="검색해볼까"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={searchInputRef}
              sx={{
                borderBottom: '1px solid black',
                pl: 1,
                pb: 1,
                maxWidth: '960px',
                alignItems: 'flex-end',
                fontSize: '2rem',
                gap: '1rem',
              }}
              inputProps={{
                'aria-label': 'search',
              }}
            />
          </FormControl>
        </form>
        {searchResult.length > 0 && searchQuery && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>'{searchQuery}'</strong> 검색 결과{' '}
            <span style={{ color: 'red' }}>{searchResult.length}</span>개의
            상품이 있습니다.
          </Typography>
        )}
        {searchResult.length === 0 && searchQuery && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>'{searchQuery}'</strong> 검색 결과가 없습니다.
          </Typography>
        )}
      </Box>
    </>
  );
}
