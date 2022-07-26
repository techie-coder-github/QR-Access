const http = require('http');
const {google}=require('googleapis');
const client_id='153044565612-qj35fm6a1rd5r20pie3bi0bafj8iu1gl.apps.googleusercontent.com'
const client_secret='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'
const redirect_uri='https://developers.google.com/oauthplayground'
const refresh_token='1//04EIQinQbsX4OCgYIARAAGAQSNwF-L9Ir2d7q2f90vr1YLMpQ9OO8XdY-IrgLvmg6flr4ybWGDshwcVmzqfd9DCuzjF3-mKG7cPo'
const path = require('path');
const mimetype= require('mime-types')
const fs = require('fs');
const express = require('express')
const cors=require('cors')
const app = express()
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');

    // Set a response type of plain text for the response

// Send back a response and end the connection
const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
);
oauth2Client.setCredentials({ refresh_token: refresh_token });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});





async function uploadFile(path_file,mime_type) {
    
    try {
      const response = await drive.files.create({
        requestBody: {
          name: path.basename(path_file), 
          mimeType:mime_type,
        },
        media: {
          mimeType:mime_type,
          body: fs.createReadStream(path_file),
        },
      });
  
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
  async function generatePublicUrl(file_id) {
    try {
      const fileId = file_id;
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      return result ;
    } catch (error) {
      console.log(error.message);
    }
  }

async function move_file(file){
    
    return "uploaded"

}
  
app.use(cors())
app.use(bodyParser.json());
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/upload",async (req,res)=>{
    const file=req.files.file
    await file.mv(`../uploads/${file.name}`); 
    
    const path_file=`C:/Users/KIIT/Desktop/React App 2/uploads/${file.name}`
    
    const mime_type=mimetype.lookup(path_file)
    console.log(mime_type)
    uploadFile(path_file,mime_type)
    .then((response=>{ 
        generatePublicUrl(response.data.id)
        .then(result=>{res.json(result.data)
        console.log(result.data)})
        .catch(err=>{console.log(err)})
        

    }))
    .catch(err=>{console.log(err)})
})


app.listen(4000,() => {
  console.log("Node app listening on port 4000")
})
    
