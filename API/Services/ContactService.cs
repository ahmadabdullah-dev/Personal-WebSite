using Microsoft.Extensions.Options;

namespace API.Services;

public class ContactService
{
    private readonly ContactRepository _contactRepository;
    private readonly RecieverConfiguration _recieverConfiguration;
    private readonly EmailService _emailService;

    private readonly ILogger<ContactService> _logger;
    public ContactService(ContactRepository contactRepository,
        IOptions<RecieverConfiguration> recieverConfiguration,
        EmailService emailService,
        ILogger<ContactService> logger)
    {
        _contactRepository = contactRepository;
        _recieverConfiguration = recieverConfiguration.Value;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<Result<PagedList<ContactDTO>>> GetContactsAsync(PaginationParams p)
    {
        var contacts = await _contactRepository.GetContactsAsync(p);

        if (contacts is null)
            return Result<PagedList<ContactDTO>>.Failure("No Messages Found");

        var dtos = new PagedList<ContactDTO>
        {
            Items = contacts.Items.Select(x => new ContactDTO(
              x.FullName,
              x.Email,
              x.Message,
              x.CreatedAt
          )).ToList(),

            CurrentPage = contacts.CurrentPage,
            TotalPages = contacts.TotalPages,
            TotalCount = contacts.TotalCount
        };

        return Result<PagedList<ContactDTO>>.Success(dtos);
    }

    public async Task<Result<string>> CreateContactAsync(CreateContactDTO dto)
    {
        var contact = new Contact
        {
            FullName = dto.FullName,
            Email = dto.Email,
            Message = dto.Message,
        };

        var createdId = await _contactRepository.CreateContactAsync(contact);

        if (string.IsNullOrEmpty(createdId))
            return Result<string>.Failure("Unexpected error occurred while sending the message");

        try
        {
            await _emailService.SendEmailAsync(_recieverConfiguration.Email,"New Message", $"You have a new message. From {dto.FullName} please check your inbox in your portfolio dashboard.");
        }
        catch (Exception ex)
        {
             _logger.LogError(ex, "Failed to send contact notification email");
        }
        return Result<string>.Success("Message sent successfully");
    }
}