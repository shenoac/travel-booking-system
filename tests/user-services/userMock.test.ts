import { Request, Response } from "express";
import mongoose from "mongoose";
import User from '../../src/modals/userModel';
import userContoller from '../../src/user-service/userController';

jest.mock('mongoose',() => ({
    connect: jest.fn(), //initializing
    disconnect: jest.fn()
}))

jest.mock('../../src/modals/userModel', () => ({
    Schema: jest.fn(), //initialing
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn()
}));

describe('testing Users controller functions by mocking DB connection and http request/response', () => {
    let req: Partial<Request>; //defination
    let res: Partial<Response>;

    let statusMock: jest.Mock; //defination
    let sendMock: jest.Mock;

    const mockUser = {_id:'123', name: 'ahmadasdas', email: 'test@test.com'}; //mocked data
    beforeEach(()=> {
        req = {}
        statusMock = jest.fn().mockReturnThis(); //return this(res)
        sendMock= jest.fn();
        res = {status:statusMock, send:sendMock};
    });

    afterEach(()=> {
        jest.clearAllMocks();
    })

    it('should return a user by ID', async()=> {
        req.params = {id: mockUser._id};
        (User.findById as jest.Mock).mockResolvedValue(mockUser); //mocking the resolved case of a promise(return a value from function)

        await userContoller.getByID(req as Request, res as Response);

        expect(User.findById).toHaveBeenCalledWith(mockUser._id);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith(mockUser);
    })

    it('should return 404 when the user is not found', async()=> {
        req.params = {id: mockUser._id};
        (User.findById as jest.Mock).mockResolvedValue(undefined); //Mocking the case when user is not found from DB

        await userContoller.getByID(req as Request, res as Response);

        expect(User.findById).toHaveBeenCalledWith(mockUser._id);
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(sendMock).toHaveBeenCalledWith({ message: 'User not found' });
    })

    it('should return 500 when a server error happens', async()=> {
        req.params = {id: mockUser._id};
        (User.findById as jest.Mock).mockRejectedValue({error: 'DB not working'}); //Mocking the Caase when thier is an issue with DB

        await userContoller.getByID(req as Request, res as Response);

        expect(User.findById).toHaveBeenCalledWith(mockUser._id);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(sendMock).toHaveBeenCalledWith({error: 'DB not working'});
    });

    it('should call the correct functions when update contoller function is called', async () => {
        req.params = {id: mockUser._id};
        const updatedUserDetails = {
            name: 'Updated name',
            email: 'newemail34534@test.com'
        };
        req.body = updatedUserDetails;

        (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUserDetails);
        await userContoller.update(req as Request, res as Response);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, {name: updatedUserDetails.name, email: updatedUserDetails.email}, {new: true})
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(updatedUserDetails);
    });

    //PATCH
    //the user will send a request with user id
    //mock the result of findByIdAndUpdate
    //body which will contain email or name
    // if user was not it should updated and we send 200 response with new updated user
    //if not found to 404
    //if thier server error we expect to return 500

    it('the controller function Should call UpdateUser with name when a patch request is send with name' , async () => {
        req.params = {id: mockUser._id}
        const updatedDetails = {
            name: 'updatedName'
        };
        req.body = updatedDetails;

        (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({...mockUser, name: updatedDetails.name});

        await userController.updatePartially(req as Request, res as Response)

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, {name: updatedDetails.name}, {new: true})
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            ...mockUser,
            name: updatedDetails.name
        })

    })
})