import express from "express";
import helmet from "helmet";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { API_VERSION } from "./constants/api";
import { router } from "./routes";
import { SWAGGER_OPTIONS } from "./constants/swagger";

import { traceRequest } from "./middleware/traceRequest";
import { setupMockExternalAPI } from "./__mock__/mockExternalApis";

export const runServer = () => {
  //TODO: Remove hack to external APIs
  setupMockExternalAPI();

  const app = express();

  // Secure app with Helmet: https://github.com/helmetjs/helmet
  app.use(helmet());

  // Automatically parse incoming JSON data, making it available in req.body
  app.use(express.json());

  // Trace all requests
  app.use(traceRequest);

  // Add routes under API_VERSION
  app.use(`/${API_VERSION}`, router);

  const swaggerDocs = swaggerjsdoc(SWAGGER_OPTIONS);
  app.use(
    `/${API_VERSION}/api-docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs),
  );

  const port = Number(process.env.APP_PORT) || 3080;

  app.listen(port, () => {
    console.log(`Server running as http://localhost:${port}`);
  });
};

export const server = runServer();
