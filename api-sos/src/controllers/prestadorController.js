/**
 * API-SOS
 * Arquivo: src/controllers/prestadorController.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cliente Prisma usado para acessar o PostgreSQL.
const prisma = require("../config/database");
const safe = u => { const {senhaHash,...x}=u; return x; };
exports.me=async(req,res,next)=>{try{const u=await prisma.prestador.findUnique({where:{id:req.user.id},include:{categoria:true}});if(!u)return res.status(404).json({success:false,message:"Prestador não encontrado"});res.json({success:true,data:safe(u)})}catch(e){next(e)}};
exports.update=async(req,res,next)=>{try{const data={...req.body};if(data.categoriaId)data.categoriaId=Number(data.categoriaId);const u=await prisma.prestador.update({where:{id:req.user.id},data});res.json({success:true,data:safe(u)})}catch(e){next(e)}};
exports.availability=async(req,res,next)=>{try{const u=await prisma.prestador.update({where:{id:req.user.id},data:{disponivel:req.body.disponivel}});res.json({success:true,data:safe(u)})}catch(e){next(e)}};
exports.location=async(req,res,next)=>{try{const u=await prisma.prestador.update({where:{id:req.user.id},data:{latitude:req.body.latitude,longitude:req.body.longitude}});res.json({success:true,data:safe(u)})}catch(e){next(e)}};
exports.list=async(req,res,next)=>{try{const where={};if(req.query.categoriaId)where.categoriaId=Number(req.query.categoriaId);if(req.query.disponivel!==undefined)where.disponivel=req.query.disponivel==="true";const users=await prisma.prestador.findMany({where,include:{categoria:true}});res.json({success:true,data:users.map(safe)})}catch(e){next(e)}};
exports.disponiveis=async(req,res,next)=>{try{const users=await prisma.prestador.findMany({where:{categoriaId:Number(req.query.categoriaId),disponivel:true,latitude:{not:null},longitude:{not:null}},include:{categoria:true}});res.json({success:true,data:users.map(safe)})}catch(e){next(e)}};