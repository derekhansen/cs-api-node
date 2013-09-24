var request = require('request'),
  assert  = require('chai').assert,
  setup   = require('./setup.js'),
  _ = require("underscore"),
  nock = require('nock'),
  querystring = require("querystring");    

describe('challenges', function () {
    before(function (done) {
        setup.init(done);
    });

    describe('fetch by id', function () {
        //Hardcoded value - once the appropriate routes get in place,
        //this needs to change
        var id = 'a0GK0000008OIRAMA4';

        it('should not be empty', function (done) {
            request.get(setup.testUrl + '/challenges/' + id, function (err, response, body) {
                body = JSON.parse(body);
                assert.ok(body.response);
                done();
            });
        });

        it('should return the appropriate keys when user is admin', function (done) {
            request.get(setup.testUrl + '/challenges/' + id + '?admin=true', function (err, response, body) {
                body = JSON.parse(body);

                assert.ok(body.response);

                assert.ok(body.response.challenge_reviewers__r);
                assert.ok(body.response.challenge_comment_notifiers__r);
                assert.ok(body.response.assets__r);

                done();
            });
        });
    });

    describe('participants', function () {
        it('should not error', function (done) {
            //Hardcoded value - once the appropriate routes get in place,
            //this needs to change
            var id = 'a0GK0000008OIRAMA4';

            request.get(setup.testUrl + '/challenges/' + id + '/participants', function (err, response, body) {
                body = JSON.parse(body);
                assert.ok(body.response);
                done();
            });
        });
    });
});

