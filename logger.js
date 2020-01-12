const loggerStatusActive={fill: 'yellow',shape:'ring',text:'Logging'};
const loggerStatusOff={fill: 'green',shape:'ring',text:''};

function Logger(label="***",active=true,count=100) {
	this.consoleFunction=console.log;
	this.sendFunction=this.sendConsole
	this.type="debug";
	if(label instanceof Object) {
		Object.assign(this,label);
	} else {
		this.label=label;
		this.count=count;
		this.active=active;
	}
	this.set(this.active,this.count);
	return this;
}
Logger.prototype.setNodeStatus=function(node) {
	if(node) this.node=node;
	if(this.node==null) throw Error("No node set");
	node.status(this.active?loggerStatusActive:loggerStatusOff);
	return this;
};
Logger.prototype.set=function(active=false,count=100) {
	this.count=count;
	this.active=active;
	this.sendConsole('logging turning '+this.active?"on logging next " + this.count + " log points":"off");
	return this;
};
Logger.prototype.setOff=function() {
	return this.set(false);
};
Logger.prototype.setOn=function(count=100) {
	return this.set(true,count);
};
Logger.prototype.send=function(message,type,node,sendFunction=this.sendFunction) {
	sendFunction.apply(this,[(message instanceof Object ? JSON.stringify(message) : message),type,node]);
	return this;
};
Logger.prototype.sendInfo=function(message) {
	return this.send(message,"info");
}
Logger.prototype.sendConsole=function(message,type=this.type,consoleFunction=this.consoleFunction) {
	const ts = (new Date().toString()).split(' ');
	consoleFunction.apply(this,[([parseInt(ts[2], 10), ts[1], ts[4]].join(" ") + " - ["+type+"] "+this.label+" "+message)]);
	return this;
};
Logger.prototype.sendNode=function(message,node=this.node,type=this.noderedLogType) {
	return node[type](message);
}
module.exports = Logger;