import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '100%',
  color: theme.palette.text.primary,
  ...theme.applyStyles('light', {
    backgroundColor: '#f9f9f9',
  }),
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',

  }),
}));

export default Item;