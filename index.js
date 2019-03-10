const Discord = require('discord.js');
const bot = new Discord.Client();
var setdate = new Date();
setdate.setHours(21);
setdate.setMinutes(30);
var prefix = "tb";
var prefixmop = "tbmop";

//tumulec help i ping
bot.on('message' , message => {
    
    if(message.author.bot) return;

    if(message.content.toLocaleLowerCase() == "tumulec"){
        var date =  new Date;
        //var time = date.getTime.toString;

        message.reply('Jebać Tumulca!! '+date);
        return
    }

    if(message.content.toLocaleLowerCase() == "adi"){
      var date =  new Date;
      //var time = date.getTime.toString;

      message.reply('Adi, Radrix dwa bratanki i do bójki i do szklanki');
      return
  }

  if(message.content.toLocaleLowerCase() == "radrix"){
    var date =  new Date;
    //var time = date.getTime.toString;

    message.reply('Adi, Radrix dwa bratanki i do bójki i do szklanki');
    return
}

    if(!message.content.startsWith(prefix)){
        return;
    }else{
        if(message.content === prefix+"help"){
            message.channel.send('tbping - pinguje serwer i podaje opużnienie w połączeniu\ntbkick @nick  - usuwa gracza z serwera\ntbmute @nick  - mutuje gracza na tym kanale\ntbunmute @nick  - usuwa muta z gracza na tym kanale');
            return;
        }else if(message.content === prefix+"ping") {
            // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
            // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
            message.channel.send("Ping?").then(function(m){m.edit(`Pong! opóźnienie:  ${m.createdTimestamp - message.createdTimestamp}ms.`)});
            return;
        }else{
            return;   
        }
    }

      
});

//kick z serwera
bot.on('message', message => {
    if(message.author.bot) return;
    // Ignore messages that aren't from a guild
    if (!message.guild) return;

    if (message.content.startsWith('tbkick')) {

        if(!message.member.roles.some(r=>["Admin", "Oficer" , "Lider"].includes(r.name)) ){
            return message.reply("Nie masz wysatarczających uprawnień");
        }
        
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member.kick('powod').then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`usuną gracza ${user.tag} z serwera`);
          }).catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('nie udalo sie');
            // Log the error
            console.error(err);
          });
        } else {
          // The mentioned user isn't in this guild
          message.reply('Tnie ma go');
        }
      // Otherwise, if no user was mentioned
      } else {
        message.reply('nie mozesz');
      }
    }
  });

//drt i donat
bot.on('ready', () => {

        setInterval(function(){ // repeat this every 24 hours
            var dcurentdate = new Date();

            if(dcurentdate.getHours() === setdate.getHours() && dcurentdate.getMinutes() === setdate.getMinutes()){
                bot.channels.get("495220836312285184").send({embed: {
                    color: 3447003,
                   description: "@Thunder Jest 21:30 Jeśli ktoś nie zrobił Drt i Donat proszę o zrobienie tego teraz"
                  }});
            }
        }, 60000)   
});

//powitanie
bot.on('guildMemberAdd', member => {

    bot.channels.get("552882250723885079").send({embed: {
      color: 3447003,
      title: "Witamy na serwerze Thunder!",
      description: `${member} Miło cię widzieć zapraszamy`
    }});
  });

//pożegnanie
bot.on('guildMemberRemove', member => {

  bot.channels.get("552882250723885079").send({embed: {
    color: 3447003,
    description: `${member.displayName} Opuścił Server`
  }});
});

bot.login(process.env.BOT_TOKEN);
