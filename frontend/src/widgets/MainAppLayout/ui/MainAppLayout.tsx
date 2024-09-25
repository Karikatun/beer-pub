import { classNames } from 'shared/lib/classNames';

import cls from './MainAppLayout.module.scss';
import { Navbar } from 'widgets/Navbar';
import { Outlet } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';

import 'app/styles/index.scss';

interface MainAppLayoutProps {
  className?: string;
}

export const MainAppLayout = ({ className }: MainAppLayoutProps) => {
  return (
    <div className={classNames(cls.app, {}, [className])}>
      <Navbar />
      <Toolbar variant="dense" />
      <div className={classNames('content-wrapper')}>
        <Outlet />
      </div>
    </div>
  );
};
