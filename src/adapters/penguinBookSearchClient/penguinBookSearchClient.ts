import { SearchAdapterProps } from "../../types/search";

/* 
This is an example additional adapter to be used for a 
different book search API
*/

export const penguinBookSearchClient = async ({
  searchParams,
  logger,
}: SearchAdapterProps) => {
  logger.trace({
    message: `TODO: Implement Penguin Books Search Client ${searchParams}`,
  });

  return [];
};
