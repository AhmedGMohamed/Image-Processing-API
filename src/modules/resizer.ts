import sharp from "sharp";
import path from "path";
import { promises as fsPromises } from "fs";

/**
 * @description functions using the sharp library to resize the image using width & height
 * and storing the data in a buffer
 * @param {string} fileName
 * @param {number} imgWidth
 * @param {number} imgHeight
 * @return {Promise<void>}
 */
async function resizerWidthHeight(
  fileName: string,
  imgWidth: number,
  imgHeight: number
): Promise<void> {
  //process the file using the arguments passed and storing the data in the buffer
  const data: Buffer = await sharp(
    `${path.resolve()}\\src\\images\\${fileName}.jpg`
  )
    .resize({ width: imgWidth, height: imgHeight })
    .toBuffer();
  //Creating a jpg file and storing the data from the buffer in it
  await fsPromises.writeFile(
    `${path.resolve()}\\cache\\${fileName}-${imgWidth}x${imgHeight}.jpg`,
    data
  );
}

/**
 * @description function using the sharp library to resize the image using width only
 * and storing the data in a buffer
 * @param {string} fileName
 * @param {number} imgWidth
 * @return {Promise<void>}
 */
async function resizerWidth(fileName: string, imgWidth: number): Promise<void> {
  //process the file using the arguments passed and storing the data in the buffer
  const data: Buffer = await sharp(
    `${path.resolve()}\\src\\images\\${fileName}.jpg`
  )
    .resize({ width: imgWidth })
    .toBuffer();
  //Creating a jpg file and storing the data from the buffer in it
  await fsPromises.writeFile(
    `${path.resolve()}\\cache\\${fileName}-${imgWidth}x_.jpg`,
    data
  );
}
/**
 * @description functions using the sharp library to resize the image using height only
 * and storing the data in a buffer
 * @param {string} fileName
 * @param {number} imgHeight
 * @return {Promise<void>}
 */
async function resizerHeight(
  fileName: string,
  imgHeight: number
): Promise<void> {
  //process the file using the arguments passed and storing the data in the buffer
  const data: Buffer = await sharp(
    `${path.resolve()}\\src\\images\\${fileName}.jpg`
  )
    .resize({ height: imgHeight })
    .toBuffer();
  //Creating a jpg file and storing the data from the buffer in it
  await fsPromises.writeFile(
    `${path.resolve()}\\cache\\${fileName}-_x${imgHeight}.jpg`,
    data
  );
}

export { resizerWidthHeight, resizerWidth, resizerHeight };