// ==============================================
// UPDATE: functions/generate-image.js
// ==============================================

const UPDATED_GENERATE_IMAGE_FUNCTION = `
exports.handler = async function(event, context) {
  try {
    // Get parameters from URL query
    const params = event.queryStringParameters;
    const days = params.days || '0';
    const amount = params.amount || '0';
    const month = params.month || '1';
    const year = params.year || '2023';
    const design = params.design || 'impact'; // New parameter for card design
    
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
    const submissionDate = \`\${months[parseInt(month) - 1]} \${year}\`;
    
    // Generate different designs based on parameter
    let svgContent;
    
    if (design === 'story') {
      // Instagram Story optimized (9:16 aspect ratio)
      svgContent = generateInstagramStoryCard(days, amount, submissionDate);
    } else if (design === 'square') {
      // Instagram Post optimized (1:1 aspect ratio)
      svgContent = generateInstagramPostCard(days, amount, submissionDate);
    } else {
      // Default impact design (optimized for Twitter/LinkedIn)
      svgContent = generateImpactCard(days, amount, submissionDate);
    }
    
    // Return SVG content with proper headers for social media
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        // Add social media optimization headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN'
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

// Instagram Story Card Generator (9:16 aspect ratio)
function generateInstagramStoryCard(days, amount, submissionDate) {
  return \`
  <svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="storyBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="1080" height="1920" fill="url(#storyBg)"/>
    
    <!-- Main Content Container -->
    <g transform="translate(80, 200)">
      <!-- Days Count - Large and centered -->
      <text x="460" y="300" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="180" font-weight="bold" style="text-shadow: 4px 4px 8px rgba(0,0,0,0.5)">\${days}</text>
      <text x="460" y="380" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">DAYS WAITING</text>
      
      <!-- Airline Name -->
      <text x="460" y="500" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="72" font-weight="bold">SMARTWINGS</text>
      
      <!-- Claim Info Box -->
      <rect x="160" y="600" width="600" height="180" rx="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
      <text x="460" y="650" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">CLAIM AMOUNT</text>
      <text x="460" y="700" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="56" font-weight="bold">€\${amount}</text>
      <text x="460" y="750" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="20">Filed: \${submissionDate}</text>
      
      <!-- Call to Action -->
      <rect x="120" y="850" width="680" height="100" rx="15" fill="rgba(255,255,255,0.3)"/>
      <text x="460" y="890" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="32" font-weight="bold">SWIPE UP</text>
      <text x="460" y="930" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24">to create your card</text>
      
      <!-- Hashtags -->
      <text x="460" y="1100" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif" font-size="28" font-weight="bold">#SmartwingsWatch #PassengerRights</text>
      
      <!-- Context Stats -->
      <rect x="60" y="1200" width="800" height="200" rx="20" fill="rgba(0,0,0,0.3)"/>
      <text x="460" y="1240" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">YOU ARE NOT ALONE</text>
      
      <!-- Stats Row -->
      <text x="200" y="1290" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="36" font-weight="bold">11,620</text>
      <text x="200" y="1320" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="16">damaged bags yearly</text>
      
      <text x="460" y="1290" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="36" font-weight="bold">€1.16M</text>
      <text x="460" y="1320" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="16">potential claims</text>
      
      <text x="720" y="1290" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="36" font-weight="bold">?</text>
      <text x="720" y="1320" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="16">how many waiting?</text>
      
      <text x="460" y="1360" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="Arial, sans-serif" font-size="14">Source: SITA 2024 Baggage IT Insights</text>
    </g>
  </svg>\`;
}

// Instagram Post Card Generator (1:1 aspect ratio)
function generateInstagramPostCard(days, amount, submissionDate) {
  return \`
  <svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="postBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#b91c1c;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="1080" height="1080" fill="url(#postBg)"/>
    
    <!-- Content Container -->
    <g transform="translate(60, 60)">
      <!-- Header -->
      <rect x="300" y="40" width="360" height="50" rx="25" fill="rgba(255,255,255,0.2)"/>
      <text x="480" y="72" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">PASSENGER CLAIM IGNORED</text>
      
      <!-- Airline Name -->
      <text x="480" y="160" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="64" font-weight="bold">SMARTWINGS</text>
      
      <!-- Days Count -->
      <text x="480" y="320" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="160" font-weight="bold" style="text-shadow: 4px 4px 8px rgba(0,0,0,0.5)">\${days}</text>
      <text x="480" y="380" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">DAYS WITHOUT RESPONSE</text>
      
      <!-- Details -->
      <rect x="120" y="440" width="720" height="80" rx="15" fill="rgba(0,0,0,0.3)"/>
      <text x="320" y="470" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="16">FILED</text>
      <text x="320" y="500" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">\${submissionDate}</text>
      
      <text x="640" y="470" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="16">AMOUNT</text>
      <text x="640" y="500" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">€\${amount}</text>
      
      <!-- Industry Context -->
      <rect x="80" y="580" width="800" height="140" rx="20" fill="rgba(0,0,0,0.4)"/>
      <text x="480" y="615" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">INDUSTRY REALITY</text>
      
      <text x="240" y="655" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="28" font-weight="bold">11,620</text>
      <text x="240" y="680" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="14">damaged bags yearly</text>
      
      <text x="480" y="655" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="28" font-weight="bold">€1.16M</text>
      <text x="480" y="680" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="14">potential claims</text>
      
      <text x="720" y="655" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="28" font-weight="bold">?</text>
      <text x="720" y="680" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="14">others waiting?</text>
      
      <text x="480" y="705" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="Arial, sans-serif" font-size="12">SITA 2024 Baggage IT Insights</text>
      
      <!-- Call to Action -->
      <rect x="160" y="760" width="640" height="60" rx="15" fill="rgba(255,255,255,0.2)"/>
      <text x="480" y="800" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="28" font-weight="bold">LINK IN BIO: CREATE YOUR CARD</text>
      
      <!-- Hashtags -->
      <text x="480" y="880" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif" font-size="20" font-weight="bold">#SmartwingsWatch #PassengerRights #AirlineAccountability</text>
      
      <!-- AI Badge -->
      <rect x="720" y="920" width="200" height="40" rx="20" fill="rgba(255,255,255,0.2)"/>
      <text x="820" y="945" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">🤖 AI-Built Tool</text>
    </g>
  </svg>\`;
}

// Default Impact Card (Twitter/LinkedIn optimized)
function generateImpactCard(days, amount, submissionDate) {
  // Your existing SVG generation code from paste-2.txt
  return \`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <!-- Your existing impact card SVG content -->
    <!-- ... (keep existing code from paste-2.txt) ... -->
  </svg>\`;
}
`;
