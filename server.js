const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const url = require('url')
var fs = require('fs')

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static('dist/buzz/'))

app.get('*', (req, res) => {
	var u = url.parse(req.url, true);
  if (u.pathname === "/datafile") {
    fs.readFile('dist/buzz/assets/datafile/records.json', 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }
      res.send(data);	
    });
	} else if (u.pathname === "/profile") {
    fs.readFile('dist/buzz/assets/datafile/profile.json', 'utf-8', (err, data) => {
      if (err) throw err;
      res.send(data);	
    });
	} else if (u.pathname === "/historyfile") {
    fs.readFile('dist/buzz/assets/datafile/history.json', 'utf-8', (err, data) => {
      if (err) throw err;
      res.send(data);	
    });
	} else res.sendFile(path.resolve('dist/buzz/index.html'));
});
app.post('/datafile', (req, res) => {
  fs.writeFile('dist/buzz/assets/datafile/records.json', JSON.stringify(req.body), (err) => {
    if(err) res.send(JSON.stringify("Error"));
    else res.send(JSON.stringify("Success"));
  })
});
app.post('/profile', (req, res) => {
  fs.writeFile('dist/buzz/assets/datafile/profile.json', JSON.stringify(req.body), (err) => {
    if(err) res.send(JSON.stringify("Error"));
    else res.send(JSON.stringify("Success"));
  })
});
app.post('/historyfile', (req, res) => {
  fs.writeFile('dist/buzz/assets/datafile/history.json', JSON.stringify(req.body), (err) => {
    if(err) res.send(JSON.stringify("Error"));
    else res.send(JSON.stringify("Success"));
  })
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})