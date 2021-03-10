import React, { useContext, useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

export const HeaderContext = createContext();

const useHeaderFunction = () => {
  const [ title, setTitle ] = useState('Products');
  return { title, setTitle };
}

export const HeaderProvider = ({ children }) => {
  const header = useHeaderFunction();
  return <HeaderContext.Provider value={header}>{children}</HeaderContext.Provider>;
}

export const useHeader = () => {
  return useContext(HeaderContext)
}

export default function Header() {
  const clasess = useStyles();
  const history = useHistory();
  const header = useHeader();

  return (
    <React.Fragment>
      <Button color="inherit" onClick={() => history.push('/')}>Go to products</Button>
      <Typography variant="h6" className={clasess.title}>Oliver Space - {header.title}</Typography>
      <Button color="inherit"></Button>
    </React.Fragment>
  );
}