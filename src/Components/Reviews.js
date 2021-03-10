import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { URL_SERVER } from '../Constants';
import { useHeader } from './Header';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'flex',
  },
  card: {
    margin: 10,
    maxWidth: 300,
    minWidth: 300,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Reviews() {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const params = useParams();
  const history = useHistory();
  const { setTitle } = useHeader();

  useEffect(() => {
    if (params.id) {
      fetch(`${URL_SERVER}/reviews?productId=${params.id}`)
        .then(r => r.json())
        .then(setReviews)
        .catch(console.error);
    }
  }, [params.id]);

  useEffect(() => {
    setTitle('All Reviews');
  }, [setTitle]);

  if (!params.id) {
    return (<div>An ID param is missing</div>);
  }

  return (<div className={classes.root}>
    {!!reviews.length && reviews.map((review) => (
      <Card key={review.id} className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Title: {review.headline}
          </Typography>
          <Box component="fieldset" mb={3} borderColor="transparent" style={{ padding: 0 }}>
            <Rating name="read-only" value={review.star_rating} readOnly />
          </Box>
          <Typography className={classes.pos} color="textSecondary">
            Author: {review.author}
          </Typography>
          <Typography variant="body2" component="p">
            {review.body}
          </Typography>
        </CardContent>
      </Card>
    ))}
    {!reviews.length && <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            There are not reviews
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => history.push(`/review/${params.id}`)}>Create one</Button>
        </CardActions>
      </Card>}
  </div>
  );
}