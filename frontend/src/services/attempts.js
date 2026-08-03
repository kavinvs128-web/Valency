const API = "http://localhost:4000/api/attempts";

export function formatSubmittedOn(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${day}-${month}-${year} ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
}

function authHeaders() {
  const token = localStorage.getItem("chemIQ_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAttempts() {
  const res = await fetch(API, {
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load attempts");
  }

  const data = await res.json();
  return data.attempts || [];
}

export async function addAttempt(record) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(record),
  });

  if (!res.ok) {
    throw new Error("Failed to save attempt");
  }

  const data = await res.json();
  return data.attempt;
}

export async function updateAttempt(id, record) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(record),
  });

  if (!res.ok) {
    throw new Error("Failed to update attempt");
  }

  const data = await res.json();
  return data.attempt;
}

export async function deleteAttempt(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete attempt");
  }
}
