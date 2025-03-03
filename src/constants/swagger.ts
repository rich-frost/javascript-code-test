export const SWAGGER_OPTIONS = {
  definition: {
    openapi: "3.1.1",
    info: {
      title: "Book Search API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes.ts"],
};
