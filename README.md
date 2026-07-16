# Personal-WebSite

## Database Migrations
Navigate to the solution root first:

**Add Migration:**
```powershell
dotnet ef migrations add InitialCreate --output-dir Data/Migrations
```

**Apply Migration:**
```powershell
dotnet ef database update
```
