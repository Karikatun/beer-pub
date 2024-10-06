import { Outlet } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames';

import { Navbar } from 'widgets/Navbar';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import cls from './Stars.module.scss';

import 'app/styles/index.scss';

interface MainAppLayoutProps {
  className?: string;
  rating: number;
}

export const Stars = ({ className, rating }: MainAppLayoutProps) => (
  <div className={classNames(cls.stars, {}, [className])} style={{ '--rating': rating } as React.CSSProperties}>
  </div>
);
