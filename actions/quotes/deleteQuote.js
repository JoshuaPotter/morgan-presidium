export const name = "deleteQuote";

export async function execute({ ack, body, client }) {
    await ack();

    // Open model on delete quote button click
    const channel = body.channel.id;
    const { value: lore_id } = body.actions[0];
    try {
        await client.views.open({
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: body.trigger_id,
            // View payload
            view: {
                type: 'modal',
                // View identifier
                private_metadata: JSON.stringify({ channel, lore_id }),
                callback_id: 'deleteQuote',
                title: {
                    type: 'plain_text',
                    text: `Delete quote #${lore_id}?`
                },
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `Are you sure you want to delete quote #${lore_id}? *This cannot be undone.*`
                        }
                    },
                ],
                close: {
                    type: 'plain_text',
                    text: 'Cancel'
                },
                submit: {
                    type: 'plain_text',
                    text: "Yes, I'm sure"
                }
            }
        });
    } catch(error) {
        console.error(error);
    }
}