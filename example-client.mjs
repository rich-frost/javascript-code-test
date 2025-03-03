import { exec } from "child_process";

const SERVER_URL =
  "http://localhost:3080/v1/search?author=frank&offset=0&limit=10";

// Start the development server
const devProcess = exec("npm run dev", { stdio: "inherit" });

console.log("Starting development server...");

// Wait for the server to be ready before making the request
const waitForServer = async (url, retries = 10, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting to fetch data (try ${i + 1}/${retries})...`);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Server response not OK");

      const data = await response.json();
      console.log("Server Response:", data);

      devProcess.kill(); // Kill the development server after fetching data
      return;
    } catch (error) {
      console.log("Server not ready, retrying in 3s...");
      console.warn(error);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  console.error("Server did not start in time.");
  devProcess.kill(); // Ensure we stop the process if it fails
};

// Wait and then request data
waitForServer(SERVER_URL);
