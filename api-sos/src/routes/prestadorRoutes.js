/**
 * API-SOS
 * Arquivo: src/routes/prestadorRoutes.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cria um Router isolado para organizar os endpoints deste recurso.
const router=require("express").Router(),c=require("../controllers/prestadorController"),auth=require("../middlewares/authMiddleware"),v=require("../validations/prestadorValidation"),vm=require("../middlewares/validationMiddleware");
// Define um endpoint HTTP GET.
router.get("/",auth,c.list);// Define um endpoint HTTP GET.
router.get("/disponiveis",auth,c.disponiveis);// Define um endpoint HTTP GET.
router.get("/me",auth,c.me);// Define um endpoint HTTP PUT.
router.put("/me",auth,v.update,vm,c.update);// Define um endpoint HTTP PATCH.
router.patch("/me/disponibilidade",auth,v.availability,vm,c.availability);// Define um endpoint HTTP PATCH.
router.patch("/me/localizacao",auth,v.location,vm,c.location);module.exports=router;