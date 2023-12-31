import { useState } from 'react';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem-styled';
import { LargeImage } from './Modal/Modal';

export const ImageGalleryItem = ({ smallImg, largeImageURL, tags }) => {
  const [modalOpen, setModal] = useState(false);

 const onModalOpen = () => setModal(true);
 const onModalClose = () => setModal(false);

    return (
        <>
         <GalleryItem onClick={onModalOpen}>
          <GalleryItemImg src={smallImg} alt={tags} />
         </GalleryItem>
         <LargeImage 
            isModalOpen={modalOpen} 
            closeModal={onModalClose} 
            largeImage={largeImageURL} 
            tags={tags}/>
        </>
        )
};