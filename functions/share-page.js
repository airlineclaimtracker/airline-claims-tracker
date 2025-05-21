exports.handler = async function(event, context) {
  try {
    // Get parameters from URL query
    const params = event.queryStringParameters || {};
    const days = params.days || '0';
    const amount = params.amount || '0'; 
    const month = params.month || '1';
    const year = params.year || '2023';
    
    // Create simple HTML without inline JavaScript attributes
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Airline Claim Card</title>
</head>
<body>
    <div>
        <h1>Airline Claim Card</h1>
        <p>Days: ${days}</p>
        <p>Amount: ${amount}</p>
        <p>Month: ${month}</p>
        <p>Year: ${year}</p>
    </div>
    
    <script>
        console.log("Script loaded");
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
