exports.handler = async function(event, context) {
  try {
    const params = event.queryStringParameters || {};
    const days = params.days || '0';
    const amount = params.amount || '0';
    const month = params.month || '1';
    const year = params.year || '2023';
    
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
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const submissionDate = `${months[parseInt(month) - 1]} ${year}`;
    
    const svgContent = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#b91c1c;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bgGradient)" rx="15"/>
  <rect width="1200" height="630" fill="rgba(0,0,0,0.3)" rx="15"/>
  
  <rect x="450" y="40" width="300" height="35" rx="17" fill="rgba(255,255,255,0.2)"/>
  <text x="600" y="63" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">PASSENGER CLAIM IGNORED</text>
  
  <text x="600" y="130" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="72" font-weight="bold" letter-spacing="2px">SMARTWINGS</text>
  
  <text x="600" y="270" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="180" font-weight="bold" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3)">${days}</text>
  
  <text x="600" y="310" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">DAYS WITHOUT RESPONSE</text>
  
  <rect x="150" y="350" width="900" height="70" rx="10" fill="rgba(0,0,0,0.2)"/>
  
  <text x="400" y="375" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">CLAIM FILED</text>
  <text x="400" y="405" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">${submissionDate}</text>
  
  <text x="800" y="375" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">AMOUNT</text>
  <text x="800" y="405" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">€${amount}</text>
  
  <rect x="100" y="440" width="1000" height="50" rx="8" fill="rgba(255,255,255,0.1)"/>
  <text x="600" y="470" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">HAVE THEY IGNORED YOUR CLAIM TOO?</text>
  
  <text x="600" y="520" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">YOU ARE NOT ALONE</text>
  
  <text x="250" y="560" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="24" font-weight="bold">11,620</text>
  <text x="250" y="578" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">damaged bags yearly</text>
  
  <text x="600" y="560" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="24" font-weight="bold">€1.16M</text>
  <text x="600" y="578" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">potential claims</text>
  
  <text x="950" y="560" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="24" font-weight="bold">?</text>
  <text x="950" y="578" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">how many waiting?</text>
  
  <text x="600" y="615" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="16">#SmartwingsWatch #PassengerRights</text>
</svg>`;
    
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
