//importing the required libraries
import express from "express";
import sharp from "sharp";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";

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
   * @param {number} imgwidth
   * @param {number} imgheight
   **/
  const resize = (
    fileName: string,
    imgwidth: number,
    imgheight: number
  ): void => {
    //Checks if the given file name exists in the images folder
    fs.access(
      `${path.resolve()}\\src\\images\\${fileName}.jpg`,
      fs.constants.R_OK | fs.constants.W_OK,
      async (err: NodeJS.ErrnoException | null): Promise<void> => {
        if (err) {
          res.send("Wrong filename given, please Input a valid filename");
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
          //Checks if the file name, width and height are all present in the query
          if (
            typeof fileName === "string" &&
            !isNaN(imgwidth) &&
            !isNaN(imgheight)
          ) {
            /**
             * Checks if the image is already processed and is in the cache, if it's in the
             * cache it sends it to the user, otherwise it starts the resizing process.
             */
            fs.access(
              `${path.resolve()}\\cache\\${fileName}-${imgwidth}x${imgheight}.jpg`,
              fs.constants.R_OK | fs.constants.W_OK,
              async (err: NodeJS.ErrnoException | null): Promise<void> => {
                if (err) {
                  /**Using the sharp library to resize the image using width & height and storing
                   * the data in a buffer
                   **/
                  const data: Buffer = await sharp(
                    `${path.resolve()}\\src\\images\\${fileName}.jpg`
                  )
                    .resize({
                      width: imgwidth,
                      height: imgheight
                    })
                    .toBuffer();
                  //Creating a jpg file and storing the data from the buffer in it
                  await fsPromises.writeFile(
                    `${path.resolve()}\\cache\\${fileName}-${imgwidth}x${imgheight}.jpg`,
                    data
                  );
                }
                //Sending back the processed image to the user
                res.sendFile(
                  `${path.resolve()}\\cache\\${fileName}-${imgwidth}x${imgheight}.jpg`
                );
              }
            );
          } else if (
            //Checks if the file name and width only are present in the query
            typeof fileName === "string" &&
            !isNaN(imgwidth) &&
            isNaN(imgheight)
          ) {
            fs.access(
              `${path.resolve()}\\cache\\${fileName}-${imgwidth}x_.jpg`,
              fs.constants.R_OK | fs.constants.W_OK,
              async (err: NodeJS.ErrnoException | null): Promise<void> => {
                if (err) {
                  /**Using the sharp library to resize the image using width & height
                   * and storing the data in a buffer
                   **/
                  const data: Buffer = await sharp(
                    `${path.resolve()}\\src\\images\\${fileName}.jpg`
                  )
                    .resize({ width: imgwidth })
                    .toBuffer();
                  //Creating a jpg file and storing the data from the buffer in it
                  await fsPromises.writeFile(
                    `${path.resolve()}\\cache\\${fileName}-${imgwidth}x_.jpg`,
                    data
                  );
                }
                //Sending back the processed image to the user
                res.sendFile(
                  `${path.resolve()}\\cache\\${fileName}-${imgwidth}x_.jpg`
                );
              }
            );
          } else if (
            //checks if the file name and height only are present in the query
            typeof fileName === "string" &&
            isNaN(imgwidth) &&
            !isNaN(imgheight)
          ) {
            fs.access(
              `${path.resolve()}\\cache\\${fileName}-_x${imgheight}.jpg`,
              fs.constants.R_OK | fs.constants.W_OK,
              async (err: NodeJS.ErrnoException | null): Promise<void> => {
                if (err) {
                  //Using the sharp library to resize the image using width & height and storing the data in a buffer
                  const data: Buffer = await sharp(
                    `${path.resolve()}\\src\\images\\${fileName}.jpg`
                  )
                    .resize({ height: imgheight })
                    .toBuffer();
                  //Creating a jpg file and storing the data from the buffer in it
                  await fsPromises.writeFile(
                    `${path.resolve()}\\cache\\${fileName}-_x${imgheight}.jpg`,
                    data
                  );
                }
                //Sending back the processed image to the user
                res.sendFile(
                  `${path.resolve()}\\cache\\${fileName}-_x${imgheight}.jpg`
                );
              }
            );
          } else {
            //sends a respond to the user stating that some query inputs are missing
            res.send(
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
