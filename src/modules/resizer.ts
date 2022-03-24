import sharp from "sharp";
import path from "path";
import { promises as fsPromises } from "fs";

/**Using the sharp library to resize the image using width & height
 * and storing the data in a buffer
 **/
async function resizerWidthHeight(
  fileName: string,
  imgWidth: number,
  imgHeight: number
): Promise<void> {
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
async function resizerWidth(fileName: string, imgWidth: number): Promise<void> {
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
async function resizerHeight(
  fileName: string,
  imgHeight: number
): Promise<void> {
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
