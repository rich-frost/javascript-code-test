export const getEnvironment = () => {
  // TODO: Add API Key to this config
  if (!process.env.BOOK_SEARCH_CLIENT_BASE_URL) {
    console.error({
      message: "FATAL: Invalid config provided",
    });

    throw new Error("Invalid environment config provided");
  }
  const environment = {
    bookSearchClientBaseUrl: process.env.BOOK_SEARCH_CLIENT_BASE_URL,
  };

  return environment;
};
