import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Skeleton
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/content/applications/Transactions/BulkActions';
import { Hadith } from 'src/content/dashboards/Hadiths/GedungHadith.types';
import { getHadiths } from 'src/api/hadiths';
import { useQuery } from 'react-query';
import {
  HadithStatuses,
  HadithStatusesMapping
} from 'src/content/dashboards/Hadiths/GedungHadith.enum';
import { Link } from 'react-router-dom';

interface HadithListTableProps {
  className?: string;
  //   hadiths: Hadith[] | any;
}

interface Filters {
  status?: HadithStatuses;
}

// const getStatusLabel = (status: HadithStatuses): JSX.Element => {
//   const map = {
//     completed: {
//       text: HadithStatuses.SAHIH,
//       color: 'success'
//     },
//     pending: {
//       text: HadithStatuses.DHAIF,
//       color: 'warning'
//     },
//     failed: {
//       text: HadithStatuses.MAUDU,
//       color: 'error'
//     }
//   };

//   const { text, color }: any = status && map[status];

//   return <Label color={color}>{text}</Label>;
// };

const applyFilters = (hadiths: Hadith[], filters: Filters): Hadith[] => {
  return (
    hadiths &&
    hadiths.filter((hadith) => {
      let matches = true;

      if (filters.status && hadith.status !== filters.status) {
        matches = false;
      }

      return matches;
    })
  );
};

const applyPagination = (
  hadiths: Hadith[],
  page: number,
  limit: number
): Hadith[] => {
  return hadiths && hadiths.slice(page * limit, page * limit + limit);
};

const HadithListTable: FC<HadithListTableProps> = () => {
  const { data, isLoading, error } = useQuery('GET_HADITHS', getHadiths);

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked ? data?.map((cryptoOrder) => cryptoOrder.id) : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(data, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < data?.length;
  const selectedAllCryptoOrders = selectedCryptoOrders.length === data?.length;
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <Card>
          <CardHeader title="Senarai Hadith">
            <Skeleton />
          </CardHeader>
        </Card>
      ) : (
        <Card>
          {selectedBulkActions && (
            <Box flex={1} p={2}>
              <BulkActions />
            </Box>
          )}
          {!selectedBulkActions && (
            <CardHeader
              action={
                <Box width={150}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters.status || 'all'}
                      onChange={handleStatusChange}
                      label="Status"
                      autoWidth
                    >
                      {statusOptions.map((statusOption) => (
                        <MenuItem key={statusOption.id} value={statusOption.id}>
                          {statusOption.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              }
              title="Senarai Hadith"
            />
          )}
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedAllCryptoOrders}
                      indeterminate={selectedSomeCryptoOrders}
                      onChange={handleSelectAllCryptoOrders}
                    />
                  </TableCell>
                  <TableCell>Potongan Hadith</TableCell>
                  <TableCell>Perawi</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Jilid/Buku</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCryptoOrders.map((cryptoOrder) => {
                  const isCryptoOrderSelected = selectedCryptoOrders.includes(
                    cryptoOrder.id
                  );
                  return (
                    <TableRow
                      hover
                      key={cryptoOrder.id}
                      selected={isCryptoOrderSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isCryptoOrderSelected}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleSelectOneCryptoOrder(event, cryptoOrder.id)
                          }
                          value={isCryptoOrderSelected}
                        />
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/kumpulan/senarai-hadith/${cryptoOrder.id}`}
                          state={{ id: cryptoOrder.id }}
                          style={{ textDecoration: 'none' }}
                        >
                          <Typography
                            sx={{ textDecoration: 'none' }}
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {`${cryptoOrder.hadithContent.malay.slice(
                              0,
                              40
                            )}...`}
                          </Typography>
                          <Typography
                            sx={{ textDecoration: 'none' }}
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            BUKHARI
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {cryptoOrder.narratedBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Label
                          color={HadithStatusesMapping[cryptoOrder.status]}
                        >
                          {cryptoOrder.status}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {`Jilid: ${cryptoOrder.content.volume}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {`Buku: ${cryptoOrder.content.bookNumber}`}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit Hadith" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Hadith" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={filteredCryptoOrders.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </Card>
      )}
    </>
  );
};

export default HadithListTable;
