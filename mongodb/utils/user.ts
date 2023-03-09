import UserModel, { User } from "../models/users";

export const getUser = async (walletAddress: string) => {
    const user: User | null = await UserModel.findOne({
        wallet: walletAddress,
    });

    return user;
};

export const createUser = async (walletAddress: string) => {
    const user: User = await UserModel.create({ wallet: walletAddress });

    return user;
};
