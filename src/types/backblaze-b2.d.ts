declare module 'backblaze-b2' {
    interface Bucket {
        uploadFile(options: {
            uploadUrl: string;
            uploadAuthToken: string;
            filename: string;
            onUploadProgress?: (progress: { loaded: number; total: number }) => void;
        }): Promise<any>;
    }

    export default class B2 {
        constructor(options: { applicationKeyId: string; applicationKey?: string });
        authorize(): Promise<void>;
        getBucket(options: { bucketName: string }): Promise<Bucket>;
    }
} 