import { createPortal } from "react-dom"

import { useAppSelector } from "app/store/hooks"

import { BeerItemModal } from "widgets/BeerItemModal";

const modalContainer = document.getElementById('overlays');

export const Overlays = () => {
  const { id: beerIdModal } = useAppSelector(state => state.beerModal);

  const renderPortals = () => (
    <>
      {!!beerIdModal && <BeerItemModal id={beerIdModal} />}
    </>
  )

  return createPortal(renderPortals(), modalContainer)
}