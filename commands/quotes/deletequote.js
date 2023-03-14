import deleteLore from "../../lib/lore/deleteLore.js";

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
                    `Goodnight sweet prince *#${id}*`,
                    `RIP *#${id}* :pepegrin:`,
                    `Never seen a *#${id}* and I never fuckin' will`,
                    `I deleted *#${id}*`,
                ];
                const index = Math.floor(Math.random() * possibleResponses.length);
                return await say(possibleResponses[index]);
            } else {
                return await say("I couldn't delete the lore (database error) :pepehands:");
            }
        } 
        catch (error) {
            console.log(error);
        }
    } else {
        return await say('Must be a quote ID (number) :feelsdankman:');
    }
};