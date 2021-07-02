const mysqlConnection = require('../../connection')

exports.post = (req, res) => {
   const { name, sexo, hobby, datanascimento } = req.body
   mysqlConnection.query(
      `INSERT INTO developers (name, sexo, hobby, datanascimento) VALUES ('${name}', '${sexo}', '${hobby}', '${datanascimento}')`,
      (err, rows) => {
         if (err) {
            res.status(400).send()
         } else {
            res.status(201).json({
               id: rows.insertId
            })
         }
      })
};

exports.put = (req, res, next) => {
   const { name, sexo, hobby, datanascimento } = req.body
   const { id } = req.params;
   mysqlConnection.query(`UPDATE developers SET name='${name}', sexo='${sexo}', hobby='${hobby}', datanascimento='${datanascimento}' WHERE id=${id}`,
      (err, rows) => {
         if (err) {
            res.status(400).send()
         } else {
            mysqlConnection.query(`SELECT * FROM developers WHERE developers.id = ${id}`, (err, rows, fields) => {
               if (err) {
                  res.status(400).send()
               } else {
                  res.status(200).json(rows[0])
               }
            })
         }
      });
   };

   exports.delete = (req, res, next) => {
      let id = req.params.id;
      mysqlConnection.query(`DELETE FROM developers where id=${id}`, (err, rows, fields) => {
         if (err) {
            res.status(400).send()
         } else {
            res.status(204).send()
         }
      })
   };

   exports.get = (req, res) => {
      mysqlConnection.query('SELECT * FROM developers ORDER BY name', (err, rows, fields) => {
         if (err) {
            res.status(404).send()
         } else {
            res.status(200).json(rows)
         }
      })
   };

   exports.getById = (req, res, next) => {
      let id = req.params.id;
      mysqlConnection.query(`SELECT * FROM developers WHERE developers.id = ${id}`, (err, rows, fields) => {
         if (err) {
            res.status(400).send()

         } else {
            if(rows.length > 0) {
               res.status(200).json(rows[0])
            } else {
               res.status(404).send()
            }
         }
      })
   };