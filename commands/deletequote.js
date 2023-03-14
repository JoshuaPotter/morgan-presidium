import deleteLore from "../lib/lore/deleteLore.js";

export const name = "deletequote";

// Command action
export async function execute({ command, ack, say }) {
	// Acknowledge command request
	await ack({"response_type": "in_channel"});
    const id = parseInt(command.text);
    if(!isNaN(id)) {
        try {
            const lore = await deleteLore(id);

            if (lore) {
                const possibleResponses = [
                    `Goodnight sweet prince, *#${id}* is deleted`,
                    `RIP *#${id}*, the deed is done`,
                    `Begone *#${id}*`,
                    `I deleted *#${id}*`,
                ];
                const index = Math.floor(Math.random() * possibleResponses.length);
                return await say(possibleResponses[index])
            }
        } 
        catch (error) {
            console.log(error);
        }
    }

    return await say("I couldn't delete the lore :pepehands:");
};