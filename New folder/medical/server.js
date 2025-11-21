const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint to handle diagnosis generation
app.post('/generate', async (req, res) => {
    const { notes } = req.body;

    if (!notes) {
        return res.status(400).json({ error: 'Patient notes are required.' });
    }

    try {
        // Example API integration (Google Gemini or OpenAI)
        const apiKey = process.env.API_KEY;
        const apiUrl = 'https://api.openai.com/v1/completions'; // Replace with actual API URL

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // Replace with appropriate model
                prompt: `Analyze the unstructured patient notes, extract clinical details, generate a prioritized list of differential diagnoses, and suggest the most important next three critical steps.\n\nPatient Notes: ${notes}`,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch AI response.');
        }

        const data = await response.json();

        // Example parsing of AI response (adjust based on actual API response structure)
        const diagnoses = data.choices[0].text.split('\n').slice(0, 3); // Example parsing
        const steps = ['Step 1', 'Step 2', 'Step 3']; // Replace with actual steps from AI

        res.json({ diagnoses, steps });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});