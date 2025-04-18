import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PrayerTracker from './pages/PrayerTracker';
import MoodTracker from './pages/MoodTracker';
import Chatbot from './pages/Chatbot';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/prayer-tracker" element={<PrayerTracker />} />
              <Route path="/mood-tracker" element={<MoodTracker />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </Layout>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 