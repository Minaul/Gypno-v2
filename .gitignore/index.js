const Discord = require('discord.js');
const bot = new Discord.Client()
/*const superagent = require("superagent")*/
var prefix = ">";

 bot.on('ready', function(){
     console.log("Connected");
 });

 const activities_list = [
    ">help", 
    "je suis codé par Minaul",
    "le ciel ",
    ">help",
    ]; 

bot.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index],{type : 'WATCHING'}); 
    }, 4000); 
});



 bot.login(process.env.TOKEN);


/*Message*/
bot.on('message', message => {
    if (message.content === prefix + "help"){ 
        var embed = new Discord.RichEmbed()
            .setTitle("Liste des Commandes")
            .setDescription("__**Infos :**__ \n")
            .addBlankField()
            .addField(">help","Affiche ce message.", true)
            .addField(">owner","Affiche le créateur du bot.", true)
            .addField(">infodiscord","Affiche des infos du Discord", true)
            .addBlankField()
            .addField("__**Modération : **__","Toute des commandes de modération actuelle \n", true)
            .addBlankField()
            .addField(">kick","Exclure un utilisateur", true)
            .addField(">ban","Bannir un utilisateur", true)
            .addField(">clear","Suprimer des messages", true)
            .addBlankField()
            .addField(":game_die: __**Divertissement**__ :game_die:","Toute les commandes de divertissement")
            .addBlankField()
            .addField(">chat","Affiche une photo de chat.", true)
            .addField(">chien","Affiche une photo de chien.", true)
            .addField(">meme","Affiche un meme (en anglais).", true)
            .addBlankField()
            .setColor("0x#48ED6B")
            .setFooter("𝔾𝕪𝕡𝕟𝕠 𝕧.𝟚 by Minaul")
        message.channel.send(embed);    
    }

    if (message.content === "Salut Gypno"){
        message.reply("Bien le bonjour. :)");
        console.log("Commande Salut effectué");
    }

    if (message.content === prefix + "owner"){
        message.channel.send('Ce bot a été crée par **Minaul**')
    }

    

    
});



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


/*Clear*/

bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":gear: Tu n'as pas la permission. :x:")
        let count = args[1]
        if (!count) return message.channel.send(":gear: Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send(":gear: Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send(":gear: Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
});

/*infosDiscord*/

bot.on('message', message => {

    if (message.content === prefix + "infodiscord"){ 
        var embed = new Discord.RichEmbed()
        .setDescription("Information du Discord")
        .addField("Nom du discord", message.guild.name)
        .addField("Crée le", message.guild.createdAt)
        .addField("Tu as rejoint le",message.member.joinedAt)
        .addField("Utilisateurs sur le discord", message.guild.memberCount)
        .setColor("0x#FFFF00")
    message.channel.sendEmbed(embed)

}});



/*Image random*/
/*bot.on('message', async message => {

    if (message.content === prefix + "chat") {
        let msg = await message.channel.send("`Génération......`")

        let {body} = await superagent
        .get(`http://aws.random.cat/meow`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("Je trouve pas d'image de chat :cry: réessayer !")

           let cEmbed = new Discord.RichEmbed()
           .setColor("0xd9890e")
           .setDescription(`<:kawaii:546366855930183681> Voilà une image de chat.`, )
           .setImage(body.file)
           .setTimestamp()
           .setFooter(`Demandé par ${message.author.username}`,bot.user.displayAvatarURL)

           message.channel.send({embed : cEmbed})

           msg.delete()
  
    }

    if (message.content === prefix + "chien") {
        let msg = await message.channel.send("`Génération......`")

        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("Je trouve pas d'image de chien :cry: réessayer !")

           let dEmbed = new Discord.RichEmbed()
           .setColor("0x7c7263")
           .setDescription(`:dog: Voilà une image de chien.`, )
           .setImage(body.message)
           .setTimestamp()
           .setFooter(`Demandé par ${message.author.username}`,bot.user.displayAvatarURL)

           message.channel.send({embed : dEmbed})

           msg.delete()
  
    }


    if (message.content === prefix + "meme") {
        let msg = await message.channel.send("`Génération......`")

        let {body} = await superagent
        .get(`https://api-to.get-a.life/meme`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("Je trouve pas de meme :cry: réessayer !")

           let mEmbed = new Discord.RichEmbed()
           .setColor("0x046118")
           .setDescription(`<:pepeOK:538651918709293069> Voilà un meme !`, )
           .setImage(body.url)
           .setTimestamp()
           .setFooter(`Demandé par ${message.author.username}`,bot.user.displayAvatarURL)

           message.channel.send({embed : mEmbed})

           msg.delete()
    }
});

*/
