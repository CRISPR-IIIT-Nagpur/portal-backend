module.exports = {
  apps: [{
    name: "portal-backend",
    script: "npm",
    args: "start",
    env: {
      "NODE_ENV": "development",
      "HTTPS": "true",
      "PORT": 7979,
      "HOST": "0.0.0.0"  // <-- Add this line
    }
  }]
};