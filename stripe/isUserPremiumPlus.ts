import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default async function isUserPremiumPlus(): Promise<boolean> {
  await firebase.auth().currentUser?.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();

  return decodedToken?.claims?.stripeRole;
}