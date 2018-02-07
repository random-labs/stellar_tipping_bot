const Command = require('../adapters/commands/command')
const EventEmitter = require('events');

class Logger {

  constructor() {

    this.MessagingEvents = {
      onTipReceivedMessageSent(tip, userIsRegistered) {
      }
    }

    this.CommandEvents = {

      events: new EventEmitter(),

      onTipWithInsufficientBalance(tip, balance) {
      },

      onTipTransferFailed(tip) {

      },

      onUserAttemptedToTipThemself(tip) {

      },

      onTipNoTargetFound(tip) {

      },

      onTipSuccess(tip, amount) {

      },

      onWithdrawalNoAddressProvided(withdrawal) {

      },

      onWithdrawalAttemptedToRobotTippingAddress(withdrawal) {

      },

      onWithdrawalDestinationAccountDoesNotExist(withdrawal) {

      },

      onWithdrawalInsufficientBalance(withdrawal, balance) {

      },

      onWithdrawalBadlyFormedAddress(withdrawal, badWalletAddress) {

      },

      onWithdrawalSubmissionToHorizonFailed(withdrawal) {

      },

      onWithdrawalInvalidAmountProvided(withdrawal) {

      },

      onWithdrawalSuccess(withdrawal, address, txHash) {

      },

      onDepositSuccess(sourceAccount, amount) {

      },

      onBalanceRequest(balanceCmd, userIsRegistered) {

      },

      onInfoRequest(infoCmd, userIsRegistered) {

      },

      onAddedNonExistantAuthTokenForTeam(team) {

      },

      onAddedNewAuthTokenForTeam(team) {

      },

      onAddingOAuthForTeamFailed(team) {

      },

      onRegisteredWithBadWallet(registration) {

      },

      onRegisteredWithCurrentWallet(registration) {

      },

      onRegisteredWithWalletRegisteredToOtherUser(registration, otherUser) {

      },

      onRegisteredWithRobotsWalletAddress(registration) {

      },

      onRegisteredSuccessfully(registration, isFirstRegistration) {

      }
    }
  }

}

module.exports = Logger