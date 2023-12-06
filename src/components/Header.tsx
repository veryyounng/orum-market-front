import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Avatar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  List,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useUserStore } from '../lib/store';
import { useContext, useRef, useState } from 'react';
import { Logout } from '@mui/icons-material';
import { IUserStore } from '../type';
import useOutsideClick from '../hooks/useOutsideClick';
import CategoryNavBar from './CategoryNavBar';
import { ColorModeContext } from '../App';

export default function Header() {
  const { isLoggedIn, logOut } = useUserStore() as IUserStore;
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [showCategoryNavBar, setShowCategoryNavBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const headerRef = useRef(null);
  useOutsideClick(headerRef, () => {
    if (showCategoryNavBar) {
      setShowCategoryNavBar(false);
    }
  });

  const handleDashboard = () => {
    navigate(`/user/${_id}`); // Navigate to dashboard route
    handleMenuClose();
  };

  const _id = localStorage.getItem('_id');

  const handleLogoutDialogOpen = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutDialogClose = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = () => {
    logOut();
    alert('로그아웃 되었습니다. 다음에 또 만나요!');
    setOpenLogoutDialog(false);
    navigate('/');
  };

  const { items: cartItems } = useCart();
  const cartItemsCount = cartItems.length;

  function isLoggedInUserButton() {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton color="inherit">
            <Badge badgeContent={cartItemsCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleAvatarClick}
          color="inherit"
        >
          <Avatar alt="User Avatar" src="/path/to/your/avatar.jpg" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDashboard}>대시보드</MenuItem>
          <MenuItem onClick={handleLogoutDialogOpen}>로그아웃</MenuItem>
          <LogoutDialog
            open={openLogoutDialog}
            onClose={handleLogoutDialogClose}
            onConfirm={handleLogout}
          />
        </Menu>
      </Box>
    );
  }

  function notLoggedInUserButton() {
    return (
      <>
        <Link to="/sign-in">
          <Button variant="text" color="inherit">
            로그인
          </Button>
        </Link>
        <Link to="sign-up">
          <Button variant="text" color="inherit">
            회원가입
          </Button>
        </Link>
      </>
    );
  }
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {/* {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))} */}
        {isLoggedIn && isLoggedInUserButton()}
        {!isLoggedIn && notLoggedInUserButton()}
      </List>
    </Box>
  );
  const container =
    typeof window !== 'undefined' ? window.document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          zIndex: theme.zIndex.drawer + 2,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <img
                src="../../assets/logo.png"
                alt="ORUM"
                style={{ width: '100px', height: 'auto' }}
              />
            </Typography>
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'end', margin: '0 auto' }}>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            {isLoggedIn && isLoggedInUserButton()}
            {!isLoggedIn && notLoggedInUserButton()}
          </Box>
        </Toolbar>
        {showCategoryNavBar && <CategoryNavBar />}
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '240px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function LogoutDialog({ open, onClose, onConfirm }: LogoutDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'로그아웃'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          정말로 로그아웃 하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button
          startIcon={<Logout />}
          onClick={onConfirm}
          color="primary"
          autoFocus
        >
          로그아웃
        </Button>
      </DialogActions>
    </Dialog>
  );
}
