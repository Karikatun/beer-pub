import { useEffect, useState } from 'react';

import { fetchBeers, setCurrentPage } from 'app/store/slices/beers';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import { BeersList } from 'widgets/BeersList';

import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid2 from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const filterFields = [
  { label: 'ID', value: 'id' },
  { label: 'Название', value: 'name' },
  { label: 'Алкоголь, %', value: 'abv' },
  { label: 'Горечь', value: 'bitter' },
  { label: 'Тип', value: 'style' },
  { label: 'Кислотность', value: 'sour' },
  { label: 'Сладость', value: 'sweet' }
];

const MainPage = () => {
  const [filter, setFilterValue] = useState(filterFields[0]);
  const [style, setStyle] = useState();

  const dispatch = useAppDispatch();

  const { totalPages, currentPage } = useAppSelector(state => state.beers);
  const { styles } = useAppSelector(state => state.beerStyles);

  useEffect(() => {
    dispatch(fetchBeers({ currentPage, sortBy: filter.value, style }));
  }, [currentPage]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  const handleChangeSortField = (_: SelectChangeEvent<string>, child?: any) => {
    setFilterValue(child.props);

    if (currentPage === 1) {
      dispatch(fetchBeers({ currentPage, sortBy: child.props.value, style }));
    } else {
      dispatch(setCurrentPage(1));
    }
  };

  const handleChangeStyleField = (_: SelectChangeEvent<string>, child?: any) => {
    setStyle(child.props.value);
    if (currentPage === 1) {
      dispatch(fetchBeers({ currentPage, sortBy: filter.value, style: child.props.value }));
    } else {
      dispatch(setCurrentPage(1));
    }
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
      <Grid2 container spacing={2} sx={{ mb: 2 }}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id='filter-by-label'>Сортировать по</InputLabel>
          <Select labelId='filter-by-label'
                  id='filter-by-label-id'
                  value={filter.value}
                  label='Сортировать по'
                  onChange={handleChangeSortField}>
            {filterFields.map(field => (
              <MenuItem key={field.value} value={field.value}>{field.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 300 }}>
          <InputLabel id='filter-by-style'>Тип</InputLabel>
          <Select labelId='filter-by-style'
                  id='filter-by-style-id'
                  value={style}
                  label='Тип'
                  onChange={handleChangeStyleField}>
            <MenuItem key='emptyItem'>Все</MenuItem>
            {styles.map(item => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <BeersList />
      <Pagination count={totalPages} defaultPage={currentPage} onChange={handleChangePage} sx={{ mb: 2, mt: 1 }} />
    </Container>
  );
};

export default MainPage;
