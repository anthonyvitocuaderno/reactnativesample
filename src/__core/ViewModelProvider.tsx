import { useContext, createContext, useState } from "react";
import LoginViewModel from "../presentation/login/LoginViewModel";
import { LoginUseCase } from "../domain/usecase/user/LoginUseCase";
import UserRepositoryImpl from "../data/repository/UserRepositoryImpl";
import UserRemoteSourceImpl from "../data/remote/user/UserRemoteSourceImpl";
import UserLocalSourceImpl from "../data/local/user/UserLocalSourceImpl";
import { isLoggedInUseCase } from "../domain/usecase/user/IsLoggedInUseCase";
import HomeViewModel from "../presentation/home/HomeViewModel";
import { LogoutUseCase } from "../domain/usecase/user/LogoutUseCase";
import AppBarViewModel from "../presentation/_components/appbar/AppBarViewModel";
import { GetLocationsUseCase } from "../domain/usecase/map/GetLocationsUseCase";

type Props = React.PropsWithChildren<{}>;

const localSources = {
    user: new UserLocalSourceImpl()
}

const remoteSources = {
    user: new UserRemoteSourceImpl()
}

const repositories = {
    user: new UserRepositoryImpl(remoteSources.user, localSources.user)
}
const useCases = {
    login: new LoginUseCase(repositories.user),
    isLoggedIn: new isLoggedInUseCase(repositories.user),
    logout: new LogoutUseCase(repositories.user),
    getMap: new GetLocationsUseCase()
} 

const viewModels = {
    login: new LoginViewModel(useCases.login, useCases.isLoggedIn),
    home: new HomeViewModel(useCases.getMap),
    appBar: new AppBarViewModel(useCases.logout, useCases.isLoggedIn)
}

const ViewModelContext = createContext(viewModels);

export default function ViewModelProvider({children}: Props) {

    return (
        <ViewModelContext.Provider value={viewModels}>
            {children}
        </ViewModelContext.Provider>
    )
}

export const useViewModels = () => {
    return useContext(ViewModelContext);
}