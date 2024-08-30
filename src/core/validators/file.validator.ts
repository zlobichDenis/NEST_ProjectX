export class FileValidator
{
    private static MAX_VIDEO_SIZE = 2e+7;
    private static MAX_IMAGE_SIZE = 1e+7;

    private static SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg"];
    private static SUPPORTED_VIDEO_TYPES = ["video/mp4"];

    private constructor() {}

    public static validateImages(images: Express.Multer.File[]): boolean
    {
        return images.every((image) => this.SUPPORTED_IMAGE_TYPES.includes(image.mimetype)
          && image.size <= this.MAX_IMAGE_SIZE);
    }

    public static validateVideos(videos: Express.Multer.File[]): boolean
    {
        return videos.every((video) => this.SUPPORTED_VIDEO_TYPES.includes(video.mimetype)
          && video.size <= this.MAX_VIDEO_SIZE);
    }
}
