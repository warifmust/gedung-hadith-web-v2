import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import RecentOrders from 'src/content/applications/Transactions/RecentOrders';
import PageHeader from 'src/content/dashboards/Hadiths/PageHeader';
import { useQuery } from 'react-query';
import { getHadiths } from 'src/api/hadiths';
import HadithListTable from './HadithListTable';

function HadithList() {

  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <HadithListTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default HadithList;
