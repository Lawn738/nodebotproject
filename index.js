const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});


//alkuperäinen testti ping komento, vastaa vain sanalla Pong

client.on("message", message => {
	if (message.content === "!oldping") {
		// send back "Pong." to the channel the message was sent in
		message.channel.send("Pong!");
	}
});


//päivitetty Ping komento kertoo latenssin discordin palvelinten ja botin välillä
client.on('message', message => {
	if (message.content === '!ping') {  
	  message.channel.send(`We've got you clocked in at ${Date.now() - message.createdTimestamp}ms`);
	}
  });


//Yksin kertainen porttikielto komento, etsii mainitun käyttäjän, potkii palvelimelta ja estää takaisin liittymisen
client.on('message', message => {
	
	if (!message.guild) return;
  
	if (message.content.startsWith('!ban')) {
	  
		const user = message.mentions.users.first();
	  	if (user) {
		const member = message.guild.member(user);
		if (member) {

		  	member
				.ban({
				reason: "You've commited crimes against Skyrim and her people!",
				})
				.then(() => {
			  
					message.reply(`Porttikielto toimitettu ${user.tag}`);
				})
				.catch(err => {
					message.reply("Porttikiellon jakelussa tapahtui virhe");
					console.error(err);
				});

		} else {
			message.reply("Käyttäjää ei löytynyt");
		}
	  	} else {
			message.reply("Käyttäjää ei mainittu");
	  	}
	}
});

//Komento käyttäjän nimen muutamiseen
client.on("message", message => {
	
	if (!message.guild) return;
  
	if (message.content.startsWith("!badname")) {
	  
		const user = message.mentions.users.first();
	  	if (user) {
		const member = message.guild.member(user);
		if (member) {

		  	member
				.setNickname("Korjaa nimesi /nick komennolla", "Epäsuvaittava nimi")
				.then(() => {
			  
					message.reply(`${user.tag} Nimi vaihdettu onnistuneesti`);
				})
				.catch(err => {
					message.reply("Nimeä vaihtaessa tapahtui virhe");
					console.error(err);
				});

			} else {
				message.reply("Käyttäjää ei löytynyt");
			}
			  } else {
				message.reply("Käyttäjää ei mainittu");
	  	}
	}
});


//Bad joke komennolla botti kertoo huonoja vitsejä
const jokes = [
"Why didnt the cat go to the vet? He was feline fine!",
"One lung said to another…we be-lung together!",
"I'm reading a book about anti-gravity. It's impossible to put down!",
"The quickest way to make antifreeze? Just steal her blanket!",
"What do you call an overweight psychic? A four-chin teller!",
]

client.on("message", message => {
	if (message.content === "!badjoke") {
		
		message.channel.send(jokes[Math.floor(Math.random() * 4)]);
	}
});


add your own token to make the bot work
client.login('Client Token');