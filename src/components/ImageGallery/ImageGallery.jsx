import { useMemo } from 'react';
import { Gallery } from './ImageGallery-styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
    return (
     <Gallery>
      {
        useMemo(() => {
         return images.map(({id, webformatURL, largeImageURL, tags }) => (
            < ImageGalleryItem
             key={id} 
             smallImg={webformatURL}
             largeImageURL={largeImageURL}
             tags={tags}/>
            ))
        }, [images])
      }
      </Gallery>
    )
};