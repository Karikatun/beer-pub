import Grid2 from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import Star from "@mui/icons-material/Star"

import { Beer } from "app/store/slices/beers"

export const BeerHeader = ({ beer: { name, review_overall} }: { beer: Beer }) => {
  return (
    <Grid2 container direction='row' justifyContent='space-between' alignItems='start'>
      <Grid2 size={10}>
        <Typography variant='h5'>{name}</Typography>
      </Grid2>
      <Grid2 container direction='row' spacing={1} alignItems='center'>
        <Typography variant='h6'>{(+review_overall).toFixed(2)}</Typography>
        <Star color='warning' />
      </Grid2>
    </Grid2>
  )
}