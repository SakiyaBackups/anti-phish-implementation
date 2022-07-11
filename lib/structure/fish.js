const { Client, MessageEmbed } = require('discord.js');
const defaultEmbed = require('./defaultEmbed');
const makeError = require('./error');
const axios = require('axios').default;

class Fish {

    /**
     * @description Anti-phising Client
     * @param {Client} client Your discord client
     * @param {Object} options Options for your fish client
     * @param {Boolean} options.enabled Whether phish detecting is enabled or disabled. *Default is true*
     * @param {Boolean} options.kick Whether the user who sent the phising link should be kicked or not. *Default is false. If both kick and ban are set as true, ban will take priority.*
     * @param {Boolean} options.ban Whether the user who sent the phising link should be banned or not. *Default is false. If both kick and ban are set as true, ban will take priority.*
     * @param {String} options.reason The reason to display when the phiser gets banned/kicked (If kick/ban is set as true) *Default message provided*
     * @param {MessageEmbed} options.embed MessageEmbed to send after deleting the phising link. Options: {member}, {mention}, {kick}, {ban}, and {link} *Default embed provided*
     */

    constructor(client, options) {
        if (!client || !client instanceof Client) makeError("NO_CLIENT");

        this.client = client;
        this.enabled = options.enabled ? options.enabled : true;
        this.kick = options.kick ? options.kick : false;
        this.ban = options.ban ? options.ban : false;
        this.reason = options.reason ? options.reason : "User posted phising link; banned by automod."; 
        this.embed = options.embed ? options.embed : defaultEmbed;
    };


    /**
     * @desciption The actual Fish (phising detector)
     * @returns {*}
     */
    init() {
        if (this.enabled !== true) return;        

        this.client.on("messageCreate", (message) => {
            if (message.author == this.client.user) return;
            if (/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(message.content.toString()) !== true) return;
            const uAgent = `${this.client.user.username} (${this.client.generateInvite({ scopes: ['bot'], permissions: ['SEND_MESSAGES'] })})`;
            const URL = message.content.toLowerCase().toString();
            const misc = {
                replace: this.replace,
                kick: this.kick,
                ban: this.ban,
                reason: this.reason,
                embed: this.embed,
            };


            axios({
                "url": "https://anti-fish.bitflow.dev/check",
                "method": "POST",
                "headers": {
                    "User-Agent": uAgent
                },
                "data": {
                    "message": URL
                }
            }).then(function (val) {
                const a = val.data;

                if (a.match == true) {
                    if (misc.kick == true) message.member.kick(misc.reason).catch(e => { makeError("CANT_KICK") }); else if (misc.ban == true) message.member.ban({ reason: misc.reason }).catch(e => { makeError("CANT_BAN") }); else if (misc.kick == true && misc.ban == true) message.member.ban({ reason: misc.reason }).catch(e => { makeError("CANT_BAN") });

                    message.delete().then((m) => {
                        misc.embed.description = misc.replace(misc.embed.description, [m.author.tag, `<@${m.member.id}>`, misc.kick, misc.ban, a.matches[0].domain, a.matches[0].type])

                        m.channel.send({ embeds: [ misc.embed ] }).catch(e => { makeError("MSG_ERR") });
                    }).catch(e => { makeError("UNKNOWN_MESSAGE") })
                } else if (a.match !== true) {
                    return;
                };
            }).catch(e => { });
        });
    };


    /**
     * @description Replaces an array of strings from a string with an array of values
     * @param {String} str String to search
     * @param {Array<String>} repl String to replace with
     * @returns {String}
     */

    replace(str, repl) {
        const toReplace = ['{member}', '{mention}', '{kick}', '{ban}', '{link}', '{type}'];
        var x = new RegExp((toReplace.join('#')).replace(/#/g, '|'), 'g');
        var lookup = {};

        for (var i = 0; i < toReplace.length; i++) {
            lookup[toReplace[i]] = repl[i];
        };
        
        str = str.replace(x, function (c) {
            return lookup[c];
        });

        return str;
    };
};

module.exports = Fish;