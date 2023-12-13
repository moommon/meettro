const server = "https://43.203.46.19/"; // local serve url

export async function fetchData(endpoint, method = "GET", data = {}) {
  const url = `${server}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
  };

  if (method !== "GET") {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("에러:", error);
    throw error;
  }
}
