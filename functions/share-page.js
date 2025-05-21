exports.handler = async function(event, context) {
  try {
    // Get parameters from URL query
    const params = event.queryStringParameters;
    const days = params.days || '0';
    const amount = params.amount || '0'; 
    const month = params.month || '1';
    const year = params.year || '2023';
    
    // Calculate submission date for display
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const submissionDate = `${months[parseInt(month) - 1]} ${year}`;
    
    // Create the image URL
    const imageUrl = `${process.env.URL || 'https://airline-claims-tracker.netlify.app'}/api/generate-image?days=${days}&amount=${amount}&month=${month}&year=${year}`;
    
    // Create share title and description
    const title = `${days} days waiting for Smartwings to respond`;
    const description = `I filed a €${amount} claim in ${submissionDate}. Still waiting for a response. Are you experiencing delays too?`;
    
    // Twitter focused message
    const twitterText = `${days} days waiting for @Smartwings to respond to my €${amount} claim from ${submissionDate}. Industry data shows I'm not alone. #PassengerRights #SmartwingsWatch`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(`${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}`)}`;
    
    // LinkedIn more professional message
    const linkedinDescription = `I've been waiting ${days} days for a response to my €${amount} airline claim. This is part of a broader issue affecting thousands of passengers annually.\n\nLearn more:`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}`)}&summary=${encodeURIComponent(linkedinDescription)}`;
    
    // Facebook URL - make sure this uses your correct domain
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
    
    <style>
    /* Include critical CSS here to ensure styling works */
    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f8f9fa;
        color: #333;
    }
    
    .content-section {
        max-width: 1000px;
        margin: 0 auto;
        padding: 30px 20px;
    }
    
    h1 {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .claim-card-impact {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-image: linear-gradient(135deg, #dc2626, #991b1b);
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(220, 38, 38, 0.3);
        overflow: hidden;
        padding: 30px;
        font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: white;
        position: relative;
    }
    
    .card-content {
        position: relative;
        z-index: 2;
    }
    
    .card-header {
        text-align: center;
        margin-bottom: 25px;
    }
    
    .report-label {
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #fde047;
        margin-bottom: 5px;
    }
    
    .airline-name {
        font-size: 32px;
        font-weight: 900;
        letter-spacing: -0.02em;
    }
    
    .days-container {
        background: white;
        border-radius: 16px;
        padding: 20px;
        text-align: center;
        margin-bottom: 25px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .days-count {
        font-size: 80px;
        font-weight: 900;
        color: #dc2626;
        line-height: 1;
    }
    
    .days-label {
        font-size: 14px;
        font-weight: 700;
        color: #dc2626;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    
    .details-band {
        background: rgba(0, 0, 0, 0.2);
        margin: 0 -30px 25px;
        padding: 20px 30px;
        display: flex;
        justify-content: space-around;
    }
    
    .detail-item {
        text-align: center;
    }
    
    .detail-label {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 600;
        margin-bottom: 5px;
    }
    
    .detail-value {
        font-size: 20px;
        font-weight: 700;
        color: white;
    }
    
    .cta {
        background: white;
        color: #dc2626;
        text-align: center;
        padding: 15px;
        font-weight: 700;
        font-size: 16px;
        border-radius: 12px;
        margin-bottom: 25px;
    }
    
    .industry-context {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 15px;
        margin: 20px 0;
        font-size: 0.85rem;
    }
    
    .industry-context-title {
        font-weight: 700;
        margin-bottom: 10px;
        color: white;
        text-align: center;
        font-size: 0.9rem;
    }
    
    .industry-stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .stat-item {
        flex: 1;
        min-width: 100px;
        text-align: center;
        padding: 8px;
        background: rgba(0, 0, 0, 0.2);
    }
    
    .stat-value {
        font-weight: 700;
        font-size: 1.1rem;
        color: #fde047;
    }
    
    .stat-label {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .data-source {
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
        margin-top: 8px;
        font-style: italic;
    }
    
    .hashtags {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        color: #fde047;
    }
    
    .share-section {
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        margin-top: 30px;
        text-align: center;
    }
    
    .share-section h2 {
        margin-top: 0;
    }
    
    .share-subtitle {
        color: #666;
        margin-top: -5px;
        margin-bottom: 20px;
        font-size: 0.95rem;
    }
    
    .share-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 20px;
    }
    
    .share-btn {
        padding: 15px 20px;
        border: 2px solid #e9ecef;
        border-radius: 10px;
        background: white;
        color: #333;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
    }
    
    .share-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .share-btn.twitter {
        border-color: #1da1f2;
        color: #1da1f2;
    }
    
    .share-btn.twitter:hover {
        background: #1da1f2;
        color: white;
    }
    
    .share-btn.facebook {
        border-color: #4267b2;
        color: #4267b2;
    }
    
    .share-btn.facebook:hover {
        background: #4267b2;
        color: white;
    }
    
    .share-btn.linkedin {
        border-color: #0077b5;
        color: #0077b5;
    }
    
    .share-btn.linkedin:hover {
        background: #0077b5;
        color: white;
    }
    
    .mobile-share-container {
        display: none;
    }
    
    .create-your-own {
        text-align: center;
        margin-top: 30px;
    }
    
    .btn {
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        display: inline-block;
        text-decoration: none;
    }
    
    .btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(220, 53, 69, 0.4);
    }
    
    @media (max-width: 768px) {
        .details-band {
            flex-direction: column;
            gap: 15px;
            align-items: center;
        }
        
        .share-grid {
            grid-template-columns: 1fr;
        }
        
        .mobile-share-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 20px 0;
        }
        
        .mobile-share-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #333;
            margin-top: 0;
            margin-bottom: 15px;
        }
        
        .mobile-share-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 16px;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            background: #dc3545;
            color: white;
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
        }
        
        .mobile-share-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        
        .mobile-share-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #f8f9fa;
            border: 1px solid #eee;
            border-radius: 12px;
            padding: 15px 10px;
            font-size: 0.9rem;
            font-weight: 600;
            color: #333;
            transition: all 0.2s ease;
            text-decoration: none;
        }
        
        .mobile-share-option:hover, 
        .mobile-share-option:active {
            background: #f0f0f0;
            transform: translateY(-2px);
        }
    }
    .sharing-tip {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 12px 15px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    color: #6c757d;
}

