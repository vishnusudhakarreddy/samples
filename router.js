

exports.findData = function (req,res) {
  data =
{

  "name": "MEAN",
  "version": "1.0.0",
  "description": "A MEAN app that allows users to manage contact lists",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.13.3",
    "express": "^4.13.3",
    "mongodb": "^2.1.6"
  }
}
data.name="subhas";
delete(data.dependencies);

  res.send(data)
}






















