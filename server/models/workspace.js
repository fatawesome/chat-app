class WorkSpaceModel {
    constructor(db, ObjectId) {

        this.getWorkSpaceByEmail = async (value) => {
            return await this.WorkSpace.findOne({ adminEmail: value });
        }

        this.getWorkSpaceByUserName = async (value) => {
            return await this.WorkSpace.findOne({ displayName: value });
        }

        this.getWorkSpaceByID = async (value) => {
            return await this.WorkSpace.findOne({ _id: value });
        }

        this.getWorkSpaceList = async () => {
            return await this.WorkSpace.find({}).toArray();
        }

        this.insert = async fields => {
            const { insertedId } = await this.WorkSpace.insertOne(fields);
            return insertedId;
        };

        if (!db) {
            throw new Error('DB is required.');
        }
        this.db = db;
        if (!ObjectId) {
            throw new Error('ObjectId is required.');
        }

        this.ObjectId = ObjectId;
        this.WorkSpace = this.db.collection('workspace');
    }

}
module.exports = WorkSpaceModel;