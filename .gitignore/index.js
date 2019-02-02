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
        message.channel.send('Liste des commandes: \n -G?help \n -G?owner');
    }

    if (message.content === "Salut Gypno"){
        message.reply("Bien le bonjour. :)");
        console.log("Commande Salut effectué");
    }
});

bot.on('message', message => {
    if (message.content === prefix + "owner"){
        message.channel.send('Ce bot a été crée par **Minaul**')
    }
})
