import { Formik } from 'formik';
// import { ReactComponent as SearchIcon } from '../images/search.svg';
import { FiSearch } from "react-icons/fi";
import { Header, FormStyles as Form, Button, Input } from './Searchbar-styled';

export const Searchbar = ({ onSubmit }) => {
        return (
      <Formik  >
          <Header>
            <Form  onSubmit={onSubmit}>
                <Button type="submit"  >
                    <FiSearch size="25"/>
                </Button>
                <Input
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                  />
            </Form>
        </Header>
      </Formik>
        )
    };