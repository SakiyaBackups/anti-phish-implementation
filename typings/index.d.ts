import { Client, MessageEmbed } from "discord.js";

declare module "anti-phish-implementation" {
    export interface Fish {
        client: Client,
        options: {
            enabled: Boolean, 
            kick: Boolean, 
            ban: Boolean, 
            reason: String, 
            embed: MessageEmbed
        }
    }
}