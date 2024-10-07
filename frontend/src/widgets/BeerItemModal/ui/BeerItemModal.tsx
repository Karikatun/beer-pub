import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { fetchBeerItem, removeBeerIdModal } from "app/store/slices/beerModal";

import { api } from "app/network/api";

import { BeerHeader } from "shared/ui/BeerHeader";
import { FilterItems } from "shared/ui/FilterItems";
import { Stars } from "shared/ui/Stars";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";


const style = {
  position: 'absolute',
  overflow: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

/**
  * Компонент для отображения подробной информации о напитке в модальном окне.
  * @param {number} id - ID напитка.
  * @returns Элемент JSX с модальным окном, содержащим подробную информацию о напитке.
*/
const BeerItemModal = ({ id }: { id: number }) => {
  const [image, setImage] = useState('');
  const dispatch = useAppDispatch();
  const { item, loading } = useAppSelector(state => state.beerModal)

  const fetchImage = async () => {
    if (item) {
      const response = await api.getBeerImage(item);
  
      setImage(response.data.image);
    }
  }

  const handleClose = () => {
    dispatch(removeBeerIdModal())
  };

  const renderRatingItem = (label: string, rating: number) => {
    return (
      <Grid2 container direction='row' alignItems='center' key={label}>
        <Typography variant='subtitle2'>{label}: {(+rating).toFixed(2)}</Typography>
        <Stars rating={rating} />
      </Grid2>
    )
  }

  const renderLoader = () => {
    return (
      <>Loading...</>
    )
  }

  const renderContent = () => {
    if (!item) {
      return <></>
    }
    
    const { name, style, description, brewery, review_appearance, review_taste, review_aroma } = item;

    const ratingItems = [
      {label: 'Внешний вид', value: review_appearance },
      {label: 'Вкус', value: review_taste },
      {label: 'Аромат', value: review_aroma }
    ]

    return (
      <Grid2 container spacing={2} direction='column'>
        <Grid2 container direction='row'>
          <Grid2 width='250px' height='250px'>
            {image ? (
              <img src={`data:image/png;base64,${image}`} alt={name} style={{ width: '100%' }} />
            ) : (
              <Skeleton variant="rectangular" height='100%' sx={{ flex: 1 }} />
            )}
          </Grid2>
          <Grid2 container spacing={0.5} direction='column' flex={1}>
            <BeerHeader beer={item} />

            <Typography variant='subtitle2'>Тип: {style}</Typography>
            <Typography variant='subtitle2'>Пивоварня: {brewery}</Typography>

            {ratingItems.map(item => renderRatingItem(item.label, item.value))}

            <FilterItems beer={item} />
          </Grid2>
        </Grid2>
        <Typography>
          {description.split('Notes:')[1]}
        </Typography>
      </Grid2>
    )
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchBeerItem(id))
    }
  }, [id])

  useEffect(() => {
    if (item && ENABLE_AI_IMAGES) fetchImage();
  }, [item]);

  return (
    <Modal id={`beerItemModal-${id}`} key={`beerItemModal-${id}`} open={true} onClose={handleClose} sx={{ outline: 'none'}}>
      <Box sx={style}>
        {loading ? renderLoader() : renderContent()}
      </Box>
    </Modal>
  )
}

export default BeerItemModal;
