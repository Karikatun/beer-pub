import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "app/store/hooks";
import { fetchBeerItem, removeBeerIdModal } from "app/store/slices/beerModal";

import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography";
import { api } from "app/network/api";
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

const BeerItemModal = ({ id }: { id: number }) => {
  const [image, setImage] = useState('');
  const dispatch = useAppDispatch();
  const { item, loading } = useAppSelector(state => state.beerModal)

  const fetchImage = async () => {
    if (item) {
      const { name, description, style } = item;
      const response = await api.getBeerImage(id, name, description, style);
  
      setImage(response.data.image);
    }
  }

  const handleClose = () => {
    dispatch(removeBeerIdModal())
  };

  const renderSortingItem = ({ label, value }: Record<string, string | number>) => (
    <Grid2 sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', px: 1
    }}>
      <Typography variant='subtitle2'>
        {label} {value}
      </Typography>
    </Grid2>
  );

  const renderLoader = () => {
    return (
      <>Loading...</>
    )
  }

  const renderContent = () => {
    if (!item) {
      return <></>
    }
    
    const { name, style, abv, bitter, sweet, sour, description, brewery } = item;

    const filterItems = [
      { label: 'Alc%', value: abv },
      { label: 'Горечь', value: bitter },
      { label: 'Сладость', value: sweet },
      { label: 'Кислотность', value: sour }
    ];

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
          <Grid2 container spacing={0.5} direction='column'>
            <Typography variant='h5'>{name}</Typography>
            <Typography variant='subtitle2'>Тип: {style}</Typography>
            <Typography variant='subtitle2'>Пивоварня: {brewery}</Typography>
            <Grid2 container spacing={1} sx={{ my: 0.5 }}>
              {filterItems.map(item => renderSortingItem(item))}
            </Grid2>
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
    if (item) fetchImage();
  }, [item])

  return (
    <Modal id={`beerItemModal-${id}`} open={true} onClose={handleClose} sx={{ outline: 'none'}}>
      <Box sx={style}>
        {loading ? renderLoader() : renderContent()}
      </Box>
    </Modal>
  )
}

export default BeerItemModal;
