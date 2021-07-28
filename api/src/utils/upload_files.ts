import { extname } from 'path';
import * as cryptoRandomString from 'crypto-random-string';

export const updateFileName = (req, file: Express.Multer.File, cb) => {
  const name = file.originalname.split('.')[0];
  const randomString = cryptoRandomString({ length: 6, type: 'alphanumeric' });

  cb(
    null,
    `${name}_${Date.now()}_${randomString}${extname(file.originalname)}`,
  );
};
