const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    const newMemberRole = member.guild.roles.cache.find(role => role.name === 'New Member');
    const formLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfckfZn43MKdOf_Ji82JrOgH4WAkJd8liCvtFsFU6QLQi6lvA/viewform?usp=sf_link'; // Replace with your actual Google Form or Typeform link

    if (welcomeChannel && newMemberRole) {
        member.roles.add(newMemberRole);
        welcomeChannel.send(`Welcome ${member}! Please fill out this form: ${formLink}. Once you have submitted the form, you will gain access to the full server.`);
    }
});

client.on('messageCreate', async message => {
    if (message.channel.name === 'introductions' && !message.author.bot) {
        const newMemberRole = message.guild.roles.cache.find(role => role.name === 'New Member');
        const memberRole = message.guild.roles.cache.find(role => role.name === 'Member');
        const member = message.guild.members.cache.get(message.author.id);

        if (newMemberRole && memberRole && member.roles.cache.has(newMemberRole.id)) {
            await member.roles.remove(newMemberRole);
            await member.roles.add(memberRole);
            message.channel.send(`Thank you for submitting the form, ${member}! You now have access to the full server.`);
        }
    }
});

client.login('your-bot-token');
