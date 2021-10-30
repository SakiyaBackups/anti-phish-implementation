const errors = {
    "NO_CLIENT": {
        "category": "TYPE",
        "text": "MISSING CLIENT! DID YOU PASS IN THE CLIENT OBJECT?",
    },

    "UNKNOWN_MSG": {
        "category": "NORMAL",
        "text": "UNKNOWN MESSAGE!",
    },

    "CANT_BAN": {
        "category": "NORMAL",
        "text": "UNABLE TO BAN SUPPLIED MEMBER!"
    },

    "CANT_KICK": {
        "category": "NORMAL",
        "text": "UNABLE TO KICK SUPPLIED MEMBER!"
    },

    "MSG_ERR": {
        "category": "TYPE",
        "text": "UNABLE TO SEND EMBED! PLEASE MAKE SURE THE EMBED YOU SUPPLIED IS VALID, AND/OR YOU CAN SEND EMBEDS IN THE CHANNEL!"
    }
};

/**
 * 
 * @param {String} error 
 * @returns 
 */
function makeError(error) {
    const e = errors[error];

    if (e.category == "type") {
        return new TypeError(e.text);
    } else if (e.category == "normal") {
        return new Error(e.text);
    };
};

module.exports = makeError;