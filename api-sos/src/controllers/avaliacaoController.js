/**
 * API-SOS
 * Arquivo: src/controllers/avaliacaoController.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cliente Prisma usado para acessar o PostgreSQL.
const prisma=require("../config/database");
exports.create=async (req,res,next)=> {try{const c=await prisma.chamado.findUnique({where:{id:req.params.id}});if(!c)return res.status(404).json({success:false,message:"Chamado não encontrado"});if(c.clienteId!==req.user.id)return res.status(403).json({success:false,message:"Sem permissão"});if(c.status!=="CONCLUIDO")return res.status(409).json({success:false,message:"Chamado precisa estar concluído"});const d=await prisma.avaliacao.create({data:{chamadoId:c.id,nota:req.body.nota,comentario:req.body.comentario}});res.status(201).json({success:true,data:d})}catch(e){next(e)}};
exports.get=async(req,res,next)=>{try{const d=await prisma.avaliacao.findUnique({where:{chamadoId:req.params.id},include:{chamado:true}});if(!d)return res.status(404).json({success:false,message:"Avaliação não encontrada"});if(req.user.tipo==="CLIENTE"&&d.chamado.clienteId!==req.user.id)return res.status(403).json({success:false,message:"Sem permissão"});res.json({success:true,data:d})}catch(e){next(e)}};
exports.update=async(req,res,next)=>{try{const d=await prisma.avaliacao.findUnique({where:{chamadoId:req.params.id},include:{chamado:true}});if(!d)return res.status(404).json({success:false,message:"Avaliação não encontrada"});if(d.chamado.clienteId!==req.user.id)return res.status(403).json({success:false,message:"Sem permissão"});const out=await prisma.avaliacao.update({where:{id:d.id},data:{nota:req.body.nota,comentario:req.body.comentario}});res.json({success:true,data:out})}catch(e){next(e)}};