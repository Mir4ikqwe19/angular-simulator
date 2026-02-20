import { MessageType } from "../enums/Message";

export interface IMessage {
  text: string;
  type: MessageType;
}