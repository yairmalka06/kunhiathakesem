const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = "!";
const DBL = require("dblapi.js");
var fortunes = [
    "https://www.youtube.com/watch?v=LrURBQtrBvs",
    "https://www.youtube.com/watch?v=zK-5vBFiAuc",
    "https://www.youtube.com/watch?v=RomNAn570Tc",
    "https://www.youtube.com/watch?v=sjQRZWzSLZU",
    "https://www.youtube.com/watch?v=u02SH-Re3ik"
];






var bot = new Discord.Client();

const dbl = new DBL(process.env.topgg, bot);

dbl.on('posted', () => {
  console.log('Server count posted');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

function play(connection, message){
    var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("finish", function(){
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}


var servers = {};

bot.on("ready", function(){
    console.log("Ready");
    bot.user.setActivity(`!shell | ${bot.guilds.cache.size} Servers!`);
});

bot.on("guildCreate",function(){
    bot.user.setActivity(`!shell | ${bot.guilds.cache.size} Servers!`);
})
bot.on("guildDelete",function(){
    bot.user.setActivity(`!shell | ${bot.guilds.cache.size} Servers!`);
})

 bot.on("message", function(message){
    if(message.author.bot) return;

    if(message.guild == null || message.channel.type == "dm") return;

    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()){
                case "shell":
                    if(!message.member.voice){
                        message.channel.send("You need to be in voice channel to talk with the Magic Shell!");
                       return;
                   }
                    if(args[1]){
                        if(!servers[message.guild.id]) servers[message.guild.id] = {
                            queue: []
                        };
                        var server = servers[message.guild.id];

                        server.queue.push(fortunes[Math.floor(Math.random() * fortunes.length)]);

                        if(!message.guild.voice) message.member.voice.channel.join().then(function(connection){
                            play(connection, message);                             
                        });
                    } else {
                        message.channel.send("Try to ask again.");          
                    }
                break;
            case "start":
                if(!message.member.voice){
                     message.channel.send("You need to be in voice channel to talk with the Magic Shell!");
                    return;
                }
                
                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                };
                var server = servers[message.guild.id];
                
                server.queue.push("https://www.youtube.com/watch?v=lw35HITLO14");
                
                if(!message.guild.voice) message.member.voice.channel.join().then(function(connection){
                    play(connection, message);                             
                });
            break;
            case "credits":
                    message.channel.send("Bot creators - Byoe And idan",{files: ["http://i.imgur.com/mxL9ejJ.jpg"]});
            break;        
    }
        return;
    });
    

    

bot.login(process.env.TOKEN);
