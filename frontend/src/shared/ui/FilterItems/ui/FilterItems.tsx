import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

import { Beer } from "app/store/slices/beers";

/**
 * Компонент для отображения списка параметров напитка.
 * @param {Beer} props.beer - Объект напитка.
 * @returns Возвращает JSX элемент со списком параметров напитка.
 */
export const FilterItems = ({ beer: { abv, bitter, sweet, sour } }: { beer: Beer }) => {
  const filterItems = [
    { label: 'Alc%', value: abv },
    { label: 'Горечь', value: bitter },
    { label: 'Сладость', value: sweet },
    { label: 'Кислотность', value: sour }
  ];

  const renderSortingItem = ({ label, value }: Record<string, string | number>) => (
    <Grid2 sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', px: 1
    }} key={value}>
      <Typography variant='subtitle2'>
        {label} {value}
      </Typography>
    </Grid2>
  );
  
  return (
    <Grid2 container spacing={1} sx={{ my: 0.5 }}>
      {filterItems.map(item => renderSortingItem(item))}
    </Grid2>
  )
}