import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';

import { classNames } from 'shared/lib/classNames';

import cls from './PageError.module.scss';

interface PageErrorProps {
  className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p>{t('error_boundary.message')}</p>
      <Button onClick={reloadPage}>{t('error_boundary.button')}</Button>
    </div>
  );
};
