async function updateStatus() {
    // Using the raw numerical IP to bypass any DNS blocks
    const ip = "5.175.137.121:25574";
    
    const dots = document.querySelectorAll('#status-dot, #status-dot-page');
    const texts = document.querySelectorAll('#server-status, #server-status-page');
    const counts = document.querySelectorAll('#player-count, #player-count-page');

    try {
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
    // 1. Copy the IP to the device
    navigator.clipboard.writeText("play.reachmc.fun");

    // 2. Remove any old popups just in case they click twice
    let oldToast = document.getElementById("custom-toast");
    if (oldToast) oldToast.remove();

    // 3. Create the slick new popup
    const toast = document.createElement("div");
    toast.id = "custom-toast";
    toast.innerText = "✅ IP: play.reachmc.fun Copied!";
    document.body.appendChild(toast);

    // 4. Slide it up
    setTimeout(() => {
        toast.classList.add("show");
    }, 10); 

    // 5. Fade it out after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400); 
    }, 3000);
}


updateStatus();
setInterval(updateStatus, 60000);
