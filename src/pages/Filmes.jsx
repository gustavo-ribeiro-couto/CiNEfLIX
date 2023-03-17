import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Filmes = () =>{
    const [filmes,setFilmes] = useState([])

    useEffect(()=>{
        const fetchAllFilmes = async ()=>{
            try{
                const res = await axios.get("http://localhost:3881/filmes")
                setFilmes(res.data);
             //   console.log(res.data[0].nome)

            }catch(err){
                console.log(err)
            }
        }
        fetchAllFilmes()
    }, [])

    const delFilmes = async (id)=>{
        try {
            await axios.delete("http://localhost:3881/filmes/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
            
        }
    }                       
    return(
        <div>
            <h1>cinema 2</h1>
            <div className="filmes">
            
                {filmes.map((filme) => (
                    <div className="filme" key={filme.id}>
                        {filme.capa && <img src={`./filmes/${filme.capa}`} alt="" />}
                        <h2>{filme.nome}</h2>
                        <p>{filme.descricao}</p>
                        <span>{filme.incremento}</span><br />
                        <button className="delete" onClick={()=>delFilmes(filme.id)}>DELETAR</button>
                        <button className="atualizar"><Link to={`/atualizar/${filme.id}`}>ATUALIZAR</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/adicionar">NOVO filme</Link>
            </button>
        
        </div>
    )
}

export default Filmes