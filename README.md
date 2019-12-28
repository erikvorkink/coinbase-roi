__coinbase-roi__ displays the current profit and ROI from my cryptocurrency investments, which have been made through Coinbase.

## Structure
A process in Node.js communicates with the Coinbase API and exposes an endpoint to the frontend. API-related parameters and the investment amount are specified via environmental variables. The front-end displays the profit and ROI.

## Screenshot
<img src="https://raw.githubusercontent.com/erikvorkink/coinbase-roi/master/screenshot.png" width="599">

## Setup Example
1. Start the Node server (`/roi/data` on port 3000, accessible only by localhost)

```
export ROI_COINBASE_API_KEY='xxx'
export ROI_COINBASE_API_SECRET='xxx'
export ROI_INVESTMENT='100.00'
node /internal-path-to-coinbase-roi/node/app.js
```

2. Configure nginx to expose the endpoint via proxy

```
location /external-path-to-coinbase-roi/data {
  proxy_pass http://localhost:3000/roi/data;
}
```
