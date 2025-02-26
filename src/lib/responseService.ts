import { ResponseWithLocals } from "../types/express";

export const createResponseService = () => {
  return {
    ok: (res: ResponseWithLocals, body?: { [key: string]: any }) => {
      res.locals.logger.trace({
        message: `END OF REQUEST: ${res.locals.requestId}`,
        statusCode: 200,
        body,
      });

      return res.status(200).json({
        ...body,
      });
    },

    notFound: (res: ResponseWithLocals) => {
      res.locals.logger.trace({
        message: `END OF REQUEST: ${res.locals.requestId}`,
        statusCode: 404,
      });

      return res.status(404).json({
        message: "Not found",
      });
    },

    internalServerError: (
      res: ResponseWithLocals,
      body?: { [key: string]: any },
    ) => {
      res.locals.logger.trace({
        message: `END OF REQUEST: ${res.locals.requestId}`,
        statusCode: 500,
        body,
      });

      return res.status(500).json({
        message: "Something went wrong",
        ...body,
      });
    },
  };
};

export const responseService = createResponseService();
