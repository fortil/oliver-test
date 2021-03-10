import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { URL_SERVER } from '../Constants';
import { useHeader } from './Header';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'flex',
  },
  card: {
    margin: 10
  }
});

export default function Products() {
  const classes = useStyles();
  const [produts, setProducts] = useState([]);
  const { setTitle } = useHeader();
  const history = useHistory();

  
  useEffect(() => {
    fetch(`${URL_SERVER}/products`)
    .then(r => r.json())
    .then(setProducts)
    .catch(console.error);
  }, []);
  
  useEffect(() => {
    setTitle('Products');
  }, [setTitle]);

  return (<div className={classes.root}>
    {!!produts.length && produts.map(({ id, name }) => (
      <Card key={id} className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" size="small" onClick={() => history.push(`/review/${id}`)}>Review</Button>
          <Button size="small" onClick={() => history.push(`/reviews/${id}`)}>View All Reviews</Button>
        </CardActions>
      </Card>
    ))}
  </div>
  );
}