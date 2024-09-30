import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { fetchBeers, setCurrentPage } from 'app/store/slices/beers';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Grid2 from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';

const filterFields = [
  {label: 'Название', value: 'name'}, 
  {label: 'Алкоголь, об.', value: 'alcohol'}, 
  {label: 'Горечь', value: 'bitter'}, 
  {label: 'Тип', value: 'style'}, 
  {label: 'Кислотность', value: 'sour'}, 
  {label: 'Сладость', value: 'sweet'}
]

const MainPage = () => {
  const [filter, setFilterValue] = useState(filterFields[0]);
  const [style, setStyle] = useState();
  const { t } = useTranslation('main');
  const dispatch = useAppDispatch();
  const { beers, totalPages, currentPage } = useAppSelector(state => state.beers);
  const { styles } = useAppSelector(state => state.beerStyles);

  useEffect(() => {
    dispatch(fetchBeers({currentPage, sortBy: filter.value, style}))
  }, [currentPage])

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value))
  }

  const handleChangeSortField = (_: SelectChangeEvent<string>, child?: any) => {
    setFilterValue(child.props);
    if (currentPage === 1) {
      dispatch(fetchBeers({ currentPage, sortBy: child.props.value, style }))
    } else {
      dispatch(setCurrentPage(1))
    }
  }

  const handleChangeStyleField = (_: SelectChangeEvent<string>, child?: any) => {
    setStyle(child.props.value);
    if (currentPage === 1) {
      dispatch(fetchBeers({currentPage, sortBy: filter.value, style: child.props.value}))
    } else {
      dispatch(setCurrentPage(1))
    }
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
      <Grid2>
        <FormControl sx={{ mb: 2, width: 300 }}>
          <InputLabel id="filter-by-label">Сортировать по</InputLabel>
          <Select
            labelId="filter-by-label"
            id="filter-by-label-id"
            value={filter.value}
            onChange={handleChangeSortField}
          >
            {filterFields.map((field) => (
              <MenuItem key={field.value} value={field.value}>{field.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl sx={{ mb: 2, ml: 2, width: 300 }}>
          <InputLabel id="filter-by-style">Тип</InputLabel>
          <Select
            // displayEmpty
            labelId="filter-by-style"
            id="filter-by-style-id"
            value={style}
            onChange={handleChangeStyleField}
          >
            <MenuItem key={'emptyItem'}>Все</MenuItem>
            {styles.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Box sx={{ overflow: 'auto', flex: 1 }}>
        <Grid2 container spacing={1} sx={{ marginBottom: '20px', flex: 1 }}>
          {beers.map((beer) => (
            <Grid2 size={6} sx={{ display: 'flex' }}>
              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h5">{beer.name}</Typography>
                  <Typography variant="subtitle2">{beer.style}</Typography>
                  <Typography sx={{
                    '-webkit-line-clamp': '2',
                    display: '-webkit-box',
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden',
                  }}>{beer.description.split('Notes:')[1]}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Pagination count={totalPages} defaultPage={currentPage} onChange={handleChangePage} sx={{ mb: 2, mt: 1}} />
    </Container>
  );
};

export default MainPage;
