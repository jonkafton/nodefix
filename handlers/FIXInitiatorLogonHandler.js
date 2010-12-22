exports.makeFIXInitiatorLogonHandler = function(options){ return new FIXInitiatorLogonHandler(options);}

function FIXMsgCreator(opt){


    this.description = "if this is an acceptor session, then received logon messages need to ack";
    
    this.incoming = function(ctx, event){
        if(event.eventType !== "data"){
            ctx.sendNext(event);
            return;
        }
        
        ctx.sendPrev({eventType:"data", data:{
                            "35": "A",
                            "108": ctx.state.heartbeatDuration || 30 //TODO this needs to be double checked
                        }});    
    }
