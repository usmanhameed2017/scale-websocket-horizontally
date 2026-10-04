require("dotenv").config();
const os = require("os");
const cluster = require("cluster");
const { startApp } = require("./app");

(() => {
    if(cluster.isPrimary)
    {
        // Total CPU Cores
        const totalCPUS = os.cpus().length;

        // Info
        console.log(`Primary process ${process.pid} is running`);
        console.log(`Spawning ${totalCPUS} worker processes...`);       

        // Spawn workers
        for(let i = 1; i <= totalCPUS; i++) cluster.fork();

        // Restart dead workers
        cluster.on("exit", (worker) => {
            console.log(`Worker ${worker.process.pid} died. Restarting...`);
            cluster.fork();
        });        
    }
    else
    {
        startApp();
    }
})();