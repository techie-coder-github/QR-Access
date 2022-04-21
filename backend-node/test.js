const http = require('http');
const {google}=require('googleapis');
const client_id='153044565612-qj35fm6a1rd5r20pie3bi0bafj8iu1gl.apps.googleusercontent.com'
const client_secret='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'
const redirect_uri='https://developers.google.com/oauthplayground'
const refresh_token='1//04ypmIG0Yhee7CgYIARAAGAQSNwF-L9IrHfgNyvgHmJAnM00S7x2V5QIhK37KYHBbihtopZR2mIJLafDv-rTLY4StN50cgxtMH6A'
const path = require('path');
const mimetype= require('mime-types')
const fs = require('fs');
const type=mimetype.lookup('C:\Users\KIIT\Desktop\6th SEM\FPM\1.png')
console.log(type)
const filePath = path.join(__dirname, 'flower.jpg');
console.log(filePath)

