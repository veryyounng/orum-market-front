import { Grid, Skeleton } from '@mui/material';
interface IProductSkeleton {
  itemsPerPage: number;
  getItemSize: () => { xs: number; sm: number; md: number; lg: number };
}
const ProductSkeleton = ({ itemsPerPage, getItemSize }: IProductSkeleton) => {
  return (
    <Grid container spacing={4} m={4}>
      {Array.from(new Array(itemsPerPage)).map((_, index) => (
        <Grid item key={index} {...getItemSize()}>
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductSkeleton;
