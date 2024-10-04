import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { setBeerIdModal } from 'app/store/slices/beerModal';

export const BeersList = () => {
  const { beers } = useAppSelector(state => state.beers);
  const dispatch = useAppDispatch();

  const openBeerItem = async (id: number) => {
    dispatch(setBeerIdModal(id));
  }

  const renderSortingItem = ({ label, value }: Record<string, string | number>) => (
    <Grid2 sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', px: 1
    }}>
      <Typography variant='subtitle2'>
        {label} {value}
      </Typography>
    </Grid2>
  );

  return (
    <Box sx={{ overflow: 'auto', flex: 1 }}>
      <Grid2 container spacing={1} sx={{ marginBottom: '20px', flex: 1 }}>
        {beers.map(({ name, style, abv, bitter, sweet, sour, description, id }) => {
          const filterItems = [
            { label: 'Alc%', value: abv },
            { label: 'Горечь', value: bitter },
            { label: 'Сладость', value: sweet },
            { label: 'Кислотность', value: sour }
          ];

          return (
            <Grid2 size={6} sx={{ display: 'flex', cursor: 'pointer' }}>
              <Card sx={{ flex: 1 }} onClick={() => openBeerItem(id)}>
                <CardContent>
                  <Typography variant='h5'>{name}</Typography>
                  <Typography variant='subtitle2'>{style}</Typography>
                  <Grid2 container spacing={1} sx={{ my: 0.5 }}>
                    {filterItems.map(item => renderSortingItem(item))}
                  </Grid2>
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
