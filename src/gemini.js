
const API_KEY = "AIzaSyDkAONVncaDaS_gXJ05bHa7WDsWaCHHjkw"; 
const MODEL_ID = "gemini-2.5-flash";

export async function runGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}
export default runGemini


