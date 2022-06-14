const { Router } = require('express');
const {db} = require('../firebase');

const router = Router();

//GET
router.get('/', async (req, res) => {

    const querySnapshot = await db.collection('contacts').get();
    
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    //console.log(contacts);
    
    res.render('index', {contacts});
    
});

//ADD
router.post('/new-contact', async (req, res) => {
    const {firstname, lastname, email, phone} = req.body;
    console.log(req.body);

    await db.collection('contacts').add({
        firstname, lastname, email, phone
    });

    res.redirect('/');
});

//EDIT CONTACT
router.get('/edit-contact/:id', async (req, res) => {
    const doc = await db.collection('contacts').doc(req.params.id).get();
    console.log(doc.data());
    res.render('index',{contact: {id:req.params.id, ...doc.data()}});
});

//DELETE
router.get('/delete-contact/:id', async (req, res) => {
    await db.collection('contacts').doc(req.params.id).delete();
    res.redirect('/');
});

//UPDATE
router.post('/update-contact/:id', async (req, res) => {
    await db.collection('contacts').doc(req.params.id).update(req.body);
    res.redirect('/');
});

module.exports = router;