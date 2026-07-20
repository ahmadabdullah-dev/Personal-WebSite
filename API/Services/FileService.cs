using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services;

public class FileService
{
    private readonly Cloudinary _cloudinary;

    public FileService(IOptions<CloudinaryConfigurations> config)
    {
        var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
        _cloudinary = new Cloudinary(account);
    }
    public async Task<Result<CloudUploadResult>> UploadImage(IFormFile file)
    {
        if (file.Length == 0)
            return Result<CloudUploadResult>.Failure("No file found");

        await using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "PersonalWebSite2026/images"
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
            return Result<CloudUploadResult>.Failure(uploadResult.Error.Message);

        return Result<CloudUploadResult>.Success(new CloudUploadResult(uploadResult.SecureUrl.ToString(), uploadResult.PublicId));
    }
    public async Task<Result<CloudUploadResult>> UploadRawFile(IFormFile file)
    {
        if (file.Length == 0)
            return Result<CloudUploadResult>.Failure("No file found");

        await using var stream = file.OpenReadStream();
        var uploadParams = new RawUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "PersonalWebSite2026/raws"
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
            return Result<CloudUploadResult>.Failure(uploadResult.Error.Message);

        return Result<CloudUploadResult>.Success(new CloudUploadResult(uploadResult.SecureUrl.ToString(), uploadResult.PublicId)
  );
    }
    public async Task<Result<string>> DeleteFile(string publicId, ResourceType resourceType = ResourceType.Image)
    {
        var deletionParams = new DeletionParams(publicId)
        {
            ResourceType = resourceType
        };

        var result = await _cloudinary.DestroyAsync(deletionParams);

        if (result.Error != null)
            return Result<string>.Failure("Failed to delete file");

        return Result<string>.Success("File deleted successfully");
    }
}