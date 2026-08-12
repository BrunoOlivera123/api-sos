/**
 * API-SOS
 * Arquivo: src/routes/categoriaRoutes.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cria um Router isolado para organizar os endpoints deste recurso.
const router=require("express").Router(),c=require("../controllers/categoriaController"),auth=require("../middlewares/authMiddleware");
// Define um endpoint HTTP GET.
router.get("/",c.list);// Define um endpoint HTTP GET.
router.get("/:id",c.get);// Define um endpoint HTTP POST.
router.post("/",auth,c.create);// Define um endpoint HTTP PUT.
router.put("/:id",auth,c.update);// Define um endpoint HTTP DELETE.
router.delete("/:id",auth,c.remove);module.exports=router;