const DeveloperController = require('../controllers/developers');

module.exports = (app) => {
   app.post('/developers', DeveloperController.post);
   app.put('/developers/:id', DeveloperController.put);
   app.delete('/developers/:id', DeveloperController.delete);
   app.get('/developers', DeveloperController.get);
   app.get('/developers/:id', DeveloperController.getById);
}