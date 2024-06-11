#!/usr/bin/env node

/**
 * Module dependencies.
 */

<<<<<<< HEAD
import chalk from 'chalk';
import { createServer } from 'http';
import app from '../app.js';
=======
import app from "../app.js";
import chalk from "chalk";
import { createServer } from "http";
>>>>>>> 2d1edc18bce51b59a278b1657867cf27e0aa237b

/**
 * Get port from environment and store in Express.
 */

<<<<<<< HEAD
const port = normalizePort(process.env.PORT || '3030');
app.set('port', port);
=======
const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);
>>>>>>> 2d1edc18bce51b59a278b1657867cf27e0aa237b

/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
<<<<<<< HEAD
server.on('error', onError);
server.on('listening', onListening);
=======
server.on("error", onError);
server.on("listening", onListening);
>>>>>>> 2d1edc18bce51b59a278b1657867cf27e0aa237b

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
<<<<<<< HEAD
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
=======
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case "EADDRINUSE":
>>>>>>> 2d1edc18bce51b59a278b1657867cf27e0aa237b
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
<<<<<<< HEAD
  let bind = typeof addr === 'string' ? `pipe  ${addr}` : `port ${addr.port}`;
=======
  let bind = typeof addr === "string" ? `pipe  ${addr}` : `port ${addr.port}`;
>>>>>>> 2d1edc18bce51b59a278b1657867cf27e0aa237b
  console.log(chalk.cyan(`Listening on ${bind}.`));
}
