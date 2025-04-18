# Islamic Mental Health & Prayer Tracker

A comprehensive application that combines prayer tracking, mood monitoring, and Islamic counseling using AI technology.

## Features

- **Prayer Tracker**: Track daily prayers with a visual calendar interface
- **Mood Tracker**: Record and get Islamic guidance based on your emotional state
- **Islamic Counseling**: Chat with an AI-powered Islamic counselor
- **Dashboard**: View prayer statistics and quick access to all features

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Claude API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/islamic-mental-health-app.git
cd islamic-mental-health-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Claude API key:
```
REACT_APP_CLAUDE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Technology Stack

- React with TypeScript
- Material-UI for components
- Claude API for AI-powered responses
- React Router for navigation
- Date-fns for date manipulation

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── services/      # API services
  ├── theme.ts       # Material-UI theme
  └── App.tsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Claude API for providing the AI capabilities
- Material-UI for the component library
- The Islamic community for inspiration and guidance 