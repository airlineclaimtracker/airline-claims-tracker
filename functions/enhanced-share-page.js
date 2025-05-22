/**
 * ENHANCED SHARE PAGE - Netlify Function
 * Generates professional share pages with perfect social media previews
 * Handles /passenger-experience/{days}-days-waiting URLs
 */

exports.handler = async function(event, context) {
    try {
        console.log('Enhanced share page request:', event.path);
        console.log('Query parameters:', event.queryStringParameters);
        
        // Extract parameters from URL query (fallback) or path
        const params = event.queryStringParameters || {};
        let days = params.days || '0';
        let amount = params.amount || '0';
        let month = params.month || '1';
        let year = params.year || '2023';
        
        // Try to extract from path if available
        const pathMatch = event.path.match(/\/passenger-experience\/(\d+)-days-waiting/);
        if (pathMatch) {
            days = pathMatch[1];
        }
        
        // Validation
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
        
        // Calculate submission date for display
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const submissionDate = `${months[parseInt(month) - 1]} ${year}`;
        
        // Generate URLs
        const baseUrl = process.env.URL || 'https://dainty-gaufre-7b2c2f.netlify.app';
        const currentUrl = `${baseUrl}/passenger-experience/${days}-days-waiting`;
        const imageUrl = `${baseUrl}/api/generate-image?days=${days}&amount=${amount}&month=${month}&year=${year}`;
        
        // Generate meta content
        const title = `${days} Days Waiting: Smartwings Passenger Experience`;
        const description = `A passenger has been waiting ${days} days for response to a €${amount} airline claim filed in ${submissionDate}. Industry data suggests this reflects broader patterns affecting thousands of passengers annually.`;
        
        // Enhanced social sharing URLs
        const twitterText = `📊 Documenting Airline Accountability: ${days} days without response on a €${amount} claim. Industry data shows ~11,620 damaged bags yearly. Are you also waiting?`;
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(currentUrl)}`;
        
        const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        
        // Generate the enhanced HTML page
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    
    <!-- Enhanced Open Graph Meta Tags for LinkedIn/Facebook -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${currentUrl}">
    <meta property="og:site_name" content="SmartwingsWatch">
    
    <!-- Enhanced Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:site" content="@SmartwingsWatch">
    
    <!-- Additional SEO Meta Tags -->
    <meta name="description" content="${description}">
    <meta name="keywords" content="airline accountability, passenger rights, claim delays, Smartwings, consumer protection">
    <meta name="author" content="SmartwingsWatch">
    <meta name="robots" content="index, follow">
    
    <!-- Enhanced Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${title}",
        "description": "${description}",
        "image": "${imageUrl}",
        "author": {
            "@type": "Organization",
            "name": "SmartwingsWatch"
        },
        "publisher": {
            "@type": "Organization",
            "name": "SmartwingsWatch"
        },
        "datePublished": "${new Date().toISOString()}",
        "url": "${currentUrl}"
    }
    </script>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            min-height: 100vh;
        }
        
        .hero-section {
            background: white;
            padding: 60px 20px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .hero-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #dc2626;
            margin-bottom: 20px;
            line-height: 1.2;
        }
        
        .hero-subtitle {
            font-size: 1.2rem;
            color: #666;
            max-width: 600px;
            margin: 0 auto 40px;
        }
        
        .card-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow: hidden;
            margin-bottom: 60px;
        }
        
        .card-image {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .context-section {
            padding: 40px;
            background: white;
        }
        
        .context-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .context-item {
            padding: 25px;
            background: #f8f9fa;
            border-radius: 12px;
            border-left: 4px solid #dc2626;
        }
        
        .context-label {
            font-size: 0.9rem;
            color: #666;
            font-weight: 600;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .context-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: #dc2626;
            margin-bottom: 5px;
        }
        
        .context-description {
            font-size: 0.95rem;
            color: #555;
        }
        
        .industry-context {
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            padding: 40px;
            border-radius: 12px;
            margin: 40px 0;
        }
        
        .industry-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .industry-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .stat-item {
            text-align: center;
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .data-source {
            text-align: center;
            font-size: 0.85rem;
            opacity: 0.8;
            margin-top: 20px;
        }
        
        .share-section {
            background: white;
            padding: 50px 40px;
            text-align: center;
        }
        
        .share-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: #333;
        }
        
        .share-subtitle {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 40px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .share-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            max-width: 600px;
            margin: 0 auto 40px;
        }
        
        .share-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 16px 24px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .share-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        
        .share-btn.linkedin {
            background: #0077b5;
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
        
        .cta-section {
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            padding: 60px 40px;
            text-align: center;
        }
        
        .cta-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #333;
        }
        
        .cta-description {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 30px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            padding: 18px 36px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
        }
        
        .footer {
            background: #333;
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .footer-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .footer-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .footer-description {
            margin-bottom: 20px;
            opacity: 0.9;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
        }
        
        .footer-link {
            color: white;
            text-decoration: none;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .footer-link:hover {
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            .hero-title {
                font-size: 2rem;
            }
            
            .hero-section {
                padding: 40px 20px;
            }
            
            .context-section, .share-section, .cta-section {
                padding: 30px 20px;
            }
            
            .context-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .share-buttons {
                grid-template-columns: 1fr;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 15px;
            }
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero-section">
        <h1 class="hero-title">${days} Days Waiting for Response</h1>
        <p class="hero-subtitle">
            A passenger's documented experience with airline claim processing delays, 
            highlighting broader industry patterns affecting thousands of travelers.
        </p>
    </section>
    
    <!-- Main Content -->
    <main>
        <!-- Card Display -->
        <div class="card-container">
            <img src="${imageUrl}" alt="Passenger experience documentation showing ${days} days without airline response" class="card-image">
        </div>
        
        <!-- Context Section -->
        <section class="context-section">
            <div class="context-grid">
                <div class="context-item">
                    <div class="context-label">Waiting Period</div>
                    <div class="context-value">${days} Days</div>
                    <div class="context-description">Since claim submission in ${submissionDate}</div>
                </div>
                
                <div class="context-item">
                    <div class="context-label">Claim Amount</div>
                    <div class="context-value">€${amount}</div>
                    <div class="context-description">Luggage damage compensation claim</div>
                </div>
                
                <div class="context-item">
                    <div class="context-label">Response Status</div>
                    <div class="context-value">None</div>
                    <div class="context-description">Complete silence from airline</div>
                </div>
            </div>
            
            <!-- Industry Context -->
            <div class="industry-context">
                <h2 class="industry-title">Industry Context: You Are Not Alone</h2>
                <div class="industry-stats">
                    <div class="stat-item">
                        <div class="stat-value">11,620</div>
                        <div class="stat-label">damaged bags yearly</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">€1.16M</div>
                        <div class="stat-label">in potential claims</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">?</div>
                        <div class="stat-label">others waiting?</div>
                    </div>
                </div>
                <div class="data-source">Source: SITA 2024 Baggage IT Insights</div>
            </div>
        </section>
        
        <!-- Share Section -->
        <section class="share-section">
            <h2 class="share-title">Share This Experience</h2>
            <p class="share-subtitle">Help create transparency by sharing this documented experience. Each share helps build awareness of airline response patterns.</p>
            
            <div class="share-buttons">
                <a href="${linkedinShareUrl}" target="_blank" class="share-btn linkedin">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    Share on LinkedIn
                </a>
                
                <a href="${twitterShareUrl}" target="_blank" class="share-btn twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    Share on Twitter/X
                </a>
                
                <a href="${facebookShareUrl}" target="_blank" class="share-btn facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    Share on Facebook
                </a>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 30px;">
                <p style="margin: 0; color: #666; font-size: 0.95rem;">
                    <strong>💡 How it works:</strong> When you share this URL, the card image automatically appears as a preview on LinkedIn, Twitter, and Facebook. No manual image uploading needed!
                </p>
            </div>
        </section>
        
        <!-- Call to Action Section -->
        <section class="cta-section">
            <h2 class="cta-title">Document Your Own Experience</h2>
            <p class="cta-description">
                Are you also waiting for an airline response? Create your own professional documentation 
                and join thousands of passengers making claim delays visible.
            </p>
            <a href="/" class="cta-button">Create Your Experience Card</a>
        </section>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <h3 class="footer-title">SmartwingsWatch</h3>
            <p class="footer-description">
                Making airline claim delays visible through passenger-driven documentation. 
                Built with AI assistance to empower consumer advocacy.
            </p>
            <div class="footer-links">
                <a href="/" class="footer-link">Create Card</a>
                <a href="/privacy-policy.html" class="footer-link">Privacy Policy</a>
                <a href="mailto:contact@smartwingswatch.com" class="footer-link">Contact</a>
            </div>
        </div>
    </footer>
    
    <!-- Analytics and Tracking (Privacy-Friendly) -->
    <script>
        // Simple page view tracking without personal data
        console.log('Share page viewed:', {
            days: ${days},
            amount: ${amount},
            timestamp: new Date().toISOString()
        });
        
        // Track share button clicks for optimization
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.classList.contains('linkedin') ? 'linkedin' : 
                                this.classList.contains('twitter') ? 'twitter' : 'facebook';
                console.log('Share clicked:', platform, ${days}, 'days');
            });
        });
        
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>
`;
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'public, max-age=3600'
            },
            body: html
        };
        
    } catch (error) {
        console.error('Error generating enhanced share page:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/html'
            },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>Error - SmartwingsWatch</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8f9fa; }
        .error-container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .error-title { color: #dc2626; font-size: 1.5rem; margin-bottom: 20px; }
        .error-message { color: #666; margin-bottom: 30px; }
        .error-button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
    </style>
</head>
<body>
    <div class="error-container">
        <h1 class="error-title">Page Generation Error</h1>
        <p class="error-message">We're having trouble generating this experience page. Please try again or create a new one.</p>
        <a href="/" class="error-button">Create New Experience</a>
    </div>
</body>
</html>
            `
        };
    }
};
