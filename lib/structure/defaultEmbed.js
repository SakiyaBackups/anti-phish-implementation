const defaultEmbed = {
    "type": "rich",
    "title": "A phising link was posted!",
    "color": "RED",
    "description": "{member} ({mention})\nKicked: \`{kick}\`\ \nBanned: \`{ban}\`\ \n\nLink deleted: ||{link}||\nLink type: \`{type}\`\ \n\n*WARNING: Clicking on the link may put your account at risk*",
    "footer": {
        "text": "Do not fall for free nitro, steam skins, any in-game currency, etc, your account will get hijacked."
    }
};

module.exports = defaultEmbed;