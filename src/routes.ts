import express from "express";
import { healthcheckHandler } from "./handlers/healthcheck";

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
 *         description: Healthcheck not found
 *       '500':
 *         description: Internal server error
 */
router.get("/healthcheck", healthcheckHandler);
