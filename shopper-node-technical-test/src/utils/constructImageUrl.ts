import { IncomingMessage } from "http";

/**
 * construct a url to access the image in server
 * @param req user request
 * @param imageName image name saved in database/images
 * @returns image url
 */
export const constructImageUrl = (req: IncomingMessage, imageName: string) => {
  const protocol = req.headers["sec-websocket-protocol"] || "http";
  const host = req.headers["host"];
  const imageUrl = `${protocol}://${host}/images/${imageName}`;
  return imageUrl;
};
