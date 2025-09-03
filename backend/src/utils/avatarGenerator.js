import crypto from "crypto";

export function generateAvatar(email) {
  const gravatarBaseUrl = "https://www.gravatar.com/avatar/";
  const emailHash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");
  return `${gravatarBaseUrl}${emailHash}?d=identicon`;
}
