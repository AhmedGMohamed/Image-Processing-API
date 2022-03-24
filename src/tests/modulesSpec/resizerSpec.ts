import fs from "fs";
import path from "path";
import {
  resizerWidthHeight,
  resizerWidth,
  resizerHeight
} from "../../modules/resizer";
describe("Image processing Module testing suite", () => {
  it("Should Create a file containing an image after providing all 3 valid arguments.", () => {
    let errorExists: boolean = false;
    const filePath = `${path.resolve()}\\cache\\santamonica-500x500.jpg`;
    resizerWidthHeight("santamonica", 500, 500);
    fs.access(
      //Checks if it can read the file, if not, it returns an error
      filePath,
      fs.constants.R_OK,
      async (err: NodeJS.ErrnoException | null): Promise<void>=> {
        if (err) {
          errorExists = true;
        } else errorExists = false;
      }
    );
    expect(errorExists).toBe(false);
  });
  it("Should Create a file containing an image after providing file name and width only.", () => {
    let errorExists: boolean = false;
    const filePath = `${path.resolve()}\\cache\\santamonica-500x_.jpg`;
    resizerWidth("santamonica", 500);
    fs.access(
      //Checks if it can read the file, if not, it returns an error
      filePath,
      fs.constants.R_OK,
      async (err: NodeJS.ErrnoException | null): Promise<void>=> {
        if (err) {
          errorExists = true;
        } else errorExists = false;
      }
    );
    expect(errorExists).toBe(false);
  });
  it("Should Create a file containing an image after providing file name and height only.", () => {
    let errorExists = false;
    const filePath = `${path.resolve()}\\cache\\santamonica-_x500.jpg`;
    resizerHeight("santamonica", 500);
    fs.access(
      //Checks if it can read the file, if not, it returns an error
      filePath,
      fs.constants.R_OK,
      async (err: NodeJS.ErrnoException | null): Promise<void>=> {
        if (err) {
          errorExists = true;
        } else errorExists = false;
      }
    );
    expect(errorExists).toBe(false);
  });
});
