import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "src/types/user";

export interface UserState {
    user: IUser | null;
    accessToken: string | null;
}


export const initialState: UserState = {
    user: {
        id: "",
        fullName: "",
        email: "",
        role: "",
        createdAt: "",
        updatedAt: "",
        isVerified: false,
        stripeCustomerId: "",
        paymentMethodId: null,
        photoURL:"",
        subscription: {
            stripeSubscriptionId: "",
            name: "",
            phoneNumber: "",
            planType: ""
        }
    },
    accessToken: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<UserState>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logoutUser: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;