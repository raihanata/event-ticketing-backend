
export const fileUploads= (req, res, next)=> {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file), 'thei')
  console.log("body:", req.body);
console.log("file:", req.file);
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.filename}" /><br>`
  return res.send(response)
}