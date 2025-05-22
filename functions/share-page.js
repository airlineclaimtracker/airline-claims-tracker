exports.handler = async function(event, context) {
  try {
    // Get parameters from URL query
    const params = event.queryStringParameters || {};
    const days = params.days || '0';
    const amount = params.amount || '0'; 
    const month = params.month || '1';
    const year = params.year || '2023';
    
    // Calculate submission date for display
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const submissionDate = `${months[parseInt(month) - 1]} ${year}`;
    
    // Create the image URL
    const imageUrl = `${process.env.URL || 'https://airline-claims-tracker.netlify.app'}/api/generate-image?days=${days}&amount=${amount}&month=${month}&year=${year}`;
    
    // Create share URLs
    const title = `${days} days waiting for Smartwings to respond`;
    const description = `I filed a €${amount} claim in ${submissionDate}. Still waiting for a response. Are you experiencing delays too?`;
    
    const twitterText = `${days} days waiting for @Smartwings to respond to my €${amount} claim from ${submissionDate}. Industry data shows I'm not alone. #PassengerRights #SmartwingsWatch`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(`${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}`)}`;
    
    const linkedinDescription = `I've been waiting ${days} days for a response to my €${amount} airline claim. This is part of a broader issue affecting thousands of passengers annually.\n\nLearn more:`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}`)}&summary=${encodeURIComponent(linkedinDescription)}`;
    
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}`)}`;
   
    // Generate the HTML
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | SmartwingsWatch</title>
    
    <!-- Open Graph tags for social sharing -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${process.env.URL || 'https://airline-claims-tracker.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}">
    
    <!-- Twitter card tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${imageUrl}">

    <!-- LinkedIn specific tags -->
    <meta property="og:image:secure_url" content="${imageUrl}">
    <meta name="author" content="SmartwingsWatch">
    <meta name="image" property="og:image" content="${imageUrl}">
    
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .content-section {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .card-container {
            text-align: center;
            margin: 30px 0;
        }
        .claim-card-impact {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(220, 38, 38, 0.3);
            max-width: 600px;
            margin: 0 auto;
        }
        .card-header {
            margin-bottom: 30px;
        }
        .report-label {
            font-size: 14px;
            font-weight: bold;
            background: rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            margin-bottom: 15px;
        }
        .airline-name {
            font-size: 48px;
            font-weight: bold;
            letter-spacing: 2px;
        }
        .days-container {
            margin: 40px 0;
        }
        .days-count {
            font-size: 120px;
            font-weight: bold;
            line-height: 1;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .days-label {
            font-size: 24px;
            font-weight: bold;
            margin-top: 10px;
        }
        .details-band {
            background: rgba(0,0,0,0.2);
            padding: 20px;
            border-radius: 10px;
            display: flex;
            justify-content: space-around;
            margin: 30px 0;
        }
        .detail-item {
            text-align: center;
        }
        .detail-label {
            font-size: 12px;
            opacity: 0.8;
            margin-bottom: 5px;
        }
        .detail-value {
            font-size: 18px;
            font-weight: bold;
        }
        .cta {
            font-size: 20px;
            font-weight: bold;
            margin: 30px 0;
            padding: 15px;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
        }
        .industry-context {
            background: rgba(0,0,0,0.3);
            padding: 25px;
            border-radius: 10px;
            margin: 30px 0;
        }
        .industry-context-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .industry-stats {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
        }
        .stat-item {
            text-align: center;
        }
        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #fbbf24;
        }
        .stat-label {
            font-size: 12px;
            opacity: 0.8;
            margin-top: 5px;
        }
        .data-source {
            font-size: 10px;
            opacity: 0.6;
            text-align: center;
            margin-top: 15px;
        }
        .hashtags {
            font-size: 16px;
            margin-top: 20px;
            opacity: 0.8;
        }
        .share-section {
            margin: 40px 0;
            text-align: center;
        }
        .share-subtitle {
            color: #666;
            margin-bottom: 30px;
        }
        .sharing-tip {
            background: #e3f2fd;
            border: 1px solid #2196f3;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            color: #1976d2;
        }
        .share-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 30px 0;
        }
        .share-btn {
            padding: 15px 20px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: transform 0.2s;
        }
        .share-btn:hover {
            transform: translateY(-2px);
        }
        .share-btn.download {
            background: #28a745;
            color: white;
        }
        .share-btn.copy {
            background: #6c757d;
            color: white;
        }
        .share-btn.twitter {
            background: #1da1f2;
            color: white;
        }
        .share-btn.facebook {
            background: #1877f2;
            color: white;
        }
        .share-btn.linkedin {
            background: #0077b5;
            color: white;
        }
        .mobile-share-container {
            display: none;
            margin: 40px 0;
            padding: 30px;
            background: #f8f9fa;
            border-radius: 15px;
        }
        .mobile-share-title {
            margin-bottom: 20px;
            color: #333;
        }
        .mobile-share-primary {
            margin-bottom: 20px;
        }
        .mobile-share-btn {
            width: 100%;
            padding: 15px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        .mobile-share-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        .mobile-share-option {
            padding: 15px;
            border: 2px solid #dee2e6;
            border-radius: 10px;
            text-decoration: none;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: white;
            font-weight: bold;
            cursor: pointer;
        }
        .create-your-own {
            text-align: center;
            margin: 50px 0;
            padding: 30px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            background: #dc2626;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin-top: 15px;
        }
        
        @media (max-width: 768px) {
            .content-section {
                padding: 20px;
            }
            .claim-card-impact {
                padding: 30px 20px;
            }
            .airline-name {
                font-size: 36px;
            }
            .days-count {
                font-size: 80px;
            }
            .details-band {
                flex-direction: column;
                gap: 15px;
            }
            .industry-stats {
                flex-direction: column;
                gap: 15px;
            }
            .share-grid {
                grid-template-columns: 1fr;
            }
            .mobile-share-container {
                display: block;
            }
        }
    </style>
</head>
<body>
    <div class="content-section">
        <h1>Airline Accountability Campaign</h1>
        
        <div class="card-container">
            <div class="claim-card-impact" id="impact-card" style="display: block;">
                <div class="card-content">
                    <div class="card-header">
                        <div class="report-label">PASSENGER CLAIM IGNORED</div>
                        <div class="airline-name">SMARTWINGS</div>
                    </div>
                    
                    <div class="days-container">
                        <div class="days-count">${days}</div>
                        <div class="days-label">Days Without Response</div>
                    </div>
                    
                    <div class="details-band">
                        <div class="detail-item">
                            <div class="detail-label">CLAIM FILED</div>
                            <div class="detail-value">${submissionDate}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">AMOUNT</div>
                            <div class="detail-value">€${amount}</div>
                        </div>
                    </div>
                    
                    <div class="cta">HAVE THEY IGNORED YOUR CLAIM TOO?</div>
                    
                    <div class="industry-context">
                        <div class="industry-context-title">YOU ARE NOT ALONE</div>
                        <div class="industry-stats">
                            <div class="stat-item">
                                <div class="stat-value">11,620</div>
                                <div class="stat-label">damaged bags yearly</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">€1.16M</div>
                                <div class="stat-label">potential claims</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">?</div>
                                <div class="stat-label">how many waiting?</div>
                            </div>
                        </div>
                        <div class="data-source">Source: SITA 2024 Baggage IT Insights</div>
                    </div>
                    
                    <div class="hashtags">#SmartwingsWatch #PassengerRights</div>
                </div>
            </div>
        </div>
        
<div class="share-section" style="display: block;">
    <h2>Share Your Experience</h2>
    <p class="share-subtitle">Help others understand Smartwings' response times by sharing your experience</p>
    
    <div class="sharing-tip">
        <strong>Pro Tip:</strong> For best results when sharing, download or copy the image first, then attach it to your post.
    </div>
    
    <div class="share-grid">
        <button id="download-btn" class="share-btn download">
            <span>📸</span> Download Image
        </button>
        
        <button id="copy-btn" class="share-btn copy">
            <span>📋</span> Copy Image
        </button>
        
        <a href="${twitterShareUrl}" target="_blank" class="share-btn twitter" id="twitter-btn">
            <span>🐦</span> Share on Twitter/X
        </a>
        
        <a href="${facebookShareUrl}" target="_blank" class="share-btn facebook">
            <span>📘</span> Post on Facebook
        </a>
        
        <a href="${linkedinShareUrl}" target="_blank" class="share-btn linkedin" id="linkedin-btn">
            <span>💼</span> Post on LinkedIn
        </a>
    </div>
    
    <div class="sharing-tip" id="linkedin-instructions" style="display: none;">
    <strong>LinkedIn Sharing Tip:</strong>
    <ol>
        <li>First download the image using the Download button above</li>
        <li>When LinkedIn opens, type your message</li>
        <li>Click the image icon in LinkedIn's post editor</li>
        <li>Select the downloaded image from your device</li>
        <li>Complete your post</li>
    </ol>
    <button id="linkedin-close-btn" style="background: #0077b5; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Got it</button>
</div>

<div class="sharing-tip" id="twitter-instructions" style="display: none;">
    <strong>Twitter/X Sharing Tip:</strong>
    <ol>
        <li>First download the image using the Download button above</li>
        <li>When Twitter/X opens, type your message</li>
        <li>Click the image icon in Twitter's compose box</li>
        <li>Select the downloaded image from your device</li>
        <li>Complete your tweet</li>
    </ol>
    <button id="twitter-close-btn" style="background: #1da1f2; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Got it</button>
</div>
    
    <div class="mobile-share-container">
        <h3 class="mobile-share-title">Share Your Card</h3>
        
        <div class="mobile-share-primary">
            <button class="mobile-share-btn primary" id="native-share-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                Share via App
            </button>
        </div>
        
        <div class="mobile-share-options">
            <a href="${linkedinShareUrl}" target="_blank" class="mobile-share-option" id="mobile-linkedin-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0077b5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
            </a>
            
            <a href="${twitterShareUrl}" target="_blank" class="mobile-share-option" id="mobile-twitter-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                Twitter/X
            </a>
            
            <a href="${facebookShareUrl}" target="_blank" class="mobile-share-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                Facebook
            </a>
            
            <button id="mobile-save-btn" class="mobile-share-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#28a745">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Save Image
            </button>
        </div>
    </div>
</div>

        <div class="create-your-own">
            <h3>Waiting for your own claim to be processed?</h3>
            <a href="/" class="btn">Create Your Own Card</a>
        </div>
    </div>

    <script>
    // Define all functions first before adding event listeners
    async function downloadImage(url, filename) {
        try {
            // Fetch the image as a blob
            const response = await fetch(url);
            const blob = await response.blob();
            
            // Create a temporary URL for the blob
            const blobUrl = window.URL.createObjectURL(blob);
            
            // Create a temporary anchor element
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = filename || 'smartwings-claim-card.png';
            
            // Append to body, click to download, then clean up
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a);
            
            console.log('Image downloaded successfully');
        } catch (error) {
            console.error('Download failed:', error);
            alert('Could not download the image. Please try another sharing option.');
        }
    }
    
    function nativeShare() {
        if (navigator.share) {
            // Try to share the URL first
            navigator.share({
                title: "Airline Accountability Campaign",
                text: "Check out how long I've been waiting for my airline claim to be processed",
                url: window.location.href
            })
            .then(() => console.log('Shared successfully'))
            .catch(err => {
                console.error('Share error:', err);
                alert('There was an error sharing. Please use one of the platform buttons below.');
            });
        } else {
            alert('Native sharing is not supported on this browser. Please use the platform buttons below.');
        }
    }
    
    async function copyImageToClipboard(url) {
        try {
            // Create a temporary image element
            const img = document.createElement('img');
            img.crossOrigin = 'anonymous';
            img.src = url;
            
            // Wait for image to load
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = () => {
                    alert('Could not copy image. Please try downloading instead.');
                    reject(new Error('Image failed to load'));
                };
            });
            
            // Create canvas
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw image to canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // Show manual copy instructions (works in all browsers)
            const dataUrl = canvas.toDataURL('image/png');
            const tempImg = document.createElement('img');
            tempImg.src = dataUrl;
            tempImg.style.position = 'fixed';
            tempImg.style.left = '0';
            tempImg.style.top = '0';
            tempImg.style.right = '0';
            tempImg.style.bottom = '0';
            tempImg.style.margin = 'auto';
            tempImg.style.maxWidth = '90%';
            tempImg.style.maxHeight = '70%';
            tempImg.style.zIndex = '10001';
            
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.left = '0';
            overlay.style.top = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
            overlay.style.zIndex = '10000';
            overlay.style.display = 'flex';
            overlay.style.flexDirection = 'column';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            
            const instructions = document.createElement('div');
            instructions.style.color = 'white';
            instructions.style.padding = '20px';
            instructions.style.textAlign = 'center';
            instructions.style.maxWidth = '500px';
            instructions.style.backgroundColor = 'rgba(0,0,0,0.7)';
            instructions.style.borderRadius = '10px';
            instructions.style.margin = '20px';
            instructions.innerHTML = \`
                <h3>Right-click on the image and select "Copy Image"</h3>
                <p>Then click anywhere to close this window</p>
                <p>You can then paste the image into your social media post</p>
            \`;
            
            overlay.appendChild(tempImg);
            overlay.appendChild(instructions);
            document.body.appendChild(overlay);
            
            overlay.onclick = function() {
                document.body.removeChild(overlay);
            };
            
        } catch (error) {
            console.error('Copy image failed:', error);
            alert('Could not copy image. Please try downloading instead.');
        }
    }

    // Setup all event listeners after the DOM has loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Download button
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                downloadImage('${imageUrl}', 'airline-claim-card.png');
            });
        }
        
        // Copy button
        const copyBtn = document.getElementById('copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                copyImageToClipboard('${imageUrl}');
            });
        }
        
        // Native share button
        const nativeShareBtn = document.getElementById('native-share-btn');
        if (nativeShareBtn) {
            nativeShareBtn.addEventListener('click', nativeShare);
        }
        
        // Mobile save button
        const mobileSaveBtn = document.getElementById('mobile-save-btn');
        if (mobileSaveBtn) {
            mobileSaveBtn.addEventListener('click', function() {
                downloadImage('${imageUrl}', 'airline-claim-card.png');
            });
        }
        
        // LinkedIn instructions
        const linkedinBtn = document.getElementById('linkedin-btn');
        if (linkedinBtn) {
            linkedinBtn.addEventListener('click', function() {
                document.getElementById('linkedin-instructions').style.display = 'block';
            });
        }
        
        // Close LinkedIn instructions
        const linkedinCloseBtn = document.getElementById('linkedin-close-btn');
        if (linkedinCloseBtn) {
            linkedinCloseBtn.addEventListener('click', function() {
                document.getElementById('linkedin-instructions').style.display = 'none';
            });
        }
        
        // Twitter instructions
        const twitterBtn = document.getElementById('twitter-btn');
        if (twitterBtn) {
            twitterBtn.addEventListener('click', function() {
                document.getElementById('twitter-instructions').style.display = 'block';
            });
        }
        
        // Close Twitter instructions
        const twitterCloseBtn = document.getElementById('twitter-close-btn');
        if (twitterCloseBtn) {
            twitterCloseBtn.addEventListener('click', function() {
                document.getElementById('twitter-instructions').style.display = 'none';
            });
        }
        
        // Mobile LinkedIn button
        const mobileLinkedInBtn = document.getElementById('mobile-linkedin-btn');
        if (mobileLinkedInBtn) {
            mobileLinkedInBtn.addEventListener('click', function() {
                document.getElementById('linkedin-instructions').style.display = 'block';
            });
        }
        
        // Mobile Twitter button
        const mobileTwitterBtn = document.getElementById('mobile-twitter-btn');
        if (mobileTwitterBtn) {
            mobileTwitterBtn.addEventListener('click', function() {
                document.getElementById('twitter-instructions').style.display = 'block';
            });
        }
    });
    </script>
</body>
</html>
`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: html
    };
  } catch (error) {
    console.log('Error rendering share page:', error);
    return {
      statusCode: 500,
      body: 'An error occurred generating the share page'
    };
  }
};
