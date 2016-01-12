using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Odontrogram.Startup))]
namespace Odontrogram
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
