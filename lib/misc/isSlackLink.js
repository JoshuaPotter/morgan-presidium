export default function isSlackLink(link) {
	const slackLinkRegex = /((\s+)?<?https?:\/\/(www.)?[a-z0-9]+.(slack\.com)(\/[a-zA-Z0-9]+)+(\|?[a-zA-Z0-9]+)?>?(\s+)?)+/;
	return slackLinkRegex.test(link);
}