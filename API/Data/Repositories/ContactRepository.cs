namespace API.Data.Repositories;

public class ContactRepository
{
    private readonly ApplicationDbContext _context;
    public ContactRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<PagedList<Contact>> GetContactsAsync(PaginationParams p)
    {
        return await PagedList<Contact>.CreateAsync(_context.Contacts, p.Page, p.PageSize);
    }
    public async Task<string> CreateContactAsync(Contact entity)
    {
        _context.Contacts.Add(entity);
        await _context.SaveChangesAsync();

        return entity.Id;
    }

}
