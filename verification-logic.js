(function() {
    // 1. Wait for the page to be fully ready
    function startPlugin() {
        // --- 2. INJECT CSS ---
        const style = document.createElement('style');
        style.innerHTML = `
            #sz-overlay { display:flex; position:fixed; z-index:999999; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.98); align-items:center; justify-content:center; font-family:sans-serif; }
            .sz-card { background:#111; padding:40px; border-radius:40px; width:90%; max-width:400px; text-align:center; border:1px solid #333; color:white; }
            .sz-btn { background:#ff0000; color:white; padding:20px; border-radius:20px; font-weight:900; width:100%; font-size:18px; text-transform:uppercase; border:none; cursor:pointer; margin-top:20px; }
        `;
        document.head.appendChild(style);

        // --- 3. INJECT HTML ---
        const modal = document.createElement('div');
        modal.id = 'sz-overlay';
        modal.innerHTML = `
            <div class="sz-card">
                <div style="color:#ff0000; font-size:70px; font-weight:900; line-height:1;">N</div>
                <h2 style="font-size:32px; font-weight:900; font-style:italic; margin:0;">VERIFICATION</h2>
                <h2 style="font-size:32px; font-weight:900; font-style:italic; color:#ff0000; margin-bottom:20px;">REQUIRED</h2>
                <p style="color:#9ca3af; font-size:14px;">Watch a short sponsored video to unlock your content.</p>
                <button id="sz-btn" class="sz-btn">Watch Ad to Continue</button>
            </div>
        `;
        document.body.appendChild(modal);

        // --- 4. AD LOGIC ---
        const AD_PATH = '/23304722147/INSURANCE';
        window.googletag = window.googletag || {cmd: []};
        let adEvent = null;

        googletag.cmd.push(function() {
            const slot = googletag.defineOutOfPageSlot(AD_PATH, googletag.enums.OutOfPageFormat.REWARDED);
            if (slot) {
                slot.addService(googletag.pubads());
                googletag.pubads().addEventListener('rewardedSlotReady', (e) => { adEvent = e; });
                googletag.pubads().addEventListener('rewardedSlotGranted', () => { 
                    modal.style.display = 'none';
                    alert("Verification Success!");
                });
                googletag.enableServices();
                googletag.display(slot);
            }
        });

        document.getElementById('sz-btn').onclick = function() {
            if (adEvent) adEvent.makeRewardedVisible();
            else alert("Ad is still loading... wait 3 seconds.");
        };
    }

    // This ensures the script waits for the <body> to exist
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        startPlugin();
    } else {
        document.addEventListener('DOMContentLoaded', startPlugin);
    }
})();
