import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { Subscription, UserDetails } from "@/types";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const userContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export function MyUserContextProvider({ props }: Props) {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSubscription = async () => {
    return supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();
  };

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (
            userDetailsPromise.status === "fulfilled" &&
            userDetailsPromise.value.data
          ) {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (
            subscriptionPromise.status === "fulfilled" &&
            subscriptionPromise.value.data
          ) {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <userContext.Provider value={value} {...props} />;
}
//
//
//
//
//
export const useUser = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a My useContextProviders");
  }

  return context;
};
