# WeGot - Restaurant Rating Service 

 This project optimizes an inherited Restaurant Rating Application to handle production scale traffic.  
 It utilizes a proxy server that performs server side rendering and can handle up to 2000 requests per second  

## Related Projects

  - https://github.com/bamboo-connection/gallery
  - https://github.com/bamboo-connection/overview
  - https://github.com/bamboo-connection/map-side-bar
  - https://github.com/bamboo-connection/recommendations

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> This project is running on port 3002.
> http://127.0.0.1:3002

## Requirements

This project is using:
- Node 9.5.0
- Express
- MongoDB
- Jest
- Enzyme
- Webpack

## Development

This project is no longer using webpack-dev-middleware!!! You need to run webpack manually. See below.

### Installing Dependencies

From within the root directory:
Install dependencies by running "npm install"
Start webpack using "npm run dev" 
Spin up server with "npm run start" 

### Seeding Database

From within the root directory:
execute "npm run seed-pg" the seeding process should take around 5 minutes and will insert 10million data points into a PostgreSQL 