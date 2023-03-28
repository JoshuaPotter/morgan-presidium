export default function getTimestampFromSlackURL(url) {
	const splitLink = url.split('/');
	const slug = splitLink[splitLink.length - 1].slice(1);
	const ind = slug.length - 6;
	const ts = `${slug.substring(0, ind)}.${slug.substr(ind)}`;
	return ts;
}