// src/components/Features/Features.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import BiotechIcon from '@mui/icons-material/Biotech';
import DocImage from "../../assets/doc.webp"; // Adjust the path
import pharmacyImage from "../../assets/pharmacy.jpg"; // Adjust the path
import labImage from "../../assets/lab.webp"; // Adjust the path

const items = [
  {
    icon: <LocalHospitalIcon />,
    title: 'الأطباء',
    description: 'يمكنك استعراض جميع الأطباء المتاحين في المدينة والحصول على تفاصيل التواصل معهم ومواقعهم.',
    imageLight: `url(${DocImage})`,
    imageDark: `url(${DocImage})`,
    link:"/doctors",
    showLink:false
  },
  {
    icon: <LocalPharmacyIcon />,
    title: 'الصيدليات',
    description: 'يمكنك العثور على جميع الصيدليات في المدينة، ومعرفة أوقات العمل والموقع.',
    imageLight: `url(${pharmacyImage})`,
    imageDark: `url(${pharmacyImage})`,
    link:"/pharmacies",
    showLink:false

  },
  {
    icon: <BiotechIcon />,
    title: 'معامل ومراكز الأشعة',
    description: 'يمكنك العثور على جميع معامل التحاليل الطبية ومراكز الأشعة في المدينة.',
    imageLight: `url(${labImage})`,
    imageDark: `url(${labImage})`,
    link:"/medical-labs",
    showLink:true
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <div>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 4 } }}
          >
            استعرض الميزات الرئيسية لموقعنا التي تجعل البحث عن الأطباء والصيدليات في المدينة أكثر سهولة وكفاءة.
          </Typography>
        </div>
        <Grid container item gap={1} sx={{ overflowX: 'auto', whiteSpace: 'nowrap', display: { xs: 'auto', sm: 'none' } }}>
          {items.map(({ title }, index) => (
            <Chip
              key={index}
              label={title}
              onClick={() => handleItemClick(index)}
              sx={{
                lineHeight:"2rem",
                borderColor: (theme) => {
                  if (theme.palette.mode === 'light') {
                    return selectedItemIndex === index ? 'primary.light' : '';
                  }
                  return selectedItemIndex === index ? 'primary.light' : '';
                },
                background: (theme) => {
                  if (theme.palette.mode === 'light') {
                    return selectedItemIndex === index ? 'none' : '';
                  }
                  return selectedItemIndex === index ? 'none' : '';
                },
                backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                '& .MuiChip-label': {
                  color: selectedItemIndex === index ? '#fff' : '',
                },
                display: 'inline-block',
                margin: '0 4px', // Add some spacing between chips
              }}
            />
          ))}
        </Grid>
        <Box
          component={Card}
          variant="outlined"
          sx={{
            display: { xs: 'auto', sm: 'none' },
            mt: 4,
          }}
        >
          <Box
            sx={{
              backgroundImage: (theme) =>
                theme.palette.mode === 'light'
                  ? items[selectedItemIndex].imageLight
                  : items[selectedItemIndex].imageDark,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: 280,
            }}
          />
          <Box sx={{ px: 2, pb: 2}}>
            <Typography color="text.primary" variant="body2" fontWeight="bold" >
              {selectedFeature.title}
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
              {selectedFeature.description}
            </Typography>
           {selectedFeature.showLink && <Link
              color="primary"
              variant="body2"
              fontWeight="bold"
              to={selectedFeature.link}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                '& > svg': { transition: '0.2s' },
                '&:hover > svg': { transform: 'translateX(2px)' },
              }}
            >
              <span>تعرف على المزيد</span>
              <ChevronRightRoundedIcon
                fontSize="small"
                sx={{ mt: '1px', ml: '2px' }}
              />
            </Link>}
          </Box>
        </Box>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          useFlexGap
          sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
        >
          {items.map(({ icon, title, description,showLink }, index) => (
            <Card
              key={index}
              variant="outlined"
              component={Button}
              onClick={() => handleItemClick(index)}
              sx={{
                p: 3,
                height: 'fit-content',
                width: '100%',
                background: 'none',
                backgroundColor: selectedItemIndex === index ? 'action.selected' : undefined,
                borderColor: (theme) => {
                  if (theme.palette.mode === 'light') {
                    return selectedItemIndex === index ? 'primary.light' : 'grey.200';
                  }
                  return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  textAlign: 'left',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { md: 'center' },
                  gap: 2.5,
                }}
              >
                <Box
                  sx={{
                    color: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'primary.main' : 'grey.300';
                      }
                      return selectedItemIndex === index ? 'primary.main' : 'grey.700';
                    },
                  }}
                >
                  {icon}
                </Box>
                <Box sx={{ textTransform: 'none' }}>
                  <Typography
                    color="text.primary"
                    variant="body2"
                    fontWeight="bold"
                  >
                    {title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ my: 0.5 }}
                  >
                    {description}
                  </Typography>
                   <Link
                    color="primary"
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      '& > svg': { transition: '0.2s' },
                      '&:hover > svg': { transform: 'translateX(2px)' },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <span>تعرف على المزيد</span>
                    <ChevronRightRoundedIcon
                      fontSize="small"
                      sx={{ mt: '1px', ml: '2px' }}
                    />
                  </Link>

                </Box>
              </Box>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
      >
        <Card
          variant="outlined"
          sx={{
            height: '100%',
            width: '100%',
            display: { xs: 'none', sm: 'flex' },
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              m: 'auto',
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage: (theme) =>
                theme.palette.mode === 'light'
                  ? items[selectedItemIndex].imageLight
                  : items[selectedItemIndex].imageDark,
            }}
          />
        </Card>
      </Grid>
    </Grid>
  );
}
