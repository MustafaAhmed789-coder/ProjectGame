import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  SentimentVerySatisfied,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
  MoodBad,
  EmojiEmotions,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';

interface MoodContent {
  verses: string[];
  hadiths: string[];
  duas: string[];
  suggestions: string[];
}

const moods = [
  { name: 'Happy', icon: <SentimentVerySatisfied />, color: '#4CAF50' },
  { name: 'Sad', icon: <SentimentDissatisfied />, color: '#2196F3' },
  { name: 'Angry', icon: <SentimentVeryDissatisfied />, color: '#F44336' },
  { name: 'Anxious', icon: <MoodBad />, color: '#9C27B0' },
  { name: 'Excited', icon: <EmojiEmotions />, color: '#FF9800' },
  { name: 'Failure', icon: <TrendingDown />, color: '#795548' },
  { name: 'Downfall', icon: <TrendingDown />, color: '#607D8B' },
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [content, setContent] = useState<MoodContent | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    setLoading(true);
    
    try {
      // Here we would make an API call to Claude
      // For now, using mock data
      const mockContent: MoodContent = {
        verses: [
          "Indeed, with hardship will be ease.",
          "Allah does not burden a soul beyond its capacity.",
        ],
        hadiths: [
          "The Prophet (ﷺ) said: 'How wonderful is the case of a believer; there is good for him in everything...'",
        ],
        duas: [
          "Allahumma la sahla illa ma ja'altahu sahla, wa anta taj'alul hazna idha shi'ta sahla",
        ],
        suggestions: [
          "Take a moment to reflect on Allah's blessings",
          "Perform extra prayers",
          "Read Quran",
          "Make dua with sincerity",
        ],
      };
      
      setContent(mockContent);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mood Tracker
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                How are you feeling today?
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {moods.map((mood) => (
                  <Button
                    key={mood.name}
                    variant={selectedMood === mood.name ? 'contained' : 'outlined'}
                    onClick={() => handleMoodSelect(mood.name)}
                    startIcon={mood.icon}
                    sx={{
                      backgroundColor: selectedMood === mood.name ? mood.color : 'transparent',
                      color: selectedMood === mood.name ? 'white' : mood.color,
                      borderColor: mood.color,
                      '&:hover': {
                        backgroundColor: mood.color,
                        color: 'white',
                      },
                    }}
                  >
                    {mood.name}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {loading ? (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Grid>
        ) : content && (
          <>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quranic Verses
                  </Typography>
                  {content.verses.map((verse, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Typography>{verse}</Typography>
                    </Paper>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Hadiths
                  </Typography>
                  {content.hadiths.map((hadith, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Typography>{hadith}</Typography>
                    </Paper>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Duas
                  </Typography>
                  {content.duas.map((dua, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Typography>{dua}</Typography>
                    </Paper>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Practical Suggestions
                  </Typography>
                  {content.suggestions.map((suggestion, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Typography>{suggestion}</Typography>
                    </Paper>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default MoodTracker; 