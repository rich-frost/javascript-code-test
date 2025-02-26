import express from "express";
import { healthcheckHandler } from "./handlers/healthcheck";
import { searchHandler } from "./handlers/search";

import { query } from "express-validator";
import { PAGINATION_LIMITS } from "./constants/searchParameters";
import { validateRequest } from "./middleware/validateRequest";

export const router = express.Router();

/**
 * @swagger
 * /v1/healthcheck:
 *   get:
 *     summary: Get healthcheck.
 *     description: Get healthcheck status.
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Healthcheck endpoint not found
 *       '500':
 *         description: Internal server error
 */
router.get("/healthcheck", healthcheckHandler);

/**
 * @swagger
 * /v1/search:
 *   get:
 *     summary: Search books.
 *     description: Paginated search for books
 *     parameters:
 *      - in: query
 *        name: author
 *        schema:
 *          type: string
 *          default: frank
 *        description: Name of author
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 10
 *        description: The numbers of items to return
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *          default: 0
 *        description: The offset to fetch items
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Search endpoint not found
 *       '500':
 *         description: Internal server error
 * components:
 *   schemas:
 *     Search:
 *       type: object
 *       properties:
 *         search:
 *           type: object
 *           properties:
 *              author:
 *                  type: string
 *                  default: frank
 *         limit:
 *           type: integer
 *           default: 10
 *         offset:
 *           type: integer
 */
router.get(
  "/search",
  validateRequest([
    query("author").exists(),
    query("limit").exists().isIn(PAGINATION_LIMITS),
    query("offset").exists(),
  ]),
  searchHandler,
);
