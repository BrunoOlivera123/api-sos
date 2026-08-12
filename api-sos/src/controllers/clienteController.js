/**
 * API-SOS
 * Arquivo: src/controllers/clienteController.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cliente Prisma usado para acessar o PostgreSQL.
const prisma = require("../config/database");
exports.me = async (req,res,next)=>{ try { const u=await prisma.cliente.findUnique({where:{id:req.user.id}}); if(!u)return res.status(404).json({success:false,message:"Cliente não encontrado"}); const {senhaHash,...data}=u; res.json({success:true,data}); }catch(e){next(e)} };
exports.update = async(req,res,next)=>{try{const u=await prisma.cliente.update({where:{id:req.user.id},data:req.body});const{senhaHash,...data}=u;res.json({success:true,message:"Cliente atualizado",data})}catch(e){next(e)}};
exports.remove = async(req,res,next)=>{try{await prisma.cliente.delete({where:{id:req.user.id}});res.json({success:true,message:"Conta excluída"})}catch(e){next(e)}};