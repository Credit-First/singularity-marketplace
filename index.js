require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const errorHandler = require('src/_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use((req, _, next) => {
  next({ status: 404, message: `${req.method} ${req.originalUrl} not found` });
});

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3333;

// if (process.env.NODE_ENV === 'production') {
//   const options = {
//     // key: fs.readFileSync('/etc/letsencrypt/live/bots.okgunbot.com/privkey.pem'),
//     // cert: fs.readFileSync('/etc/letsencrypt/live/bots.okgunbot.com/cert.pem'),
//     maxHeaderSize: 160000000,
//   };

//   const server = http.createServer(options, app);
//   server.listen(port, () => {
//     console.log(`Server is running on https://0.0.0.0:${port}`);
//   });
// } else {
app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
// }
