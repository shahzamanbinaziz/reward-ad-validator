<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>

    <style>
        .modal-overlay {
            display: flex; position: fixed; z-index: 9999; left: 0; top: 0;
            width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.98); 
            align-items: center; justify-content: center; font-family: sans-serif;
        }
        .modal-card {
            background-color: #111; padding: 45px 30px; border-radius: 40px; 
            width: 90%; max-width: 400px; text-align: center; border: 1px solid #333;
        }
        .btn-red {
            background-color: #ff0000; color: white; padding: 20px; 
            border-radius: 20px; font-weight: 900; width: 100%; 
            font-size: 18px; text-transform: uppercase; border: none; 
            cursor: pointer; transition: background 0.2s;
        }
        .btn-red:hover { background-color: #cc0000; }
    </style>
</head>
<body class="bg-black">

    <div id="offerwall-modal" class="modal-overlay">
        <div class="modal-card">
            <div style="color: #ff0000; font-size: 70px; font-weight: 900; margin-bottom: 10px;">N</div>
            <h2 class="text-4xl font-black text-white italic uppercase">VERIFICATION</h2>
            <h2 class="text-4xl font-black text-red-600 italic uppercase mb-6">REQUIRED</h2>
            
            <p class="text-gray-400 text-sm mb-10">
                Watch a short sponsored video to <span class="text-white font-bold">unlock</span> your content.
            </p>
            
            <button id="ad-btn" onclick="fireAdNow()" class="btn-red">
                Watch Ad to Continue
            </button>
        </div>
    </div>

    <script>
        const AD_PATH = '/23304722147/INSURANCE'; 

        window.googletag = window.googletag || {cmd: []};
        let adEventInstance = null;
        let rewardedSlot;

        googletag.cmd.push(function() {
            // 1. Define Slot
            rewardedSlot = googletag.defineOutOfPageSlot(AD_PATH, googletag.enums.OutOfPageFormat.REWARDED);
            
            if (rewardedSlot) {
                rewardedSlot.addService(googletag.pubads());

                // 2. Listen for 'Ready'
                googletag.pubads().addEventListener('rewardedSlotReady', function(event) {
                    adEventInstance = event;
                    console.log("Ad Ready");
                });

                // 3. Listen for 'Granted' (Success)
                googletag.pubads().addEventListener('rewardedSlotGranted', function() {
                    alert("Success! Content Unlocked.");
                    document.getElementById('offerwall-modal').style.display = 'none';
                });

                googletag.enableServices();
                
                // 4. Request the ad in the background immediately
                googletag.display(rewardedSlot);
            }
        });

        function fireAdNow() {
            if (adEventInstance) {
                // If Google has the ad ready, show it
                adEventInstance.makeRewardedVisible();
            } else {
                // If it's not ready yet, we tell the user to wait a second and try again
                const btn = document.getElementById('ad-btn');
                btn.innerText = "Ad Loading... Click Again";
                
                // Try to refresh/request again if it's stuck
                googletag.cmd.push(function() {
                    googletag.pubads().refresh([rewardedSlot]);
                });

                setTimeout(() => {
                    btn.innerText = "Watch Ad to Continue";
                }, 3000);
            }
        }
    </script>
</body>
</html>