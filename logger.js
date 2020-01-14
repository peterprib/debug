const loggerStatusActive={fill: 'yellow',shape:'ring',text:'Logging'};
const loggerStatusOff={fill: 'green',shape:'ring',text:''};

function Logger(label="***",active,count) {
	this.consoleFunction=console.log;
	this.sendFunction=this.sendConsole
	this.type="debug";
	if(label instanceof Object) {
		Object.assign(this,label);
	} else {
		this.label=label;
		this.count=count;
	}
	if(this.active==undefined) this.active=true;
	if(this.count==undefined) this.count=111;
	this.set(this.active,this.count);
	return this;
};
Logger.prototype.send=function(message,type,node,sendFunction=this.sendFunction) {
	if(--this.count) {
		sendFunction.apply(this,[(message instanceof Object ? JSON.stringify(message) : message),type,node]);
	} else {
		this.setOff();
	}
	return this;
};
Logger.prototype.sendConsole=function(message,type=this.type,consoleFunction=this.consoleFunction) {
	const ts = (new Date().toString()).split(' ');
	consoleFunction.apply(this,[([parseInt(ts[2], 10), ts[1], ts[4]].join(" ") + " - ["+type+"] "+this.label+" "+message)]);
	return this;
};
Logger.prototype.sendInfo=function(message) {
	return this.send(message,"info");
}
Logger.prototype.sendNode=function(message,node=this.node,type=this.noderedLogType) {
	return node[type](message);
}
Logger.prototype.setNodeStatus=function(node) {
	if(node) this.node=node;
	if(this.node==null) throw Error("No node set");
	this.showNodeStatus();
	return this;
};
Logger.prototype.set=function(active,count) {
	if(count!==undefined) {
		this.count=count;
		this.countDefault=count
	}
	if(active!==undefined) this.active=active;
	this.showNodeStatus();
	this.sendConsole('logging turning '+(this.active?"on logging next " + this.count + " log points":"off"));
	return this;
};
Logger.prototype.setOff=function() {
	return this.set(false);
};
Logger.prototype.setOn=function(count=this.countDefault) {
	return this.set(true,count);
};
Logger.prototype.showNodeStatus=function() {
	if(this.node) this.node.status(this.active?loggerStatusActive:loggerStatusOff);
};
module.exports = Logger;