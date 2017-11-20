__coinbase-roi__ displays the current profit and ROI from my cryptocurrency investments, which have been made through Coinbase.

## Structure
A process in Node.js communicates with the Coinbase API and exposes an end point to the front-end. API-related parameters and the investment amount are specified via environmental variables. The front-end displays the profit and ROI.

## Screenshot
<img src="https://raw.githubusercontent.com/erikvorkink/coinbase-roi/master/screenshot.png" width="599">

## Setup Example
```
export ROI_ALLOWED_ORIGIN="http://yourhost.com"
export ROI_COINBASE_API_KEY='xxx'
export ROI_COINBASE_API_SECRET='xxx'
export ROI_INVESTMENT='100.00'
node /path-to-coinbase-roi/node/app.js
```