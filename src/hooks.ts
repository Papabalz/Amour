import { deLocalizeUrl } from '$lib/paraglide/runtime';

export const handle = deLocalizeUrl.apply;


export const reroute = (request: Request) => deLocalizeUrl(request.url).pathname;








