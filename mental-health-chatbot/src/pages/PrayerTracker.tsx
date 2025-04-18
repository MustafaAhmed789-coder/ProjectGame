import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format } from 'date-fns';

interface PrayerRecord {
  date: string;
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
}

const PrayerTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [prayerRecords, setPrayerRecords] = useState<PrayerRecord[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPrayers, setCurrentPrayers] = useState({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const dateStr = format(date, 'yyyy-MM-dd');
      const record = prayerRecords.find(r => r.date === dateStr);
      if (record) {
        setCurrentPrayers(record.prayers);
      } else {
        setCurrentPrayers({
          fajr: false,
          dhuhr: false,
          asr: false,
          maghrib: false,
          isha: false,
        });
      }
    }
  };

  const handlePrayerToggle = (prayer: keyof typeof currentPrayers) => {
    setCurrentPrayers(prev => ({
      ...prev,
      [prayer]: !prev[prayer],
    }));
  };

  const handleSave = () => {
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const newRecords = prayerRecords.filter(r => r.date !== dateStr);
      newRecords.push({
        date: dateStr,
        prayers: currentPrayers,
      });
      setPrayerRecords(newRecords);
      setOpenDialog(false);
    }
  };

  const getPrayerCount = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const record = prayerRecords.find(r => r.date === dateStr);
    if (record) {
      return Object.values(record.prayers).filter(Boolean).length;
    }
    return 0;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Prayer Tracker
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <div {...params} />}
                renderDay={(day, _value, DayComponentProps) => {
                  const count = getPrayerCount(day);
                  return (
                    <Box
                      sx={{
                        position: 'relative',
                        '& .MuiPickersDay-root': {
                          backgroundColor: count > 0 ? 'primary.light' : 'transparent',
                          color: count > 0 ? 'white' : 'inherit',
                        },
                      }}
                    >
                      <DayComponentProps {...DayComponentProps} />
                      {count > 0 && (
                        <Typography
                          variant="caption"
                          sx={{
                            position: 'absolute',
                            bottom: 2,
                            right: 2,
                          }}
                        >
                          {count}/5
                        </Typography>
                      )}
                    </Box>
                  );
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Prayers
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Object.entries(currentPrayers).map(([prayer, completed]) => (
                  <Button
                    key={prayer}
                    variant={completed ? 'contained' : 'outlined'}
                    onClick={() => handlePrayerToggle(prayer as keyof typeof currentPrayers)}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {prayer} - {completed ? 'Completed' : 'Pending'}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Record Prayers</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {Object.entries(currentPrayers).map(([prayer, completed]) => (
              <Button
                key={prayer}
                variant={completed ? 'contained' : 'outlined'}
                onClick={() => handlePrayerToggle(prayer as keyof typeof currentPrayers)}
                sx={{ textTransform: 'capitalize' }}
              >
                {prayer} - {completed ? 'Completed' : 'Pending'}
              </Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrayerTracker; 