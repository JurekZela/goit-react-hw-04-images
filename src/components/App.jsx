import { useState, useEffect } from 'react';
import  { toast } from 'react-hot-toast';
import { RotatingTriangles } from 'react-loader-spinner'
import { fetchImg } from '../Api';
import { Searchbar } from './Searchbar/Searchbar';
import { Wrapper } from '../GlobalStyled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

const Loader = <RotatingTriangles
visible={true}
height="80"
width="80"
ariaLabel="rotating-triangels-loading"
wrapperStyle={{}}
wrapperClass="rotating-triangels-wrapper"
/>

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMoreImages, setLoadingMoreImages] = useState(false);

  useEffect(() => {
    async function loadingResults() {
      try {
        setLoading(true);
        setLoadingMoreImages(true);

        if (!query) {
          return;
        };

        const initialQuizzes = await fetchImg(query, pages);
  
        if (initialQuizzes.length) {
          setImages(prevImages => pages > 1 ? [...prevImages, ...initialQuizzes ] : initialQuizzes)
        } else {
          toast.error(`Sorry, but we didn't found any image!`);
        }
  
      } catch{
        setError(true);
      }
      finally {
        setLoading(false);
        setLoadingMoreImages(false);
      }
    }

    loadingResults()
  }, [query, pages]);

  const searchImages = newQuery => {
    const currentQuery = `${Date.now()}/${newQuery}`;

    setQuery(currentQuery);
    setPages(1);
    setImages([]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const value = e.target.elements[1].value.trim()

    if (!value) {
      return toast.error('Not a Value!');
    };
    
    searchImages(value);

    e.target.reset();
  };

 const onClickLoadMore = () => setPages(prevPages => prevPages + 1);

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit} />
      {error && <b>OOPS! Something went wrong! Please try reloading this page :-) </b>}
      {loading && Loader}
     {
     images.length > 0 && 
     <>
     <ImageGallery images={images}/>
     <Button loader={loadingMoreImages} onClick={onClickLoadMore}/>
     </>
     }
    </Wrapper>
  );
};