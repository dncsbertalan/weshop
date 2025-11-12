using Testcontainers.MsSql;

namespace IntegrationTest.Fixtures;

public class DatabaseFixture : IAsyncLifetime
{
    private readonly MsSqlContainer _container;

    public DatabaseFixture()
    {
        _container = new MsSqlBuilder()
            .WithName("WeshopIntegrationTestDb")
            .WithPassword("P@ssw0rd")
            .WithCleanUp(true)
            .Build();
    }

    public string ConnectionString => _container.GetConnectionString();

    public async Task InitializeAsync()
    {
        await _container.StartAsync();
    }

    public async Task DisposeAsync()
    {
        await _container.DisposeAsync();
    }
}