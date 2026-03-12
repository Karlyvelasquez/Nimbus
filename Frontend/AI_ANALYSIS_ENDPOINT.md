# AI Weather Analysis - Endpoint Documentation

## Overview
The AI Weather Analysis feature uses OpenAI's GPT-4 model to provide expert meteorological insights based on real-time weather data from San Cristóbal, Galápagos.

## Configuration

### Environment Variables
Add the following variable to your `.env` file:

```
VITE_OPEN_API_KEY=your-openai-api-key-here
```

**Important:** The `VITE_` prefix is required for Vite to expose the variable to the client-side code.

### Getting an OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new secret key
5. Copy the key and add it to your `.env` file

## API Endpoint

**Endpoint:** `https://api.openai.com/v1/chat/completions`
**Method:** POST
**Model:** GPT-4

### Request Format

```javascript
{
  model: 'gpt-4',
  messages: [
    {
      role: 'system',
      content: 'Expert meteorologist instructions...'
    },
    {
      role: 'user',
      content: 'Weather data JSON...'
    }
  ],
  temperature: 0.7,
  max_tokens: 1000
}
```

### Weather Data Structure

The system sends the following data to the AI:

```javascript
{
  stations: [
    {
      name: string,
      elevation: string,
      temperature: number,
      humidity: number,
      pressure: number,
      windSpeed: number,
      precipitation: number,
      status: string
    }
  ],
  alerts: [
    {
      type: string,
      station: string,
      severity: string,
      message: string
    }
  ],
  forecasts: [
    {
      time: string,
      station: string,
      precipitation: string,
      probability: number,
      amount: string
    }
  ],
  location: 'San Cristóbal, Galápagos Islands',
  timestamp: string
}
```

## Features

### AI Analysis Button
- Located in the Meteorologist Dashboard header
- Purple gradient styling for visual distinction
- Loading state with spinner animation
- Disabled during analysis to prevent duplicate requests

### Analysis Modal
- Full-screen overlay with backdrop blur
- Scrollable content area
- Real-time streaming effect (word-by-word display)
- Close button to dismiss

### AI Response
The AI provides:
1. **Current Weather Patterns** - Analysis of current conditions
2. **Risk Assessment** - Identification of potential hazards
3. **Short-term Forecast Insights** - Interpretation of predictions
4. **Recommendations** - Actionable advice for authorities and residents

## Error Handling

The system handles:
- Invalid API keys
- Network failures
- Rate limiting
- Insufficient credits
- API timeouts

Error messages are displayed in the analysis modal with troubleshooting steps.

## Usage Cost

- Model: GPT-4
- Average tokens per request: ~500-600 input + 1000 output
- Estimated cost: $0.03-0.05 per analysis
- See [OpenAI Pricing](https://openai.com/pricing) for current rates

## Security Notes

- API key is stored in `.env` file (not committed to repository)
- Requests are made client-side (consider server-side proxy for production)
- Rate limiting should be implemented for production use

## Troubleshooting

### "API key not configured" error
- Ensure `.env` file exists in Frontend directory
- Variable must be named `VITE_OPEN_API_KEY` (with VITE_ prefix)
- Restart the development server after adding the key

### "Insufficient credits" error
- Check your OpenAI account balance
- Add payment method if needed
- Verify API key has proper permissions

### Network errors
- Check internet connection
- Verify firewall is not blocking OpenAI API
- Check for proxy/VPN interference

## Development Notes

After updating `.env`:
```bash
# Restart the dev server to load new environment variables
npm run dev
```

## Production Considerations

For production deployment:
1. Use server-side API calls to protect API key
2. Implement rate limiting
3. Add caching for similar queries
4. Monitor API usage and costs
5. Implement fallback responses
6. Add user authentication
