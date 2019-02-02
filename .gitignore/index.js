const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = "G?";

 bot.on('ready', function(){
     bot.user.setActivity("G?help");
     console.log("Connected");
 });

bot.login(process.env.TOKEN);


bot.on('message', message => {
    if (message.content === prefix + "help"){ 
        message.channel.send('Liste des commandes: \n -G?help');
    }

    if (message.content === "Salut Gypno"){
        message.reply("Bien le bonjour. :)");
        console.log("Commande Salut effectué");
    }
});
