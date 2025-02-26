import { Request } from "express";
import { responseService } from "../lib/responseService";
import { ResponseWithLocals } from "../types/express";
import { bookSearchClient } from "../adapters/bookSearchClient/bookSearchClient";
import { SearchQueryParams } from "../types/search";

export const searchHandler = async (req: Request, res: ResponseWithLocals) => {
  const { logger } = res.locals;
  const { query } = req;
  const searchQueryParams: SearchQueryParams = {
    author: query.author as string,
    offset: Number(query.offset),
    limit: Number(query.limit),
  };

  try {
    // Possible to switch out bookSearchClient adapter for an alternative API adapter
    const result = await bookSearchClient({
      searchQueryParams,
      logger,
    });
    responseService.ok(res, result);
  } catch (e) {
    logger.error({ message: "Error in search handler", error: e });
    responseService.internalServerError(res);
  }
};
