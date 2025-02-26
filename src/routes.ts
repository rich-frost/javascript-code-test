import express from "express";
import { healthcheckHandler } from "./handlers/healthcheck";
import { searchHandler } from "./handlers/search";

import { body } from "express-validator";
import { PAGINATION_LIMITS, SEARCH_BY_TYPES } from "./constants/searchTypes";
import { validateRequest } from "./lib/validateRequest";

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
 *   post:
 *     summary: Search books.
 *     description: Paginated search for books
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Search'
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Search endpoint not found
 *       '500':
 *         description: Internal server error
 * components:
 *   schemas:
 *     Search:
 *       type: object
 *       properties:
 *         searchBy:
 *           type: string
 *           default: author
 *         limit:
 *           type: integer
 *           default: 10
 *         offset:
 *           type: integer
 */
router.post(
  "/search",
  validateRequest([
    body("searchBy").exists().isIn(SEARCH_BY_TYPES),
    body("limit").exists().isIn(PAGINATION_LIMITS),
    body("offset").exists(),
  ]),
  searchHandler,
);
