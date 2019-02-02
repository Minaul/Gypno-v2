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



bot.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name + '\n Vas lire les <#538395478639771649> et prendre tes <#538395482041352192> !' )
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
        .setColor('#00FF00')
    member.guild.channels.get('538395477058650113').send(embed)
    member.addRole('538395464546910208')
 
});
 
bot.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
        .setColor('#B40404')
    member.guild.channels.get('538395477058650113').send(embed)
 
});
