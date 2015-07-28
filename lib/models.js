if(Meteor.isServer){
	Cluster.connect("mongodb://eventrio:EventrioStageComposeIO!!2015@candidate.6.mongolayer.com:10381,candidate.5.mongolayer.com:10492/eventrio-cluster-stage?replicaSet=set-55afb5779495f49353000b48");
	Cluster.register("worker");
}

var appConn = Cluster.discoverConnection('app');
Logs = new Mongo.Collection('logs', {connection:appConn});
Logs.allow({
	insert: function (userId, doc) {
		//...
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		//...
		return true;
	},
	remove: function (userId, doc) {
		//...
		return true;
	},
	
});

Comments = new Mongo.Collection('comments',{connection:appConn});
Categories = new Mongo.Collection('categories',{connection:appConn});
Blogs = new Mongo.Collection("blogs",{connection:appConn});
Bloggers = new Mongo.Collection("bloggers",{connection:appConn});

Connections = {
	app:appConn,
}