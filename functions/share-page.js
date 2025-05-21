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
    const imageUrl = `${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/api/generate-image?days=${days}&amount=${amount}&month=${month}&year=${year}`;
    
    // Create share URLs
    const title = `${days} days waiting for Smartwings to respond`;
    const description = `I filed a €${amount} claim in ${submissionDate}. Still waiting for a response. Are you experiencing delays too?`;
    
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(`${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}`)}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}`)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}`)}`;
   
    // HTML with structure but NO JavaScript functionality
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
    <meta property="og:url" content="${process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app'}/share?days=${days}&amount=${amount}&month=${month}&year=${year}">
    
    <!-- Twitter card tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${imageUrl}">
</head>
<body>
    <div>
        <h1>Airline Accountability Campaign</h1>
        
        <div>
            <div>
                <div>
                    <div>PASSENGER CLAIM IGNORED</div>
                    <div>SMARTWINGS</div>
                </div>
                
                <div>
                    <div>${days}</div>
                    <div>Days Without Response</div>
                </div>
                
                <div>
                    <div>
                        <div>CLAIM FILED</div>
                        <div>${submissionDate}</div>
                    </div>
                    <div>
                        <div>AMOUNT</div>
                        <div>€${amount}</div>
                    </div>
                </div>
                
                <div>HAVE THEY IGNORED YOUR CLAIM TOO?</div>
                
                <div>#SmartwingsWatch #PassengerRights</div>
            </div>
        </div>
        
        <div>
            <h2>Share Your Experience</h2>
            <p>Help others understand Smartwings' response times by sharing your experience</p>
            
            <div>
                <a href="${twitterShareUrl}" target="_blank">Share on Twitter/X</a>
                <a href="${facebookShareUrl}" target="_blank">Post on Facebook</a>
                <a href="${linkedinShareUrl}" target="_blank">Post on LinkedIn</a>
            </div>
        </div>
    </div>
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
