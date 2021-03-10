import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { URL_SERVER } from '../Constants';
import { useHeader } from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '28ch',
    },
  },
}));


function Review() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const { setTitle } = useHeader();
  const [formValue, setForm] = useState({ star_rating: 0, author: '', headline: '', body: '' });

  useEffect(() => {
    setTitle('Review');
  }, [setTitle]);

  if (!params.id) {
    return (<div>An ID param is missing</div>);
  }

  const postReview = () => {
    fetch(
      `${URL_SERVER}/reviews`,
      {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formValue, productId: params.id }) 
      }
    )
    .then(() => {
      history.push(`/reviews/${params.id}`);
    })
    .catch(console.log);
  };

  const handleFieldEvent = (prop) => (event) => {
    const a = event.target.value;
    setForm((state) => ({ ...state, [prop]: a }))
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="author" label="Name" required value={formValue.author} onChange={handleFieldEvent('author')} />
      <Box component="fieldset" mb={3} borderColor="transparent" style={{ padding: 0 }}>
        <Typography component="legend">Rating</Typography>
        <Rating
          name="rating"
          value={formValue.star_rating}
          onChange={(event, newValue) => {
            setForm((state) => ({ ...state, star_rating: newValue }))
          }}
        />
      </Box>
      <TextField id="headline" label="Title of the review" required  value={formValue.headline} onChange={handleFieldEvent('headline')} />
      <TextField id="body" label="Content" required  value={formValue.body} onChange={handleFieldEvent('body')} />
      <Button color="primary" size="small" onClick={postReview}>Send Review</Button>
    </form>
  );
}

export default Review;