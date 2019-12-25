const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 6789;

app.use(cors());
app.use(bodyParser.json());

const FE_REPO_DIR = path.resolve(__dirname, '../ee2_web_frontend');

const log = (content) => {
  console.log(`[${Date.now()}] ${JSON.stringify(content)}`);
};

app.get('/hooks/frontend/deploy', (req, res) => {
  const command = `cd ${FE_REPO_DIR} && source deploy.sh`;
  log(command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      log(error);
      log(stdout);
      log(stderr);
      res.send({ error }).status(400);
    } else {
      log(stdout);
      log(stderr);
      res.send('OK').status(200);
    }
  });
});

app.get('*', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`EE2 Platform is listening on port ${port}!`);
});
