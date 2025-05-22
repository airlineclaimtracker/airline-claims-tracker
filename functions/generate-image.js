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
    
    // Create complete SVG that matches the original design exactly
    const svgContent = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#b91c1c;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="overlayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.7);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.3);stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bgGradient)" rx="15"/>
      
      <!-- Gradient overlay -->
      <rect width="1200" height="630" fill="url(#overlayGradient)" rx="15"/>
      
      <!-- Report Label -->
      <rect x="450" y="40" width="300" height="35" rx="17" fill="rgba(255,255,255,0.2)"/>
      <text x="600" y="63" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">PASSENGER CLAIM IGNORED</text>
      
      <!-- Airline Name -->
      <text x="600" y="130" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="72" font-weight="bold" letter-spacing="2px">SMARTWINGS</text>
      
      <!-- Days Count -->
      <text x="600" y="270" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="180" font-weight="bold" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3)">${days}</text>
      
      <!-- Days Label -->
      <text x="600" y="310" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">DAYS WITHOUT RESPONSE</text>
      
      <!-- Details Band Background -->
      <rect x="150" y="350" width="900" height="70" rx="10" fill="rgba(0,0,0,0.2)"/>
      
      <!-- Claim Filed Section -->
      <text x="400" y="375" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">CLAIM FILED</text>
      <text x="400" y="405" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">${submissionDate}</text>
      
      <!-- Amount Section -->
      <text x="800" y="375" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">AMOUNT</text>
      <text x="800" y="405" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">€${amount}</text>
      
      <!-- CTA Banner -->
      <rect x="100" y="440" width="1000" height="50" rx="8" fill="rgba(255,255,255,0.1)"/>
      <text x="600" y="470" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">HAVE THEY IGNORED YOUR CLAIM TOO?</text>
      
      <!-- "YOU ARE NOT ALONE" Section Background -->
      <rect x="100" y="510" width="1000" height="80" rx="10" fill="rgba(0,0,0,0.3)"/>
      
      <!-- "YOU ARE NOT ALONE" Title -->
      <text x="600" y="535" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">YOU ARE NOT ALONE</text>
      
      <!-- Statistics Row -->
      <!-- 11,620 -->
      <text x="250" y="560" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="24" font-weight="bold">11,620</text>
      <text x="250" y="578" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">damaged bags yearly</text>
      
      <!-- €1.16M -->
      <text x="600" y="560" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="24" font-weight="bold">€1.16M</text>
      <text x="600" y="578" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">potential claims</text>
      
      <!-- ? -->
      <text x="950" y="560" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="24" font-weight="bold">?</text>
      <text x="950" y="578" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">how many waiting?</text>
      
      <!-- Data Source -->
      <text x="600" y="588" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="Arial, sans-serif" font-size="10">Source: SITA 2024 Baggage IT Insights</text>
      
      <!-- Hashtags -->
      <text x="600" y="615" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="16">#SmartwingsWatch #PassengerRights</text>
    </svg>`;
    
    // Return SVG content with proper headers
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: svgContent
    };
    
  } catch (error) {
    console.log('Error generating SVG image:', error);
    
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
