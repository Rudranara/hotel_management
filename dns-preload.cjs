'use strict';
// Preloaded via NODE_OPTIONS in package.json scripts.
// Fixes "querySrv ECONNREFUSED" when the system only has a localhost/IPv6 DNS
// server that Node.js c-ares cannot reach (all threads including workers).
const dns = require('dns');
const servers = dns.getServers();
if (!servers.includes('8.8.8.8')) {
  dns.setServers(['8.8.8.8', '1.1.1.1', ...servers]);
}
