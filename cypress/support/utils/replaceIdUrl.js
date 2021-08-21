export function replaceIdUrl(url, id) {
    console.log("replace", url, id)
    return url.replace('{id}', id)
}