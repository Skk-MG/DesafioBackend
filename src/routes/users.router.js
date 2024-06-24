const {Router} = require('express');
const UsersController = require('../controllers/users.controller');
const upload = require('../middlewares/fileUpload.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

const router = Router();

router.get('/', checkRole(['admin']), UsersController.getAll);

router.get('/premium/:userId', UsersController.changeRole);

router.post('/:uid/documents', upload.array('document') ,UsersController.uploadDocuments);

router.post('/:uid/profile-picture', upload.single('picture') ,UsersController.uploadProfilePicture);

router.delete('/', checkRole(['admin']), UsersController.deleteInactiveUsers);

router.put('/:uid', UsersController.updateUser)

router.delete('/:uid', UsersController.deleteUser)

module.exports = {
    userRouter: router
};