const { Client, Intents } = require('discord.js');
const client = new Client ({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    const newMemberRole = member.guild.roles.cache.find(role => role.name === 'New Member')

    if (welcomeChannel && newMemberRole) {
        member.roles.add(newMemberRole);
        welcomeChannel.send(`Welcome ${member}! Please fill out this form: `)
    }
})