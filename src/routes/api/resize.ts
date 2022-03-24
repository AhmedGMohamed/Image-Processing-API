//importing the required libraries
import express from "express";
import sharp from "sharp";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import { resizerWidthHeight, resizerWidth, resizerHeight } from "../../modules/resizer"

const resizer = express.Router();

resizer.get("/", (req: express.Request, res: express.Response): void => {
  //storing the request query and getting the values
  const query = req.query;
  const imgName = query.name as string;
  const width: number = parseInt(query.width as string);
  const height: number = parseInt(query.height as string);

  /**
   * @description uses the sharp library to resize the image using user inputs
   * @param {string} fileName
   * @param {number} imgWidth
   * @param {number} imgHeight
   **/
  const resize = (
    fileName: string,
    imgWidth: number,
    imgHeight: number
  ): void => {
    //Checks if the user gave a file name exists in the images folder
    fs.access(
      `${path.resolve()}\\src\\images\\${fileName}.jpg`,
      fs.constants.R_OK | fs.constants.W_OK,
      async (err: NodeJS.ErrnoException | null): Promise<void> => {
        if (err) {
          res
            .status(400)
            .send(
              "Wrong filename given, please Input a valid filename using (name={fileName})" +
                " where {fileName} is the name of your file without the extension"
            );
        } else {
          /**
           * Checks if the cache folder exists, if it does, it proceeds to
           * the next step, if not it creates the folder.
           **/
          fs.access(
            `${path.resolve()}\\cache\\`,
            fs.constants.R_OK | fs.constants.W_OK,
            async (err: NodeJS.ErrnoException | null): Promise<void> => {
              if (err) {
                await fsPromises.mkdir(`${path.resolve()}\\cache\\`);
              }
            }
          );
          //Checks if the file name, width and height are all present in the query and with the correct values
          if (
            typeof fileName === "string" &&
            !isNaN(imgWidth) &&
            imgWidth > 0 &&
            !isNaN(imgHeight) &&
            imgHeight > 0
          ) {
            /**
             * Checks if the image is already processed and is in the cache, if it's in the
             * cache it sends it to the user, otherwise it starts the resizing process.
             */
            fs.access(
              `${path.resolve()}\\cache\\${fileName}-${imgWidth}x${imgHeight}.jpg`,
              fs.constants.R_OK | fs.constants.W_OK,
              async (err: NodeJS.ErrnoException | null): Promise<void> => {
                if (err) {
                  //Calls the function that does the resizing
                  await resizerWidthHeight(fileName, imgWidth, imgHeight);
                }
                //Sending back the processed image to the user
                res.sendFile(
                  `${path.resolve()}\\cache\\${fileName}-${imgWidth}x${imgHeight}.jpg`
                );
              }
            );
          } else if (
            //Checks if the file name and width only are present in the query
            typeof fileName === "string" &&
            !isNaN(imgWidth) &&
            imgWidth > 0 &&
            isNaN(imgHeight)
          ) {
            fs.access(
              `${path.resolve()}\\cache\\${fileName}-${imgWidth}x_.jpg`,
              fs.constants.R_OK | fs.constants.W_OK,
              async (err: NodeJS.ErrnoException | null): Promise<void> => {
                if (err) {
                  await resizerWidth(fileName, imgWidth);
                }
                //Sending back the processed image to the user
                res.sendFile(
                  `${path.resolve()}\\cache\\${fileName}-${imgWidth}x_.jpg`
                );
              }
            );
          } else if (
            //checks if the file name and height only are present in the query
            typeof fileName === "string" &&
            isNaN(imgWidth) &&
            !isNaN(imgHeight) &&
            imgHeight > 0
          ) {
            fs.access(
              `${path.resolve()}\\cache\\${fileName}-_x${imgHeight}.jpg`,
              fs.constants.R_OK | fs.constants.W_OK,
              async (err: NodeJS.ErrnoException | null): Promise<void> => {
                if (err) {
                  await resizerHeight(fileName, imgHeight);
                  //Sending back the processed image to the user
                  res.sendFile(
                    `${path.resolve()}\\cache\\${fileName}-_x${imgHeight}.jpg`
                  );
                }
              }
            );
          } else if (imgWidth <= 0 || imgHeight <= 0) {
            switch (imgWidth <= 0) {
              case true:
                res
                  .status(400)
                  .send(
                    "Invalid width given, please include a width higher than zero."
                  );
                break;
              case false:
                res
                  .status(400)
                  .send(
                    "Invalid height given, please include a height higher than zero."
                  );
                break;
              default:
                res.status(400).send("Unknown error");
                break;
            }
          } else {
            //sends a respond to the user stating that some query inputs are missing
            res
              .status(400)
              .send(
                'Incorrect query parameters, Please include the file name (using "name = {string}")' +
                  '& either width (using "width={number}") or height (using "height={number}") or both.'
              );
          }
        }
      }
    );
  };

  resize(imgName, width, height);
});

export default resizer;
