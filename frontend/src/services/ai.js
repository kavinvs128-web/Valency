const API = "http://localhost:4000/api/ai";

// Asks the backend for a simple explanation of a lesson. The browser never talks to the AI
// provider and never sees the API key; the backend does that and returns validated JSON.
export async function explainLesson(lessonId, focus) {
  const token = localStorage.getItem("chemIQ_token");

  const res = await fetch(`${API}/explain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(focus ? { lessonId, focus } : { lessonId }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Could not get an explanation. Please try again.");
  }

  return data.explanation;
}
