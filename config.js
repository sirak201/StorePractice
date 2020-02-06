module.exports = {
  appName: "Store",

  publicDomain: "http://localhost:2000",

  port: 2000,

  mongoUri: "mongodb://localhost/Store",

  stripe: {
    secretKey: "sk_test_U9KIiLPK8YZmbY6hLfAw7E4y00rgZnDx7t",
    publishableKey: "pk_test_4DHD1CtAVuya3tfY0IXEit9b00wcMiJNSD",
    clientId: "ca_GgcAHhHC4ecRhVlfXgWrmcTRJqDRh6pw",
    authorizeUri: "https://connect.stripe.com/express/oauth/authorize",
    tokenUri: "https://connect.stripe.com/oauth/token"
  }
};
