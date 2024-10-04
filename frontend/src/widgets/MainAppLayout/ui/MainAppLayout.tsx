import { Outlet } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames';

import { Navbar } from 'widgets/Navbar';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import cls from './MainAppLayout.module.scss';

import 'app/styles/index.scss';

interface MainAppLayoutProps {
  className?: string;
}

export const MainAppLayout = ({ className }: MainAppLayoutProps) => (
  <Box className={classNames(cls.app, {}, [className])}>
    <Navbar />
    <Toolbar variant='dense' />
    <Box className={classNames('content-wrapper')}>
      <Outlet />
    </Box>
  </Box>
);
