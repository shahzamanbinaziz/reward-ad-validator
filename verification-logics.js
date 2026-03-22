(function() {
    // 1. AUTO-LOAD GOOGLE GPT LIBRARY (If not already there)
    if (!window.googletag) {
        var gptScript = document.createElement('script');
        gptScript.async = true;
        gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
        document.head.appendChild(gptScript);
    }

    // 2. INJECT CSS & HTML (The UI)
    const injectUI = () => {
        if (document.getElementById('sz-overlay')) return; // Don't inject twice

        const style = document.createElement('style');
        style.innerHTML = `
            #sz-overlay { display: flex; position: fixed; z-index: 999999; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.98); align-items: center; justify-content: center; font-family: sans-serif; }
            .sz-card { background: #111; padding: 40px; border-radius: 40px; width: 90%; max-width: 400px; text-align: center; border: 1px solid #333; color: white; }
            .sz-btn { background: #ff0000; color: white; padding: 20px; border-radius: 20px; font-weight: 900; width: 100%; font-size: 18px; text-transform: uppercase; border: none; cursor: pointer; margin-top: 20px; }
        `;
        document.head.appendChild(style);

        const modal = document.createElement('div');
        modal.id = 'sz-overlay';
        modal.innerHTML = `
            <div class="sz-card">
                <div style="color: #ff0000; font-size: 70px; font-weight: 900; line-height: 1;">N</div>
                <h2 style="font-size: 32px; font-weight: 900; font-style: italic; margin: 0;">VERIFICATION</h2>
                <h2 style="font-size: 32px; font-weight: 900; font-style: italic; color: #ff0000; margin-bottom: 20px;">REQUIRED</h2>
                <p style="color: #9ca3af; font-size: 14px;">Watch a short sponsored video to unlock your content.</p>
                <button id="sz-btn" class="sz-btn">Watch Ad to Continue</button>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('sz-btn').onclick = function() {
            if (window.szAdEvent) {
                window.szAdEvent.makeRewardedVisible();
            } else {
                alert("Ad is still loading. Please wait 3 seconds.");
            }
        };
    };

    // 3. THE AD LOGIC (REVERTED TO YOUR WORKING VERSION)
    window.googletag = window.googletag || {cmd: []};
    window.szAdEvent = null;

    googletag.cmd.push(function() {
        var rewardedSlot = googletag.defineOutOfPageSlot('/23304722147/INSURANCE', googletag.enums.OutOfPageFormat.REWARDED);
        
        if (rewardedSlot) {
            rewardedSlot.addService(googletag.pubads());
            
            googletag.pubads().addEventListener('rewardedSlotReady', function(event) {
                window.szAdEvent = event;
                console.log("Ad Ready");
            });

            googletag.pubads().addEventListener('rewardedSlotGranted', function() {
                document.getElementById('sz-overlay').style.display = 'none';
                alert("Verification Successful!");
            });

            googletag.enableServices();
            googletag.display(rewardedSlot);
        }
    });

    // 4. TRIGGER UI
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        injectUI();
    } else {
        document.addEventListener('DOMContentLoaded', injectUI);
    }
})();
