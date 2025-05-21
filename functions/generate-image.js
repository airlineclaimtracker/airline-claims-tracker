// First, add the proper import at the top of the file
const { createCanvas, loadImage } = require('canvas');

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
    
    // Create a canvas for the card (Twitter card size)
    const width = 1200;
    const height = 630;
    
    // Create canvas with error handling
    let canvas;
    try {
      canvas = createCanvas(width, height);
      if (!canvas) {
        throw new Error('Canvas creation failed');
      }
    } catch (canvasError) {
      console.error('Canvas creation error:', canvasError);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Failed to create canvas',
          message: canvasError.message
        })
      };
    }
    
    // Get context with error handling
    let ctx;
    try {
      ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }
    } catch (ctxError) {
      console.error('Context creation error:', ctxError);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Failed to get canvas context',
          message: ctxError.message
        })
      };
    }
    
    // Draw background
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(0, 0, width, height);
    
    // Add gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw airline name
    ctx.fillStyle = 'white';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SMARTWINGS', width / 2, 150);
    
    // Draw days count
    ctx.font = 'bold 180px Arial';
    ctx.fillText(days, width / 2, 350);
    
    // Draw "DAYS WITHOUT RESPONSE"
    ctx.font = 'bold 48px Arial';
    ctx.fillText('DAYS WITHOUT RESPONSE', width / 2, 420);
    
    // Draw claim details
    ctx.font = '36px Arial';
    ctx.fillText(`Claim Amount: €${amount}`, width / 2, 500);
    ctx.fillText(`Submitted: ${submissionDate}`, width / 2, 550);
    
    // Draw campaign hashtag
    ctx.font = 'bold 36px Arial';
    ctx.fillText('#PassengerRights #SmartwingsWatch', width / 2, 600);
    
    // Convert canvas to buffer with error handling
    let buffer;
    try {
      buffer = canvas.toBuffer('image/png');
      if (!buffer || buffer.length === 0) {
        throw new Error('Generated image buffer is empty');
      }
    } catch (bufferError) {
      console.error('Buffer creation error:', bufferError);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Failed to create image buffer',
          message: bufferError.message
        })
      };
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
        'Pragma': 'no-cache',
        // Add CORS headers to allow sharing from different origins
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    console.log('Error generating image:', error);
    
    // More detailed error reporting
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to generate image', 
        message: error.message,
        stack: error.stack
      })
    };
  }
};
