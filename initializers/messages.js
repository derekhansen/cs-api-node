var pg = require('pg').native

exports.messages = function(api, next){

  api.messages = {

    // methods

    /* 
    * Returns a specific message by id from pg
    *
    * id - the id of the message
    *
    * Returns a message if it exists
    */
    fetch: function(id, next) {
      var client = new pg.Client(api.configData.pg.connString);
      client.connect(function(err) {
        if (err) { console.log(err); }
        var sql = "select sfid as id, name, createddate as created_date, lastmodifieddate as last_modified_date, to__c as to_id, (select name from member__c where sfid = to__c) as to_name, from__c as from_id, (select name from member__c where sfid = from__c) as from_name, subject__c, status_from__c, status_to__c, replies__c from private_message__c where sfid = $1";
        client.query(sql, [id], function(err, rs) {
          if (!rs['rows'] || !rs['rows'][0]) { next([]); }
          else {
            var sql2 = "select createddate as created_date, lastmodifieddate as last_modified_date, body__c from private_message_text__c where private_message__c = $1 order by createddate desc";
            client.query(sql2, [id], function(err2, rs2) {
              rs['rows'][0].text = rs2['rows'];
              next(rs['rows']);
            })
          }
        })
      })
    },

    /* 
    * Returns a user's inbox from pg
    *
    * memberName - the name of the user
    *
    * Returns a list of messages
    */
    inbox: function(memberName, next) {
      var client = new pg.Client(api.configData.pg.connString);
      client.connect(function(err) {
        if (err) { console.log(err); }
        var sql = "select sfid as id, name, createddate as created_date, lastmodifieddate as last_modified_date, to__c as to_id, (select name from member__c where sfid = to__c) as to_name, (select profile_pic__c from member__c where sfid = to__c) as to_profile_pic, from__c as from_id, (select name from member__c where sfid = from__c) as from_name, (select profile_pic__c from member__c where sfid = from__c) as from_profile_pic, subject__c, status_from__c, status_to__c, replies__c from private_message__c where to__c = (select sfid from member__c where name = $1) or from__c = (select sfid from member__c where name = $1) order by lastmodifieddate desc";
        client.query(sql, [memberName], function(err, rs) {
          next(rs['rows']);
        })
      })
    },

    /* 
    * Returns messages sent to a user
    *
    * memberName - the name of the user
    *
    * Returns a list of messages
    */
    to: function(memberName, next) {
      var client = new pg.Client(api.configData.pg.connString);
      client.connect(function(err) {
        if (err) { console.log(err); }
        var sql = "select sfid as id, name, createddate as created_date, lastmodifieddate as last_modified_date, to__c as to_id, (select name from member__c where sfid = to__c) as to_name, (select profile_pic__c from member__c where sfid = to__c) as to_profile_pic, from__c as from_id, (select name from member__c where sfid = from__c) as from_name, (select profile_pic__c from member__c where sfid = from__c) as from_profile_pic, subject__c, status_from__c, status_to__c, replies__c from private_message__c where to__c = (select sfid from member__c where name = $1) order by lastmodifieddate desc";
        client.query(sql, [memberName], function(err, rs) {
          next(rs['rows']);
        })
      })
    },

    /* 
    * Returns messages sent by a user
    *
    * memberName - the name of the user
    *
    * Returns a list of messages
    */
    from: function(memberName, next) {
      var client = new pg.Client(api.configData.pg.connString);
      client.connect(function(err) {
        if (err) { console.log(err); }
        var sql = "select sfid as id, name, createddate as created_date, lastmodifieddate as last_modified_date, to__c as to_id, (select name from member__c where sfid = to__c) as to_name, (select profile_pic__c from member__c where sfid = to__c) as to_profile_pic, from__c as from_id, (select name from member__c where sfid = from__c) as from_name, (select profile_pic__c from member__c where sfid = from__c) as from_profile_pic, subject__c, status_from__c, status_to__c, replies__c from private_message__c where from__c = (select sfid from member__c where name = $1) order by lastmodifieddate desc";
        client.query(sql, [memberName], function(err, rs) {
          next(rs['rows']);
        })
      })
    },

    /* 
    * Creates a new message
    *
    * data - { from, to, subject, body }
    *
    * Returns a status message
    */
    create: function(data, next) {
      var client = new pg.Client(api.configData.pg.connString);
      client.connect(function(err) {
        if (err) { console.log(err); }
        var sql = "select (select sfid from member__c where name = $1) as from_id, (select sfid from member__c where name = $2) as to_id";
        client.query(sql, [data.from, data.to], function(err, rs) {
          if (!rs['rows'][0] || !rs['rows']) { next([]); }
          else {
            var body = {
              fromId: rs.rows[0].from_id,
              toId: rs.rows[0].to_id,
              event: 'Private Message',
              subject: data.subject,
              body: data.body
            };
            api.sfdc.org.apexRest({ uri: 'v.9/notifications', method: 'POST', body: body }, api.sfdc.oauth, function(err, res) {
              if (err) { console.error(err); }
              res.Success = res.Success == "true";
              next(res);
            });
          }
        })
      })
    },

    /* 
    * Creates a new private message message as a reply to a specific private message
    *
    * data - { id, from, body }
    *
    * Returns a status message
    */
    reply: function(data, next) {
      var client = new pg.Client(api.configData.pg.connString);
      client.connect(function(err) {
        if (err) { console.log(err); }
        var sql = "select subject__c as subject, to__c as to_id, (select sfid from member__c where name = $1) as from_id from private_message__c where sfid = $2";
        client.query(sql, [data.from, data.id], function(err, rs) {
          if (!rs['rows'][0] || !rs['rows']) { next([]); }
          else {
            var body = {
              fromId: rs.rows[0].from_id,
              toId: rs.rows[0].to_id,
              event: 'Private Message',
              subject: rs.rows[0].subject,
              body: data.body,
              parentId: data.id
            };
            api.sfdc.org.apexRest({ uri: 'v.9/notifications', method: 'POST', body: body }, api.sfdc.oauth, function(err, res) {
              if (err) { console.error(err); }
              res.success = res.Success;
              next(res);
            });
          }
        })
      })
    },

    /* 
    * Updates a specific private message
    *
    * data - { id, from, to, subject, body }
    *
    * Returns a status message
    */
    update: function(data, next) {
      var client = new pg.Client(api.configData.pg.connString);
      client.connect(function(err) {
        if (err) { console.log(err); }
        var sql = "update private_message__c set from__c = (select sfid from member__c where name = $1), to__c = (select sfid from member__c where name = $2), subject__c = $3 where sfid = $4";
        client.query(sql, [data.from, data.to, data.subject, data.id], function(err, res) {
          if (!err) {
            var sql = "update private_message_text__c set body__c = $1 where private_message__c = $2";
            client.query(sql, [data.body, data.id], function(err, res) {
              if (!err) {
                res = {
                  success: true,
                  message: "Message updated successfully."
                };
              } else {
                res = {
                  success: false,
                  message: "Message partially updated."
                };
                console.log(err);
              }
              next(res);
            })
          } else {
            res = {
              success: false,
              message: "Message not updated."
            };
            console.log(err);
            next(res);
          }
        })
      })
    }
  }
  next();
}