describe("GET /challenges", function() {
  before(function(done) {
    setup.init(done);
  });

  beforeEach(function(done) {
    nock.cleanAll();
    done();
  });

  describe("When there are 3 open challenges", function() {
    beforeEach(function(done) {
      // response is captured using nock `nock.recorder.rec();`
      nock('https://cs9.salesforce.com:443')
        .get('/services/apexrest/v.9/challengeslist?limit=100&offset=0&open=true&orderby=end_date__c&fields=Id%2CChallenge_Id__c%2CName%2CDescription__c%2CTotal_Prize_Money__c%2CChallenge_Type__c%2CDays_till_Close__c%2CRegistered_Members__c%2CParticipating_Members__c%2CStart_Date__c%2CEnd_Date__c%2CIs_Open__c%2CCommunity__r.Name%2CCommunity__r.Community_Id__c')
        .reply(200, "[{\"attributes\":{\"type\":\"Challenge__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge__c/a0GK0000006rYt6MAE\"},\"Total_Prize_Money__c\":750,\"End_Date__c\":\"2013-09-26T19:19:00.000+0000\",\"Registered_Members__c\":2,\"Challenge_Platforms__r\":{\"totalSize\":1,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"Challenge_Platform__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Platform__c/a1KK0000001EQzuMAG\"},\"Name__c\":\"Salesforce.com\",\"Id\":\"a1KK0000001EQzuMAG\",\"Challenge__c\":\"a0GK0000006rYt6MAE\"}]},\"Participating_Members__c\":2,\"Challenge_Technologies__r\":{\"totalSize\":1,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"Challenge_Technology__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Technology__c/a1JK0000001X3tLMAS\"},\"Name__c\":\"Apex\",\"Id\":\"a1JK0000001X3tLMAS\",\"Challenge__c\":\"a0GK0000006rYt6MAE\"}]},\"Name\":\"Check on existing CMC Synchronizer\",\"Challenge_Id__c\":\"34\",\"Challenge_Type__c\":\"Code\",\"Id\":\"a0GK0000006rYt6MAE\",\"Description__c\":\"<p>Here is my awesome description that I entered in CMC.</p>\",\"Start_Date__c\":\"2013-08-09T19:19:00.000+0000\",\"Is_Open__c\":\"true\",\"Days_till_Close__c\":3},{\"attributes\":{\"type\":\"Challenge__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge__c/a0GK0000008orZvMAI\"},\"Total_Prize_Money__c\":500,\"End_Date__c\":\"2013-10-31T15:14:00.000+0000\",\"Registered_Members__c\":2,\"Challenge_Platforms__r\":{\"totalSize\":2,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"Challenge_Platform__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Platform__c/a1KK0000001EWCmMAO\"},\"Name__c\":\"Heroku\",\"Id\":\"a1KK0000001EWCmMAO\",\"Challenge__c\":\"a0GK0000008orZvMAI\"},{\"attributes\":{\"type\":\"Challenge_Platform__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Platform__c/a1KK0000001EWClMAO\"},\"Name__c\":\"Salesforce.com\",\"Id\":\"a1KK0000001EWClMAO\",\"Challenge__c\":\"a0GK0000008orZvMAI\"}]},\"Participating_Members__c\":2,\"Challenge_Technologies__r\":{\"totalSize\":2,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"Challenge_Technology__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Technology__c/a1JK0000001Y4TTMA0\"},\"Name__c\":\"Apex\",\"Id\":\"a1JK0000001Y4TTMA0\",\"Challenge__c\":\"a0GK0000008orZvMAI\"},{\"attributes\":{\"type\":\"Challenge_Technology__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Technology__c/a1JK0000001Y4TUMA0\"},\"Name__c\":\"JavaScript\",\"Id\":\"a1JK0000001Y4TUMA0\",\"Challenge__c\":\"a0GK0000008orZvMAI\"}]},\"Name\":\"First2Finish Challenge 2\",\"Challenge_Id__c\":\"65\",\"Challenge_Type__c\":\"First2Finish\",\"Id\":\"a0GK0000008orZvMAI\",\"Description__c\":\"<p>Your overview should describe what you are trying to build within a few simple sentences. Remember, the person reading your overview has no background on what you are trying to build so try to think of the best way to convey the goal of the challenge. You can provide more details in the requirements section. Here is a sample:</p>\\n\\n<p>We have an existing Salesforce.com application that is not visually appealing. It&#39;s a simple search and details application which consists of 1-2 Apex Controllers and 3 Visualforce pages. We used a third party service to design a new layout and they have sent us the HTML and CSS for our new application. We need your Visualforce and Apex skills to merge the HTML and CSS with our existing code.</p>\",\"Start_Date__c\":\"2013-06-25T07:00:00.000+0000\",\"Is_Open__c\":\"true\",\"Days_till_Close__c\":38},{\"attributes\":{\"type\":\"Challenge__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge__c/a0GK0000008q3yKMAQ\"},\"Total_Prize_Money__c\":500,\"End_Date__c\":\"2013-10-31T15:14:00.000+0000\",\"Registered_Members__c\":2,\"Challenge_Platforms__r\":{\"totalSize\":2,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"Challenge_Platform__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Platform__c/a1KK0000001EYetMAG\"},\"Name__c\":\"Heroku\",\"Id\":\"a1KK0000001EYetMAG\",\"Challenge__c\":\"a0GK0000008q3yKMAQ\"},{\"attributes\":{\"type\":\"Challenge_Platform__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Platform__c/a1KK0000001EYesMAG\"},\"Name__c\":\"Salesforce.com\",\"Id\":\"a1KK0000001EYesMAG\",\"Challenge__c\":\"a0GK0000008q3yKMAQ\"}]},\"Participating_Members__c\":2,\"Challenge_Technologies__r\":{\"totalSize\":2,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"Challenge_Technology__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Technology__c/a1JK0000001Y5uNMAS\"},\"Name__c\":\"Apex\",\"Id\":\"a1JK0000001Y5uNMAS\",\"Challenge__c\":\"a0GK0000008q3yKMAQ\"},{\"attributes\":{\"type\":\"Challenge_Technology__c\",\"url\":\"/services/data/v25.0/sobjects/Challenge_Technology__c/a1JK0000001Y5uOMAS\"},\"Name__c\":\"JavaScript\",\"Id\":\"a1JK0000001Y5uOMAS\",\"Challenge__c\":\"a0GK0000008q3yKMAQ\"}]},\"Name\":\"Node Test Challenge\",\"Challenge_Id__c\":\"66\",\"Challenge_Type__c\":\"Code\",\"Id\":\"a0GK0000008q3yKMAQ\",\"Description__c\":\"<p>\\n\\tYour overview should describe what you are trying to build within a few simple sentences. Remember, the person reading your overview has no background on what you are trying to build so try to think of the best way to convey the goal of the challenge. You can provide more details in the requirements section. Here is a sample:</p>\\n<p>\\n\\tWe have an existing Salesforce.com application that is not visually appealing. It&#39;s a simple search and details application which consists of 1-2 Apex Controllers and 3 Visualforce pages. We used a third party service to design a new layout and they have sent us the HTML and CSS for our new application. We need your Visualforce and Apex skills to merge the HTML and CSS with our existing code.</p>\",\"Start_Date__c\":\"2013-06-25T07:00:00.000+0000\",\"Is_Open__c\":\"true\",\"Days_till_Close__c\":38}]", {
          date: 'Mon, 23 Sep 2013 16:56:15 GMT',
          'content-type': 'application/json;charset=UTF-8',
          'transfer-encoding': 'chunked'
        });

      done();
    });

    it("returns 3 challenges", function(done) {
      request.get(setup.testUrl + '/challenges', function(err, response, body) {
        body = JSON.parse(body);
        assert.equal(body.count, 3);
        assert.lengthOf(body.response, 3);
        done();
      });
    });

    it("responsed object has proper fields", function(done) {
      request.get(setup.testUrl + '/challenges', function(err, response, body) {
        body = JSON.parse(body);

        var challenge = body.response[0];
        assert.propertyVal(challenge, "total_prize_money");
        assert.propertyVal(challenge, "end_date");
        assert.propertyVal(challenge, "registered_members");
        assert.propertyVal(challenge, "participating_members");
        assert.propertyVal(challenge, "name");
        assert.propertyVal(challenge, "challenge_id");
        assert.propertyVal(challenge, "challenge_type");
        assert.propertyVal(challenge, "id");
        assert.propertyVal(challenge, "description");
        assert.propertyVal(challenge, "start_date");
        assert.propertyVal(challenge, "is_open");
        assert.propertyVal(challenge, "days_till_close");
        assert.propertyVal(challenge, "challenge_platforms__r");
        assert.propertyVal(challenge, "challenge_technologies__r");

        done();
      });

    });

  });


  // returns nock object with the `name` parameter.
  // ignores other parameters

  function sfdcNock(params) {
    var reqQuery = _.map(params, function(value, name) {
      return name + "=" + value;
    });
    return nock('https://cs9.salesforce.com:443')
      .filteringPath(function(path) {
        // cut out specified params.
        var query = querystring.parse(path.split("?")[1]);
        path = path.split("?")[0];

        var targets = _.map(params, function(value, name) {
          return name + "=" + query[name];
        });
        return path + "?" + targets.join("&");
      })
      .get('/services/apexrest/v.9/challengeslist?' + reqQuery.join("&"))
      .reply(200, "[]", {
        'content-type': 'application/json;charset=UTF-8',
      });
  }



  // The idea of test is verifying sfdc api call.
  // It is not an integration test, but it makes sense to me. My reasoning is like followings.
  // 1. We cant end real request. it takes too long.
  // 2. Then we have to use nock, set response for a request. 
  //    It means the api server will retrun the same result for a request.
  // 3. Then why not use just an expectaion? We only need to verify if the request is right.
  describe("order_by parameter test", function() {

    it("default value is end_date__c", function(done) {
      sfdcReq = sfdcNock({orderby: "end_date__c"});
      request.get(setup.testUrl + '/challenges', function(err, response, body) {
        body = JSON.parse(body);
        sfdcReq.done(); // make sure that the sfdc api call occured with orderby option.
        done();
      });
    });

    it("forcifies order_by parameter when sending sfdc request", function(done) {
      sfdcReq = sfdcNock({orderby: "registered_members__c"});
      request.get(setup.testUrl + '/challenges?order_by=registered_members', function(err, response, body) {
        body = JSON.parse(body);
        sfdcReq.done();
        done();
      });
    });

    it("order_by parameter can have 'desc' or 'asc'", function(done) {
      sfdcReq = sfdcNock({orderby: "registered_members__c desc"});
      request.get(setup.testUrl + '/challenges?order_by=registered_members desc', function(err, response, body) {
        body = JSON.parse(body);
        sfdcReq.done();
        done();
      });
    });

  }); // end of order_by parameter test

  describe("open parameter test", function() {
    it("default value is true", function(done) {
      sfdcReq = sfdcNock({open: "true"});
      request.get(setup.testUrl + '/challenges', function(err, response, body) {
        body = JSON.parse(body);
        sfdcReq.done(); // make sure that the sfdc api call occured with orderby option.
        done();
      });
    });

    it("able to set open parameter as false", function(done) {
      sfdcReq = sfdcNock({open: "false"});
      request.get(setup.testUrl + '/challenges?open=false', function(err, response, body) {
        body = JSON.parse(body);
        sfdcReq.done(); // make sure that the sfdc api call occured with orderby option.
        done();
      });
    });

  }); // end of open parameter test

  it("able to set technology parameter", function(done) {
    sfdcReq = sfdcNock({technology: "ruby"});
    request.get(setup.testUrl + '/challenges?technology=ruby', function(err, response, body) {
      body = JSON.parse(body);
      sfdcReq.done(); // make sure that the sfdc api call occured with orderby option.
      done();
    });
  });
  it("able to set platform parameter", function(done) {
    sfdcReq = sfdcNock({platform: "heroku"});
    request.get(setup.testUrl + '/challenges?platform=heroku', function(err, response, body) {
      body = JSON.parse(body);
      sfdcReq.done(); // make sure that the sfdc api call occured with orderby option.
      done();
    });
  });
  it("able to set category parameter", function(done) {
    sfdcReq = sfdcNock({category: "code"});
    request.get(setup.testUrl + '/challenges?category=code', function(err, response, body) {
      body = JSON.parse(body);
      sfdcReq.done(); // make sure that the sfdc api call occured with orderby option.
      done();
    });
  });

  it("able to set limit and offset parameters", function(done) {
    sfdcReq = sfdcNock({
      limit: 20,
      offset: 30
    });
    request.get(setup.testUrl + '/challenges?limit=20&offset=30', function(err, response, body) {
      body = JSON.parse(body);
      sfdcReq.done(); // make sure that the sfdc api call occured with orderby option.
      done();
    });
  });

  it("default value of limit and offset is 100 and 0", function(done) {
    sfdcReq = sfdcNock({
      limit: 100,
      offset: 0
    });
    request.get(setup.testUrl + '/challenges', function(err, response, body) {
      body = JSON.parse(body);
      sfdcReq.done(); // make sure that the sfdc api call occured with orderby option.
      done();
    });
  });
});

