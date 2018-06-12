let express = require('express');
let router = express.Router();
let models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/seqTest', (req, res, next) => {
    async function seqTest() {
        try {
            let i = 1;
            await models.Memo.create({
                title: 'Practice1 ',
                body: 'Sequelize1'
            });
            await console.log(i++);
            await models.Memo.create({
                title: 'Practice2 ',
                body: 'Sequelize2'
            });
            await console.log(i++);


            await models.Memo.create({
                title: 'Practice3 ',
                body: 'Sequelize3'
            });
            await console.log(i++);


            await models.Memo.create({
                title: 'Practice4 ',
                body: 'Sequelize4'
            });
            await console.log(i++);


            await models.Memo.create({
                title: 'Practice5 ',
                body: 'Sequelize5'
            });
            await console.log(i++);


            await models.Memo.create({
                title: 'Practice6 ',
                body: 'Sequelize6'
            });
            await console.log(i++);

            await console.log("end");
            await res.send(i+"");

        } catch (e) {
            console.error(e);
        }
    }
    seqTest();
});
module.exports = router;
