/**
 * API-SOS
 * Arquivo: src/controllers/categoriaController.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cliente Prisma usado para acessar o PostgreSQL.
const prisma=require("../config/database");
exports.list=async(req,res,next)=>{try{res.json({success:true,data:await prisma.categoria.findMany({orderBy:{nome:"asc"}})})}catch(e){next(e)}};
exports.get=async(req,res,next)=>{try{const d=await prisma.categoria.findUnique({where:{id:Number(req.params.id)}});if(!d)return res.status(404).json({success:false,message:"Categoria não encontrada"});res.json({success:true,data:d})}catch(e){next(e)}};
exports.create=async(req,res,next)=>{try{const d=await prisma.categoria.create({data:{nome:req.body.nome}});res.status(201).json({success:true,data:d})}catch(e){next(e)}};
exports.update=async(req,res,next)=>{try{const d=await prisma.categoria.update({where:{id:Number(req.params.id)},data:{nome:req.body.nome}});res.json({success:true,data:d})}catch(e){next(e)}};
exports.remove=async(req,res,next)=>{try{const id=Number(req.params.id);const [p,c]=await Promise.all([prisma.prestador.count({where:{categoriaId:id}}),prisma.chamado.count({where:{categoriaId:id}})]);if(p||c)return res.status(409).json({success:false,message:"Categoria possui prestadores ou chamados relacionados"});await prisma.categoria.delete({where:{id}});res.json({success:true,message:"Categoria excluída"})}catch(e){next(e)}};