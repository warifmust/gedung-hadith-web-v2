import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  // Tooltip,
  // CardActionArea,
  Skeleton
} from '@mui/material';
import BookmarksTwoToneIcon from '@mui/icons-material/BookmarksTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';

import { styled } from '@mui/material/styles';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useQuery } from 'react-query';
import { getHadiths } from 'src/api/hadiths';
import { getBooks } from 'src/api/books';
import { getNarrators } from 'src/api/narrators';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-left: -${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(1)};
        margin-top: ${theme.spacing(2)};
`
);

// const AvatarAddWrapper = styled(Avatar)(
//   ({ theme }) => `
//         background: ${theme.colors.alpha.black[5]};
//         color: ${theme.colors.primary.main};
//         width: ${theme.spacing(8)};
//         height: ${theme.spacing(8)};
// `
// );

// const CardAddAction = styled(Card)(
//   ({ theme }) => `
//         border: ${theme.colors.primary.main} dashed 1px;
//         height: 100%;
//         color: ${theme.colors.primary.main};

//         .MuiCardActionArea-root {
//           height: 100%;
//           justify-content: center;
//           align-items: center;
//           display: flex;
//         }

//         .MuiTouchRipple-root {
//           opacity: .2;
//         }

//         &:hover {
//           border-color: ${theme.colors.alpha.black[100]};
//         }
// `
// );

function Wallets(): JSX.Element {
  const queryHadiths = useQuery('GET_HADITHS', getHadiths);
  const queryBooks = useQuery('GET_Books', getBooks);
  const queryNarrators = useQuery('GET_HADITHS', getNarrators);


  const isLoading =
    queryHadiths.isLoading && queryBooks.isLoading && queryNarrators.isLoading;

  const data = [
    {
      image: <BookmarksTwoToneIcon color="primary" fontSize="large" />,
      title: 'Hadith',
      subtitle: 'Jumlah hadith',
      value: `${queryHadiths?.data?.length} hadith`,
      valueChange: '0.00'
    },
    {
      image: <MenuBookTwoToneIcon color="primary" fontSize="large" />,
      title: 'Kitab-kitab',
      subtitle: 'Jumlah kitab-kitab',
      value: `${queryBooks?.data?.length} buah`,
      valueChange: '0.00'
    },
    {
      image: <GroupsTwoToneIcon color="primary" fontSize="large" />,
      title: 'Perawi',
      subtitle: 'Jumlah perawi',
      value: `${queryNarrators?.data?.length} orang`,
      valueChange: '0.00'
    },
    {
      image: <GroupsTwoToneIcon color="primary" fontSize="large" />,
      title: 'Bitcoin',
      subtitle: 'BTC',
      value: '0.00',
      valueChange: '0.00'
    }
  ];

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Gedung Hadiths Data</Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Tambah Hadith
        </Button>
      </Box>
      <Grid container spacing={3}>
        {data.map((item, index) =>
          !isLoading ? (
            <Grid xs={12} sm={6} md={3} item key={index}>
              <Card sx={{ px: 1 }}>
                <CardContent>
                  <AvatarWrapper>{item.image}</AvatarWrapper>
                  <Typography variant="h5" noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {item.subtitle}
                  </Typography>
                  <Box sx={{ pt: 3 }}>
                    <Typography variant="h3" gutterBottom noWrap>
                      {item.value}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {item.valueChange}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid xs={12} sm={6} md={3} item key={index}>
              <Card sx={{ px: 1 }}>
                <CardContent>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" />
                  <Skeleton variant="rectangular" width={210} height={118} />
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </>
  );
}

export default Wallets;
