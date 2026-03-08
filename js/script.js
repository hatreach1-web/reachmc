function copyIP() {
    navigator.clipboard.writeText("play.reachmc.fun");
    alert("IP play.reachmc.fun copied!");
}

async function updateStatus() {
    try {
        const response = await fetch('https://api.mcsrvstat.us/2/play.reachmc.fun');
        const data = await response.json();
        const dot = document.getElementById('status-dot');
        const text = document.getElementById('server-status');
        const count = document.getElementById('player-count');

        if(data.online) {
            dot.style.background = "#00ff88";
            dot.style.boxShadow = "0 0 10px #00ff88";
            text.innerText = "ONLINE";
            count.innerText = `| ${data.players.online} PLAYERS`;
        } else {
            text.innerText = "OFFLINE";
            dot.style.background = "#ff4b2b";
        }
    } catch(e) { console.log("Status Error"); }
}
updateStatus();