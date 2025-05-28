export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function,
) => {
  //   console.log({ file });

  if (!file) return callback('File not found', false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtension = ['jpg', 'png', 'gif', 'jpeg'];

  if (validExtension.includes(fileExtension)) {
    return callback(null, true);
  }

  callback(null, false);
};
