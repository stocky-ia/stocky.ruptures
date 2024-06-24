import { Test, TestingModule } from '@nestjs/testing';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { UploadFileToS3UseCase } from './upload-file-to-s3.use-case';

// Tipagem explícita para o mock do S3Client
const mockS3Client = {
  send: jest.fn().mockResolvedValue({}),
};

jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn(() => mockS3Client),
    PutObjectCommand: jest.fn(),
  };
});

describe('UploadFileToS3UseCase', () => {
  let useCase: UploadFileToS3UseCase;
  let s3Client: S3Client;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadFileToS3UseCase],
    }).compile();

    useCase = module.get<UploadFileToS3UseCase>(UploadFileToS3UseCase);
    s3Client = new S3Client({});
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should upload file to S3 and return file key', async () => {
    const file = {
      originalname: 'test.csv',
      buffer: Buffer.from('test content'),
      mimetype: 'text/csv',
    } as Express.Multer.File;

    const fileKey = `uuid-test-test.csv`;
    mockS3Client.send.mockResolvedValueOnce({});

    const result = await useCase.execute(file);

    expect(PutObjectCommand).toHaveBeenCalledWith({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: expect.stringContaining(file.originalname),
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    expect(mockS3Client.send).toHaveBeenCalledWith(expect.any(PutObjectCommand));
    expect(result).toEqual(expect.stringContaining(file.originalname));
  });
});