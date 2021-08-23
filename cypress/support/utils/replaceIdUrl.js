export function replaceIdUrl(url, id) {
    console.log("replace", url, id)
    return url.replace('{id}', id)
}

export function replaceIdsUrl(url, firstId, secondId) {
    console.log("replace", url, firstId, secondId)
    return url.replace('{firstId}', firstId).replace('{secondId}', secondId)
}
