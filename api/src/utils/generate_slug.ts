import * as cryptoRandomString from 'crypto-random-string';

export const generateSlug = async (length: number, type?): Promise<string> => {
  return await cryptoRandomString({
    length: length,
    type: type ? type : 'url-safe',
  });
};
