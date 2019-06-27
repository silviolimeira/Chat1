import { Component } from "@angular/core";

import * as io from "socket.io-client";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  socket: any;
  public myUserId: string;
  chats = [];
  chat_input: string;

  constructor() {
    if (this.myUserId == null) {
      this.myUserId = Date.now().toString();
    }

    this.socket = io("http://172.16.0.50:3000");

    this.Receive();
  }

  send(msg) {
    if (msg != "") {
      let saltedMsg = this.myUserId + "#" + msg;
      this.socket.emit("message", saltedMsg);
    }
    this.chat_input = "";
  }

  Receive() {
    this.socket.on("message", msg => {
      let saletdMsgArr = msg.split("#");
      var item = {};

      if (saletdMsgArr[0] == this.myUserId) {
        item = { styleClass: "chat-message right", msgStr: saletdMsgArr[1] };
      } else {
        item = { styleClass: "chat-message left", msgStr: saletdMsgArr[1] };
      }

      this.chats.push(item);
    });
  }
}