describe("GET /challenges/:id/scorecards", function() {
  before(function(done) {
    setup.init(done);
  });

  beforeEach(function(done) {
    nock('https://cs9.salesforce.com:443')
      .get('/services/apexrest/v.9/challenges/65/scorecards?fields=id,name,member__r.name,member__r.profile_pic__c,member__r.country__c,challenge__c,money_awarded__c,prize_awarded__c,place__c,score__c,submitted_date__c')
      .reply(200, "[{\"attributes\":{\"type\":\"Challenge_Participant__c\",\"url\":\"/services/data/v22.0/sobjects/Challenge_Participant__c/a0AK000000BTelZMAT\"},\"Name\":\"CP-72503\",\"Submitted_Date__c\":\"2013-09-12T15:19:15.000+0000\",\"Money_Awarded__c\":0.00,\"Score__c\":27.5,\"Member__r\":{\"attributes\":{\"type\":\"Member__c\",\"url\":\"/services/data/v22.0/sobjects/Member__c/a0IK0000007NIQmMAO\"},\"Name\":\"jeffdonthemic\",\"Country__c\":\"United States\",\"Id\":\"a0IK0000007NIQmMAO\",\"Profile_Pic__c\":\"http://res.cloudinary.com/hz2trkcbb/image/upload/c_fill,h_125,w_125/v1377567951/jeffdonthemic.jpg\"},\"Member__c\":\"a0IK0000007NIQmMAO\",\"Id\":\"a0AK000000BTelZMAT\",\"Scorecard__r\":{\"totalSize\":1,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"QwikScore_Scorecard__c\",\"url\":\"/services/data/v22.0/sobjects/QwikScore_Scorecard__c/a0OK0000002OYF3MAO\"},\"Challenge_Participant__c\":\"a0AK000000BTelZMAT\",\"Reviewer__r\":{\"attributes\":{\"type\":\"Member__c\",\"url\":\"/services/data/v22.0/sobjects/Member__c/a0IK0000007NIQoMAO\"},\"Name\":\"mess\",\"Id\":\"a0IK0000007NIQoMAO\"},\"Final_Score__c\":27.500,\"Reviewer__c\":\"a0IK0000007NIQoMAO\",\"Id\":\"a0OK0000002OYF3MAO\",\"Total_Raw_Score__c\":6.00}]},\"Challenge__c\":\"a0GK0000008orZvMAI\"}]", {
        date: 'Mon, 23 Sep 2013 23:45:50 GMT',
        'content-type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked'
      });
    done();
  });

  it('returned count is 1', function(done) {
    request.get(setup.testUrl + '/challenges/65/scorecards', function(err, response, body) {
      body = JSON.parse(body);
      assert.equal(body.count, 1);
      done();
    });
  });

  it("responsed object has proper fields", function(done) {
    request.get(setup.testUrl + '/challenges/65/scorecards', function(err, response, body) {
      body = JSON.parse(body);
      var scorecard = body.response;
      assert.propertyVal(scorecard, "name");
      assert.propertyVal(scorecard, "submitted_date");
      assert.propertyVal(scorecard, "money_awarded");
      assert.propertyVal(scorecard, "score");
      assert.propertyVal(scorecard, "member");
      assert.propertyVal(scorecard, "id");
      assert.propertyVal(scorecard, "challenge");
      assert.propertyVal(scorecard, "scorecard__r");
      assert.propertyVal(scorecard, "member__r");
      done();
    });
  });
});

