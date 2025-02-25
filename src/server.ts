import express from "express";
import helmet from "helmet";

export const runServer = () => {
  const app = express();

  app.use(helmet());
  app.use(express.json());

  const port = Number(process.env.APP_PORT) || 3080;

  app.listen(port, () => {
    console.log(`Server running as http://localhost:${port}`);
  });
};

export const server = runServer();
