module.exports = (app, db) => {
  const WorkSpaceModel = require('../models/workspace');
  const { ObjectId } = require('mongodb');
  const { hashSync, compareSync, genSaltSync } = require('bcrypt-nodejs');

  const workSpaceModel = new WorkSpaceModel(db, ObjectId);

  const SALT_ROUNDS = 10;

  const getWorkSpaceByEmail = async (value) => {
    return await workSpaceModel.getWorkSpaceByEmail(value);
  };

  const getWorkSpaceByUserName = async (value) => {

    return await workSpaceModel.getWorkSpaceByUserName(value);
  }

  const getWorkSpaceByID = async (value) => {
    return await workSpaceModel.getWorkSpaceByID(value);

  }

  const hash = (pass) => {
    return hashSync(pass, genSaltSync(SALT_ROUNDS));
  }

  const getWorkSpaceList = async () => {
    return await workSpaceModel.getWorkSpaceList();
  }

  app.post('/createworkspace', (req, res) => {
    const workspaceInfo = req.body;

    return getWorkSpaceByEmail(workspaceInfo.adminEmail).then(workspace => {
      if (workspace) {
        return res.send({ error: 'This Admin email is already registered.' });
      }
      return getWorkSpaceByUserName(workspaceInfo.displayName).then(workspace => {

        if (workspace) {
          return res.send({ error: 'This DisPlay Name is already registered!' });
        }

        delete workspaceInfo.conPwd;
        workspaceInfo.pwd = hash(workspaceInfo.pwd);

        workSpaceModel.insert(workspaceInfo).then(workspaceID => {

          if (workspaceID) {
            return getWorkSpaceByID(workspaceID).then(workspace => {
              delete workspace.pwd;
              return res.send(workspace);
            });
          }
          else {
            return res.send({ error: 'Create WorkSpace Faild!' });
          }
        });
      });
    });
  });

  app.post('/getworkspacelist', (req, res) => {
    return getWorkSpaceList().then(workspaces => {
      if (workspaces) {
        workspaces.map((ws) => {
          delete ws.pwd;
        });
        return res.send({ workspaces });
      } else {
        return res.send({ workspaces: [] });
      }
    });
  })
}