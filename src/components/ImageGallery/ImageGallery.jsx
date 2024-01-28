import { useMemo } from 'react';
import { Gallery } from './ImageGallery-styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
    return (
     <Gallery>
      {
        useMemo(() => {
         return images.map(({id, urls:{ small, regular }, alt_description }) => (
            < ImageGalleryItem
             key={id} 
             smallImg={small}
             largeImageURL={regular}
             tags={alt_description}/>
            ))
        }, [images])
      }
      </Gallery>
    )
};