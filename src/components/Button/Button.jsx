import { LoadMore } from './Button-styled';

export const Button = ({ onClick, loader }) => {
    return (
        <LoadMore onClick={onClick}>{loader ? 'Is Loading' : 'Load More' }</LoadMore>
    )
};