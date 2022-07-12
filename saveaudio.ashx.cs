using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace JSAudioRecording
{
    /// <summary>
    /// Summary description for saveaudio
    /// </summary>
    public class saveaudio : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string response = "meh";
            foreach (string s in context.Request.Files)
            {
                HttpPostedFile file = null;
                file = context.Request.Files[s];
                string fileName = file.FileName;
                string fileExtension = file.ContentType;
                if (file != null && file.FileName.Length > 0)
                {
                    response = "yeah";
                }
            }
                    context.Response.ContentType = "text/json";
            context.Response.Write("{\"status\":\""+ response +"\"");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}