import addLore from "../lib/lore/addLore.js";
import isSlackLink from "../lib/misc/isSlackLink.js";

export const name = "addquote";

// Command action
export async function execute({ command, ack, say }) {
	// Acknowledge command request
	await ack();
    
    if(isSlackLink(command.text)) {
        try {
            const obj = {
                lore_url: command.text,
                submitted_by: command.user_id
            };
            const lore = await addLore(obj);

            if (lore !== null) {
                const possibleResponses = [
                    `I'm gonna add this as *#${lore.lore_id}*`,
                    `Added to the LIST as *#${lore.lore_id}* :clap:`,
                    `added *#${lore.lore_id}* :catjam:`,
                ];
                const index = Math.floor(Math.random() * possibleResponses.length);
                return await say(possibleResponses[index])
            }
        } 
        catch (error) {
            console.log(error);
        }
    }

    return await say("I couldn't save the lore :pepehands:");
};