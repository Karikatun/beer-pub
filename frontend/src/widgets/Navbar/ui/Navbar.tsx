import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';

import cls from './Navbar.module.scss';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const navItems = [
    {
      path: '/',
      label: t('navbar.main'),
    },
    {
      path: '/about',
      label: t('navbar.about'),
    },
  ]

  return (
    <AppBar>
      <Toolbar variant="dense">
        <Box sx={{ display: { sm: 'block' } }}>
          {navItems.map(({ path, label}) => (
            <Link to={path}>
              <Button key={label} sx={{ color: '#fff' }}>
                {label}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
