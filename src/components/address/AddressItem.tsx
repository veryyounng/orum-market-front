import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AddressItem({
  userId,
  id,
  addressName,
  receiver,
  mainAddress,
  subAddress,
  tel,
  onRemove,
}) {
  return (
    <>
      <Box
        key={id}
        sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'flex-start',
          flexDirection: 'column',
          marginTop: '0.2rem',
        }}
      >
        <Card
          sx={{
            minWidth: '100%',
            boxShadow: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'rows',
            paddingTop: '1rem',
          }}
        >
          <CardContent sx={{ padding: '0' }}>
            <Typography variant="body1" sx={{ marginBottom: '0.3rem' }}>
              {addressName}
            </Typography>
            <Typography variant="body2">{receiver}</Typography>
            <Typography variant="body2">{tel}</Typography>
            <Typography variant="body2">
              {mainAddress} {subAddress}
            </Typography>
          </CardContent>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <Link
              to={`/user/${userId}/address-update`}
              state={{
                userId,
                id,
                addressName,
                receiver,
                mainAddress,
                subAddress,
                tel,
              }}
            >
              <Button variant="contained">수정</Button>
            </Link>
            <Button variant="outlined" onClick={() => onRemove(id)}>
              삭제
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
