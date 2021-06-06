import { ref, onUnmounted } from "vue";
import { firebaseApp } from "./main";
import firebase from "firebase";

const db = firebaseApp.firestore();
const usersCollection = db.collection("users");

export const createUser = (user) => {
  return usersCollection.add(user);
};

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const getUserByEmail = async (email) => {
  const user = await usersCollection.where("email", "==", email).get();
  return user;
};

export const updateUser = (id, data) => {
  return usersCollection.doc(id).update(data);
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};

export const signup = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const login = (user) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .catch((err) => window.alert(err.message));
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const verifyUser = () => {
  var user = firebase.auth().currentUser;

  const actionCodeSettings = {
    url: "https://vue-test-app-ef47d.web.app/",
  };

  user
    .sendEmailVerification(actionCodeSettings)
    .then(function() {
      window.alert("Verification Email Sent");
    })
    .catch(function(error) {
      // An error happened.
      console.log(error);
    });
};

export const useLoadUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};
