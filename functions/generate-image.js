exports.handler = async function(event, context) {
  try {
    // Get parameters from URL query
    const params = event.queryStringParameters;
    const days = params.days || '0';
    const amount = params.amount || '0';
    const month = params.month || '1';
    const year = params.year || '2023';
    
    // Simple validation
    if (isNaN(parseInt(days)) || isNaN(parseInt(amount))) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Invalid parameters' })
      };
    }
    
    // Calculate submission date
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const submissionDate = `${months[parseInt(month) - 1]} ${year}`;
    
    // Use external image generation service (like htmlcsstoimage.com API)
    // For now, redirect to a static SVG generation
    const svgContent = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#b91c1c;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#grad1)"/>
      
      <!-- Semi-transparent overlay -->
      <rect width="1200" height="630" fill="rgba(0,0,0,0.3)"/>
      
      <!-- Report Label -->
      <rect x="400" y="50" width="400" height="40" rx="20" fill="rgba(255,255,255,0.2)"/>
      <text x="600" y="75" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">PASSENGER CLAIM IGNORED</text>
      
      <!-- Airline Name -->
      <text x="600" y="140" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="64" font-weight="bold" letter-spacing="3px">SMARTWINGS</text>
      
      <!-- Days Count -->
      <text x="600" y="280" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="120" font-weight="bold">${days}</text>
      
      <!-- Days Label -->
      <text x="600" y="320" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="32" font-weight="bold">DAYS WITHOUT RESPONSE</text>
      
      <!-- Details Band Background -->
      <rect x="200" y="360" width="800" height="80" rx="10" fill="rgba(0,0,0,0.4)"/>
      
      <!-- Claim Filed -->
      <text x="400" y="385" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="14">CLAIM FILED</text>
      <text x="400" y="415" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">${submissionDate}</text>
      
      <!-- Amount -->
      <text x="800" y="385" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="14">AMOUNT</text>
      <text x="800" y="415" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">€${amount}</text>
      
      <!-- CTA -->
      <rect x="150" y="460" width="900" height="50" rx="8" fill="rgba(255,255,255,0.1)"/>
      <text x="600" y="490" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">HAVE THEY IGNORED YOUR CLAIM TOO?</text>
      
      <!-- Hashtags -->
      <text x="600" y="580" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="20">#SmartwingsWatch #PassengerRights</text>
    </svg>`;
    
    // Convert SVG to PNG using a simple method (or return SVG directly)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*'
      },
      body: svgContent
    };
    
  } catch (error) {
    console.log('Error generating image:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to generate image', 
        message: error.message
      })
    };
  }
};
