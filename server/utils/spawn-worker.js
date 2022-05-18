function spawnWorker(workers, cluster, i) {
  workers[i] = cluster.fork();
  console.info("New worker spawns: " + i);

  // Optional: Restart worker on exit
  workers[i].on("exit", (code, signal) => {
    
    console.error("Worker was killed by signal: " + signal)
    console.error("Worker exited with error code: " + code)
    console.info("Respawning worker:", i);
    spawnWorker(workers, cluster, i);
  });
};

module.exports = { spawnWorker };