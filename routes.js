////////////
// ROUTES //
////////////

exports.routes = {

  get: [
    { path: "/:apiVersion/members/:membername/challenges/past", action: "membersPastChallenges" },
    { path: "/:apiVersion/members/:membername/challenges", action: "membersChallenges" },
    { path: "/:apiVersion/members/:membername/payments", action: "membersPayments" },  
    { path: "/:apiVersion/members/:membername", action: "membersFetch" },   
    { path: "/:apiVersion/members", action: "membersList" },  

    { path: "/:apiVersion/sponsors/:id", action: "sponsorsFetch" },       
    { path: "/:apiVersion/sponsors", action: "sponsorsList" },

    { path: "/:apiVersion/categories", action: "categoriesList" },
    { path: "/:apiVersion/technologies", action: "technologiesList" },

    { path: "/:apiVersion/leaderboard", action: "leaderboardList" },

    { path: "/:apiVersion/communities/:id", action: "communitiesFetch" },
    { path: "/:apiVersion/communities", action: "communitiesList" },

    { path: "/:apiVersion/messages/from/:membername", action: "messagesFrom" },
    { path: "/:apiVersion/messages/to/:membername", action: "messagesTo" },
    { path: "/:apiVersion/messages/inbox/:membername", action: "messagesInbox" },
    { path: "/:apiVersion/messages/:id", action: "messagesFetch" },

    { path: "/:apiVersion/participants/:membername/:challenge_id/deliverables", action: "deliverablesList" },
    { path: "/:apiVersion/participants/:membername/:challenge_id", action: "participantsStatus" },

    { path: "/:apiVersion/accounts/authenticate", action: "accountsAuthenticate" } , // i mad this a get so it's easier to use for now
    { path: "/:apiVersion/accounts/find_by_service", action: "accountsFindByService" },     
    { path: "/:apiVersion/accounts/:membername", action: "accountsFindByName" },

    { path: "/:apiVersion/judging", action: "judgingList" },

    { path: "/:apiVersion/tos/:id", action: "tosFetch" },
    { path: "/:apiVersion/tos", action: "tosList" },
    { path: "/:apiVersion/platforms", action: "platformsList"}

  ],

  put: [
  
  ],

  post: [

    //{ path: "/:apiVersion/accounts/authenticate", action: "accountsAuthenticate" } 

  ]  

};
