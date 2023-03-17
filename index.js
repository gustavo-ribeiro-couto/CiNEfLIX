import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "fimes"
	
});

app.use(express.json());
app.use( cors());


app.get('/', function (req, res) {
  res.send('aa')
})

//selecionar todos os filmes do banco
app.get("/filmes" ,(req, res)=>{
	const q = "SELECT * FROM filmes"
	db.query(q,(err,data)=>{
		if(err)return res.json(err)
		return res.json(data)
	})
})

app.get("/addfilmes",(res,req)=>{
	const q = "INSERT INTO filmes(`nome`, `capa`, `descricao`, `incremento`, `criado_por`) VALUES(?)"
	const values = [
		req.body.nome,
		req.body.capa,
		req.body.descricao,
		req.body.incremento,
		req.body.criado_por 
	]

db.query(q,[values], (err,data)=>{
	if(err) return res.json(err)
	return res.json("seu filme foi criado com sucesso")
	
})
})

app.put("/filmes/:id",(res,req)=>{
	const filmesID = "req.params.id";
	const q ="UPDATE filmes SET 'nome' = ? ,'capa' = ? ,'descricao' = ? ,'lançamento' = ? ,'criado' = ? , 'criado_por' = ? WHERE =id"
	const values = [
		req.body.nome,
		req.body.capa,
		req.body.descricao,
		req.body.incremento,
		req.body.criado_por 
	]

db.query(q,[...values,filmesID], (err,data)=>{
	if(err) return res.json(err)
	return res.json("seu filme foi atualizado com sucesso")
	
})
})


app.delete("filmes/:id",(req,res)=>{
	const filmesId = req.params.id;
	const q = "DELETE FROM filmes WHERE id = ?"

	db.query(q,[filmesId], (err,data)=>{
		if(err) return res.json(err)
		return res.json("seu filme foi deletado")
	})
})
 

app.listen(3881, () =>{
	console.log("A API está roddando em http://localhost:3881");
});
 