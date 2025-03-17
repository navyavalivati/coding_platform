using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class ExecutionHub : Hub
{
    public async Task SendExecutionOutput(string output)
    {
        await Clients.All.SendAsync("ReceiveExecutionOutput", output);
    }
}
