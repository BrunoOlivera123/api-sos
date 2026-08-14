/**
 * API-SOS
 * Arquivo: src/server.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const app = require("./app"),
  { port } = require("./config/env");
app.listen(port, () => console.log(`API SOS rodando na porta ${port}`));
