async function updateStatus() {
    const ip = "play.reachmc.fun:25574";
    
    const dots = document.querySelectorAll('#status-dot, #status-dot-page');
    const texts = document.querySelectorAll('#server-status, #server-status-page');
    const counts = document.querySelectorAll('#player-count, #player-count-page');

    try {
        // Using the v2 mcstatus.io API (Best for GitHub Pages)
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${ip}`);
        const data = await response.json();

        if (data.online) {
            dots.forEach(dot => {
                dot.style.background = "#00ff88";
                dot.style.boxShadow = "0 0 10px #00ff88";
            });
            texts.forEach(text => text.innerText = "ONLINE");
            counts.forEach(count => count.innerText = `| ${data.players.online} PLAYERS`);
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

updateStatus();
setInterval(updateStatus, 60000);
