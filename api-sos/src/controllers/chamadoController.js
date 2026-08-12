/**
 * API-SOS
 * Arquivo: src/controllers/chamadoController.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cliente Prisma usado para acessar o PostgreSQL.
const prisma=require("../config/database");
const service=require("../services/chamadoService");
exports.create=async(req,res,next)=>{try{const d=await prisma.chamado.create({data:{clienteId:req.user.id,categoriaId:Number(req.body.categoriaId),latitude:req.body.latitude,longitude:req.body.longitude,endereco:req.body.endereco,descricao:req.body.descricao}});res.status(201).json({success:true,data:d})}catch(e){next(e)}};
exports.list=async(req,res,next)=>{try{const where=req.user.tipo==="CLIENTE"?{clienteId:req.user.id}:{OR:[{prestadorId:req.user.id},{prestadorId:null,categoria:{prestadores:{some:{id:req.user.id}}}}]};const d=await prisma.chamado.findMany({where,include:{cliente:true,categoria:true,prestador:true,avaliacao:true},orderBy:{dataAbertura:"desc"}});res.json({success:true,data:d})}catch(e){next(e)}};
exports.get=async(req,res,next)=>{try{const d=await prisma.chamado.findUnique({where:{id:req.params.id},include:{cliente:true,categoria:true,prestador:true,avaliacao:true}});if(!d)return res.status(404).json({success:false,message:"Chamado não encontrado"});if(req.user.tipo==="CLIENTE"&&d.clienteId!==req.user.id)return res.status(403).json({success:false,message:"Sem permissão"});if(req.user.tipo==="PRESTADOR"&&d.prestadorId&&d.prestadorId!==req.user.id)return res.status(403).json({success:false,message:"Sem permissão"});res.json({success:true,data:d})}catch(e){next(e)}};
exports.accept=async(req,res,next)=>{try{const d=await service.accept(req.params.id,req.user.id);res.json({success:true,message:"Chamado aceito",data:d})}catch(e){next(e)}};
exports.start=async(req,res,next)=>{try{const d=await service.change(req.params.id,req.user.id,"EM_ATENDIMENTO");res.json({success:true,data:d})}catch(e){next(e)}};
exports.complete=async(req,res,next)=>{try{const d=await service.change(req.params.id,req.user.id,"CONCLUIDO");res.json({success:true,data:d})}catch(e){next(e)}};
exports.cancel=async(req,res,next)=>{try{const c=await prisma.chamado.findUnique({where:{id:req.params.id}});if(!c)return res.status(404).json({success:false,message:"Chamado não encontrado"});if(c.clienteId!==req.user.id&&c.prestadorId!==req.user.id)return res.status(403).json({success:false,message:"Sem permissão"});const d=c.prestadorId?await service.change(c.id,c.prestadorId,"CANCELADO"):await prisma.chamado.update({where:{id:c.id},data:{status:"CANCELADO"}});res.json({success:true,data:d})}catch(e){next(e)}};