import { Response } from "express";

export const createResponseService = () => {
  return {
    ok: (res: Response, body?: { [key: string]: any }) => {
      return res.status(200).json({
        ...body,
      });
    },

    notFound: (res: Response) => {
      return res.status(404).json({
        message: "Not found",
      });
    },

    internalServerError: (res: Response, body?: { [key: string]: any }) => {
      return res.status(500).json({
        message: "Something went wrong",
        ...body,
      });
    },
  };
};

export const responseService = createResponseService();
