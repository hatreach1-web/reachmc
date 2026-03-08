async function updateStatus() {
    const ip = "play.reachmc.fun";
    const port = "25574";
    
    // We target all possible IDs so it works on Home, Status, and Store pages
    const dots = document.querySelectorAll('#status-dot, #status-dot-page');
    const texts = document.querySelectorAll('#server-status, #server-status-page');
    const counts = document.querySelectorAll('#player-count, #player-count-page');

    try {
        // Using mcapi.io - it's very fast and reliable for custom ports
        const response = await fetch(`https://mcapi.us/server/status?ip=${ip}&port=${port}`);
        const data = await response.json();

        if (data.online) {
            dots.forEach(dot => {
                dot.style.background = "#00ff88";
                dot.style.boxShadow = "0 0 10px #00ff88";
            });
            texts.forEach(text => text.innerText = "ONLINE");
            counts.forEach(count => count.innerText = `| ${data.players.now} PLAYERS`);
        } else {
            setOffline(dots, texts, counts);
        }
    } catch (e) {
        console.error("Fetch Error:", e);
        setOffline(dots, texts, counts);
    }
}

function setOffline(dots, texts, counts) {
    texts.forEach(text => text.innerText = "OFFLINE");
    dots.forEach(dot => {
        dot.style.background = "#ff4b2b";
        dot.style.boxShadow = "none";
    });
    counts.forEach(count => count.innerText = "");
}

function copyIP() {
    navigator.clipboard.writeText("play.reachmc.fun");
    alert("IP: play.reachmc.fun copied!");
}

// Initial run
updateStatus();
// Refresh every 60 seconds
setInterval(updateStatus, 60000);
