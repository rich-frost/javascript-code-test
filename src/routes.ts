import express from "express";
import { healthcheckHandler } from "./handlers/healthcheck";
import { searchHandler } from "./handlers/search";

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
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Search endpoint not found
 *       '500':
 *         description: Internal server error
 */
router.post("/search", searchHandler);
