import { TableBody, TableRow, TableCell, Skeleton } from '@mui/material';

const SkeletonTable = ({ rows = 5, columns = 7 }) => {
  return (
    <TableBody>
      {Array.from(new Array(rows)).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from(new Array(columns)).map((_, colIndex) => (
            <TableCell key={colIndex}>
              {colIndex === 0 && (
                <Skeleton
                  variant="text"
                  style={{ height: '60px', width: '60px' }}
                />
              )}
              {colIndex === 1 && (
                <Skeleton
                  variant="text"
                  style={{ height: '60px', width: '60px' }}
                />
              )}
              {colIndex > 1 && (
                <Skeleton
                  variant="text"
                  style={{ height: '60px', width: '40px' }}
                />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SkeletonTable;
