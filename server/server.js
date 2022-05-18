const cluster = require("cluster");
const { cpus } = require("os");
const ip = require("ip");

const { app } = require("./app");

const { spawnWorker } = require("./utils/spawn-worker");

const PORT = Number(process.env.PORT) || 5000;
const processesNum = cpus().length;

if (process.env.NODE_ENV === "production") {
  if (cluster.isPrimary) {
    let workers = [];
    
    for (let i = 0; i < processesNum; i++) spawnWorker(workers, cluster, i);
  } else {
    app.listen(PORT, () => console.info("Worker run on port: " +PORT));
  };

} else if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => console.info("The server is running on development mode on port: "+PORT));
} else {
  app.listen(PORT, ip.address(), 
    () => console.info("The server is running in development mode on the local network at: "+ip.address()+":"+PORT));
};