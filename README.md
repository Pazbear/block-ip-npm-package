# block-ips-from-overseas

Block IPs from overseas (Current supported countries:KR, AD)

## Installation

Yarn

```
yarn add block-ips-from-overseas
```

npm

```bash
npm install block-ips-from-overseas --save
```

## Getting Started

```javascript
import { block-ip } from 'block-ips-from-overseas';
app.use(block-ip('**')) // ** means Country-Code (ex. KR, AD)
```

## How It Works

It works by referencing known country-specific ip ranges.
