//npm run start

//usei o express para criar e conofigurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

//configurar aquivos estaticos
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))


//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true // boolean
})



//criei uma rota /
//capturo o pedido do cliente
server.get("/", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("erro no banco de dados")
        }

        const reversedideas = [...rows].reverse() 

        let Lastideas = []
        for (idea of reversedideas){
            if(Lastideas.length < 2) {
                Lastideas.push(idea)
            }
        }

        return res.render("index.html", { ideas: Lastideas })
    })
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("erro no banco de dados")
        }

        const reversedideas = [...rows].reverse()
        return res.render("ideias.html", { ideas : reversedideas})

    })
})

server.post("/", function(req, res) {
const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `


    const values = [
        req.body.image,
        req.body.title, 
        req.body.category, 
        req.body.description, 
        req.body.link, 
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("erro no banco de dados")
        }

        return res.redirect("/ideias")

    })
})

//liguei meu servidor na porta 3002
server.listen(3002)