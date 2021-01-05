import React, {useContext, useEffect, useState} from 'react';

export const BookContext = React.createContext<{}>({});

export const useBook = () => useContext(BookContext);

type Props = React.PropsWithChildren<{}>;

type State = {};

const BookProvider = (props: Props) => {
  useEffect(() => {}, []);

  return (
    <BookContext.Provider value={{}}>{props.children}</BookContext.Provider>
  );
};

export default BookProvider;
