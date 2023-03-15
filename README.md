# Morgan [aka. Project Presidium]
An infamously named chatbot built with [Slack Bolt](https://github.com/slackapi/bolt-js). 

Requirements:
- Docker
- Node.js & npm

Good to know: Use [Loophole.cloud](https://loophole.cloud/) as a tunnel for the app to communicate with Slack. Alternative to Ngrok that lets you set a custom subdomain for free.

## What does it do?
Not much. Currently, it...
- Keeps a database of permalinks to messages that workspace users want to remember (usually for comedic purposes).
- Posts random messages from the database on request. Messages can also be looked up by ID or tags.
- Virtual points "economy" with coin flip betting.