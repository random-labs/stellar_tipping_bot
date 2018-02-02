const assert = require('assert')


describe('models / slack-auth', async () => {

  let Account
  let account
  let SlackAuth;
  let auth;

  const pupAndSudsName = "pupnsuds"
  const pupAndSudsAuth = "zomgauth123456789";

  beforeEach(async () => {
    const config = await require('./setup')()
    Account = config.models.account
    SlackAuth = config.models.slackAuth

    auth = await SlackAuth.createAsync({
      team: pupAndSudsName,
      token: pupAndSudsAuth,
    })

    account = await Account.createAsync({
      adapter: 'testing',
      uniqueId: `${pupAndSudsName}.mikey`,
      balance: '1.0000000',
      walletAddress: 'GDO7HAX2PSR6UN3K7WJLUVJD64OK3QLDXX2RPNMMHI7ZTPYUJOHQ6WTN'
    })
  })

  describe('authTokenForTeamId', () => {
    it ('should return an oauth_token if someone has registered an oauth token for a given team id', async () => {
      const returnedAuth = await SlackAuth.authTokenForTeamId(pupAndSudsName)
      assert.equal(returnedAuth, auth.token)
    })

    it ('should return null if no auth tokens have been registered for that team', async () => {
      const returnedAuth = await SlackAuth.authTokenForTeamId("badname")
      assert.equal(returnedAuth, null)
    })
  })
})
