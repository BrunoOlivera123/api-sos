/**
 * API-SOS
 * Arquivo: src/app.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const express=require("express"),cors=require("cors"),helmet=require("helmet"),morgan=require("morgan");
const rateLimit=require("./middlewares/rateLimitMiddleware"),error=require("./middlewares/errorMiddleware"),prisma=require("./config/database"),{frontendUrl}=require("./config/env");
const app=express();// Registra middleware/rotas no Express.
app.use(helmet());// Registra middleware/rotas no Express.
app.use(cors({origin:frontendUrl,credentials:true}));// Registra middleware/rotas no Express.
app.use(express.json());// Registra middleware/rotas no Express.
app.use(morgan("dev"));// Registra middleware/rotas no Express.
app.use(rateLimit);
// Define um endpoint HTTP GET.
app.get("/api/health",async(req,res)=>{let db="ok";try{await prisma.$queryRaw`SELECT 1`}catch{db="error"}res.json({success:true,message:"API SOS funcionando",timestamp:new Date().toISOString(),database:db})});
// Registra middleware/rotas no Express.
app.use("/api/auth",require("./routes/authRoutes"));// Registra middleware/rotas no Express.
app.use("/api/clientes",require("./routes/clienteRoutes"));// Registra middleware/rotas no Express.
app.use("/api/prestadores",require("./routes/prestadorRoutes"));// Registra middleware/rotas no Express.
app.use("/api/categorias",require("./routes/categoriaRoutes"));// Registra middleware/rotas no Express.
app.use("/api/chamados",require("./routes/chamadoRoutes"));
// Registra middleware/rotas no Express.
app.use((req,res)=>res.status(404).json({success:false,message:"Rota não encontrada"}));// Registra middleware/rotas no Express.
app.use(error);module.exports=app;