import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { setBeerIdModal } from 'app/store/slices/beerModal';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import { FilterItems } from 'shared/ui/FilterItems';
import { BeerHeader } from 'shared/ui/BeerHeader';

/**
 * Компонент для отображения списка напитков.
 *
 * Каждое пиво представлено в виде карточки, которая содержит BeerHeader, style, FilterItems и сокращенное описание.
 * Компонент извлекает список пива из магазина и позволяет пользователю нажать на пиво, чтобы открыть модальное окно
 *
 * @returns {ReactElement} React компонент отображающий список напитков.
 */
export const BeersList = () => {
  const { beers } = useAppSelector(state => state.beers);
  const dispatch = useAppDispatch();

  // Функция открытия модального окна с информацией о пиве
  const openBeerItem = async (id: number) => {
    dispatch(setBeerIdModal(id));
  }

  return (
    <Box sx={{ overflow: 'auto', flex: 1 }}>
      <Grid2 container spacing={1} sx={{ marginBottom: '20px', flex: 1 }}>
        {beers.map((beer) => {
          const { style, description, id } = beer;

          return (
            <Grid2 size={6} sx={{ display: 'flex', cursor: 'pointer' }} key={id}>
              <Card sx={{ flex: 1 }} onClick={() => openBeerItem(id)}>
                <CardContent>
                  <BeerHeader beer={beer} />
                  <Typography variant='subtitle2'>{style}</Typography>
                  <FilterItems beer={beer} />
                  <Typography sx={{
                    '-webkit-line-clamp': '2',
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden'
                  }}>{description.split('Notes:')[1]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};
