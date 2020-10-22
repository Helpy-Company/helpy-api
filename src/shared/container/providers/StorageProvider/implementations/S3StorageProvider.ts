import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import uploadConfig from '@config/upload';
import Excel from 'exceljs';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const wb = new Excel.Workbook();
    const readableFile = await wb.xlsx.readFile(file);

    const fileContent = await readableFile.xlsx.writeBuffer({
      filename: file,
    });

    const splitPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp'
    );

    const fileIndeed = file.slice(splitPath.length + 1);

    const ContentType = mime.getType(file);

    if (!ContentType) {
      throw new Error('File not found');
    }

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket.files,
        Key: fileIndeed,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    return fileIndeed;
  }

  public async deleteFile(file: string): Promise<void> {
    const splitPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp'
    );

    const fileIndeed = file.slice(splitPath.length + 1);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket.files,
        Key: fileIndeed,
      })
      .promise();
  }
}

export default S3StorageProvider;
