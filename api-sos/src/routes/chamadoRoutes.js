/**
 * API-SOS
 * Arquivo: src/routes/chamadoRoutes.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cria um Router isolado para organizar os endpoints deste recurso.
const router=require("express").Router(),c=require("../controllers/chamadoController"),a=require("../controllers/avaliacaoController"),auth=require("../middlewares/authMiddleware"),v=require("../validations/chamadoValidation"),av=require("../validations/avaliacaoValidation"),vm=require("../middlewares/validationMiddleware");
router.use(auth);// Define um endpoint HTTP POST.
router.post("/",v.create,vm,c.create);// Define um endpoint HTTP GET.
router.get("/",c.list);// Define um endpoint HTTP GET.
router.get("/:id",v.id,vm,c.get);// Define um endpoint HTTP PATCH.
router.patch("/:id/aceitar",v.id,vm,c.accept);// Define um endpoint HTTP PATCH.
router.patch("/:id/iniciar",v.id,vm,c.start);// Define um endpoint HTTP PATCH.
router.patch("/:id/concluir",v.id,vm,c.complete);// Define um endpoint HTTP PATCH.
router.patch("/:id/cancelar",v.id,vm,c.cancel);// Define um endpoint HTTP POST.
router.post("/:id/avaliacao",av,vm,a.create);// Define um endpoint HTTP GET.
router.get("/:id/avaliacao",v.id,vm,a.get);// Define um endpoint HTTP PUT.
router.put("/:id/avaliacao",av,vm,a.update);module.exports=router;