export async function register() {
  // Only apply in the Node.js runtime (not Edge).
  // Node.js c-ares DNS resolver fails with IPv6-only DNS servers.
  // Prepend reliable IPv4 servers so MongoDB Atlas SRV lookups succeed.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("dns");
    const current = dns.getServers();
    dns.setServers(["8.8.8.8", "1.1.1.1", ...current]);
  }
}