describe("GET /challenges/:id/scorecard", function() {
  before(function(done) {
    setup.init(done);
  });

  beforeEach(function(done) {
    nock('https://cs9.salesforce.com:443')
      .get('/services/apexrest/v.9/scorecard/65/questions')
      .reply(200, "[{\"attributes\":{\"type\":\"QwikScore_Question_Group__c\",\"url\":\"/services/data/v23.0/sobjects/QwikScore_Question_Group__c/a0MK0000005Etb1MAC\"},\"Name\":\"Testing\",\"QwikScore_Questions__r\":{\"totalSize\":1,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"QwikScore_Question__c\",\"url\":\"/services/data/v23.0/sobjects/QwikScore_Question__c/a0NK000000CdAIuMAN\"},\"QwikScore_Question_Group__c\":\"a0MK0000005Etb1MAC\",\"Maximum_Value__c\":4,\"Question_Type__c\":\"Numeric\",\"Minimum_Value__c\":1,\"Id\":\"a0NK000000CdAIuMAN\"}]},\"Id\":\"a0MK0000005Etb1MAC\",\"Group_Weight__c\":50},{\"attributes\":{\"type\":\"QwikScore_Question_Group__c\",\"url\":\"/services/data/v23.0/sobjects/QwikScore_Question_Group__c/a0MK0000005Etb2MAC\"},\"Name\":\"Functional\",\"QwikScore_Questions__r\":{\"totalSize\":5,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"QwikScore_Question__c\",\"url\":\"/services/data/v23.0/sobjects/QwikScore_Question__c/a0NK000000CdAIvMAN\"},\"QwikScore_Question_Group__c\":\"a0MK0000005Etb2MAC\",\"Maximum_Value__c\":4,\"Question_Type__c\":\"Numeric\",\"Minimum_Value__c\":1,\"Id\":\"a0NK000000CdAIvMAN\"},{\"attributes\":{\"type\":\"QwikScore_Question__c\",\"url\":\"/services/data/v23.0/sobjects/QwikScore_Question__c/a0NK000000CdAIwMAN\"},\"QwikScore_Question_Group__c\":\"a0MK0000005Etb2MAC\",\"Maximum_Value__c\":2,\"Question_Type__c\":\"Numeric\",\"Minimum_Value__c\":1,\"Id\":\"a0NK000000CdAIwMAN\"},{\"attributes\":{\"type\":\"QwikScore_Question__c\",\"url\":\"/services/data/v23.0/sobjects/QwikScore_Question__c/a0NK000000CdAIxMAN\"},\"QwikScore_Question_Group__c\":\"a0MK0000005Etb2MAC\",\"Maximum_Value__c\":4,\"Question_Type__c\":\"Numeric\",\"Minimum_Value__c\":1,\"Id\":\"a0NK000000CdAIxMAN\"},{\"attributes\":{\"type\":\"QwikScore_Question__c\",\"url\":\"/services/data/v23.0/sobjects/QwikScore_Question__c/a0NK000000CdAIyMAN\"},\"QwikScore_Question_Group__c\":\"a0MK0000005Etb2MAC\",\"Maximum_Value__c\":4,\"Question_Type__c\":\"Numeric\",\"Minimum_Value__c\":1,\"Id\":\"a0NK000000CdAIyMAN\"},{\"attributes\":{\"type\":\"QwikScore_Question__c\",\"url\":\"/services/data/v23.0/sobjects/QwikScore_Question__c/a0NK000000CdAIzMAN\"},\"QwikScore_Question_Group__c\":\"a0MK0000005Etb2MAC\",\"Maximum_Value__c\":4,\"Question_Type__c\":\"Numeric\",\"Minimum_Value__c\":1,\"Id\":\"a0NK000000CdAIzMAN\"}]},\"Id\":\"a0MK0000005Etb2MAC\",\"Group_Weight__c\":50}]", {
        date: 'Mon, 23 Sep 2013 23:53:39 GMT',
        'content-type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked'
      });
    done();
  });

  it('returned count is 2', function(done) {
    request.get(setup.testUrl + '/challenges/65/scorecard', function(err, response, body) {
      body = JSON.parse(body);
      assert.lengthOf(body.response, 2);
      assert.equal(body.count, 2);
      done();
    });
  });

  xit("responsed object has proper fields", function(done) {
    request.get(setup.testUrl + '/challenges/65/scorecard', function(err, response, body) {
      body = JSON.parse(body);
      var scorecard = body.response;
      assert.propertyVal(scorecard, "name");
      assert.propertyVal(scorecard, "id");
      assert.propertyVal(scorecard, "group_weight");
      assert.propertyVal(scorecard, "qwikscore_questions__r");
      done();
    });
  });
});

