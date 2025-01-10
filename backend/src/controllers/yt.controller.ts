import { NextFunction, Request, Response } from "express";
import { IYtInterface } from "../interfaces/yt.interface";
import {
  BadRequestException,
  UnauthorizedException,
} from "../exceptions/http.exceptions";
import { supabase } from "../config/supabase-config";
import { Channel, ChannelSchema } from "../schemas/yt.schema";

export class YoutubeController {
  private youtubeService: IYtInterface;

  constructor(youtubeService: IYtInterface) {
    this.youtubeService = youtubeService;
  }

  GrabTopChannels = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // verify auth header is present
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid authorization token");
    }

    const token: string = authHeader.split(" ")[1];

    // verify token with Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new UnauthorizedException("Invalid token");
    }

    // verify Google Provider header is present
    const providerToken: string | undefined = req.headers[
      "google-provider-token"
    ] as string;
    if (!providerToken) {
      throw new BadRequestException("Missing Google Provider Token");
    }

    const channelResponse: Channel[] = await this.youtubeService.GrabTopChannels(providerToken);

    const validatedResponse = ChannelSchema.parse(channelResponse);

    res.status(200).json({ validatedResponse });
  }
}
