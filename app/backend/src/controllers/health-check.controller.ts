import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { env } from "@constants";
import { TApiResponse } from "@types";

class HealthCheckController {
  public status(req: Request, res: Response) {
    const response: TApiResponse<void> = {
      code: StatusCodes.OK,
      error: false,
      message: `[server]: Server is running at http://localhost:${env.port}`,
      method: req.method,
      path: req.originalUrl,
    };
    return res.status(StatusCodes.OK).json(response);
  }
}

export default new HealthCheckController();
