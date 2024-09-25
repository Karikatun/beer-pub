import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';

import cls from './NotFound.module.scss';

interface NotFoundProps {
  className?: string
}

export const NotFound = ({ className }: NotFoundProps) => {
  const { t } = useTranslation('not_found');
  return (
    <div className={classNames(cls.NotFound, {}, [className])}>
      {t('not_found.message')}
    </div>
  );
};
