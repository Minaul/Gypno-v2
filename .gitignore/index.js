const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ">";

 bot.on('ready', function(){
     bot.user.setActivity(">help");
     console.log("Connected");
 });

bot.login(process.env.TOKEN);


/*Message*/
bot.on('message', message => {
    if (message.content === prefix + "help"){ 
        var embed = new Discord.RichEmbed()
            .setTitle("Liste des Commandes")
            .setDescription("Toute des commandes actuelle \n")
            .addBlankField()
            .addField(">help","Affiche ce message.", true)
            .addField(">owner","Affiche le créateur du bot.", true)
            .addBlankField()
            .addField("__**Modération : **__","Toute des commandes de modération actuelle \n", true)
            .addBlankField()
            .addField(">kick","Exclure un utilisateur", true)
            .addField(">ban","Bannir un utilisateur", true)
            .addBlankField()
            .setColor("0x#48ED6B")
            .setFooter("𝔾𝕪𝕡𝕟𝕠 𝕧.𝟚 by Minaul")
        message.channel.sendEmbed(embed);    
    }

    if (message.content === "Salut Gypno"){
        message.reply("Bien le bonjour. :)");
        console.log("Commande Salut effectué");
    }

    if (message.content === prefix + "owner"){
        message.channel.send('Ce bot a été crée par **Minaul**')
    }

    
});


/*Owner*/
bot.on('message', message => {
    if (message.content === prefix + "owner"){
        message.channel.send('Ce bot a été crée par **Minaul**')
    }
})


/*A rejoint*/
bot.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name + '\n Vas lire les <#538395478639771649> et prendre tes <#538395482041352192> !' )
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
        .setColor('#00FF00')
    member.guild.channels.get('538395477058650113').send(embed)
    member.addRole('538395464546910208')
 
});

/*A quitté*/
bot.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
        .setColor('#B40404')
    member.guild.channels.get('538395477058650113').send(embed)
 
});


/*Kick*/
bot.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(":gear:Tu n'as pas la permission. :x: ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send(":gear: Merci de mentionner l'utilisateur à expulser. :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send(":gear: Cet utilisatuer est impossible à l'expulser. :x:")
       if (!member.kickable) return message.channel.send(":gear: Je ne peux pas kick cet utilisateur :x:")
       member.kick()
       message.channel.send(":zap:**"+member.user.username + '** a été kick du serveur !')
    }
});
 
/*Ban*/
bot.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(":gear: Tu n'as pas la permission. :x:")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send(":gear: Merci de mentionner l'utilisateur à bannir. :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send(":gear: Je ne peux pas ban cet utilisateur :x:")
       message.guild.ban(member, {days: 7})
       message.channel.send(":zap:**"+member.user.username + '** a été banni !')
    }
});
