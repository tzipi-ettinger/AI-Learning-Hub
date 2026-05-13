/** Logs every incoming request method and URL */
export function logger(req, res, next) {
    console.log(req.method, req.url)
    next()
}
