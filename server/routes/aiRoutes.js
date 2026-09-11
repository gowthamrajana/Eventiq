const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

router.post("/generate-description", async (req, res) => {
    try {
        const {
            title,
            category,
            date,
            location,
            ticketPrice,
        } = req.body;

        const prompt = `
Generate a professional and engaging description for an event.

Event details:
Title: ${title}
Category: ${category}
Date: ${date}
Location: ${location}
Ticket Price: ${ticketPrice}

Requirements:
- Write 1 to 2 short paragraphs.
- Keep the language clear and natural.
- Make it suitable for an event booking website.
- Do not invent speakers, sponsors, prizes, or other details.
- Only use the information provided above.
`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
            contents: prompt,
        });

        const description = response.text;

        res.json({
            success: true,
            description,
        });

    } catch (error) {
        console.error("AI generation error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate event description",
        });
    }
});

module.exports = router;