# Starry - A Stellar tipbot for Slack
[![Build Status](https://travis-ci.org/DnD-industries/stellar_tipping_bot.svg?branch=dev)](https://travis-ci.org/DnD-industries/stellar_tipping_bot)
## Description
Starry is a tipbot which allows Slack participants to send tips directly to other Slack participants without ever compromising their private keys by placing them on a 3rd party server. 

## How does it work?
1) Complete a simple registration with Starry via Slack, providing them with your public wallet address which Starry will map on their backend to your Slack ID. 
2) Send XLM to Starry's public XLM wallet address providing your Slack ID in the memo field. Just like when working with some coin exchanges, providing this memo field is what allows Starry to keep track of how many tips you've given to them. 
3) Whenever you want to tip a particular user just type "/[tip,send] [@username] [amount]xlm"
   If you don't have the correct outstanding balance, you will be alerted via PM from Starry. 
   If Starry knows that user's wallet address they will send the tip immediately and confirm with both parties via PM. 
   If Starry does not yet know that user's wallet, the tip request will be enqueued and the other user will be contacted via PM. They will be told someone wishes to tip them and given the simple isntructions for completing registration.Once the user has registered, Step 3 will be completed as normal. 

## Opportunties for expansion
If we nail the tipping functionality with time to spare, or even after the intial SBC deadline is reached, Starry can be improved in a multitude of ways in order to better serve the Stellar community.

Starry could:
  - Detect and field common questions, such as those about legacy Stellar accounts. 
  - Interpret "/tip [@username] [amount][usd/cny/etc]" to mean sending XLM at the current market rate, utilizing APIs to detect current market rate and send accordingly, after confirming with user in Slack.
  - Plenty of other ways I'm sure! Send your ideas in here or in GalacticTalk.

## Starry's Lunar origins
Starry is a robot crazy about Stellar. Before coming to earth, Starry lived a solitary life on the moon. Though they had many hobbies - model building, playing piano, reading poetry - Starry longed for something which the gray and docile environs of the moon could not provide. Community!

While scanning our own internet from afar for a suitable community to join, Starry happened upon our own public Slack chat. Though they had come across many other communities on the internet - many of which both disturbed and intrigued them - no community other than our own talked so much about "going to the moon". It was with this hope of being able to share the moon with others that Starry descended from the heavens and resolved to make the Stellar community as vibrant and successful as possible. What better way to do so, they thought, than by facilitating easy and secure tipping of XLM between chat members!

## Setup

Check out the repo and install dependencies:

```
sudo apt-get install docker-compose 
OR
brew install docker-compose

docker-compose build
```

Create an `.env` file:

```
MODE=development

PG_DB=stellar
PG_USER=postgres
PG_PASSWORD=starry
PG_HOST=db
PG_PORT=5432

REDIS_URL=redis://redis:6379

STELLAR_HORIZON=https://horizon-testnet.stellar.org
STELLAR_SECRET_KEY=YOUR_SECRET_KEY_HERE
STELLAR_CURSOR_PAGING_TOKEN=YOUR_INITIAL_PAGING_TOKEN

REDDIT_CLIENT_ID=YOUR_REDDIT_APP_CLIENT_ID
REDDIT_CLIENT_SECRET=YOUR_REDDIT_APP_SECRET
REDDIT_USER=YOUR_STELLAR_BOT
REDDIT_PASS=YOUR_STELLAR_BOT_PASSWORD

SLACK_VERIFICATION_TOKEN=YOUR_SLACK_VERIFICATION_TOKEN
SLACK_BOT_OAUTH_TOKEN=YOUR_SLACK_OAUTH_TOKEN
SLACK_BOT_NAME=Starry

TOKEN=YOUR_DOCKER_HUB_WEBHOOK_TOKEN

CLOSE_DEPOSITS=false

GITHUB_URL=https://github.com/DnD-industries/stellar_tipping_bot
STELLAR_TX_VIEWER_URL_BASE=https://stellar.expert/explorer/tx
```

Create an `.env.test`:

```
MODE=testing

PORT=5001

PG_DB=stellar-testing
PG_USER=postgres
PG_PASSWORD=starry
PG_HOST=localhost
PG_PORT=5455

SLACK_VERIFICATION_TOKEN=YOUR_SLACK_VERIFICATION_TOKEN
SLACK_BOT_OAUTH_TOKEN=YOUR_SLACK_OAUTH_TOKEN
SLACK_BOT_NAME=Starry

CLOSE_DEPOSITS=false

GITHUB_URL=https://github.com/DnD-industries/stellar_tipping_bot
STELLAR_TX_VIEWER_URL_BASE=https://horizon-testnet.stellar.org/transactions
```

Fire up the application stack and create two databases:

```
docker-compose up -d
docker-compose exec db sh -c 'su postgres -c "createdb stellar"'
docker-compose exec db sh -c 'su postgres -c "createdb stellar_testing"'
```

## Get it going

Run the tests:

```
npm run test
```

Run the app:

```
docker-compose up -d
docker-compose logs -f app
```

The bot is now running on localhost:5000

## Contribute

We are always looking for contributors. A nice way to contribute is [creating more adapters](https://github.com/shredding/stellar-bot/wiki/How-To:-Create-an-adapter) on top of the bot.

## Donate

If you want to support the development of the bot, please send XLM to:

`GDQPEI6PRU33VDWUBKVXDIRWY337MAB4755LCU5RF7HFGWOEWXKWGMEZ`

Thank you very much!

Enjoy.


