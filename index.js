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
const BE_REPO_DIR = path.resolve(__dirname, '../ee2_api');
const PLATFORM_REPO_DIR = path.resolve(__dirname, './');

const FE_BRANCH = 'refs/heads/v0.1.0/master';
const BE_BRANCH = 'refs/heads/v0.1.0/master';
const PLATFORM_BRANCH = 'master';

const log = (content) => {
  console.log(`[${Date.now()}] ${JSON.stringify(content)}`);
};

app.post('/hooks/frontend/deploy', (req, res) => {
  if (req.body.ref !== FE_BRANCH) {
    log('Wrong branch');
    res.send('Wrong branch').status(400);
    return;
  }
  res.send('PROCESSING...').status(200);
  const command = `cd ${FE_REPO_DIR} && . ./deploy.sh`;
  log({ command });
  exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
    if (error) {
      log({ error });
      log({ stdout });
      log({ stderr });
    } else {
      log({ stdout });
      log({ stderr });
    }
  });
});

app.post('/hooks/backend/deploy', (req, res) => {
  if (req.body.ref !== BE_BRANCH) {
    log('Wrong branch');
    res.send('Wrong branch').status(400);
    return;
  }
  res.send('PROCESSING...').status(200);
  const command = `cd ${BE_REPO_DIR} && . ./deploy.sh`;
  log({ command });
  exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
    if (error) {
      log({ error });
      log({ stdout });
      log({ stderr });
    } else {
      log({ stdout });
      log({ stderr });
    }
  });
});

app.post('/hooks/platform/deploy', (req, res) => {
  if (req.body.ref !== PLATFORM_BRANCH) {
    log('Wrong branch');
    res.send('Wrong branch').status(400);
    return;
  }
  res.send('PROCESSING...').status(200);
  const command = `cd ${PLATFORM_REPO_DIR} && . ./deploy.sh`;
  log({ command });
  exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
    if (error) {
      log({ error });
      log({ stdout });
      log({ stderr });
    } else {
      log({ stdout });
      log({ stderr });
    }
  });
});

app.get('*', (req, res) => {
  log({ body: req.body });
  res.send('OK');
});

app.listen(port, () => {
  console.log(`EE2 Platform is listening on port ${port}!`);
});
