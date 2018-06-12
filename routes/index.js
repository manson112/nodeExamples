let express = require('express');
let router = express.Router();
let models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/seqInsterTest', (req, res, next) => {
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

res.get("/seqSelectTest", () => {
    //set of Sequelize function
    let OP = models.Sequelize.Op;
    
    async select => {
        await models.Memo.findAll({
            attributes: ['id', 'title', 'body']
        });
        await models.Memo.findAll({
            attributes: ['id', 'title', ['body', 'bd']]
            //body as bd
        });
        await models.Memo.findAll({
            attributes: ['id', 'title', 'body'],
            where: {
                id: 3
            }
        });
        await models.Memo.findAll({
            attribute: { exclude: ['title'] }
            //exclude title
        });

        await models.Memo.findAll({
            where: {
                [Op.or]: [{id:2}, {id:5}]
            }
            // SELECT * FROM Memo WHERE id = 2 OR id = 5;
        });
        await models.Memo.findAll({
            where: models.sequelize.where(models.sequelize.fn('char_length', models.sequelize.col('title')), 10)
            // SELECT * FROM Memo WHERE char_length(title) = 6;
        });
        await models.Memo.findAll({
            attributes : [[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'ids']]
            // SELECT COUNT(id) AS ids
        });
        await models.Memo.findAll({
            offset: 2,
            limit:10
            // 2개를 skip 후 10개까지 
        });

        await models.Memo.findAll({
            order: [
                ['title', 'DESC'],
                [models.sequelize.fn('max'), models.sequelize.col('id'), 'DESC'],

            ]
            //[{model: Task, as: 'Task'}, {model: Project, as: 'Project'}, 'createdAt', 'DESC']
            //order : models.sequelize.literal('max(id) DESC')
            //order : models.sequelize.fn('max', sequelize.col('id'))
            //order : models.sequelize.col('id')
            //order : models.sequelize.random()
        })
    };

    async del => {
        await models.Memo.destroy({
            where: {
                id: 1
            }
            // DELETE FROM Memo WHERE id = 1;
        });
    };

    async update => {
        await models.Memo.update({
            updateAt: null,
        }, {
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            }
            // UPDATE Memo SET updatedAt = null WHERE deletedAt NOT NULL;
        });
    }

    select();
})

module.exports = router;
// const Op = Sequelize.Op

// [Op.and]: {a: 5}           // AND (a = 5)
// [Op.or]: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
// [Op.gt]: 6,                // > 6
// [Op.gte]: 6,               // >= 6
// [Op.lt]: 10,               // < 10
// [Op.lte]: 10,              // <= 10
// [Op.ne]: 20,               // != 20
// [Op.eq]: 3,                // = 3
// [Op.not]: true,            // IS NOT TRUE
// [Op.between]: [6, 10],     // BETWEEN 6 AND 10
// [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
// [Op.in]: [1, 2],           // IN [1, 2]
// [Op.notIn]: [1, 2],        // NOT IN [1, 2]
// [Op.like]: '%hat',         // LIKE '%hat'
// [Op.notLike]: '%hat'       // NOT LIKE '%hat'
// [Op.iLike]: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
// [Op.notILike]: '%hat'      // NOT ILIKE '%hat'  (PG only)
// [Op.regexp]: '^[h|a|t]'    // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
// [Op.notRegexp]: '^[h|a|t]' // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
// [Op.iRegexp]: '^[h|a|t]'    // ~* '^[h|a|t]' (PG only)
// [Op.notIRegexp]: '^[h|a|t]' // !~* '^[h|a|t]' (PG only)
// [Op.like]: { [Op.any]: ['cat', 'hat']}
//                        // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
// [Op.overlap]: [1, 2]       // && [1, 2] (PG array overlap operator)
// [Op.contains]: [1, 2]      // @> [1, 2] (PG array contains operator)
// [Op.contained]: [1, 2]     // <@ [1, 2] (PG array contained by operator)
// [Op.any]: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)

// [Op.col]: 'user.organization_id' // = "user"."organization_id", with dialect specific column identifiers, PG in this 


//----------------Range Operations-------------------
// [Op.contains]: 2           // @> '2'::integer (PG range contains element operator)
// [Op.contains]: [1, 2]      // @> [1, 2) (PG range contains range operator)
// [Op.contained]: [1, 2]     // <@ [1, 2) (PG range is contained by operator)
// [Op.overlap]: [1, 2]       // && [1, 2) (PG range overlap (have points in common) operator)
// [Op.adjacent]: [1, 2]      // -|- [1, 2) (PG range is adjacent to operator)
// [Op.strictLeft]: [1, 2]    // << [1, 2) (PG range strictly left of operator)
// [Op.strictRight]: [1, 2]   // >> [1, 2) (PG range strictly right of operator)
// [Op.noExtendRight]: [1, 2] // &< [1, 2) (PG range does not extend to the right of operator)
// [Op.noExtendLeft]: [1, 2]  // &> [1, 2) (PG range does not extend to the left of operator)