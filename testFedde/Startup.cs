using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(testFedde.Startup))]
namespace testFedde
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
