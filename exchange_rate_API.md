Exchangerate.host API
Exchangerate provides a simple REST API with real-time and historical exchange rates for 168 world currencies, delivering currency pairs in universally usable JSON format - compatible with any of your applications.

Spot exchange rate data is retrieved from several major forex data providers in real-time, validated, processed, and delivered hourly, every 10 minutes, or even within the 60-second market window.

Providing the most representative forex market value available ("midpoint" value) for every API request, the Exchangerate API powers currency converters, mobile applications, financial software components, and back-office systems worldwide.

The API is ideal for:

Currency conversion apps 
Financial dashboards 
Global e‑commerce pricing 
Analytics and reporting tools 
The service is built and maintained by APILayer, the same team behind a suite of widely used REST APIs.

API Endpoints Summary
All endpoints begin with the base URL:

https://api.exchangerate.host/
And return well‑structured JSON responses with rate data.

Endpoint	Method	Purpose / Description	Example URL
/latest	GET	Fetch the most recent exchange rates for all or selected currencies	https://api.exchangerate.host/latest?access_key=YOUR_KEY&symbols=USD,EUR
/historical	GET	Retrieve historical exchange rates for a specific date	https://api.exchangerate.host/historical?access_key=YOUR_KEY&date=2022-01-01
/convert	GET	Convert a specific amount from one currency to another	https://api.exchangerate.host/convert?access_key=YOUR_KEY&from=EUR&to=USD&amount=100
/timeframe	GET	Fetch exchange rate data over a range of dates	https://api.exchangerate.host/timeframe?access_key=YOUR_KEY&start_date=2021-01-01&end_date=2021-01-31
/change	GET	Get metrics showing changes in currency rates over time (absolute & percentage)	https://api.exchangerate.host/change?access_key=YOUR_KEY&start_date=2021-01-01&end_date=2021-01-07
/list	GET	Retrieve a list of all supported currencies	https://api.exchangerate.host/list?access_key=YOUR_KEY
Note: Some advanced endpoints may depend on your subscription plan. 

Why Choose Exchangerate.host?
Exchangerate.host is designed to provide developers and businesses with fast, reliable, and easy-to-use currency exchange data.

Real-Time and Accurate Data

Get up-to-date exchange rates for over 168 currencies and cryptocurrencies. Data is refreshed frequently to ensure accuracy for conversions, analytics, and reporting.

High Performance

The API is optimized for speed and reliability, ensuring quick responses and minimal downtime, which is critical for real-time applications and financial tools.

Developer-Friendly

The API features simple REST endpoints with predictable JSON responses. Endpoints for latest rates, historical data, conversion, and time-series analysis make integration seamless for apps, websites, or dashboards.

Comprehensive Coverage

Support for a wide range of global fiat currencies, precious metals, and cryptocurrencies allows you to handle any financial scenario without needing multiple APIs.

Flexible and Easy to Use

Minimal setup is required — no complex authentication, easy query parameters, and clear documentation mean you can get started quickly and integrate smoothly into your projects.

Reliable Historical Data

Access historical exchange rates and trends to support financial analysis, forecasting, and reporting with confidence.