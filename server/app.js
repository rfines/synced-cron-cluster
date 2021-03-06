
SyncedCron.add({
 	name: 'sample method',
    schedule: function(parser) {
        // parser is a later.parse object
         //"every 2 minutes"at 2:01 am and 2:01 pm and 8:01 pm
        return parser.text("every 2 minutes");
    }, 
    job: function() {
        Connections.app.subscribe("blogs", function(){
            Comments.find().forEach(function(cId){
                console.log("working on "+cId._id+" comment");
                Comments.update({_id:cId._id}, {$set:{body:"I am stupid updated comment."}});
            });
            Blogs.find().forEach(function(blog){
                console.log("working on "+blog._id+" blog");
                Blogs.update({_id:blog._id}, {$set:{title:"Update Blog Title!!"}});
            })
            
        });
        Connections.app.subscribe("logs", function(){
            console.log("Running sample method");
            var logId = "";
        	Meteor.call("insertLog", function(e,r){
                logId = r;
	        	return r;
	        });	
            console.log("running update");
            Meteor.call("updateLog", logId, function(e,r){
                return r;
            });
        });
        
    }
});
SyncedCron.start();
Meteor.methods({
	insertLog:function(){
        console.log("Inserting Log");
		return Logs.insert({startedAt:new Date(), message:"Starting sample method"});
	},
    updateLog:function(logId){
        console.log("Updating a log");

        return Logs.update({_id:logId},{$set:{message:"Updated sample message."}});
    },
    updateBlogs:function(){

    }
})