const admin = require("firebase-admin")

// Database stuff
const creds = {
  type: process.env.FIRE_TYPE,
  project_id: process.env.FIRE_PROJECT_ID,
  private_key_id: process.env.FIRE_PRIVATE_KEY_ID,
  private_key: process.env.FIRE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIRE_CLIENT_EMAIL,
  client_id: process.env.FIRE_CLIENT_ID,
  auth_uri: process.env.FIRE_AUTH_URI,
  token_uri: process.env.FIRE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIRE_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIRE_CLIENT_CERT
}

exports.handler = async (event, context, callback) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds),
      databaseURL: "https://i-need-a-product-idea.firebaseio.com"
    })
  }

  const db = admin.database()
  const ref = db.ref()

  const data = await ref.once("value", snapshot => {
    const val = snapshot.val()
    return val
  })

  admin.app().delete()

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: data
    })
  })
}
