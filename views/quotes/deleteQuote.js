import deleteLore from  '../../lib/lore/deleteLore.js';

export const name = "deleteQuote";

export async function execute({ ack, body, client, view }) {
    await ack();
    
    // Handle delete quote modal view submission
    const user = body.user.id;
    const { private_metadata } = view;
    const { channel, lore_id } = JSON.parse(private_metadata);
    const deletedLore = await deleteLore(lore_id);
    let msg = '';
    if(deletedLore) {
        const possibleResponses = [
            `Goodnight sweet prince, *#${lore_id}* is deleted`,
            `RIP, *#${lore_id}* is deleted :pepegrin:`,
            `Never seen a *#${lore_id}* and I never fuckin' will, *#${lore_id}* is deleted`,
            `I deleted *#${lore_id}* :gettingsturdy:`,
        ];
        const index = Math.floor(Math.random() * possibleResponses.length);
        msg = possibleResponses[index];
    }
    else {
        msg = "I couldn't delete the lore (database error) :pepehands:";
    }

    try {
        await client.chat.postMessage({
            channel: channel,
            text: `<@${user}> ${msg}`
        });
    } catch(error) {
        console.error(error);
    }
}