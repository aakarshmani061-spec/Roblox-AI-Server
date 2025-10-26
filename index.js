import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_KEY;

app.post("/chat", async (req, res) => {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a Roblox scripting helper. Provide working code."},
                    { role: "user", content: req.body.message }
                ]
            })
        });

        const data = await response.json();
        res.json({ text: data.choices?.[0]?.message?.content || "AI returned no answer" });
    }
    catch (err) {
        res.json({ text: "❌ Server Error: " + err.toString() });
    }
});

app.get("/", (req, res) => {
    res.send("✅ Roblox AI Server Running");
});

app.listen(3000, () => console.log("✅ Server Started"));
