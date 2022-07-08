import {
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  Skeleton,
  Step,
  StepLabel,
  Stepper
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getHadithById } from 'src/api/hadiths';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from 'src/content/dashboards/Hadiths/PageHeader';

const HadithDetails = () => {
  const location = useLocation(); // @ts-ignore
  const hadithId = location.state.id;
  const { data, isLoading, error } = useQuery('GET_HADITHS_BY_ID', () =>
    getHadithById(hadithId)
  );

  return (
    <>
      <Helmet>
        <title>Hadith - Details</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        {isLoading ? null : (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={9}>
              <Card>
                <CardHeader title="Senarai Hadith"></CardHeader>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <CardHeader title="Sanad"></CardHeader>
                <Box sx={{ marginX: '1rem' }}>
                  <Stepper
                    activeStep={data.chains.length}
                    orientation="vertical"
                    sx={{ backgroundColor: 'transparent' }}
                  >
                    {data.chains.map((chain: string) => (
                      <Step key={chain}>
                        <StepLabel>{chain}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default HadithDetails;
