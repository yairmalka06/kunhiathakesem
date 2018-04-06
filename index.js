const Discord = require("discord.js");
const YTDL = require("ytdl-core");


const PREFIX = "!";

var fortunes = [
    "https://www.youtube.com/watch?v=LrURBQtrBvs",
    "https://www.youtube.com/watch?v=zK-5vBFiAuc",
    "https://www.youtube.com/watch?v=RomNAn570Tc",
    "https://www.youtube.com/watch?v=sjQRZWzSLZU",
    "https://www.youtube.com/watch?v=u02SH-Re3ik"
];






var bot = new Discord.Client();



function play(connection, message){
    var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function(){
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}


var servers = {};

bot.on("ready", function(){
    console.log("Ready");
    bot.user.setGame("Magic Shell...");
    console.log(process.env.TOKEN);
});


    

 bot.on("message", function(message){
    
     if(message.author.equals(bot.user)) return;
    
    if(!message.content.startsWith(PREFIX)) return;
    
        var args = message.content.substring(PREFIX.length).split(" ");
    
       
            
    
        switch (args[0].toLowerCase()){
                case "shell":
                        if(args[1] == "Bitch"){
                            message.channel.sendMessage("Sorry?");
                            break;
                        }
                        if(args[2] == "Bitch"){
                            message.channel.sendMessage("Sorry?");
                            break;
                        }
                            if(args[3] == "Bitch"){
                            message.channel.sendMessage("Sorry?");
                            break;
                        }
                        if(args[4] == "Bitch"){
                            message.channel.sendMessage("Sorry?");
                            break;
                        }
                        var server = servers[message.guild.id];
                    
                
                        if(args[1]){
                             if(!servers[message.guild.id])  servers[message.guild.id] = {
                                 queue: []
                             };
                            var server = servers[message.guild.id];
                
                             server.queue.push(fortunes[Math.floor(Math.random() * fortunes.length)]);
                
                            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                                play(connection, message);                             
                            });
                        } else {
                          message.channel.sendMessage("Try to ask again.");          
                
                        }
                
                break;
                  case "start":

                if(!message.member.voiceChannel){
                     message.channel.sendMessage("You need to be in voice channel to talk with the Magic Shell!");


                    return;
                }
                
                if(!servers[message.guild.id])  servers[message.guild.id] = {
                    queue: []
                };
                var server = servers[message.guild.id];
                
                server.queue.push("https://www.youtube.com/watch?v=uIe8u6FhRuo&feature=youtu.be");
                
                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                    play(connection, message);                             
                });
                break;
            case "credits":
                    message.channel.sendMessage("Bot creator - SkyDive");
                    message.channel.sendMessage("Bot creator - BandIT");
                       message.channel.send("", {files: ["http://i.imgur.com/mxL9ejJ.jpg"]});
                break;
           
                default:
                    message.channel.sendMessage("The command is invalid.");
                
        }
    
            return;
    });
    

    

bot.login(process.env.TOKEN);
