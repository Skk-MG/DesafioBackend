const {Router} = require('express');
const UsersController = require('../controllers/users.controller');
const upload = require('../middlewares/fileUpload.middleware');

const router = Router();

router.get('/', UsersController.getAll)

router.get('/premium/:userId', UsersController.changeRole)

router.post('/:uid/documents', upload.array('document') ,UsersController.uploadDocuments)

router.post('/:uid/profile-picture', upload.single('picture') ,UsersController.uploadProfilePicture)

module.exports = {
    userRouter: router
};