const Discord = require('discord.js');
const bot = new Discord.Client();
var setdate = new Date();
setdate.setHours(20);
setdate.setMinutes(30);
var prefix = "tb";
var timerhandle;
var ServerId = "491952683029364737";
var roleArray = ["495223447207542825","556020653317160961"];

//tumulec help i ping
bot.on('message' , message => {
    
    if(message.author.bot) return;

    if(message.content.toLocaleLowerCase() == "tumulec"){

        message.reply('Jebać Tumulca!! ');
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
            message.channel.send('tbping - pinguje serwer i podaje opóżnienie w połączeniu\n'+
            'tbkick @nick  - usuwa gracza z serwera\ntbtimer godzina:minuta - ustawia przypomnienie'+
            ' o Drt i Donat na daną godzinę\ntbtimerstop - zatrzymuje przypomnienie o Drt i Donat'+
            '\ntbx @nick wyszukuje ostatnią wiadomość gracza na kanale komendy i dodaje reakcje MUGOL (zasięg 15wiadomości)');
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

//Set reaction
bot.on('message', message => {
  if (message.content.startsWith('tbx')) {

    const user = message.mentions.users.first();

    if (!user) {
      return;
    }

    //member który pisze wiadomość 
    const member = message.guild.member(user);

    if (!member) {
      return;
    }

    if (message.author.bot) return;
    //ignoruj komendy spoza gildi
    if (!message.guild) return;

    //sprawdzenie uprawnień
    let staffrole = ['553518647948083210','553212976530849813','497724809195814912']; //id uprawnień które moga używać komendy
    var rolecheck = false;

    for (i = 0; i < staffrole.length; i++) {
      if (message.member.roles.filter((role) => role.id == staffrole[i]).size > 0) {
        rolecheck = true;
      }
    }

    if (!rolecheck) {
      message.reply('nie masz wystarczających uprawnień');
      return;
    }

    let rolemark = ['553518647948083210','553212976530849813']; //id uprawnień które nie mogą być oznaczane reakcją 
    var rolecheckmark = false;

    for (i = 0; i < rolemark.length; i++) {
      if (member.roles.filter((role) => role.id == rolemark[i]).size > 0) {
        rolecheckmark = true;
      }
    }

    if (rolecheckmark) { 
        message.reply("🤦🤦🤦 Baranku mały jeszcze się taki nie urodził, co by Admina ugodził 😂");
      return;
    }

    message.channel.fetchMessages({ limit: 11 }).then(messages => {
      var znalezione = Array.from(messages.values());

      var i;
      for (i = 0; i < znalezione.length; i++) {
        if (znalezione[i].content != null && znalezione[i].author == user) {
          znalezione[i].react("🇲").then(async function () {
            await znalezione[i].react("🇺");
            await znalezione[i].react("🇬");
            await znalezione[i].react("🇴");
            await znalezione[i].react("🇱");
          });
          break;
        }
      }

    })
    return;
  }
});


//drt i donat start
bot.on('message', message => {
    if (message.content.startsWith('tbtimer') && !message.content.startsWith('tbtimerstop')) {

        //ignoruj comendy pochodzące od bota 
        if(message.author.bot) return;
        //ignoruj komendy spoza gildi
        if (!message.guild) return;

        //sprawdzenie uprawnień
        let staffrole = ['553518647948083210','553212976530849813']; //id uprawnień które moga używać komendy
        var rolecheck=false;

        for(i=0;i<staffrole.length;i++) {
            if(message.member.roles.filter((role) => role.id == staffrole[i]).size > 0) {
            rolecheck=true;
            }
        }
          
          if(!rolecheck){
            message.reply('nie masz wystarczających uprawnień');
            return;
            }

        
          let command = message.content.substring(message.content.indexOf(" ") + 1, message.content.length);
          //message.channel.send('Command1 + ' + command );

          var array = command.split(':');

          //message.channel.send('Arg ' + array );

          if(array.length === 2){
            //message.channel.send('ok ');

            var h = parseInt(array[0], 10) 
            var m = parseInt(array[1], 10) 

            if(!isNaN(h) && !isNaN(m)){
              //message.channel.send('ogodzina '+h+' minuta '+m);
              if(h>-1 && h<24 && m>-1 && m<60){

                setdate.setHours(h-1);
                setdate.setMinutes(m);

              }else{
                message.reply('Nieprawidłowe wartości godziny lub minut');
                return;
              }
              
             }else{
              message.reply('Podane wartości godziny lub minut nie są liczbami');
              return;
             }

          }else{
            message.reply('Nieprawidłowa ilość parametrów wpisz tbhelp po więcej informacji');
            return;
          }
              clearInterval(timerhandle);
              timerhandle=setInterval(function(){
                var dcurentdate = new Date();
                  
                  //bot.channels.get("553679684412506112").send({embed: {
                      //color: 3447003,
                      //description: ` U ${setdate.getHours()}:${setdate.getMinutes()} O${dcurentdate.getHours()}:${dcurentdate.getMinutes()}  HT ${dcurentdate.getHours() === setdate.getHours()} MT ${dcurentdate.getMinutes() === setdate.getMinutes()} S ${dcurentdate.getSeconds()}`
                        //${myRole}
                        //495220836312285184
                    //}});
                  
                  var guild = bot.guilds.get(ServerId);
                  var text=``;
                  roleArray.forEach(function(item, index) {
                  var role = guild.roles.get(item);
                  text+=`${role} `;
                  });
                  text+=`Proszę o uzupełnienie Drt i Donat`
                  //let myRole = message.guild.roles.get("495223447207542825");
                  if(dcurentdate.getHours() === setdate.getHours() && dcurentdate.getMinutes() === setdate.getMinutes()){
                    bot.channels.get("558736687434301471").send({embed: {
                      color: 3447003,
                      description: text
                        //${myRole}
                    }});
                }
                  
              }, 60000)
              //message.reply(`H ${setdate.getHours()}`);
              if(setdate.getHours() === 23){
                message.reply(`Ustawiono przypomnienie na godzinę 00:${setdate.getMinutes()}`);
              }else{
                message.reply(`Ustawiono przypomnienie na godzinę ${setdate.getHours()+1}:${setdate.getMinutes()}`);  
              }
              

              return;
           
        
      }     
});

//drt i donat timerstop
bot.on('message', message => {
  if (message.content.startsWith('tbtimerstop')) {
      
      //ignoruj comendy pochodzące od bota 
        if(message.author.bot) return;
        //ignoruj komendy spoza gildi
        if (!message.guild) return;

        //sprawdzenie uprawnień
        let staffrole = ['553518647948083210','553212976530849813']; //id uprawnień które moga używać komendy
        var rolecheck=false;

        for(i=0;i<staffrole.length;i++) {
            if(message.member.roles.filter((role) => role.id == staffrole[i]).size > 0) {
            rolecheck=true;
            }
        }
          
          if(!rolecheck){
            message.reply('nie masz wystarczających uprawnień');
            return;
            }

    clearInterval(timerhandle);
    message.reply(` Zatrzymano przypomnienie`);

    return;
  }
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
