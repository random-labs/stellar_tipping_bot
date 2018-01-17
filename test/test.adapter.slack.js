const assert = require('assert')
const Slack = require('../src/adapters/slack/slack-adapter')
const Command = require('../src/adapters/commands/command')
const sinon = require('sinon')


class TestableSlack extends Slack {
  async onRegistrationBadWallet (walletAddressGiven) {
    return "badWallet"
  }

  async onRegistrationReplacedOldWallet(oldWallet, newWallet) {
    return `${oldWallet} replaced by ${newWallet}`
  }

  async onRegistrationSameAsExistingWallet(walletAddress) {
    return `Already registered ${walletAddress}`
  }
}

describe('slackAdapter', async () => {

  let slackAdapter;
  let accountWithWallet;
  let accountWithoutWallet;

  beforeEach(async () => {
    const config = await require('./setup')()
    slackAdapter = new TestableSlack(config);
    Account = config.models.account;

    accountWithWallet = await Account.createAsync({
      adapter: 'testing',
      uniqueId: 'team.foo',
      balance: '1.0000000',
      walletAddress: 'GDTWLOWE34LFHN4Z3LCF2EGAMWK6IHVAFO65YYRX5TMTER4MHUJIWQKB'
    });

    accountWithoutWallet = await Account.createAsync({
      adapter: 'testing',
      uniqueId: 'team.bar',
      balance: '1.0000000'
    })
  });

  // Validate their wallet address
  // If the user is already registered, send them a message back explaining (and what their Wallet Address is)
  // If the user is not already registered
  // Make sure no one else has already registered that same wallet address
  // Save to the database
  // Send them a message back (error if applicable)

  describe('handle registration request', () => {

    it ('should return a message to be sent back to the user if their wallet fails validation', async () => {
      let msg = new Command.Register('testing', 'someUserId', 'badwalletaddress013934888318')

      let returnedValue = await slackAdapter.handleRegistrationRequest(msg);
      assert.equal(returnedValue, "badWallet");
    })

    it ('should return a message to send back to the user if a user has already registered with that wallet', async () => {
      let msg = new Command.Register('testing', 'team.foo', accountWithWallet.walletAddress)

      let returnedValue = await slackAdapter.handleRegistrationRequest(msg);
      assert.equal(returnedValue, `Already registered ${accountWithWallet.walletAddress}`);
    })

    it ('should send a message back to the user and reject if someone else has already registered with that wallet', () => {
      assert.equal(true ,false)
    })

    it (`should overwrite the user's current wallet info if they have a preexisting wallet, and send an appropriate message`, async () => {
      let newWalletId = "GDO7HAX2PSR6UN3K7WJLUVJD64OK3QLDXX2RPNMMHI7ZTPYUJOHQ6WTN"
      let msg = new Command.Register('testing', 'team.foo', newWalletId)

      let returnedValue = await slackAdapter.handleRegistrationRequest(msg);
      assert.equal(returnedValue, `${accountWithWallet.walletAddress} replaced by ${newWalletId}`);
    })

    it ('should otherwise save the wallet info to the database for the user and send an appropriate message back to them', () => {
      assert.equal(true ,false)
    })
  })
})
