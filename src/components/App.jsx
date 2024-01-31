import { useState, useEffect, useRef } from 'react';
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

export default function App () {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPages] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMoreImages, setLoadingMoreImages] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const controllerRef = useRef();

  useEffect(() => {

    async function loadingResults() {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();
      try {
        setLoading(true);
        setLoadingMoreImages(true);

        if (!query) {
          return;
        }

        const initialQuizzes = await fetchImg(query, page, controllerRef);
        setTotalHits(initialQuizzes.results.length);

        initialQuizzes.results.length ? 
        setImages(prevImages => page >= 1 ? [...prevImages, ...initialQuizzes.results ] : [...initialQuizzes.results])
        : toast.error(`Sorry, but we didn't found any image!`);
  
      } catch(e){
        if (e.code !== "ERR_CANCELED") {
          setError(true); 
        }
      }
      finally {
        setLoading(false);
        setLoadingMoreImages(false);
      }
    }

    loadingResults()

    return () => {
      controllerRef.current.abort();
    }

  }, [query, page]);


  const handleSubmit = e => {
    e.preventDefault();

    const value = e.target.elements[1].value.trim()

    !value ? toast.error('Not a Value!') : searchImages(value);

    e.target.reset();
  };

  const searchImages = newQuery => {
    const currentQuery = `${Date.now()}/${newQuery}`;

    setQuery(currentQuery);
    setPages(1);
    setImages([]);
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
     {page < totalHits && <Button loader={loadingMoreImages} onClick={onClickLoadMore}/>}
     </>
     }
    </Wrapper>
  );
}