.sharing-tip strong {
    color: #212529;
}

.share-btn.download {
    border-color: #28a745;
    color: #28a745;
}

.share-btn.download:hover {
    background: #28a745;
    color: white;
}

.share-btn.copy {
    border-color: #6c757d;
    color: #6c757d;
}

.share-btn.copy:hover {
    background: #6c757d;
    color: white;
}

.platform-instructions {
    margin-top: 30px;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
}

.platform-instructions h3 {
    margin-top: 0;
    font-size: 1.2rem;
    color: #343a40;
    margin-bottom: 15px;
}

.instruction-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.instruction-item {
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.instruction-item h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #495057;
}

.instruction-item ol {
    padding-left: 20px;
    margin: 0;
}

.instruction-item li {
    margin-bottom: 8px;
    color: #6c757d;
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
        <a href="${imageUrl}" download="airline-claim-card.png" target="_blank" class="share-btn download">
            <span>📸</span> Download Image
        </a>
        
        <button onclick="copyImageToClipboard('${imageUrl}')" class="share-btn copy">
            <span>📋</span> Copy Image
        </button>
        
        <a href="${twitterShareUrl}" target="_blank" class="share-btn twitter">
            <span>🐦</span> Share on Twitter/X
        </a>
        
        <a href="${facebookShareUrl}" target="_blank" class="share-btn facebook">
            <span>📘</span> Post on Facebook
        </a>
        
        <a href="${linkedinShareUrl}" target="_blank" class="share-btn linkedin">
            <span>💼</span> Post on LinkedIn
        </a>
    </div>
    
    <div class="mobile-share-container">
        <h3 class="mobile-share-title">Share Your Card</h3>
        
        <div class="mobile-share-primary">
            <button class="mobile-share-btn primary" id="native-share-btn" onclick="nativeShare()">
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
            <a href="${linkedinShareUrl}" target="_blank" class="mobile-share-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0077b5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
            </a>
            
            <a href="${twitterShareUrl}" target="_blank" class="mobile-share-option">
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
            
            <a href="${imageUrl}" download="airline-claim-card.png" class="mobile-share-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#28a745">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Save Image
            </a>
        </div>
    </div>
</div>

        <div class="create-your-own">
            <h3>Waiting for your own claim to be processed?</h3>
            <a href="/" class="btn">Create Your Own Card</a>
        </div>
    </div>

    <script>
    
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

        document.addEventListener('DOMContentLoaded', function() {
            const nativeShareBtn = document.getElementById('native-share-btn');
            if (nativeShareBtn) {
                nativeShareBtn.addEventListener('click', nativeShare);
            }
        });

        async function copyImageToClipboard(url) {
    try {
        // Fetch the image
        const response = await fetch(url);
        const blob = await response.blob();
        
        // Create an image element to get dimensions
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        await new Promise(resolve => img.onload = resolve);
        
        // Create a canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Convert canvas to blob
        canvas.toBlob(async function(blob) {
            try {
                // Try to copy the image
                const item = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([item]);
                
                alert('Image copied! You can now paste it into your social media post.');
            } catch (err) {
                console.error('Failed to copy image:', err);
                alert('Could not copy image. Please use the download button instead.');
            }
        });
    } catch (err) {
        console.error('Error:', err);
        alert('Could not copy image. Please use the download button instead.');
    }
}
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
