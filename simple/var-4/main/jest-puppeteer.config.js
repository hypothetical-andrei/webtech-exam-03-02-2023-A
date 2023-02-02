module.exports = {
    server: {
      command: 'node server.js',
      port: 8080,
    },
    launch: {
        dumpio: true,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    browser: 'chromium',
    browserContext: 'default',
}