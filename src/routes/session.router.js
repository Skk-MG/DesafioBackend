const {Router} = require('express');
const passport = require('passport');
const SessionController = require('../controllers/session.controller');

const router = Router();

router.post('/register', passport.authenticate('register', 
    {failureRedirect: '/api/sessions/registerFailure'}), SessionController.registerUser);

router.get('/registerFailure', SessionController.getRegisterFailure);

router.post('/login', passport.authenticate('login', 
    {failureRedirect:'/api/sessions/loginFailure'}), SessionController.login);

router.get('/loginFailure', SessionController.getLoginFailure);

router.get('/logout', SessionController.logout);

router.post('/resetPassword', SessionController.resetPassword);

router.get('/github', passport.authenticate('github', 
    {scope: ['user:email']}), async (req, res) => {});

router.get('/githubCallback', passport.authenticate('github',
    {failureRedirect: '/login'}), SessionController.processGithub);

router.get('/current', SessionController.getCurrent);

module.exports = router;