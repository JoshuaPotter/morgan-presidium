export const name = 'say';

export async function execute({ ack, command, say }) {
	await ack();
	await say(command.text);
}