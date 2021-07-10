import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const token = localStorage.getItem("messenger-token");
const ENDPOINT = "http://localhost:3001";
const socket = io(ENDPOINT,{ 
  query: {token},
  transports : ['websocket'] });

socket.on("connect", () => {
  console.log("connected to server");
  
  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
});

export default socket;
