/**
 * API-SOS
 * Arquivo: src/routes/clienteRoutes.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cria um Router isolado para organizar os endpoints deste recurso.
const router=require("express").Router(),c=require("../controllers/clienteController"),auth=require("../middlewares/authMiddleware"),v=require("../validations/clienteValidation"),vm=require("../middlewares/validationMiddleware");
router.use(auth);// Define um endpoint HTTP GET.
router.get("/me",c.me);// Define um endpoint HTTP PUT.
router.put("/me",v,vm,c.update);// Define um endpoint HTTP DELETE.
router.delete("/me",c.remove);module.exports=router;