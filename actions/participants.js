var utils = require("../utils")

exports.action = {
  name: "participantsStatus",
  description: "Returns the status for a challenge's member. Method: GET",
  inputs: {
    required: ['membername', 'challenge_id'],
    optional: [],
  },
  authenticated: false,
  outputExample: {
    "attributes": {
      "type": "Challenge_Participant__c",
      "url": "/services/data/v22.0/sobjects/Challenge_Participant__c/a0AK000000AqiApMAJ"
    },
    "challenge__r": {
      "attributes": {
        "type": "Challenge__c",
        "url": "/services/data/v22.0/sobjects/Challenge__c/a0GK0000006k4wjMAA"
      },
      "name": "First2Finish - Test Upload",
      "challenge_id": "22",
      "id": "a0GK0000006k4wjMAA"
    },
    "name": "CP-70894",
    "has_submission": true,
    "money_awarded": 0,
    "score": 0,
    "member__r": {
      "attributes": {
        "type": "Member__c",
        "url": "/services/data/v22.0/sobjects/Member__c/a0IK0000007NIQmMAO"
      },
      "valid_submissions": 0,
      "name": "jeffdonthemic",
      "id": "a0IK0000007NIQmMAO"
    },
    "member": "a0IK0000007NIQmMAO",
    "send_discussion_emails": true,
    "id": "a0AK000000AqiApMAJ",
    "status": "Submitted",
    "override_submission_upload": false,
    "challenge": "a0GK0000006k4wjMAA"
  },
  version: 2.0,
  run: function(api, connection, next){
    api.participants.status(connection.params, function(data){
      utils.processResponse(data, connection);
      next(connection, true);
    });
  }
};