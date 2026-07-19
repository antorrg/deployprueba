export function responder (res, status, ok = true, message, data) {
  return res.status(status).json({ ok, message, data })
}
